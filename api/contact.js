// Contact form handler — pushes leads into GoHighLevel.
//
// Validation lives in src/lib/leadValidation.js (shared with the React form):
// the browser gives friendly inline errors, this handler is the hard gate for
// bots and direct API posts that skip the form entirely.
//
// Project details are sent as CUSTOM FIELDS on the contact (not just a note)
// so GHL SMS/email workflows can merge them. Create these fields in GHL under
// Settings → Custom Fields (object: Contact) with these exact Unique Keys:
//   contact.project_type      — "Project Type"    (Single Line)
//   contact.estimated_budget  — "Estimated Budget" (Single Line)
//   contact.project_message   — "Project Message"  (Multi Line)
// Then reference them in the workflow SMS as e.g. {{contact.project_type}}.

import { validateLead, toE164 } from '../src/lib/leadValidation.js';

const GHL_HEADERS = (key) => ({
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, phone, email, projectType, budget, message, company } = req.body || {};

    // Honeypot — real users never fill this hidden field. Pretend success so
    // bots don't learn they were caught.
    if (company) return res.status(200).json({ success: true });

    const errors = validateLead({ name, email, phone });
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ error: 'Validation failed', fields: errors });
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const normalizedPhone = toE164(phone);

    const key = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    const customFields = [
        { key: 'contact.project_type', field_value: projectType || '' },
        { key: 'contact.estimated_budget', field_value: budget || '' },
        { key: 'contact.project_message', field_value: message || '' },
    ];

    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: GHL_HEADERS(key),
        body: JSON.stringify({
            firstName,
            lastName,
            phone: normalizedPhone,
            email: email.trim(),
            locationId,
            source: 'Website Contact Form',
            tags: ['Website Lead', projectType].filter(Boolean),
            customFields,
        }),
    });

    let contactId;
    let isExistingContact = false;

    if (!contactRes.ok) {
        const errData = await contactRes.json().catch(() => null);
        if (errData?.statusCode === 400 && errData?.meta?.contactId) {
            contactId = errData.meta.contactId;
            isExistingContact = true;
        } else {
            return res.status(502).json({ error: 'GHL API error', detail: JSON.stringify(errData) });
        }
    } else {
        const { contact } = await contactRes.json();
        contactId = contact?.id;
    }

    if (contactId) {
        const tasks = [
            // Note keeps the full inquiry on the contact record as a fallback
            fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
                method: 'POST',
                headers: GHL_HEADERS(key),
                body: JSON.stringify({ body: `Service: ${projectType}\nBudget: ${budget}\n\n${message}` }),
            }),
            // Create opportunity in "New Website Lead" stage
            fetch('https://services.leadconnectorhq.com/opportunities/', {
                method: 'POST',
                headers: GHL_HEADERS(key),
                body: JSON.stringify({
                    name: `${firstName} ${lastName} — ${projectType || 'Website Inquiry'}`,
                    contactId,
                    locationId,
                    pipelineId: 'rGq01MAkw86vnGeseadU',
                    pipelineStageId: 'f2cf19a4-bfec-47bd-914c-1728b1ff6249',
                    status: 'open',
                }),
            }),
        ];

        // Duplicate contact: the create call was rejected, so push the new
        // project details onto the existing record or the SMS merge goes stale.
        if (isExistingContact) {
            tasks.push(
                fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
                    method: 'PUT',
                    headers: GHL_HEADERS(key),
                    body: JSON.stringify({ customFields }),
                }),
            );
        }

        await Promise.all(tasks);
    }

    return res.status(200).json({ success: true });
}
