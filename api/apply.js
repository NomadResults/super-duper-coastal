// Careers application handler — pushes applicants into GoHighLevel.
//
// Applicants are kept completely separate from sales leads:
//   • tagged "Careers Applicant" (never "Website Lead")
//   • placed in a dedicated Hiring pipeline (not the sales pipeline)
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   GHL_API_KEY            — same key already used by /api/contact
//   GHL_LOCATION_ID        — same location/sub-account
//   GHL_HIRING_PIPELINE_ID — the "Hiring" pipeline id (see setup notes)
//   GHL_HIRING_STAGE_ID    — the first stage id in that pipeline (e.g. "New Applicant")

import { validateLead, toE164 } from '../src/lib/leadValidation.js';

const GHL_HEADERS = (key) => ({
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const {
        name, phone, email, role, experience,
        license, transportation, workAuth, availability,
        resumeLink, about, company, // `company` = honeypot
    } = req.body || {};

    // Honeypot — real users never fill this hidden field.
    if (company) return res.status(200).json({ success: true });

    const errors = validateLead({ name, email, phone });
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ error: 'Validation failed', fields: errors });
    }

    const key = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    const pipelineId = process.env.GHL_HIRING_PIPELINE_ID;
    const pipelineStageId = process.env.GHL_HIRING_STAGE_ID;

    if (!key || !locationId) {
        console.error('[apply] GHL not configured. Application:', JSON.stringify(req.body));
        return res.status(502).json({ error: 'Not configured' });
    }

    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // 1. Create (or find existing) contact — tagged as an applicant, not a lead.
    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: GHL_HEADERS(key),
        body: JSON.stringify({
            firstName,
            lastName,
            phone: toE164(phone),
            email: email.trim(),
            locationId,
            source: 'Careers Page',
            tags: ['Careers Applicant', role].filter(Boolean),
        }),
    });

    let contactId;
    if (!contactRes.ok) {
        const errData = await contactRes.json().catch(() => null);
        if (errData?.statusCode === 400 && errData?.meta?.contactId) {
            contactId = errData.meta.contactId; // already exists — reuse it
        } else {
            return res.status(502).json({ error: 'GHL API error', detail: JSON.stringify(errData) });
        }
    } else {
        const { contact } = await contactRes.json();
        contactId = contact?.id;
    }

    if (contactId) {
        const noteBody = [
            `Position: ${role || 'General Application'}`,
            experience && `Experience: ${experience}`,
            license && `Driver's License: ${license}`,
            transportation && `Reliable Transportation: ${transportation}`,
            workAuth && `Authorized to work in US: ${workAuth}`,
            availability && `Availability: ${availability}`,
            resumeLink && `Resume / Portfolio: ${resumeLink}`,
            about && `\nAbout:\n${about}`,
        ].filter(Boolean).join('\n');

        const tasks = [
            fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
                method: 'POST',
                headers: GHL_HEADERS(key),
                body: JSON.stringify({ body: noteBody }),
            }),
        ];

        // Only open an opportunity if the Hiring pipeline is configured.
        if (pipelineId && pipelineStageId) {
            tasks.push(
                fetch('https://services.leadconnectorhq.com/opportunities/', {
                    method: 'POST',
                    headers: GHL_HEADERS(key),
                    body: JSON.stringify({
                        name: `${firstName} ${lastName} — ${role || 'Application'}`.trim(),
                        contactId,
                        locationId,
                        pipelineId,
                        pipelineStageId,
                        status: 'open',
                    }),
                }),
            );
        } else {
            console.warn('[apply] Hiring pipeline env vars not set — skipped opportunity.');
        }

        await Promise.all(tasks);
    }

    return res.status(200).json({ success: true });
}
