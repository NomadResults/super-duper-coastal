export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, phone, email, projectType, budget, message } = req.body;

    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            locationId: process.env.GHL_LOCATION_ID,
            source: 'Website Contact Form',
            tags: [projectType].filter(Boolean),
        }),
    });

    let contactId;

    if (!contactRes.ok) {
        const errData = await contactRes.json().catch(() => null);
        // Duplicate contact — reuse the existing one
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
        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
                'Content-Type': 'application/json',
                'Version': '2021-07-28',
            },
            body: JSON.stringify({ body: `Service: ${projectType}\nBudget: ${budget}\n\n${message}` }),
        });
    }

    return res.status(200).json({ success: true });
}
