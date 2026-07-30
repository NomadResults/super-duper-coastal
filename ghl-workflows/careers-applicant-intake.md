# Careers — Applicant Intake (PUBLISHED / LIVE)

> **Status: PUBLISHED and tested end-to-end 2026-07-30.** Workflow id
> `4ea10c58-1e8a-430c-81e5-3c8eea27a75b`. This is a record of what exists and what was
> verified, not a plan.

**Live structure** (re-read from the builder after a full reload):

```
Opportunity Created  [filter: In pipeline is "Hiring"]
  └─ Applicant Confirmation Email        (to the applicant)
     └─ Notify Hiring Manager            (internal EMAIL → Assigned owners)
        └─ Text Hiring Manager           (internal SMS  → Assigned owners)
           └─ SMS Consent?               (If/Else on tag "sms consent")
              ├─ Consented  → Applicant Confirmation SMS
              └─ None       → end
```

Both internal notifications sit on the **trunk**, above the If/Else, so the hiring manager
hears about *every* applicant regardless of whether they opted into SMS. During the build the
email notification first landed *inside* the Consented branch — re-check trunk placement after
any future edit.

## Verified by live test 2026-07-30

Two real submissions through production, records deleted afterwards.

| Check | Result |
|---|---|
| Workflow fires on submission | ✅ all steps `Executed` |
| Applicant email merge tags | ✅ `first_name`, `applicant_position`, `applicant_experience`, `applicant_availability` all rendered |
| Consented applicant → SMS | ✅ sent |
| **Non-consented applicant → NO SMS** | ✅ took the `None` branch, email only |
| Internal email + SMS to hiring manager | ✅ both `Executed` on both runs |

**Not verified:** the rendered *content* of the two internal messages. They go to the hiring
manager's inbox and phone, which the execution log doesn't expose. The 8 tags unique to those
messages (`last_name`, `phone`, `email`, `applicant_drivers_license`,
`applicant_transportation`, `applicant_work_authorization`, `applicant_resume_link`,
`applicant_about`) are still unconfirmed — ask her to eyeball one.

## ⚠️ Two saves, and the action-level one is a lie

"Save action" only commits to the local canvas. The header **"Save workflow"** button is what
persists. Navigate away with only the action saved and the step is **silently discarded** —
the canvas keeps showing it right up until you reload.

This cost a full test cycle here: `Text Hiring Manager` looked present, then simply wasn't in
the executed run. After any edit, reload the page, re-read the tree, and confirm the header
button reads "Saved" (disabled) rather than "Save".

Location `PLx0none5wN20wsNi0Gz` · Hiring pipeline `wy3QYFAE7xl12zv9pac0`
Builder URL pattern: `/v2/location/<loc>/automation/workflow/<id>` — **`workflow` singular**.
The plural `/automation/workflows/<id>` renders a blank page.

Suggested workflow name: **Careers — Applicant Intake**
Suggested folder: create **Hiring** (no hiring folder exists yet).

---

## Why the trigger is Opportunity Created, not a tag

Use **Opportunity Created**, filtered to the Hiring pipeline. Do **not** trigger on
Contact Created or on the `careers applicant` tag.

- **Contact Created** misses every repeat applicant and anyone already in the CRM as a
  lead or customer. This exact trigger already cost you notifications on the website
  sales form — same trap.
- **Tag added** is closer, but tags are applied in a separate API call that can fail
  independently. The opportunity is the one record created on *every* single submission.

`api/apply.js` creates exactly one opportunity per submission, so this fires once per
applicant, every time.

**Trigger config**

| Setting | Value |
|---|---|
| Trigger | Opportunity Created |
| Filter → Pipeline | Hiring |
| Filter → Stage | New Applicant |

---

## Assignment is already handled — don't add an Assign step

`api/apply.js` sets `assignedTo` on both the contact and the opportunity to
**Caressa Elbert** (`tH7GJTcsclCRSaMdhbWg`) at submission time.

This matters more than it looks: Caressa's GHL permissions have
**`assignedDataOnly: true`**. She cannot see a contact or opportunity that isn't assigned
to her. If assignment ever regresses, she gets notification emails about applicants whose
records she can't open.

One deliberate exception in the code: if a contact is *already assigned to someone else*
(an existing sales lead), that assignment is left alone and only the opportunity is
assigned to Caressa. This avoids stealing a live sales relationship. The tradeoff is that
those rare applicants reach her through the pipeline rather than her contact list.

---

## Merge tags

Created via API on 2026-07-29. All `TEXT` except About (`LARGE_TEXT`).

| Field | Merge tag | Field id |
|---|---|---|
| Applicant Position | `{{contact.applicant_position}}` | `OXCyjb9T6dFAc8YWRjP7` |
| Applicant Experience | `{{contact.applicant_experience}}` | `AiJyByb358B2nZ3c5hSq` |
| Applicant Availability | `{{contact.applicant_availability}}` | `p9t7bbt9wdYWscU5Ck2S` |
| Applicant Drivers License | `{{contact.applicant_drivers_license}}` | `59uaJrcRlUi3QQhDPHbr` |
| Applicant Transportation | `{{contact.applicant_transportation}}` | `sEoNCK9qMEftRnubZfkp` |
| Applicant Work Authorization | `{{contact.applicant_work_authorization}}` | `MAwoKXnAoqCGmEyJ3dxj` |
| Applicant Resume Link | `{{contact.applicant_resume_link}}` | `izQQOEYifTAmauKtqXvO` |
| Applicant About | `{{contact.applicant_about}}` | `2fQdg0Sb9pZP6Lh8g2fd` |

