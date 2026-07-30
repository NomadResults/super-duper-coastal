# FB Lead Intake — speed-to-lead build: APPLIED

Workflow **FB Lead Form - New Lead Intake** (`ca6bb79a-c11d-4cd1-bdd4-ee4a86f1de59`), location
`PLx0none5wN20wsNi0Gz`, status **Published**. Built live in the builder 2026-07-28.

Builder URL: `/v2/location/<loc>/automation/workflow/<id>` — **`workflow` singular**. The plural
form renders a blank page. Reach it via Workflows list → folder → workflow link.

## Live structure

```
Facebook Lead Form Submitted (Page "Coast2coastld", Form "C2C Hardscape Form - v2")
  → Meta Conversion API
  → Create Opportunity          (Facebook Ads Pipeline / New FB Lead)
  → Add Tag                     (fb_ads_lead)
  → Assign to user              (Phillip Elbert)
  → Internal Email Notification
  → Internal SMS Notification   (Carlos + Phillip)
  → Customer SMS
  → Customer Email
  → Business hours open?        ← NEW If/Else
       ├── Open   → Call → END
       └── Closed → Wait until we open → Call → END
```

## The gate

**If/Else "Business hours open?"**, built from GHL's **Availability** scenario recipe. Branch
`Open` requires all three:

| Condition | Value |
|---|---|
| Current hour | Is on or after `09:00 AM` |
| Current hour | Is before `06:00 PM` |
| Current Day of week | Is `Weekday` |

Anything else falls to the `Closed` branch. `Weekday` is a first-class option in the day-of-week
value list, so no Monday-through-Friday range hack was needed.

**Wait "Until we open"** (Closed branch only) — wait type *Until a recurring window opens*:
Weekly, **Mon–Fri**, **09:00:00 AM**, timezone shown as **US/Central**. Its own preview listed
the next five recurrences as consecutive weekday 9:00 AMs, which is the behavior we want.

Note this Wait always holds until the *next* 9 AM occurrence — it does not pass through when
already inside business hours. That's exactly why the If/Else is needed and why the Wait lives
only on the Closed branch.

## The Call action

The Open-branch Call is the pre-existing one. The Closed-branch Call is new and configured
identically:

| Setting | Value |
|---|---|
| Call whisper | `New Facebook Lead from {{contact.first_name}}` |
| Call timeout | `60` seconds |
| Disable voicemail detect | unchecked (detection **on**) |
| Connect Call after Keypress | **checked** |

**How it dials** (from the action's own description): if the contact is assigned to a user it
calls **that user**; if unassigned it calls Settings → Company tab → Company Phone. The rep
hears the whisper and must **press any digit** to be bridged to the lead.

Consequences worth keeping in mind:

1. **There is no "number to dial" field.** It rings whatever phone is on Phillip's GHL user
   profile, because Assign-to-user points at him. Verified as +1 760-670-5799 on 2026-07-24.
   **If anyone edits his profile phone, the speed-to-lead call silently follows it.**
2. **No keypress means no connection.** A rep who answers and just says "hello" never gets
   bridged.
3. **Check Settings → Company Phone** — that's the fallback if the assign step ever fails.

## Copy applied

All five copy fixes are live. See [fb-lead-intake-copy-fixes.md](fb-lead-intake-copy-fixes.md)
for the exact before/after and the verified merge tags.

The Customer SMS was written **time-neutral** on purpose:

```
Hi {{contact.first_name}}, this is Phillip at Coast to Coast Landscape & Design. I got your {{contact.project_type}} request and will call you shortly (weekdays 9am-6pm CT). Reply STOP to opt out.
```

It fires on the trunk, above the If/Else, so it reaches every lead once and reads correctly
whether the call happens in ten seconds or at 9 AM Monday. That replaced the old promise of
contact "within 5 minutes of business hours", which the workflow never honored.

**If you'd rather have two distinct messages** (in-hours "calling you now" vs. after-hours
"we're closed, calling at 9 AM"), that means moving the Customer SMS off the trunk and
duplicating it into both branches. One extra node, ~10 minutes. Say the word.

## ⚠️ "Save action" is not enough — you must also hit **Save** (top right)

This nearly cost the whole build. Clicking **Save action** in a step's panel only commits that
step into the builder's in-memory model. The workflow itself stays dirty — the top-right
**Save** button shows a **red dot** until you click it. Everything above was saved per-action
*and* re-read correctly from the open builder, yet none of it was persisted until the
top-level Save was clicked (button then reads "Saved", dot clears).

Verified by hard-reloading the builder afterward: all branches, the Wait, and both Calls came
back from the server.

**If you edit anything in this workflow: click each panel's Save action, then the top-right
Save, then confirm the dot is gone.** A closed tab before that final Save silently loses
everything.

