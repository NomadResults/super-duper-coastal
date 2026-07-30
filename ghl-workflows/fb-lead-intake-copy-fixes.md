# FB Lead Form — New Lead Intake: copy fixes (ALL APPLIED 2026-07-28)

> **Status: applied live and verified.** Every change below was saved into the published
> workflow on 2026-07-28. This document is now the record of what changed, not a to-do list.


Workflow `ca6bb79a-c11d-4cd1-bdd4-ee4a86f1de59` · location `PLx0none5wN20wsNi0Gz` · folder "Facebook Ads"
Status: **Published**. Read live in the builder 2026-07-28.

Builder URL that actually works: `/v2/location/<loc>/automation/workflow/<id>` — note
**`workflow` singular**. The plural `/automation/workflows/<id>` renders a blank page.

## Business name

It's **Coast to Coast Landscape & Design** (sub-account: "Coast to Coast Landscape & Design,
LLC"). Existing copy uses that. Don't write "Hardscape" — the FB form is named "C2C Hardscape
Form - v2", which is where that mistake comes from.

## Merge tags — all verified 2026-07-28 via the builder's variable picker

Inserted each into a draft and read the emitted token, then discarded. These are exact:

| Field | On FB leads | Merge tag |
|---|---|---|
| Project Type | populated | `{{contact.project_type}}` ✅ |
| Project Goal | populated | `{{contact.project_goal}}` ✅ |
| Budget Range | populated | `{{contact.budget_range}}` ✅ |
| Start Timeline | populated | `{{contact.start_timeline}}` ✅ |
| Space Size | populated | `{{contact.space_size}}` ✅ |
| Property Address / ZIP | **always blank** | — |
| project location | **always blank** | delete `{{contact.project_location}}` |
| Project Notes | **always blank** | delete `{{contact.project_notes}}` |

These can now be typed directly — no picker needed. The account's full custom-field list
(14 fields, confirmed): Budget Range, Estimated Budget, Project Goal, project location,
Project Message, Project Notes, Project Type, Property Address / ZIP, Rate Us, Short message
about your needs, Space Size, Start Timeline, Your Feedback, Your Message. Note the
lookalikes — **Estimated Budget** is the *website* form's field and is blank on FB leads;
**Budget Range** is the FB one.

---

## 1. Add Tag step

Change `fb_ads_lead_may_2026` → `fb_ads_lead`

The month is hardcoded, so every lead since May is mislabeled. This only affects **new**
leads; contacts already tagged `fb_ads_lead_may_2026` keep that tag. To unify history,
bulk-add `fb_ads_lead` to that smart list afterward.

## 2. Internal Email (to Phillip)

**Subject**

```
New FB Lead — {{contact.first_name}} {{contact.last_name}} · {{contact.project_type}}
```

**Body**

```
{{contact.first_name}} {{contact.last_name}}
{{contact.phone}} · {{contact.email}}

Project type: {{contact.project_type}}
Space size: {{contact.space_size}}
Budget: {{contact.budget_range}}
Timeline: {{contact.start_timeline}}
Goal: {{contact.project_goal}}

Source: Facebook Lead Form — C2C Hardscape Form v2
```

Removes the two blank lines; adds Space Size, the best qualifier the form collects and
currently absent from every notification.

## 3. Internal SMS (to Carlos + Phillip)

```
NEW FB LEAD — {{contact.first_name}} {{contact.last_name}}
{{contact.phone}}
{{contact.project_type}} · {{contact.space_size}} · {{contact.budget_range}} · {{contact.start_timeline}}
```

Phone on its own line keeps it tap-to-call.

## 4. Customer SMS

**Current (211 chars, verified live):**

```
Hey {{contact.name}}, Thanks for reaching out to Coast to Coast Landscape & Design. We received your request and Phillip will review your details and contact you within 5 minutes of business hours.Talk Soon!
```

**Applied (196 chars):**

```
Hi {{contact.first_name}}, this is Phillip at Coast to Coast Landscape & Design. I got your {{contact.project_type}} request and will call you shortly (weekdays 9am-6pm CT). Reply STOP to opt out.
```

Fixes: `{{contact.name}}` (full name) → first name; missing space in "hours.Talk"; drops
"will review your details" for a concrete next step.

Written **time-neutral** on purpose. It sits on the trunk above the business-hours If/Else, so
it reaches every lead once and reads correctly whether the call lands in ten seconds or at
9 AM Monday. The old "within 5 minutes of business hours" was a promise the workflow never
honored — see the [Call Connect runbook](call-connect-runbook.md) for the gate that now backs
this wording up. Kept to plain ASCII (no em dashes) so it stays GSM-7 and doesn't double the
segment count.

## 5. Customer Email

**Subject**

```
We got your request — Coast to Coast Landscape & Design
```

**Body**

```
Hi {{contact.first_name}},

Thanks for reaching out about your {{contact.project_type}} project. Here's what you sent over:

Project type: {{contact.project_type}}
Space size: {{contact.space_size}}
Budget: {{contact.budget_range}}
Timeline: {{contact.start_timeline}}
Goal: {{contact.project_goal}}

I'll call you shortly to talk it through and get you a quote.

— Phillip Elbert
Coast to Coast Landscape & Design
```

Fixes: `Hi{{contact.name}},` (missing space, full name) → `Hi {{contact.first_name}},`; "Phil"
→ "Phillip" to match the SMS; removes the two blank merge lines.

---

## Two extras found and fixed while editing

- The internal email body contained a literal **`custom_fields`** string artifact
  ("Lead Details: custom_fieldsName:") — removed.
- The internal SMS ended with "Check NomadResults CRM pipeline: New FB Lead." — dropped, since
  the automated call now reaches the rep faster than they'd open the CRM.

Both emails were rebuilt as plain text (the internal one previously had bold labels). For
notification email that's a wash at worst, and it removed the formatting artifacts.

## Verification

Workflow confirmed still **Published** after all saves. The Customer SMS was re-opened after
saving and reads back at 196 characters with the new copy.

Still worth doing: submit a real lead on C2C Hardscape Form - v2, open the contact, and confirm
no line renders blank and Space Size shows a value.