⚠️ **Verify each one in the builder's variable picker before publishing.** These keys are
derived from what the API returned, not yet read back out of the builder. The FB Lead
workflow had several merge tags that looked right and rendered blank.

Named `Applicant *` specifically to avoid colliding with the sales lookalikes
(`Project Notes`, `Your Message`, `Budget Range`) that already caused problems.

---

## Step 1 — Email to the applicant (trunk, time-neutral)

Sits above any business-hours branch so every applicant gets it once, worded correctly
whether it lands at 2 PM Tuesday or 11 PM Saturday.

**Subject**

```
We got your application — Coast to Coast Landscape & Design
```

**Body**

```
Hi {{contact.first_name}},

Thanks for applying to Coast to Coast Landscape & Design. We received your
application for {{contact.applicant_position}}.

Here's what you sent us:

Position: {{contact.applicant_position}}
Experience: {{contact.applicant_experience}}
Availability: {{contact.applicant_availability}}

We review every application. If it looks like a fit, someone from our team
will reach out to set up a time to talk.

If you have questions in the meantime, just reply to this email.

— Coast to Coast Landscape & Design
Corpus Christi, TX
```

Do not promise a response time here until you've agreed one internally. A missed
"we'll call within 24 hours" is worse than no promise — that's the mistake the FB intake
workflow had to walk back.

---

## Step 2 — If/Else on SMS consent

**Condition:** Contact **has tag** `sms consent`

The careers form only applies that tag when the applicant ticks the consent box, so this
branch is the compliance boundary. Everyone else stops after the email — that's fine and
intended.

### YES branch → SMS to applicant

Plain ASCII only (no em dashes, no curly quotes) so it stays GSM-7 and doesn't bill as
two segments.

```
Hi {{contact.first_name}}, this is Coast to Coast Landscape & Design. We got your application and someone from our team will be in touch soon. Reply STOP to opt out.
```

Time-neutral on purpose — same reasoning as the email. If you'd rather it never send
overnight, add a **Time Window** on this branch only (weekdays 9am-6pm CT, matching the
call gate in [call-connect-runbook.md](call-connect-runbook.md)) rather than gating the
whole workflow. **Not currently added** — the SMS can fire at 2am today.

The position merge tag was dropped from this message on purpose. It kept the SMS inside one
GSM-7 segment, and it means the copy still reads correctly if `applicant_position` is ever
blank — which happens whenever someone is added to the Hiring pipeline by hand rather than
through the careers form.

---

## Step 3 — Internal notification to Caressa

Add on the **trunk**, after the If/Else rejoins — she needs to know about every applicant,
consent or not.

Prefer **Internal Notification → Assigned User** over a hardcoded address, so it follows
the assignment rather than drifting when staffing changes. Her details, if you need to set
it explicitly: `Caressa.elbert@gmail.com` / `+1 760-715-3638`.

**Subject**

```
New Applicant — {{contact.first_name}} {{contact.last_name}} · {{contact.applicant_position}}
```

**Body**

```
New application from the careers page.

Name: {{contact.first_name}} {{contact.last_name}}
Phone: {{contact.phone}}
Email: {{contact.email}}

Position: {{contact.applicant_position}}
Experience: {{contact.applicant_experience}}
Availability: {{contact.applicant_availability}}
Drivers license: {{contact.applicant_drivers_license}}
Reliable transportation: {{contact.applicant_transportation}}
Authorized to work in US: {{contact.applicant_work_authorization}}
Resume / portfolio: {{contact.applicant_resume_link}}

In their words:
{{contact.applicant_about}}

They are in the Hiring pipeline under New Applicant, assigned to you.
```

### Optional: internal SMS

Worth it only if applicants are going cold waiting on email. Trades hiring moves fast and
good crew take the first offer, so this is probably justified:

```
New applicant: {{contact.first_name}} {{contact.last_name}} for {{contact.applicant_position}}. Phone {{contact.phone}}. In your Hiring pipeline now.
```

Note her number is a **760 area code (California)**, not local 361. Texts from the Corpus
Christi business line will still reach her, but confirm she actually reads SMS at that
number before relying on it as the fast path.

---

## Workflow settings

| Setting | Value | Why |
|---|---|---|
| Allow Multiple Opportunities | **Off** | A re-applicant shouldn't retrigger the whole sequence. `api/apply.js` updates their existing opportunity rather than creating a second one, so this stays consistent. |
| Stop on Response | Off | This is a short one-shot sequence, not a drip. |
| Time Window | Off at workflow level | Gate the SMS branch only, if at all — see Step 2. |

---

## Test before publishing

1. Submit a real application through `/careers` with a **throwaway email you control** and
   the SMS box **ticked**.
2. Confirm: applicant email arrives, SMS arrives, Caressa's notification arrives, and the
   opportunity lands in Hiring → New Applicant assigned to her.
3. **Read every merge tag in the delivered messages.** A blank line means the tag is wrong
   — fix it against the table above before publishing.
4. Submit again with the SMS box **unticked** and confirm no SMS goes out. This is the
   compliance check; don't skip it.
5. Delete the test contact and opportunity afterward.

Then publish. A draft workflow does nothing at all — if this one stays in draft, applicants
keep getting exactly the silence it was built to fix.
