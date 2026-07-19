# IVR Spam Gate — GHL UI Runbook

> **AS BUILT (2026-07-15):** this workflow now exists in the sub-account as
> **"IVR Spam Gate — Main Line"** (workflow id `94e07140-8263-4991-af21-8275c039b7e9`),
> built via browser automation and left in **Draft**. Structure: Start IVR trigger
> (number +1 361-316-5251) → Gather Input (greeting below, 10 s timeout, 1 digit,
> 1 loop) → "Pressed 1" branch → Connect Call (+1 760-670-5799, the number's existing
> forwarding target) → End; "None" branch → Say/Play (voicemail preamble) → Record
> Voicemail (beep on, stop after 5 s silence, 300 s max) → End.
> Two UI notes vs. the steps below: the voicemail preamble is a separate
> **Say or Play Message** action before Record Voicemail (the voicemail action has no
> text field), and explicit End Call nodes aren't needed — branches end at END.
> **Remaining:** flip Draft → Publish during business hours and run the three test
> calls in the cut-over section.

**Why this is a runbook and not a script:** the GHL public API v2 exposes exactly one
workflow endpoint — `GET /workflows/` (list). There is no create/update endpoint and no
IVR action API (verified against the official OpenAPI specs, July 2026). IVR workflows
can only be built in the GHL UI. Budget ~15 minutes.

**What it does:** every inbound call hears a short greeting and must **press 1** to ring
the team. Robocallers don't press buttons, so they fall through to voicemail without
ringing anyone. Expect this to kill the large majority of the "Google Business listing"
robocalls on day one.

---

## Prerequisites

- LC Phone number active on the sub-account (it is — that's the number being spammed).
- IVR actions are **Workflow Premium Actions**: they must be enabled at the agency level
  (Agency Settings → Company → Enable Premium Actions) and carry a tiny per-execution
  fee (fractions of a cent — irrelevant at 20 calls/day).
- A phone number can be attached to **only one** IVR workflow at a time.

## Build steps

1. In the sub-account: **Automation → Workflows → + Create Workflow → Start from Scratch**.
   (There is also an IVR **recipe** under "Select a Recipe" you can start from, but
   building from scratch takes the same time and you'll understand every branch.)

2. Name it `IVR Spam Gate — Main Line`. **Leave it in Draft** — nothing goes live until
   you hit Publish at the very end, after review.

3. **Trigger:** click **+ Add New Trigger → "Start IVR"** (under the IVR/phone group).
   - **Phone Number:** select the main LC Phone number.
   - Save the trigger. ⚠️ This does **not** intercept calls until the workflow is
     *published*, so the draft is safe to build.

4. **Action 1 — "IVR Gather Input on Call"** (this both plays the greeting and listens):
   - **Message (Text-to-Speech)** — paste:
     > "Thanks for calling Coast to Coast Landscape and Design, Corpus Christi's
     > outdoor living specialists. To speak with our team, press 1.
     > To leave a message, stay on the line."
     (Or upload a recorded .wav of the same script — sounds warmer for a high-ticket brand.)
   - **Stop Gathering After (Digits):** `1`
   - **Stop Gathering After (Seconds):** `10`
   - **Number of loops / retries:** `1` (one replay is plenty; robots still won't press).

5. **Action 2 — "If/Else" (or the Gather action's Match Conditions toggle,
   depending on which UI version you see):**
   - **Branch "Pressed 1":** condition — gathered input **equals `1`**.
   - **"None" branch:** catches timeout AND any other key (invalid input). Do not add
     separate branches per wrong digit; the None branch is the catch-all.

6. **"Pressed 1" branch → Action: "IVR Connect Call"**
   - Connect to: the team's forwarding number(s) or GHL user(s) — use whatever the
     number's current forwarding target is today (check Settings → Phone Numbers →
     the main number → Call Forwarding, and replicate it here).
   - Optional "connecting you now…" whisper message for the caller.

7. **"None" branch → Action: "IVR Record Voicemail"**
   - Preamble (Text-to-Speech):
     > "Please leave your name, number, and a few details about your project,
     > and we'll call you back within one business day."
   - Leave silence-detection defaults. Recordings land in the **Conversations** tab
     on the contact, so voicemails are never lost.

8. **After both branches → Action: "End Call"** (add it on each branch if the editor
   doesn't do it automatically).

9. **Do not publish yet.** Review the canvas: Start IVR → Gather (10 s, 1 digit) →
   press-1 → Connect Call; None → Voicemail → End Call.

## Cut-over (do this during business hours so you can watch the first calls)

1. Check **Settings → Phone Numbers → [main number]** and note the existing
   call-forwarding config — the IVR's Connect Call step must point at the same
   destination. **Do not change anything on the number itself**; attaching the IVR is
   done purely by the workflow trigger.
2. Flip the workflow from **Draft → Publish**.
3. **Test immediately** from a cell phone:
   - Call, press 1 → team phone rings.
   - Call, press nothing for 10 s → voicemail prompt plays, recording appears in Conversations.
   - Call, press 7 → falls to the None branch → voicemail.
4. If anything is wrong, **Unpublish** (back to Draft) — calls instantly revert to the
   number's normal forwarding behavior.

## Known quirk — "ghost notifications"

LeadConnector fires its **new-lead / missed-call push notification before workflows
run**. The owner's phone may still ping for a spam call even though the IVR filtered
it and nobody's phone actually rang. This is a platform behavior, not a broken IVR —
the inbox and contact list stay clean; only the push notification leaks through.
Expect these to drop sharply anyway once repeat spam numbers are DND'd by the
blacklist script (blocked callers stop generating events).

## Rollback

Unpublish the workflow. That's it — the number reverts to its standard call flow.
