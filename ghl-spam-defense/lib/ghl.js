// Minimal GoHighLevel API v2 client for the spam-defense scripts.
// No dependencies — uses Node's global fetch (Node 18+).
//
// Endpoints used across these scripts (all verified against the official
// OpenAPI specs in github.com/GoHighLevel/highlevel-api-docs):
//   GET  /conversations/search                      (Version 2021-04-15)
//   GET  /conversations/{id}/messages?type=TYPE_CALL (Version 2021-04-15)
//   PUT  /conversations/{id}                         (Version 2021-04-15)
//   GET  /contacts/{id}                              (Version 2021-07-28)
//   PUT  /contacts/{id}                              (Version 2021-07-28)
//   POST /contacts/{id}/tags                         (Version 2021-07-28)
//
// Nothing here can touch workflows — the public API only exposes GET /workflows/.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const BASE = 'https://services.leadconnectorhq.com';

// Conversations endpoints reject any other Version header; contacts use 2021-07-28.
const CONVERSATIONS_VERSION = '2021-04-15';
const CONTACTS_VERSION = '2021-07-28';

/** Parse ghl-spam-defense/.env if present, then fall back to process.env. */
export function loadConfig() {
    const envPath = path.join(ROOT, '.env');
    const fileVars = {};
    if (fs.existsSync(envPath)) {
        for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
            const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
            if (m) fileVars[m[1]] = m[2];
        }
    }
    const get = (k) => process.env[k] || fileVars[k] || '';
    const token = get('GHL_PIT_TOKEN') || get('GHL_API_KEY');
    const locationId = get('GHL_LOCATION_ID');
    if (!token || !locationId) {
        console.error(
            'Missing credentials. Create ghl-spam-defense/.env with:\n' +
            '  GHL_PIT_TOKEN=pit-...   (Settings → Private Integrations)\n' +
            '  GHL_LOCATION_ID=...     (Settings → Business Profile)\n' +
            'See ghl-spam-defense/README.md for the scopes to grant.',
        );
        process.exit(1);
    }
    return { token, locationId };
}

let lastRequestAt = 0;
const MIN_SPACING_MS = 150; // stay far below GHL's 100 req / 10 s burst limit

async function request(token, method, apiPath, { body, version } = {}) {
    const wait = lastRequestAt + MIN_SPACING_MS - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastRequestAt = Date.now();

    for (let attempt = 1; attempt <= 3; attempt++) {
        const res = await fetch(`${BASE}${apiPath}`, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                Version: version,
                Accept: 'application/json',
                ...(body ? { 'Content-Type': 'application/json' } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (res.status === 429 || res.status >= 500) {
            if (attempt === 3) throw new Error(`GHL ${method} ${apiPath} → ${res.status} after 3 attempts`);
            await new Promise((r) => setTimeout(r, attempt * 2000));
            continue;
        }
        const data = await res.json().catch(() => null);
        if (!res.ok) {
            const err = new Error(`GHL ${method} ${apiPath} → ${res.status}: ${JSON.stringify(data)}`);
            err.status = res.status;
            err.data = data;
            throw err;
        }
        return data;
    }
}

export const conversations = {
    search: (token, params) =>
        request(token, 'GET', `/conversations/search?${new URLSearchParams(params)}`, { version: CONVERSATIONS_VERSION }),
    messages: (token, conversationId, params = {}) =>
        request(token, 'GET', `/conversations/${conversationId}/messages?${new URLSearchParams(params)}`, { version: CONVERSATIONS_VERSION }),
    update: (token, conversationId, body) =>
        request(token, 'PUT', `/conversations/${conversationId}`, { body, version: CONVERSATIONS_VERSION }),
};

export const contacts = {
    get: (token, contactId) =>
        request(token, 'GET', `/contacts/${contactId}`, { version: CONTACTS_VERSION }),
    update: (token, contactId, body) =>
        request(token, 'PUT', `/contacts/${contactId}`, { body, version: CONTACTS_VERSION }),
    addTags: (token, contactId, tags) =>
        request(token, 'POST', `/contacts/${contactId}/tags`, { body: { tags }, version: CONTACTS_VERSION }),
};

/** Keep only digits; compare last 10 so +1 prefixes never cause a miss. */
export function normalizePhone(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    return digits.slice(-10);
}

/** Append one JSON line per action so every decision is reviewable later. */
export function makeLogger(scriptName) {
    const dir = path.join(ROOT, 'logs');
    fs.mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const file = path.join(dir, `${scriptName}-${stamp}.jsonl`);
    return {
        file,
        write(entry) {
            fs.appendFileSync(file, JSON.stringify({ ts: new Date().toISOString(), ...entry }) + '\n');
        },
    };
}

export function parseArgs(argv, defaults) {
    const args = { ...defaults, apply: false };
    for (const a of argv.slice(2)) {
        if (a === '--apply') args.apply = true;
        else {
            const m = a.match(/^--([a-z-]+)=(.+)$/);
            if (!m) {
                console.error(`Unknown argument: ${a}`);
                process.exit(1);
            }
            const key = m[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            args[key] = /^\d+$/.test(m[2]) ? Number(m[2]) : m[2];
        }
    }
    return args;
}
