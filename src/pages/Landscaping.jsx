import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
];

const photos = CATEGORIES.find(c => c.slug === 'landscaping')?.photos ?? [];

const faqs = [
    {
        q: 'What plants work best for landscaping in Corpus Christi?',
        a: "Native and adaptive species that can handle South Texas heat, periodic drought, and — near the water — salt exposure. We design plant palettes around what actually thrives here long-term, not what looks good on installation day and dies by August.",
    },
    {
        q: 'How is coastal landscaping different from landscaping anywhere else?',
        a: "Three things: soil, salt, and storms. Coastal Bend soil and drainage behave differently than inland Texas, salt air limits plant and material choices near the water, and every design has to assume tropical downpours. We engineer for all three from the first sketch.",
    },
    {
        q: 'Do you handle drainage and irrigation as part of a landscape design?',
        a: "Yes. Drainage solutions and irrigation-smart layouts are built into every design — a landscape that floods in storm season or needs constant hand-watering in summer wasn't designed for South Texas, no matter how it looks.",
    },
    {
        q: 'Do you work on commercial properties or just homes?',
        a: 'Both. We design and install landscape systems for residential and commercial properties across the Coastal Bend, with the same design rigor either way.',
    },
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
            serviceType="Landscape Design & Installation"
            faqs={faqs}
            seo={{
                title: 'Landscaping Services in Corpus Christi, TX | Coast to Coast Landscape & Design',
                description: 'Full-service landscape design and installation for the Coastal Bend — native plantings, structured beds, drainage, and irrigation-smart layouts built for South Texas.',
                path: '/services/landscaping',
            }}
        />
    );
}
