# FB Lead - No-Answer Retry — PUBLISHED / LIVE

Workflow `3914c8f3-47b9-46e0-adbf-91d756c9fecf` · location `PLx0none5wN20wsNi0Gz` · folder
"Facebook Ads". Built 2026-07-28, **published on or before 2026-07-30**.

> **Status: PUBLISHED — this workflow is placing real automated calls right now.**
>
> Structure re-verified in the builder 2026-07-30 and it matches this document exactly:
> trigger → If/Else → Mark retried (loop guard) → MISSED alert → Wait 3 min → Retry call.
> Both guard conditions confirmed present on the Retry branch:
> `Tags includes "fb_ads_lead"` **AND** `Tags does not include "retry_attempted"`, joined by
> AND, with the loop-guard tag applied as the branch's **first** action.
>
> Before editing this workflow, re-read the loop-guard section. The retry call is itself an
> outbound call that re-fires this workflow's own trigger; removing or weakening condition 2
> turns this into an infinite calling loop aimed at real people.

## Why it's a separate workflow

Call outcome does not exist as a condition inside a workflow — verified 2026-07-28 by searching
the If/Else field list for `call` and `status` (both "No results found") and by reading all 8
Wait types (none are call-aware). So "did that call connect?" cannot be asked mid-flow.

It *does* exist at the trigger level. That inverts the problem: instead of calling and then
checking whether it worked, this workflow only ever starts **because** a call didn't work.

**A lead who connected with Phillip never enters this workflow at all.** That's what makes
double-calling structurally impossible rather than merely unlikely.

## Structure

```
Trigger: Call details — "Outbound call not answered"
   Call direction is "Outgoing"
   Call status contains any of ["busy", "voicemail", "no-answer"]
      ↓
   If/Else — "FB lead + not already retried?"
      ├── Retry ──→ Mark retried (loop guard)   [adds tag retry_attempted]
      │             → MISSED alert to rep       [internal SMS]
      │             → Wait 3 min
      │             → Retry call                → END
      └── Skip  ──→ END
```

### Trigger filters

`completed` is deliberately **unchecked** — that's the connected case, and it must never enter
here. `canceled` is also left off: it's not a natural outcome of the intake workflow's Call
action (which rings for 60s then gives up), and a cancelled call is usually a deliberate abort
that shouldn't be retried. Add it later if you see real cancellations you'd want chased.

### Branch "Retry" — both conditions must hold

| Condition | Operator | Value |
|---|---|---|
| Tags | Includes | `fb_ads_lead` |
| Tags | Does not include | `retry_attempted` |

**Condition 1 is the scope guard.** Without it this fires on *every* unanswered outbound call
in the account — including Phillip's own manual dials to existing customers. Note this keys on
`fb_ads_lead`, the new evergreen tag, so it covers leads from 2026-07-28 forward. Contacts
still carrying only the old `fb_ads_lead_may_2026` tag will not be retried.

**Condition 2 is the loop guard, and it is the one that matters most.** The retry call is
itself an outbound call. If it goes unanswered it re-fires this very trigger. Without this
condition that is an infinite calling loop. Because `Mark retried (loop guard)` adds
`retry_attempted` as the *first* action, the second pass falls to `Skip` and stops.

**Each lead gets at most one retry, ever** — the tag is never removed. If you later want the
retry to be available again on a future inquiry from the same person, you'd need a Remove Tag
step somewhere in the intake workflow.

### MISSED alert to rep

Internal SMS, To user type **Assigned owners** (the intake workflow assigns Phillip, so it
reaches whoever actually missed it):

```
MISSED FB LEAD - {{contact.first_name}} {{contact.last_name}}
{{contact.phone}}
{{contact.project_type}} | {{contact.budget_range}}
Auto-retry calling you in 3 min. Pick up and press any key to connect.
```

The "press any key" line is there on purpose — the Call action only bridges after a keypress,
which is not obvious to someone answering an unexpected call.

✅ **Carlos added by the user 2026-07-28.** Previously "Assigned owners" resolved to Phillip
only, so Carlos missed these alerts while receiving the intake ones.

Note this changes *notification* only. The retry **Call** still dials the assigned user
(Phillip) — there is no target-number field on the Call action. Carlos being on the alert does
not route the retry call to him.

### Retry call

Whisper `Retry - Facebook lead {{contact.first_name}}`, timeout 60s, Connect-Call-after-Keypress
on, voicemail detection on — matching the intake workflow's Call action. Same dialing
behavior: rings the **assigned user's GHL profile phone**, no target-number field.

---

# Pre-publish review — 2026-07-28

Findings from a second pass, including an API audit of 100 real conversations to see what the
trigger will actually match.

## Confirmed working

**`outbound / no-answer` is a real, occurring status.** Sampled every call message across 100
conversations:

| direction / status | count |
|---|---|
| outbound / completed | 76 |
| inbound / completed | 23 |
| inbound / no-answer | 13 |
| inbound / voicemail | 5 |
| **outbound / no-answer** | **3** |
| inbound / ringing | 1 |

So the trigger will fire. That was the core assumption and it holds.

## Gap 1 — answered-but-no-keypress ✅ FIXED 2026-07-28

The intake Call action bridges **only after Phillip presses a digit**. If he answers, hears the
whisper, and just says "hello" without pressing anything, the call to him is logged
**`completed`** — the lead was never connected, but nothing retries, and no MISSED alert fires.
The lead simply gets nothing after the SMS.

