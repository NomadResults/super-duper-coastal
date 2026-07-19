// Auto-blacklist pipeline for spam callers — DRY RUN by default.
//
//   node ghl-spam-defense/blacklist.js                 # report only, changes nothing
//   node ghl-spam-defense/blacklist.js --apply         # tag + DND the flagged contacts
//   node ghl-spam-defense/blacklist.js --contact=<id> --apply   # test on ONE contact first
//
// Tuning flags (defaults are deliberately conservative):
//   --days=14          how far back to scan call conversations
//   --min-calls=3      inbound calls required before the short-call rule fires
//   --max-duration=20  seconds; ALL of a contact's calls must be at or under this
//   --max-pages=5      pagination cap on conversation search (100 per page)
//
// Flagging rules — a contact is flagged only if:
//   A) their phone matches spam-seeds.txt (your hand-curated list), OR
//   B) they have NO name, NO email, NO protective tags, AND at least
//      --min-calls inbound calls, EVERY one of which lasted <= --max-duration
//      seconds (a call with unknown duration disqualifies the contact — when
//      unsure, we don't flag).
//
// A protective signal (real name, email, lead/customer tag, open DND already
// handled) always wins, even over the seed list — false positives are the
// failure mode we refuse to have. Nothing is ever deleted, and no workflow,
// pipeline, or conversation is modified by this script.

import fs from 'node:fs';
import path from 'node:path';
import {
    ROOT, loadConfig, conversations, contacts,
    normalizePhone, makeLogger, parseArgs,
} from './lib/ghl.js';

const args = parseArgs(process.argv, { days: 14, minCalls: 3, maxDuration: 20, maxPages: 5, contact: '' });
const { token, locationId } = loadConfig();
const log = makeLogger('blacklist');

const SPAM_TAG = 'spam';
// Any of these (case-insensitive substring) on a contact means: never flag.
const PROTECTED_TAG_PARTS = ['lead', 'customer', 'client', 'vip', 'review', 'estimate', 'appointment'];

