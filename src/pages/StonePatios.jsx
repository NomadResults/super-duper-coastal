import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
    { name: 'Landscaping', href: '/services/landscaping' },
];

const photos = CATEGORIES.find(c => c.slug === 'hardscaping')?.photos.map(p => p.img) ?? [];

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
            seo={{
                title: 'Stone Patios & Hardscaping in Corpus Christi, TX | Coast to Coast Landscape & Design',
                description: 'Custom stone patios, walkways, driveways, and retaining walls in travertine, limestone, flagstone, and pavers — designed and built for Corpus Christi and the Coastal Bend.',
                path: '/services/stone-patios',
            }}
        />
    );
}
