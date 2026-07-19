import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Landscaping', href: '/services/landscaping' },
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
];

const photos = CATEGORIES.find(c => c.slug === 'turf')?.photos ?? [];

const faqs = [
    {
        q: 'Is artificial turf a good idea in South Texas heat?',
        a: "Yes — it's one of the climates where turf makes the most sense. Natural grass here fights heat, drought restrictions, and seasonal die-off; a premium UV-resistant turf system stays green year-round with no watering. We spec UV-rated products precisely because our sun is relentless.",
    },
    {
        q: 'Does artificial turf drain during heavy rain?',
        a: "Properly installed turf drains better than most lawns. Every installation gets a full base system engineered for drainage, so Coastal Bend downpours pass through instead of pooling — base preparation is most of what separates a professional install from a cheap one.",
    },
    {
        q: 'Is artificial turf good for kids and pets?',
        a: "It's built for exactly that kind of traffic. We install turf systems for family yards, play areas, and pet runs, with infill chosen for the use — durable, mud-free, and no chemicals or mowing equipment in the space where your kids play.",
    },
    {
        q: 'Do you install putting greens?',
        a: 'Yes. Backyard putting greens are one of our most popular turf projects, installed with the proper base and specialized turf for true ball roll.',
    },
    {
        q: 'What maintenance does artificial turf need?',
        a: "Very little: an occasional rinse and a brush-up of high-traffic areas. No mowing, no watering schedule, no fertilizer — that's the point.",
    },
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
            serviceType="Artificial Turf Installation"
            faqs={faqs}
            seo={{
                title: 'Artificial Turf Installation in Corpus Christi, TX | Coast to Coast Landscape & Design',
                description: 'Premium synthetic turf installation for Corpus Christi and the Coastal Bend — UV-resistant systems with proper base prep and drainage for yards, play areas, and putting greens.',
                path: '/services/artificial-turf',
            }}
        />
    );
}
