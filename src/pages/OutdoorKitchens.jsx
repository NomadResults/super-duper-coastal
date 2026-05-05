import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
    { name: 'Landscaping', href: '/services/landscaping' },
];

const photos = CATEGORIES.find(c => c.slug === 'outdoor-kitchens')?.photos.map(p => p.img) ?? [];

export default function OutdoorKitchens() {
    return (
        <ServicePage
            label="Services — Outdoor Living"
            headline="Custom Outdoor Kitchens for South Texas Homeowners"
            body={[
                "South Texas doesn't have an off-season. Your outdoor kitchen shouldn't either. We design and build fully custom outdoor kitchens for homeowners across Corpus Christi, Port Aransas, Rockport, and the Coastal Bend — built around how you actually entertain, not a showroom floor plan.",
                "Built-in grills, stone and concrete countertops, refrigeration, wet bars, and covered pergola structures — all specified for Gulf Coast conditions and executed with the same precision we bring to every project.",
                "This is the outdoor investment that changes how you use your home.",
            ]}
            ctaText="Start Your Design Consultation"
            relatedServices={related}
            photos={photos}
        />
    );
}
