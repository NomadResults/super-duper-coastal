import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Landscaping', href: '/services/landscaping' },
];

const photos = CATEGORIES.find(c => c.slug === 'lighting')?.photos ?? [];

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
            seo={{
                title: 'Landscape Lighting in Corpus Christi, TX | Coast to Coast Landscape & Design',
                description: 'Low-voltage architectural landscape lighting for Corpus Christi and the Coastal Bend — uplighting, path lighting, and smart controls built for coastal salt air.',
                path: '/services/outdoor-lighting',
            }}
        />
    );
}
