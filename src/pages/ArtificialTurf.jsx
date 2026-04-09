import React from 'react';
import ServicePage from './ServicePage';

const related = [
    { name: 'Landscaping',              href: '/services/landscaping' },
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
];

const photos = [
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776fadaad84c5cdf12.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776fadaa77145cdf10.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9a07095b9ca106d5afdb.jpg',
];

export default function ArtificialTurf() {
    return (
        <ServicePage
            label="Services — Artificial Turf"
            headline="Premium Artificial Turf Installation for South Texas Homes"
            body={[
                "South Texas heat and drought make maintaining natural grass a constant battle. Artificial turf gives you a lush, green yard year-round — without the water bills, the mowing schedule, or the seasonal die-off that comes with the Coastal Bend climate.",
                "We install premium synthetic turf systems built for UV resistance, proper drainage, and the kind of foot traffic South Texas families put on their yards. Whether it's a full backyard replacement, a play area, or a putting green, every installation is done with a proper base system and infill for the most natural look and feel possible.",
                "Low maintenance doesn't mean low quality. It means more time actually using your yard.",
            ]}
            ctaText="Request a Turf Consultation"
            relatedServices={related}
            photos={photos}
        />
    );
}
