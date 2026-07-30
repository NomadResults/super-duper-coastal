// Careers application handler — pushes applicants into GoHighLevel.
//
// Applicants are kept completely separate from sales leads:
//   • tagged "Careers Applicant" (never "Website Lead")
//   • placed in a dedicated Hiring pipeline (not the sales pipeline)
//   • assigned to the hiring manager — REQUIRED, see note below
//
// Assignment is not cosmetic: the hiring user has `assignedDataOnly: true`
// in GHL, so she cannot see a contact or opportunity that isn't assigned to
// her. An unassigned applicant is an invisible applicant.
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   GHL_API_KEY              — same key already used by /api/contact
//   GHL_LOCATION_ID          — same location/sub-account
//   GHL_HIRING_PIPELINE_ID   — the "Hiring" pipeline id
//   GHL_HIRING_STAGE_ID      — the first stage id in that pipeline ("New Applicant")
//   GHL_HIRING_ASSIGNEE_ID   — optional; GHL user id of the hiring manager.
//                              Falls back to the id below so a missed env var
//                              can't silently orphan applicants.

import { validateLead, toE164 } from '../src/lib/leadValidation.js';

const GHL_BASE = 'https://services.leadconnectorhq.com';

// Caressa Elbert — hiring manager. Override with GHL_HIRING_ASSIGNEE_ID.
const DEFAULT_ASSIGNEE_ID = 'tH7GJTcsclCRSaMdhbWg';

// GHL custom fields MUST be written by `id`, not `key` — writing by key
// returns 200 and persists nothing. See ghl-workflows/ notes.
const FIELD = {
    position: 'OXCyjb9T6dFAc8YWRjP7',
    experience: 'AiJyByb358B2nZ3c5hSq',
    availability: 'p9t7bbt9wdYWscU5Ck2S',
    license: '59uaJrcRlUi3QQhDPHbr',
    transportation: 'sEoNCK9qMEftRnubZfkp',
    workAuth: 'MAwoKXnAoqCGmEyJ3dxj',
    resumeLink: 'izQQOEYifTAmauKtqXvO',
    about: '2fQdg0Sb9pZP6Lh8g2fd',
};

const GHL_HEADERS = (key) => ({
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
});

