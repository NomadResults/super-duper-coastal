import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
];

const photos = CATEGORIES.find(c => c.slug === 'landscaping')?.photos.map(p => p.img) ?? [];

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
            seo={{
                title: 'Landscaping Services in Corpus Christi, TX | Coast to Coast Landscape & Design',
                description: 'Full-service landscape design and installation for the Coastal Bend — native plantings, structured beds, drainage, and irrigation-smart layouts built for South Texas.',
                path: '/services/landscaping',
            }}
        />
    );
}
