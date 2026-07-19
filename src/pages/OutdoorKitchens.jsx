import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
    { name: 'Landscaping', href: '/services/landscaping' },
];

const photos = CATEGORIES.find(c => c.slug === 'outdoor-kitchens')?.photos ?? [];

const faqs = [
    {
        q: 'What can be included in a custom outdoor kitchen?',
        a: "Built-in grills, stone and concrete countertops, refrigeration, wet bars, storage, and covered pergola structures. Every kitchen is designed around how you actually cook and entertain — not a showroom floor plan — so the layout starts with your habits, not a catalog.",
    },
    {
        q: 'Will an outdoor kitchen hold up to coastal salt air?',
        a: "Yes, if it's specified for it — which ours are. Everything from the countertop material to the appliance grade is chosen for Gulf Coast conditions, because salt air is unforgiving to hardware that wasn't selected with the coast in mind.",
    },
    {
        q: 'Do I need a covered structure over my outdoor kitchen?',
        a: "Not always, but shade changes how often you'll use it. A pergola or covered structure extends the space's comfort through South Texas summers and protects appliances and surfaces. We'll design with or without one depending on your site and budget.",
    },
    {
        q: 'How does an outdoor kitchen project start?',
        a: "With a design consultation. We look at your space, talk through how you entertain, and design the kitchen as part of the whole outdoor environment — often alongside patio, lighting, and landscape work so everything reads as one design.",
    },
];

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
            serviceType="Outdoor Kitchen Design & Construction"
            faqs={faqs}
            seo={{
                title: 'Custom Outdoor Kitchens in Corpus Christi, TX | Coast to Coast Landscape & Design',
                description: 'Design-build outdoor kitchens for Corpus Christi and the Coastal Bend — built-in grills, stone counters, refrigeration, bars, and pergolas engineered for Gulf Coast conditions.',
                path: '/services/outdoor-kitchens',
            }}
        />
    );
}