/** Log a non-fatal GHL failure with enough detail to recover the application by hand. */
async function reportIfFailed(label, resPromise, context) {
    try {
        const res = await resPromise;
        if (!res.ok) {
            const detail = await res.text().catch(() => '<unreadable>');
            console.error(`[apply] ${label} FAILED (${res.status}):`, detail, '| application:', JSON.stringify(context));
            return false;
        }
        return true;
    } catch (err) {
        console.error(`[apply] ${label} THREW:`, err?.message, '| application:', JSON.stringify(context));
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const {
        name, phone, email, role, experience,
        license, transportation, workAuth, availability,
        resumeLink, about, smsConsent, attribution, hpField, // `hpField` = honeypot
    } = req.body || {};

    // Honeypot — real users never fill this hidden field.
    if (hpField) return res.status(200).json({ success: true });

    const errors = validateLead({ name, email, phone });
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ error: 'Validation failed', fields: errors });
    }

    const key = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    const pipelineId = process.env.GHL_HIRING_PIPELINE_ID;
    const pipelineStageId = process.env.GHL_HIRING_STAGE_ID;
    const assigneeId = process.env.GHL_HIRING_ASSIGNEE_ID || DEFAULT_ASSIGNEE_ID;

    if (!key || !locationId) {
        console.error('[apply] GHL not configured. Application:', JSON.stringify(req.body));
        return res.status(502).json({ error: 'Not configured' });
    }

    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const position = role || 'General Application';

    // Ad/campaign attribution (from UTM capture) + SMS consent → source, tags, note.
    const attr = attribution && typeof attribution === 'object' ? attribution : {};
    const attrLines = Object.entries(attr).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
    const leadSource = attr.utm_source ? `Careers Page — ${attr.utm_source}` : 'Careers Page';
    const tags = ['Careers Applicant', role, smsConsent ? 'SMS Consent' : null].filter(Boolean);

    // Structured fields so applicants are filterable/automatable — and so the
    // workflow has real merge tags instead of an unparseable note.
    const customFields = [
        { id: FIELD.position, field_value: position },
        { id: FIELD.experience, field_value: experience || '' },
        { id: FIELD.availability, field_value: availability || '' },
        { id: FIELD.license, field_value: license || '' },
        { id: FIELD.transportation, field_value: transportation || '' },
        { id: FIELD.workAuth, field_value: workAuth || '' },
        { id: FIELD.resumeLink, field_value: resumeLink || '' },
        { id: FIELD.about, field_value: about || '' },
    ].filter((f) => f.field_value !== '');

    const logContext = { name, email, phone, position };

    // 1. Create (or find existing) contact — tagged as an applicant, not a lead.
    const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
        method: 'POST',
        headers: GHL_HEADERS(key),
        body: JSON.stringify({
            firstName,
            lastName,
            phone: toE164(phone),
            email: email.trim(),
            locationId,
            source: leadSource,
            tags,
            assignedTo: assigneeId,
            customFields,
        }),
    });

    let contactId;
    let isExistingContact = false;
    if (!contactRes.ok) {
        const errData = await contactRes.json().catch(() => null);
        if (errData?.statusCode === 400 && errData?.meta?.contactId) {
            contactId = errData.meta.contactId; // already exists — reuse it
            isExistingContact = true;
        } else {
            console.error('[apply] contact create FAILED:', JSON.stringify(errData), '| application:', JSON.stringify(logContext));
            return res.status(502).json({ error: 'GHL API error', detail: JSON.stringify(errData) });
        }
    } else {
        const { contact } = await contactRes.json();
        contactId = contact?.id;
    }

    if (!contactId) {
        console.error('[apply] no contactId resolved | application:', JSON.stringify(logContext));
        return res.status(502).json({ error: 'GHL API error' });
    }

    // 2. Existing contact: the create call was rejected wholesale, so none of the
    //    tags, fields, or assignment landed. Apply them now, or this applicant is
    //    invisible to the hiring manager and to any tag-triggered automation.
    if (isExistingContact) {
        // Tags go through the additive endpoint — a PUT would REPLACE the tag
        // array and silently wipe a returning customer's existing tags.
        await reportIfFailed('add tags (existing contact)', fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
            method: 'POST',
            headers: GHL_HEADERS(key),
            body: JSON.stringify({ tags }),
        }), logContext);

        // Don't steal an existing sales assignment — only claim unassigned contacts.
        // Either way the opportunity below is assigned, so she still sees the applicant.
        let alreadyAssigned = false;
        try {
            const cur = await fetch(`${GHL_BASE}/contacts/${contactId}`, { headers: GHL_HEADERS(key) });
            if (cur.ok) {
                const { contact } = await cur.json();
                alreadyAssigned = Boolean(contact?.assignedTo) && contact.assignedTo !== assigneeId;
                if (alreadyAssigned) {
                    console.warn(`[apply] contact ${contactId} already assigned to ${contact.assignedTo} — leaving sales ownership intact.`);
                }
            }
        } catch { /* best-effort — fall through and assign */ }

        await reportIfFailed('update fields (existing contact)', fetch(`${GHL_BASE}/contacts/${contactId}`, {
            method: 'PUT',
            headers: GHL_HEADERS(key),
            body: JSON.stringify({
                source: leadSource,
                customFields,
                ...(alreadyAssigned ? {} : { assignedTo: assigneeId }),
            }),
        }), logContext);
    }

    // 3. Note keeps a human-readable copy on the record as a fallback.
    const noteBody = [
        `Position: ${position}`,
        experience && `Experience: ${experience}`,
        license && `Driver's License: ${license}`,
        transportation && `Reliable Transportation: ${transportation}`,
        workAuth && `Authorized to work in US: ${workAuth}`,
        availability && `Availability: ${availability}`,
        resumeLink && `Resume / Portfolio: ${resumeLink}`,
        `SMS Consent: ${smsConsent ? 'Yes' : 'No'}`,
        about && `\nAbout:\n${about}`,
        attrLines.length ? `\nLead Source:\n${attrLines.join('\n')}` : '',
    ].filter(Boolean).join('\n');

    const notePromise = fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: GHL_HEADERS(key),
        body: JSON.stringify({ body: noteBody }),
    });

    // 4. Opportunity in the Hiring pipeline — assigned, so it lands in her queue.
    const opportunityWork = (async () => {
        if (!pipelineId || !pipelineStageId) {
            console.warn('[apply] Hiring pipeline env vars not set — skipped opportunity.');
            return;
        }
        const oppName = `${firstName} ${lastName} — ${position}`.trim();
        const createRes = await fetch(`${GHL_BASE}/opportunities/`, {
            method: 'POST',
            headers: GHL_HEADERS(key),
            body: JSON.stringify({
                name: oppName,
                contactId,
                locationId,
                pipelineId,
                pipelineStageId,
                status: 'open',
                source: leadSource,
                assignedTo: assigneeId,
            }),
        });
        if (createRes.ok) return;

        // GHL refuses a second open opportunity for the same contact. That's the
        // right behaviour (no duplicate pipeline cards) but it means a re-applicant's
        // new details would go stale on the old card — so update it in place.
        const err = await createRes.json().catch(() => null);
        if (err?.code === 'OPPORTUNITY_NO_DUPLICATE' && err?.meta?.existingId) {
            console.log(`[apply] existing opportunity ${err.meta.existingId} — updating instead of duplicating.`);
            await reportIfFailed('update existing opportunity', fetch(`${GHL_BASE}/opportunities/${err.meta.existingId}`, {
                method: 'PUT',
                headers: GHL_HEADERS(key),
                body: JSON.stringify({ name: oppName, assignedTo: assigneeId }),
            }), logContext);
            return;
        }
        console.error('[apply] create opportunity FAILED:', JSON.stringify(err), '| application:', JSON.stringify(logContext));
    })();

    // Failures here are logged with the full application, never swallowed. The
    // applicant still gets a success response: their contact record exists and
    // is assigned, so the application is recoverable rather than lost.
    await Promise.all([
        reportIfFailed('create note', notePromise, logContext),
        opportunityWork,
    ]);

    return res.status(200).json({ success: true });
}