`outbound / completed` is 76 of 79 outbound calls, so this is the dominant outcome path and the
one where a silent failure hides.

**Fix applied:** "Connect Call after Keypress" is now **unchecked on both** Call actions in the
intake workflow (Open branch and Closed branch). Calls now bridge automatically when Phillip
answers. Voicemail detection remains ON on both — that's the protection the keypress setting was
standing in for. Verified after a page reload.

The MISSED alert copy was updated to match (it no longer tells him to press a key):

```
MISSED FB LEAD - {{contact.first_name}} {{contact.last_name}}
{{contact.phone}}
{{contact.project_type}} | {{contact.budget_range}}
Auto-retry in 3 min - just answer and you'll be connected.
```

**Behavior change to be aware of:** Phillip no longer controls whether he takes the lead. If he
answers, he is connected. If he wants the old opt-in behavior back, re-check the box on both
Call actions — but then Gap 1 returns.

## Gap 2 — `busy` and `voicemail` never appear on outbound (no change needed)

Zero occurrences of either across all 100 conversations; `voicemail` shows up only on *inbound*
calls.

**Deliberately left as-is.** The two extra statuses were kept checked — they cost nothing and
cover the case where GHL starts emitting them. There is no edit that would improve this; the
underlying risk (a voicemail-answered call recorded as `completed`) was the Gap 1 problem, and
Gap 1's fix plus the still-enabled voicemail detection is what actually addresses it.

## Gap 3 — manual dials will trigger this workflow ⚠️ NOT cleanly fixable

The 3 existing `outbound / no-answer` records predate any call automation, so they're manual
dials. Meaning: **if Phillip manually calls an `fb_ads_lead` contact and they don't pick up,
this workflow fires and auto-dials him 3 minutes later to connect him to that same person** —
and burns that contact's one-and-only retry.

**I could not fix this properly, and I want to be straight about why rather than ship
complexity that doesn't work.**

GHL gives no way to distinguish a workflow-placed call from a manually dialed one — the trigger
sees only direction and status. The obvious workaround is a `connect_pending` tag written by the
intake workflow just before its Call action and required by the retry's condition. I worked that
through and it buys almost nothing here: **every** `fb_ads_lead` contact has been through the
intake workflow by definition, so they'd all carry the tag anyway, and there's no way to clear
it on a successful call (the workflow can't detect success — that's Gap 1 all over again).

What actually contains it is the guard already in place: `retry_attempted` is permanent, so a
manual dial can cause this **at most once per contact, ever**.

And when it does fire, the behavior is: lead didn't answer Phillip's manual call → 3 minutes
later the system calls Phillip and connects him to that lead. That is the product working as
intended. The only real cost is that it consumes that contact's single retry, so a later
automated miss won't get one.

**My recommendation: publish as-is and accept this.** If it turns out to be a nuisance in
practice, the lever is to stop Phillip manually dialing fresh FB leads and let the automation do
it — which is the point of the build anyway.

## Gap 4 — "Allow multiple opportunities" ✅ FIXED 2026-07-28

Settings → Contact → **Allow multiple opportunities** is currently enabled. It gives a contact
with two opportunities two *concurrent* executions — and both could pass the
`does not include retry_attempted` check before either one writes the tag, producing two
retries. Low probability, but it's the one path that defeats the loop guard.

This workflow is call-triggered and has nothing to do with opportunities, so the setting buys
nothing. **Now turned OFF.** Verified in Settings; "Allow re-entry" left ON (intended — the tag
is the loop guard).

## Settings otherwise reviewed and fine

- **Allow re-entry: ON** — intended. It means the `retry_attempted` tag is the *only* thing
  stopping the loop, so don't remove that condition.
- **Stop on response: OFF** — correct; a lead replying to the SMS shouldn't cancel the callback.
- **Time window: OFF** — fine. The retry only ever starts after a call, and calls are already
  gated to business hours by the intake workflow.
- **From number: unset** — inherits the account default, same as the other live workflows.

---

## Before you publish

Gaps 1, 2 and 4 are closed. Carlos is on the alert. One decision remains:

1. **Gap 3** — accept that manual dials can trigger one auto-retry per contact (recommended), or
   don't publish. There is no middle option in GHL.

Known and accepted, not blockers:

2. **Old tag scope** — the Retry branch keys on `fb_ads_lead`. Contacts carrying only the
   legacy `fb_ads_lead_may_2026` tag are never retried. They're pre-07-28 leads, so this only
   matters if an old lead calls back and is missed. Fixable later by adding an OR condition.

Then:

3. **Test the loop guard deliberately** — submit a test FB lead, let both the original call and
   the retry go unanswered, confirm the contact ends up tagged `retry_attempted` and gets **no
   third call**.
4. **Test the new auto-bridge** — answer the call and say nothing; you should be connected to the
   lead without pressing anything. This is the behavior that changed today.
5. **Check call credits** — every retry is a second billable call, both legs.
6. Flip Draft → Publish.

## Build note

The first assembly put the steps in the wrong order — GHL inserted each new action into the
slot directly below the tag rather than at the end, producing
`Mark retried → Retry call → Wait 3 min → MISSED alert`. That would have called immediately and
then texted "retrying in 3 min" after the retry already happened. Caught on a post-build reload
and rebuilt. **When adding sequential steps in this builder, re-check the plus button's
position each time — the canvas re-lays out after every insert and the refs shift.**