---

## The no-answer retry — BUILT 2026-07-28, in Draft

It now lives in its own workflow: **FB Lead - No-Answer Retry**
(`3914c8f3-47b9-46e0-adbf-91d756c9fecf`), left in **Draft** pending your review. See
[no-answer-retry-workflow.md](no-answer-retry-workflow.md) for the build and the pre-publish
checklist. The analysis below explains why it had to be a separate workflow.

## Why it can't live in this workflow

Searched the builder directly on 2026-07-28:

- **If/Else conditions:** searching the condition field list for `call` → **"No results
  found"**. Same for `status`. There is no call-outcome condition, full stop.
- **Wait types (all 8):** For a set period · Until a specific date/time · Until a recurring
  window opens · Until a scheduled date/time · Until the contact replies · Until a user
  replies · Until the contact takes a specific action · Until specific conditions are met.
  None are call-aware. "Until the contact takes a specific action" offers only *clicks a
  trigger link* and *email event*.

So there is genuinely no way to ask "did that call connect?" mid-workflow. A retry chained
after the Call action would fire on **everyone**, including leads who just finished talking to
Phillip — exactly the double-call you're asking about.

### Where call status *does* exist: the trigger

There's a **"Call details"** trigger — *"Fires after a call ends with the selected status"* —
with an **Add filters** option. Your existing `Missed Call Text Back` workflow already uses
this trigger (named "Call Status" there) with **Call Direction = Incoming** plus **Call Status
contains any of `["busy", "canceled", "voicemail", "no-answer"]`**.

**How to see the available filter values yourself:** Workflows list → search "Missed Call" →
open `Missed Call Text Back` → click the purple trigger node at the top → the right panel shows
a **Filters** section with **Call direction** and **Call status** → click the value next to
*Call direction* to drop the list open. **Cancel out — never Save** — that workflow is live.
Doing it there rather than on a new trigger means you're reading a known-good configuration
instead of guessing at an empty one.

So the retry belongs in a **separate workflow**, not this one:

```
Trigger: Call details
  Filters: Direction = Outgoing, Status = no-answer / busy / voicemail
           + scope filter (see below)
    → Internal SMS to Carlos + Phillip: "MISSED — {{contact.first_name}}, {{contact.phone}}"
    → Wait 3 min
    → Call  (retry)
```

**The double-call problem solves itself here**: a call that *connected* never fires this
trigger, so a lead who already spoke to Phillip is never re-dialed. The branching happens at
the trigger, where call status actually exists.

### Three things to get right before building it

1. ~~Confirm "Outgoing" is an option on the Direction filter.~~ **CONFIRMED 2026-07-28.** The
   Call direction filter is a two-option list: **`Incoming`** and **`Outgoing`**. Read directly
   from the `Missed Call Text Back` trigger panel (opened read-only, cancelled without saving;
   that workflow is unchanged and still Published). The design is viable.
2. **Scope it, or it fires on every unanswered outbound call in the account** — including
   Phillip's own manual dials to existing customers. Add a filter requiring the contact to
   carry `fb_ads_lead`, or restrict by pipeline.
3. **Guard against an infinite retry loop.** The retry call is itself an outbound call — if it
   goes unanswered it re-fires the same trigger, forever. Add a tag (e.g. `retry_attempted`) as
   the first step and filter the trigger to exclude contacts who already have it, so each lead
   can only ever be retried once.

Until that's built, the current behavior is: one call attempt per lead, voicemail detection on,
60s timeout — so an unanswered call fails cleanly rather than whispering into a voicemail box.
No one gets called twice.

## Collision audit — still valid

- `Missed Call Text Back` triggers on Call Direction = **Incoming**, so an unanswered
  *outbound* connect cannot trip it.
- `Form Submission -> Confirmation` keys off Form = "Website Form" + Pipeline Stage Changed in
  **Website Leads Pipeline**; this workflow writes to **Facebook Ads Pipeline** / "New FB Lead"
  with duplicate opportunities disabled.
- `FB Message Received` and `Chat Widget Lead In` key off reply channel, not this trigger.

## To verify

1. **Timezone of "Current hour".** The Wait step explicitly displays US/Central; the If/Else
   hour conditions don't show a timezone in the UI. They should follow the sub-account's
   timezone (Corpus Christi = Central), but confirm with a live after-hours test before
   trusting it fully.
2. **Call credits.** Call Connect bills per minute for *both* legs; a 5-minute connect is ~10
   billable minutes. This was already live before today, so it's already being consumed.
3. **Test both paths** — submit the real FB form during business hours, then again after 6 PM
   or on a weekend, and confirm the call fires immediately vs. holds to 9 AM.
