import React from 'react';
import ServicePage from './ServicePage';

const related = [
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
    { name: 'Landscaping', href: '/services/landscaping' },
];

const photos = [
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69063c713081bc07773b8137.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eeed79eed5c82922c77.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/2cc8275c-2e27-4e01-966a-9bc424ab12da.png',
];

export default function StonePatios() {
    return (
        <ServicePage
            label="Services — Hardscaping"
            headline="Custom Stone Patios & Hardscape Design Across the Coastal Bend"
            body={[
                "A well-designed patio isn't just an outdoor surface — it's the foundation of how you use your property. We design and install custom stone patios, walkways, driveways, and retaining walls for homeowners across Corpus Christi, Rockport, Portland, and the surrounding Coastal Bend.",
                "We work with premium materials — travertine, limestone, flagstone, and concrete pavers — selected for both their aesthetic and their ability to perform in South Texas heat and humidity. Every project is designed around your property's natural grade, your lifestyle, and the long-term integrity of the installation.",
                "No two properties are the same. Neither are our designs.",
            ]}
            ctaText="Schedule a Design Consultation"
            relatedServices={related}
            photos={photos}
        />
    );
}
