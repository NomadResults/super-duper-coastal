# GHL Spam-Call Defense — Coast to Coast Landscape & Design

Defends the LC Phone main line against the daily "Google Business listing" robocall
wave before the Meta ads launch. Three layers:

| Layer | What | How it's built | Status |
|---|---|---|---|
| 1. IVR spam gate | "Press 1 to reach the team" — robots don't press buttons | **UI only** — follow [ivr-runbook.md](./ivr-runbook.md) | Runbook ready |
| 2. Auto-blacklist | Tags + DNDs repeat spam callers | `blacklist.js` (API) | Ready, needs token |
| 3. Inbox hygiene | Marks spam call conversations read | `inbox-hygiene.js` (API) | Ready, needs token |

## What's possible via API vs. UI-only (verified, not assumed)

Checked against GHL's official OpenAPI specs (`github.com/GoHighLevel/highlevel-api-docs`)
and the live docs, July 2026:

- **Workflows: read-only.** The only public endpoint is `GET /workflows/` (list).
  Workflow/IVR creation, editing, and publishing are **UI-only** → hence the runbook.
- **IVR blocks: no API at all.** IVR is a set of premium workflow actions
  (Start IVR trigger; Gather Input, Say/Play, Connect Call, Record Voicemail, End Call).
- **Contacts: full API.** DND per channel (`dndSettings.Call/SMS/...`), tags, notes —
  this is why the blacklist layer is a script.
- **Conversations: full read + limited write.** Search (filterable to `TYPE_CALL`,
  inbound), per-message call metadata (`meta.callDuration`, `meta.callStatus`), and
  update of `unreadCount`/`starred`. **No archive concept** in the API; delete exists
  but these scripts never delete anything.
- **Official GHL MCP server** (`https://services.leadconnectorhq.com/mcp/`): covers
  contacts/conversations/opportunities etc. via generic operation tools — fine for
  conversational lookups, but it adds nothing over direct API for this pipeline and
  also cannot create workflows. Optional; setup below.

## Setup (one-time, ~5 min)

The website's `GHL_API_KEY` in Vercel is marked *sensitive* and cannot be pulled
locally, so these scripts need their own token:

1. In the **sub-account** (not agency): **Settings → Private Integrations →
   Create New Integration**. Name it `Spam Defense Scripts`.
2. Grant only these scopes:
   - `contacts.readonly`, `contacts.write` (tag + DND)
   - `conversations.readonly`, `conversations/message.readonly` (call history)
   - `conversations.write` (inbox hygiene mark-as-read)
   - *(no workflow scope exists to grant; nothing here can touch automations)*
3. Copy the `pit-…` token. `cp ghl-spam-defense/.env.example ghl-spam-defense/.env`
   and fill in `GHL_PIT_TOKEN` and `GHL_LOCATION_ID` (Settings → Business Profile).
   `.env` and `logs/` are gitignored — the token never reaches git or Vercel.

### Optional: register the GHL MCP server for Claude Code

```bash
claude mcp add ghl --transport http https://services.leadconnectorhq.com/mcp/anthropic/v2 \
  --header "Authorization: Bearer pit-YOUR-TOKEN" \
  --header "locationId: YOUR_LOCATION_ID"
```

Useful for ad-hoc "look up this contact" queries in future sessions; not required to
run anything in this folder.

## Running the blacklist

Shortcuts: `npm run spam:scan` (dry run), `npm run spam:apply`, `npm run inbox:clean`
(hygiene dry run — add `-- --apply` to apply). In Claude Code, `/spam-scan` runs the
dry run and summarizes the log for review.

```bash
node ghl-spam-defense/blacklist.js            # DRY RUN — prints + logs, changes nothing
# review logs/blacklist-<timestamp>.jsonl, then:
node ghl-spam-defense/blacklist.js --contact=<id> --apply   # test on one contact
node ghl-spam-defense/blacklist.js --apply    # apply to everything flagged
```

A contact is flagged only if **(a)** its number is in [spam-seeds.txt](./spam-seeds.txt),
or **(b)** it has no name, no email, no lead/customer-ish tag, **and** ≥3 inbound calls
in the window, every one ≤20 s (tunable: `--days --min-calls --max-duration`). Unknown
call duration disqualifies — when unsure, we don't flag. A protective signal (real name,
email, `*lead*`/`*customer*`/etc. tag) always wins, even over the seed list — those get a
⚠️ warning for manual review instead. Applying adds the `spam` tag and turns on DND for
**Call + SMS only** (email untouched). Every decision, including skips, is one JSON line
in `logs/`.

**Undo for a false positive:** contact record → remove `spam` tag → toggle DND off.
Two clicks, nothing is deleted.

## Running inbox hygiene (after 1 and 2 are live)

```bash
node ghl-spam-defense/inbox-hygiene.js          # DRY RUN
node ghl-spam-defense/inbox-hygiene.js --apply  # mark spam-tagged call convos read
```

Only touches conversations whose contact already carries the `spam` tag, and only sets
unread → read. Never deletes, never archives (the API has no archive).

## Maintaining the seed list

Append new robocall numbers to `spam-seeds.txt` (any format; matched on last 10 digits)
whenever one slips through, then re-run the blacklist. Suggested cadence: run the
dry-run weekly, `--apply` after a 30-second skim of the log.

## Guardrails baked in

- **Dry-run by default everywhere**; `--apply` is always explicit.
- **Read-only on everything except**: contact tags, contact Call/SMS DND, conversation
  unread flag. No workflow, pipeline, opportunity, or number config is ever written.
- **Nothing is deleted, ever.**
- **False-positive bias:** every ambiguous case is skipped and logged, not flagged.

## Known platform quirk (tell the client)

LeadConnector sends new-lead/missed-call **push notifications before workflows run**,
so a filtered spam call can still ping the owner's phone once even though the IVR
caught it and the inbox stays clean. Ghost pings ≠ broken filter. They fade as repeat
offenders get DND'd (blocked callers stop generating events).
