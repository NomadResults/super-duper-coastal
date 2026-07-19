import ServicePage from './ServicePage';
import { CATEGORIES } from '../data/portfolioData';

const related = [
    { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
    { name: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { name: 'Landscaping', href: '/services/landscaping' },
];

const photos = CATEGORIES.find(c => c.slug === 'lighting')?.photos ?? [];

const faqs = [
    {
        q: 'What kind of landscape lighting do you install?',
        a: "Low-voltage architectural lighting systems: uplighting for trees and facades, path lighting, accent fixtures, and smart controls. The goal is a property that feels as intentional after dark as it does during the day.",
    },
    {
        q: 'Will the fixtures survive coastal salt air?',
        a: "That's a core requirement of every system we install. Fixtures and hardware are selected specifically to hold up in the coastal salt-air environment of Corpus Christi and the Coastal Bend, where standard fixtures corrode quickly.",
    },
    {
        q: 'Can I control my landscape lighting from my phone?',
        a: "Yes — we install smart controls that let you schedule scenes, adjust zones, and run everything from your phone. Lighting that turns itself on at dusk and off at bedtime is the default, not an upgrade.",
    },
    {
        q: 'Is low-voltage lighting expensive to run?',
        a: "No. Low-voltage LED systems draw a small fraction of the power of old line-voltage lighting, so a full-property system costs very little to operate — the investment is in the design and installation, not the utility bill.",
    },
];

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
            serviceType="Landscape Lighting Design & Installation"
            faqs={faqs}
            seo={{
                title: 'Landscape Lighting in Corpus Christi, TX | Coast to Coast Landscape & Design',
                description: 'Low-voltage architectural landscape lighting for Corpus Christi and the Coastal Bend — uplighting, path lighting, and smart controls built for coastal salt air.',
                path: '/services/outdoor-lighting',
            }}
        />
    );
}
