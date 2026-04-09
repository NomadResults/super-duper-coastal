import React from 'react';
import ServicePage from './ServicePage';

const related = [
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Landscaping', href: '/services/landscaping' },
];

const photos = [
    '/trees c2c.png',
    '/doors c2c.png',
    '/dog c2c.png',
];

export default function OutdoorLighting() {
    return (
        <ServicePage
            label="Services — Lighting"
            headline="Architectural Landscape Lighting for Corpus Christi & the Coastal Bend"
            body={[
                "The right lighting system doesn't just illuminate your property — it defines it. After dark, your outdoor space should feel as intentional as it does during the day. We design and install low-voltage landscape lighting for residential properties across Corpus Christi, Rockport, Calallen, Flour Bluff, and Portland.",
                "Uplighting, path lighting, accent fixtures, and smart controls — installed cleanly and engineered to hold up in the coastal salt air environment.",
                "If your property is worth building, it's worth being seen.",
            ]}
            ctaText="Schedule a Consultation"
            relatedServices={related}
            photos={photos}
        />
    );
}
