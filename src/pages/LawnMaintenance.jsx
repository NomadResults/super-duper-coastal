import React from 'react';
import ServicePage from './ServicePage';

const related = [
    { name: 'Landscaping',   href: '/services/landscaping' },
    { name: 'Artificial Turf', href: '/services/artificial-turf' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
];

const photos = [
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b8aa492b355e9fbf61ed8.jpg',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776917d28e929fd287.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eeed79eed5c82922c77.png',
];

export default function LawnMaintenance() {
    return (
        <ServicePage
            label="Services — Maintenance"
            headline="Ongoing Landscape Maintenance for Corpus Christi & the Coastal Bend"
            body={[
                "A beautiful landscape is only as good as the care it receives. We offer ongoing lawn and flower bed maintenance programs for residential properties across Corpus Christi, Rockport, Portland, and the surrounding Coastal Bend — designed around the South Texas growing season and your property's specific needs.",
                "Our maintenance programs cover mowing and edging, flower bed design and seasonal replanting, weed management, trimming, and general property upkeep. Every visit is handled by the same trained crew — not a rotating cast of whoever's available that week.",
                "A well-maintained property holds its value and makes an impression. We keep yours looking like it was just finished — every time.",
            ]}
            ctaText="Request a Maintenance Plan"
            relatedServices={related}
            photos={photos}
        />
    );
}
