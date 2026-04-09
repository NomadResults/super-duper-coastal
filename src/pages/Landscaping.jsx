import React from 'react';
import ServicePage from './ServicePage';

const related = [
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
];

const photos = [
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776fadaad84c5cdf12.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776fadaa77145cdf10.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776917d28e929fd287.png',
];

export default function Landscaping() {
    return (
        <ServicePage
            label="Services — Landscaping"
            headline="Full-Service Landscaping for Corpus Christi & South Texas Properties"
            body={[
                "Landscaping in South Texas requires more than aesthetics — it requires understanding the soil, the climate, and the demands of coastal living. We design and install landscape systems for residential and commercial properties across the Coastal Bend that are built to perform long after installation day.",
                "Native and adaptive plants. Structured beds. Drainage solutions. Irrigation-smart layouts. Every design decision is made with South Texas conditions in mind — so your investment holds up through the heat, the storms, and everything in between.",
                "Your landscape should earn its place every season. We make sure it does.",
            ]}
            ctaText="Request a Consultation"
            relatedServices={related}
            photos={photos}
        />
    );
}
