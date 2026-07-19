import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
    { name: 'Vuba Stone (Resin-Bound)', href: '/vuba-stone' },
];

const photos = CATEGORIES.find(c => c.slug === 'hardscaping')?.photos ?? [];

const faqs = [
    {
        q: 'What materials do you use for stone patios in Corpus Christi?',
        a: "We work with travertine, limestone, flagstone, and premium concrete pavers. Each material is selected for how it performs in South Texas heat and humidity as much as for how it looks — and we'll walk you through the trade-offs of each during your design consultation.",
    },
    {
        q: 'How much does a stone patio cost in the Corpus Christi area?',
        a: "Cost depends on three main factors: square footage, the material you choose (concrete pavers to premium travertine spans a wide range), and site preparation like grading or drainage work. Because every patio is custom-designed for the property, we price from an on-site design consultation rather than a one-size-fits-all rate.",
    },
    {
        q: 'Can you fix drainage or slope problems as part of a patio project?',
        a: "Yes — every hardscape we build is designed around the property's natural grade. Retaining walls, permeable surfaces, and drainage corrections are part of the design process, not an afterthought, which matters a lot during Coastal Bend storm season.",
    },
    {
        q: 'Do you build driveways and walkways too, or just patios?',
        a: "We design and install the full range of residential hardscape: patios, walkways, driveways, and retaining walls. For driveways specifically, also look at our certified Vuba Stone resin-bound surfacing — a seamless, permeable alternative to traditional paving.",
    },
    {
        q: 'What areas do you serve?',
        a: 'We build stone patios and hardscape throughout the Coastal Bend: Corpus Christi, Rockport, Port Aransas, Portland, Ingleside, Calallen, and Flour Bluff.',
    },
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
            serviceType="Stone Patios & Hardscaping"
            faqs={faqs}
            seo={{
                title: 'Stone Patios & Hardscaping in Corpus Christi, TX | Coast to Coast Landscape & Design',
                description: 'Custom stone patios, walkways, driveways, and retaining walls in travertine, limestone, flagstone, and pavers — designed and built for Corpus Christi and the Coastal Bend.',
                path: '/services/stone-patios',
            }}
        />
    );
}
