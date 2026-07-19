---
name: spam-scan
description: Run the GHL spam-call blacklist in dry-run mode, summarize what would be flagged, and apply only after explicit approval. Use when the user types /spam-scan or asks to check/scan for new spam callers.
---

# Spam scan (GHL blacklist dry-run)

Run the dry-run and report — never apply without the user saying so in this conversation.

1. Run: `node ghl-spam-defense/blacklist.js`
   (Credentials come from `ghl-spam-defense/.env`. If they're missing, point the user
   at ghl-spam-defense/README.md setup — do not hunt for tokens elsewhere.)

2. Summarize the output for review:
   - How many contacts would be flagged, and why (seed match vs. call-pattern).
   - Call out any **local (361) numbers** or ⚠️ seed-but-protected warnings for a
     closer look — those are the ones a human should eyeball before applying.
   - Point to the decision log path (`ghl-spam-defense/logs/blacklist-*.jsonl`).

3. Stop and wait. If the user approves (e.g. says "apply" / "--apply"):
   - Run `node ghl-spam-defense/blacklist.js --apply`
   - Verify one flagged contact via read-back (tags include `spam`, dndSettings
     Call+SMS active) — GHL has a history of silently ignoring writes.
   - Then offer inbox cleanup: `node ghl-spam-defense/inbox-hygiene.js` (dry-run
     first, `--apply` on approval).

Rules: nothing is ever deleted; never touch workflows/pipelines; when unsure whether
a contact is spam, don't flag — false positives are unacceptable, false negatives are
fine. New spam numbers the user mentions go into `ghl-spam-defense/spam-seeds.txt`
(any format, one per line).
