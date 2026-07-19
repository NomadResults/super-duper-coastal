// Inbox hygiene — marks call conversations from spam-tagged contacts as read
// so they stop cluttering the team's Unread view. DRY RUN by default.
//
//   node ghl-spam-defense/inbox-hygiene.js           # report only
//   node ghl-spam-defense/inbox-hygiene.js --apply   # mark them read
//   --days=30       how far back to scan (default 30)
//   --max-pages=10  pagination cap (100 conversations per page)
//
// Scope is intentionally narrow:
//   - Only conversations whose CONTACT carries the "spam" tag (i.e. contacts
//     you already reviewed via blacklist.js) are touched.
//   - The only change is unreadCount → 0. The GHL API has no "archive", and
//     this script never deletes anything — DELETE /conversations exists in the
//     API but is deliberately not wired up here.

import path from 'node:path';
import {
    loadConfig, conversations, contacts, makeLogger, parseArgs,
} from './lib/ghl.js';

const args = parseArgs(process.argv, { days: 30, maxPages: 10 });
const { token, locationId } = loadConfig();
const log = makeLogger('inbox-hygiene');

const SPAM_TAG = 'spam';

async function main() {
    console.log(`Mode: ${args.apply ? 'APPLY — conversations will be marked read' : 'DRY RUN — nothing will be changed'}\n`);

    const cutoffMs = Date.now() - args.days * 86400_000;
    const candidates = []; // { convId, contactId, label, unreadCount }
    let startAfterDate;

    for (let page = 1; page <= args.maxPages; page++) {
        const data = await conversations.search(token, {
            locationId,
            lastMessageType: 'TYPE_CALL',
            sortBy: 'last_message_date',
            sort: 'desc',
            limit: 100,
            ...(startAfterDate ? { startAfterDate } : {}),
        });
        const items = data?.conversations || [];
        if (items.length === 0) break;
        let reachedCutoff = false;
        for (const conv of items) {
            candidates.push({
                convId: conv.id,
                contactId: conv.contactId,
                label: `${conv.fullName || conv.contactName || '(no name)'} ${conv.phone || ''}`.trim(),
                unreadCount: conv.unreadCount ?? 0,
            });
            if (conv.lastMessageDate && new Date(conv.lastMessageDate).getTime() < cutoffMs) reachedCutoff = true;
            startAfterDate = conv.lastMessageDate ? new Date(conv.lastMessageDate).getTime() : startAfterDate;
        }
        if (reachedCutoff || items.length < 100 || !startAfterDate) break;
    }

    // Check the spam tag once per contact, not per conversation
    const spamByContact = new Map();
    let touched = 0;
    for (const c of candidates) {
        if (!spamByContact.has(c.contactId)) {
            try {
                const contact = (await contacts.get(token, c.contactId))?.contact;
                spamByContact.set(c.contactId, (contact?.tags || []).map((t) => t.toLowerCase()).includes(SPAM_TAG));
            } catch (e) {
                log.write({ action: 'error', contactId: c.contactId, detail: String(e) });
                spamByContact.set(c.contactId, false);
            }
        }
        if (!spamByContact.get(c.contactId)) continue;
        if (c.unreadCount === 0) {
            log.write({ action: 'skip', reason: 'already read', ...c });
            continue;
        }
        if (!args.apply) {
            console.log(`WOULD MARK READ  ${c.label}  (${c.unreadCount} unread)`);
            log.write({ action: 'would_mark_read', ...c });
            touched++;
            continue;
        }
        try {
            await conversations.update(token, c.convId, { locationId, unreadCount: 0 });
            console.log(`MARKED READ      ${c.label}`);
            log.write({ action: 'marked_read', ...c });
            touched++;
        } catch (e) {
            console.error(`FAILED           ${c.label}  — ${e.message}`);
            log.write({ action: 'error', ...c, detail: String(e) });
        }
    }

    console.log(`\n${touched} conversation(s) ${args.apply ? 'marked read' : 'would be marked read'}. Log: ${path.relative(process.cwd(), log.file)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
