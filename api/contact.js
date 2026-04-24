const GHL_HEADERS = (key) => ({
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, phone, email, projectType, budget, message } = req.body;

    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const key = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: GHL_HEADERS(key),
        body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            locationId,
            source: 'Website Contact Form',
            tags: ['Website Lead', projectType].filter(Boolean),
        }),
    });

    let contactId;

    if (!contactRes.ok) {
        const errData = await contactRes.json().catch(() => null);
        if (errData?.statusCode === 400 && errData?.meta?.contactId) {
            contactId = errData.meta.contactId;
        } else {
            return res.status(502).json({ error: 'GHL API error', detail: JSON.stringify(errData) });
        }
    } else {
        const { contact } = await contactRes.json();
        contactId = contact?.id;
    }

    if (contactId) {
        await Promise.all([
            // Add note with project details
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
                    title: `${firstName} ${lastName} — ${projectType || 'Website Inquiry'}`,
                    contactId,
                    locationId,
                    pipelineId: 'rGq01MAkw86vnGeseadU',
                    pipelineStageId: 'f2cf19a4-bfec-47bd-914c-1728b1ff6249',
                    status: 'open',
                }),
            }),
        ]);
    }

    return res.status(200).json({ success: true });
}
