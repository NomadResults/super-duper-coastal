export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, phone, email, projectType, message } = req.body;

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

    if (!contactRes.ok) {
        const detail = await contactRes.text();
        return res.status(502).json({ error: 'GHL API error', detail });
    }

    const { contact } = await contactRes.json();

    if (message && contact?.id) {
        await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}/notes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
                'Content-Type': 'application/json',
                'Version': '2021-07-28',
            },
            body: JSON.stringify({ body: `Service: ${projectType}\n\n${message}` }),
        });
    }

    return res.status(200).json({ success: true });
}