function loadSeeds() {
    const file = path.join(ROOT, 'spam-seeds.txt');
    if (!fs.existsSync(file)) return new Set();
    return new Set(
        fs.readFileSync(file, 'utf8').split('\n')
            .map((l) => l.replace(/#.*$/, '').trim())
            .filter(Boolean)
            .map(normalizePhone)
            .filter((p) => p.length === 10),
    );
}

function protectiveSignals(contact) {
    const signals = [];
    const phoneDigits = normalizePhone(contact.phone);
    const name = [contact.firstName, contact.lastName].filter(Boolean).join(' ').trim();
    // GHL auto-creates callers with an empty name or the phone number as the name
    if (name && normalizePhone(name) !== phoneDigits) signals.push(`has name "${name}"`);
    if (contact.email) signals.push(`has email ${contact.email}`);
    for (const tag of contact.tags || []) {
        const t = tag.toLowerCase();
        if (PROTECTED_TAG_PARTS.some((p) => t.includes(p))) signals.push(`protective tag "${tag}"`);
    }
    return signals;
}

async function analyzeCalls(convIds) {
    let inboundCalls = 0;
    let allShort = true;
    const evidence = [];
    for (const convId of convIds) {
        const data = await conversations.messages(token, convId, { type: 'TYPE_CALL', limit: 100 });
        for (const msg of data?.messages?.messages ?? data?.messages ?? []) {
            if (msg.messageType !== 'TYPE_CALL' || msg.direction !== 'inbound') continue;
            inboundCalls++;
            // Spec documents meta.callDuration, but the live API nests it as
            // meta.call.duration — accept either shape.
            const duration = Number(msg.meta?.callDuration ?? msg.meta?.call?.duration);
            const status = msg.meta?.callStatus || msg.meta?.call?.status || msg.status || 'unknown';
            evidence.push({ date: msg.dateAdded, duration: Number.isFinite(duration) ? duration : null, status });
            // Unknown duration → treat as long → contact is NOT flagged
            if (!Number.isFinite(duration) || duration > args.maxDuration) allShort = false;
        }
    }
    return { inboundCalls, allShort, evidence };
}

async function main() {
    const seeds = loadSeeds();
    console.log(`Mode: ${args.apply ? 'APPLY — changes will be made' : 'DRY RUN — nothing will be changed'}`);
    console.log(`Seed list: ${seeds.size} number(s) | window: last ${args.days} days | rule: >=${args.minCalls} calls, all <=${args.maxDuration}s\n`);

    // 1. Collect recent inbound-call conversations (or a single contact's, for testing)
    const cutoffMs = Date.now() - args.days * 86400_000;
    const byContact = new Map(); // contactId → { convIds: [], phone, fullName }
    let startAfterDate;
    for (let page = 1; page <= args.maxPages; page++) {
        const params = {
            locationId,
            lastMessageType: 'TYPE_CALL',
            lastMessageDirection: 'inbound',
            sortBy: 'last_message_date',
            sort: 'desc',
            limit: 100,
            ...(args.contact ? { contactId: args.contact } : {}),
            ...(startAfterDate ? { startAfterDate } : {}),
        };
        const data = await conversations.search(token, params);
        const items = data?.conversations || [];
        if (items.length === 0) break;
        let reachedCutoff = false;
        for (const conv of items) {
            const entry = byContact.get(conv.contactId) || { convIds: [], phone: conv.phone, fullName: conv.fullName || conv.contactName || '' };
            entry.convIds.push(conv.id);
            byContact.set(conv.contactId, entry);
            if (conv.lastMessageDate && new Date(conv.lastMessageDate).getTime() < cutoffMs) reachedCutoff = true;
            startAfterDate = conv.lastMessageDate ? new Date(conv.lastMessageDate).getTime() : startAfterDate;
        }
        if (reachedCutoff || items.length < 100 || !startAfterDate) break;
    }
    console.log(`Found ${byContact.size} contact(s) with recent inbound calls.\n`);

    // 2. Evaluate each contact
    const flagged = [];
    for (const [contactId, info] of byContact) {
        let contact;
        try {
            contact = (await contacts.get(token, contactId))?.contact;
        } catch (e) {
            log.write({ action: 'error', contactId, detail: String(e) });
            continue;
        }
        if (!contact) continue;

        const label = `${info.fullName || '(no name)'} ${contact.phone || info.phone || '(no phone)'}`;
        const tags = (contact.tags || []).map((t) => t.toLowerCase());

        if (tags.includes(SPAM_TAG)) {
            log.write({ action: 'skip', reason: 'already tagged spam', contactId, label });
            continue;
        }

        const protection = protectiveSignals(contact);
        const seedMatch = seeds.has(normalizePhone(contact.phone || info.phone));

        if (protection.length > 0) {
            const level = seedMatch ? 'warn' : 'skip';
            log.write({ action: level, reason: `protected: ${protection.join('; ')}${seedMatch ? ' — BUT matches seed list, review manually!' : ''}`, contactId, label });
            if (seedMatch) console.log(`⚠️  SEED MATCH but protected — review manually: ${label} (${protection.join('; ')})`);
            continue;
        }

        if (seedMatch) {
            flagged.push({ contactId, label, reason: 'seed-list match', evidence: null });
            continue;
        }

        const { inboundCalls, allShort, evidence } = await analyzeCalls(info.convIds);
        if (inboundCalls >= args.minCalls && allShort) {
            flagged.push({ contactId, label, reason: `${inboundCalls} inbound calls, all <=${args.maxDuration}s, no name/email`, evidence });
        } else {
            log.write({ action: 'skip', reason: `not enough signal (${inboundCalls} inbound calls, allShort=${allShort})`, contactId, label });
        }
    }

    // 3. Report / apply
    if (flagged.length === 0) {
        console.log('No contacts met the spam criteria. Nothing to do.');
    }
    for (const f of flagged) {
        if (!args.apply) {
            console.log(`WOULD FLAG  ${f.label}  — ${f.reason}`);
            log.write({ action: 'would_flag', ...f });
            continue;
        }
        try {
            await contacts.addTags(token, f.contactId, [SPAM_TAG]);
            await contacts.update(token, f.contactId, {
                dndSettings: {
                    Call: { status: 'active', message: 'Auto-flagged: spam caller' },
                    SMS: { status: 'active', message: 'Auto-flagged: spam caller' },
                },
            });
            console.log(`FLAGGED     ${f.label}  — ${f.reason}`);
            log.write({ action: 'flagged', ...f });
        } catch (e) {
            console.error(`FAILED      ${f.label}  — ${e.message}`);
            log.write({ action: 'error', contactId: f.contactId, label: f.label, detail: String(e) });
        }
    }

    console.log(`\n${flagged.length} contact(s) ${args.apply ? 'flagged' : 'would be flagged'}. Full decision log: ${path.relative(process.cwd(), log.file)}`);
    if (!args.apply && flagged.length > 0) {
        console.log('Review the log, then re-run with --apply (or test one first: --contact=<id> --apply).');
    }
}

main().catch((e) => { console.error(e); process.exit(1); });
