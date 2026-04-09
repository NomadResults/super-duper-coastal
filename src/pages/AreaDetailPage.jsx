import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Send, CheckCircle, X } from 'lucide-react';
import styles from './AreaDetailPage.module.css';

const PROJECT_TYPES = [
    'Stone Patio & Hardscaping',
    'Outdoor Kitchen',
    'Outdoor Lighting',
    'Landscaping',
    'Artificial Turf',
    'Full Property Design-Build',
    'Other',
];

const EMPTY_FORM = { name: '', email: '', phone: '', projectType: '', budget: '', message: '' };

const areaData = {
    'corpus-christi': {
        name: 'Corpus Christi',
        state: 'TX',
        tagline: 'The Heart of Coastal Bend Outdoor Living',
        heroBody: "Corpus Christi is where our story began — and where the majority of our work lives. From Southside estates to Padre Island waterfront properties, we design and install hardscape, landscape, outdoor kitchens, and lighting systems for homeowners who expect more from their outdoor space.",
        body: [
            "Corpus Christi is the Coastal Bend's largest city and the epicenter of serious outdoor living. Homeowners here are investing in their properties with intention — and they expect a contractor who matches that standard.",
            "We've worked on every type of residential project this city has to offer: bayfront retreats, Southside estate renovations, Padre Island vacation homes, and everything in between. Each project is approached with the same design rigor — architectural precision, material quality, and systems built for South Texas conditions.",
            "If you live in Corpus Christi and you're ready to take your outdoor space seriously, we're the team for it.",
        ],
        photo: '/areas/corpus-christi.png',
        photoAlt: 'Corpus Christi, Texas coastline — Coast to Coast Landscape & Design service area',
        services: ['Hardscaping & Stone Patios', 'Custom Landscape Design', 'Outdoor Kitchens', 'Outdoor Lighting Systems', 'Artificial Turf'],
        metaTitle: 'Landscape & Hardscape Design in Corpus Christi, TX | Coast to Coast',
        metaDesc: 'Professional landscape design, hardscaping, outdoor kitchens, and outdoor lighting for Corpus Christi homeowners. Coastal-built, architecturally precise. Call (361) 316-5251.',
        keywords: 'landscape design Corpus Christi TX, hardscape Corpus Christi, outdoor kitchen Corpus Christi, outdoor lighting Corpus Christi, artificial turf Corpus Christi',
        schema: {
            locality: 'Corpus Christi',
            region: 'TX',
            postalCode: '78401',
        },
    },
    'rockport': {
        name: 'Rockport',
        state: 'TX',
        tagline: 'Coastal Charm Meets Elevated Outdoor Design',
        heroBody: "Rockport's character is unlike anywhere else on the Texas coast. We bring the same bespoke design process to Rockport properties — built to withstand salt air, Gulf winds, and the unique conditions of coastal living.",
        body: [
            "Rockport is one of the most distinctive communities on the Texas Gulf Coast — and its outdoor spaces should reflect that. Whether you're a full-time resident or a vacation property owner, the standard for outdoor design here is rising.",
            "We design and build outdoor environments in Rockport that are engineered for the coast: materials that handle salt exposure, plant selections suited to the local climate, and hardscape systems with the durability coastal conditions demand.",
            "Our work here spans waterfront properties, downtown residences, and everything in between. Rockport deserves better than a generic contractor — and that's exactly what we're not.",
        ],
        photo: '/areas/rockport.png',
        photoAlt: 'Rockport, Texas harbor — Coast to Coast Landscape & Design service area',
        services: ['Hardscaping & Stone Patios', 'Coastal Landscape Design', 'Outdoor Kitchens', 'Outdoor Lighting Systems', 'Artificial Turf'],
        metaTitle: 'Landscape & Hardscape Design in Rockport, TX | Coast to Coast',
        metaDesc: 'Coastal-engineered landscape design, hardscaping, and outdoor kitchens for Rockport, TX homeowners. Salt-air durable. Architecturally precise. Call (361) 316-5251.',
        keywords: 'landscape design Rockport TX, hardscape Rockport Texas, outdoor kitchen Rockport, coastal landscaping Rockport TX, outdoor lighting Rockport',
        schema: {
            locality: 'Rockport',
            region: 'TX',
            postalCode: '78382',
        },
    },
    'port-aransas': {
        name: 'Port Aransas',
        state: 'TX',
        tagline: 'Island Living, Elevated',
        heroBody: "Island living demands outdoor spaces designed for it. We work with Port Aransas homeowners and vacation property owners who want durable, high-end outdoor environments that hold up to the elements and look exceptional doing it.",
        body: [
            "Port Aransas is one of the most desirable destinations on the Texas coast — and the outdoor spaces here need to perform at that level. We design and install outdoor environments for island properties that are built to last and built to impress.",
            "Vacation rental owners, second-home buyers, and full-time island residents trust us to create outdoor spaces that handle the salt, wind, and humidity of island life without sacrificing aesthetics. Durable hardscape, smart plant selection, and outdoor systems engineered for coastal exposure.",
            "If you own property on the island and you're ready to invest in it properly, we're the team to call.",
        ],
        photo: '/areas/port-aransas.png',
        photoAlt: 'Port Aransas, Texas island landscape — Coast to Coast Landscape & Design service area',
        services: ['Hardscaping & Stone Patios', 'Island Landscape Design', 'Outdoor Kitchens', 'Outdoor Lighting Systems', 'Artificial Turf'],
        metaTitle: 'Landscape & Hardscape Design in Port Aransas, TX | Coast to Coast',
        metaDesc: 'High-end landscape and hardscape design for Port Aransas island properties. Built for salt, wind, and coastal exposure. Call (361) 316-5251.',
        keywords: 'landscape design Port Aransas TX, hardscape Port Aransas, outdoor kitchen Port Aransas, island landscaping Texas, coastal hardscape Port Aransas',
        schema: {
            locality: 'Port Aransas',
            region: 'TX',
            postalCode: '78373',
        },
    },
    'portland': {
        name: 'Portland',
        state: 'TX',
        tagline: 'Across the Harbor, the Same Elevated Standard',
        heroBody: "Across the harbor from Corpus Christi, Portland is home to some of the Coastal Bend's most well-maintained residential properties. We bring the same design standards here — clean, architectural, and built to last.",
        body: [
            "Portland is one of the Coastal Bend's most consistent residential markets — and its homeowners take pride in their properties. We've brought the same design process we use in Corpus Christi to Portland, with results that speak for themselves.",
            "Whether you're upgrading an existing outdoor space or starting from scratch on a new build, we handle the full scope: design consultation, material selection, installation, and ongoing maintenance. Clean lines, quality materials, and work that holds up.",
            "Portland homeowners who want outdoor living that matches the quality of their home know where to call.",
        ],
        photo: '/areas/portland.png',
        photoAlt: 'Portland, Texas residential neighborhood — Coast to Coast Landscape & Design service area',
        services: ['Hardscaping & Stone Patios', 'Custom Landscape Design', 'Outdoor Kitchens', 'Outdoor Lighting Systems', 'Artificial Turf'],
        metaTitle: 'Landscape & Hardscape Design in Portland, TX | Coast to Coast',
        metaDesc: 'Custom landscape design, hardscaping, outdoor kitchens, and outdoor lighting for Portland, TX homeowners. Coastal Bend expertise. Call (361) 316-5251.',
        keywords: 'landscape design Portland TX, hardscape Portland Texas, outdoor kitchen Portland TX, landscaping Portland Texas',
        schema: {
            locality: 'Portland',
            region: 'TX',
            postalCode: '78374',
        },
    },
    'ingleside': {
        name: 'Ingleside',
        state: 'TX',
        tagline: 'A Growing Community, a Rising Standard',
        heroBody: "A growing community with serious potential. We work with Ingleside homeowners ready to invest in their outdoor space and elevate the standard of their property.",
        body: [
            "Ingleside is a community on the rise — and so is the standard for outdoor living here. We work with Ingleside homeowners who are ready to invest in their properties and want a design partner who takes their vision seriously.",
            "From backyard renovations to full outdoor environment buildouts, we apply the same design process here that we use across the Coastal Bend: a thorough site analysis, material selections suited to the environment, and installations that are built to last.",
            "Ingleside has great bones. We help homeowners build on them.",
        ],
        photo: '/areas/ingleside.png',
        photoAlt: 'Ingleside, Texas community — Coast to Coast Landscape & Design service area',
        services: ['Hardscaping & Stone Patios', 'Landscape Design', 'Outdoor Kitchens', 'Outdoor Lighting Systems', 'Artificial Turf'],
        metaTitle: 'Landscape & Hardscape Design in Ingleside, TX | Coast to Coast',
        metaDesc: 'Professional landscape design and hardscaping for Ingleside, TX homeowners. Outdoor kitchens, artificial turf, and outdoor lighting. Call (361) 316-5251.',
        keywords: 'landscape design Ingleside TX, hardscape Ingleside Texas, outdoor kitchen Ingleside TX, landscaping Ingleside Texas, artificial turf Ingleside',
        schema: {
            locality: 'Ingleside',
            region: 'TX',
            postalCode: '78362',
        },
    },
    'calallen': {
        name: 'Calallen',
        state: 'TX',
        tagline: "Corpus Christi's Established Suburban Corridor",
        heroBody: "One of Corpus Christi's most established suburban corridors. Calallen homeowners trust us to design outdoor living environments that match the scale and quality of their homes.",
        body: [
            "Calallen has long been one of the most sought-after residential areas in the greater Corpus Christi market. The homes here are substantial — and the outdoor spaces should match.",
            "We work with Calallen homeowners who understand the value of a properly designed and installed outdoor environment. Hardscape, landscape, outdoor kitchens, lighting — we handle the full scope and take every project through the same rigorous design process.",
            "The homes in Calallen are built to last. So is our work.",
        ],
        photo: '/areas/calallen.png',
        photoAlt: 'Calallen area near Corpus Christi, Texas — Coast to Coast Landscape & Design service area',
        services: ['Hardscaping & Stone Patios', 'Custom Landscape Design', 'Outdoor Kitchens', 'Outdoor Lighting Systems', 'Artificial Turf'],
        metaTitle: 'Landscape & Hardscape Design in Calallen, TX | Coast to Coast',
        metaDesc: 'Premium landscape design, hardscaping, and outdoor kitchens for Calallen homeowners near Corpus Christi. Full-service outdoor living. Call (361) 316-5251.',
        keywords: 'landscape design Calallen TX, hardscape Calallen, outdoor kitchen Calallen Texas, landscaping near Corpus Christi',
        schema: {
            locality: 'Calallen',
            region: 'TX',
            postalCode: '78410',
        },
    },
    'flour-bluff': {
        name: 'Flour Bluff',
        state: 'TX',
        tagline: 'Coastal-Conscious Design Between the City and the Island',
        heroBody: "Tucked between Corpus Christi proper and the island, Flour Bluff properties benefit from our coastal-conscious design approach — durable materials, smart plant selection, and outdoor systems built for the environment.",
        body: [
            "Flour Bluff sits in a unique position — part city, part coast. Outdoor spaces here need to be designed with that environment in mind: materials that handle salt exposure, plants suited to the conditions, and systems engineered for longevity.",
            "We've worked throughout Flour Bluff on residential properties of every scale. The design process is the same regardless of project size — thorough, intentional, and built around how you actually use your outdoor space.",
            "If you're in Flour Bluff and ready to take your outdoor environment to the next level, we're ready to build it.",
        ],
        photo: '/areas/flour-bluff.png',
        photoAlt: 'Flour Bluff neighborhood near Corpus Christi, Texas — Coast to Coast Landscape & Design service area',
        services: ['Hardscaping & Stone Patios', 'Coastal Landscape Design', 'Outdoor Kitchens', 'Outdoor Lighting Systems', 'Artificial Turf'],
        metaTitle: 'Landscape & Hardscape Design in Flour Bluff, TX | Coast to Coast',
        metaDesc: 'Coastal-engineered landscape design and hardscaping for Flour Bluff, TX. Outdoor kitchens, lighting, and artificial turf built for South Texas. Call (361) 316-5251.',
        keywords: 'landscape design Flour Bluff TX, hardscape Flour Bluff, outdoor kitchen Flour Bluff, landscaping Corpus Christi Flour Bluff, coastal landscaping Flour Bluff',
        schema: {
            locality: 'Corpus Christi',
            region: 'TX',
            postalCode: '78418',
        },
    },
};

const allServices = [
    { label: 'Hardscaping',      href: '/services/stone-patios' },
    { label: 'Landscaping',      href: '/services/landscaping' },
    { label: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { label: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
    { label: 'Artificial Turf',  href: '/services/artificial-turf' },
];

const SITE_URL = 'https://coasttocoastlandscapedesign.com';
const PHONE = '(361) 316-5251';
const ADDRESS = '201 16th St, Corpus Christi, TX';

export default function AreaDetailPage() {
    const { slug } = useParams();
    const area = areaData[slug];

    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const formRef = useRef(null);

    const openForm = () => {
        setFormOpen(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => { setSubmitting(false); setSuccess(true); }, 1400);
    };

    const reset = () => { setSuccess(false); setForm(EMPTY_FORM); };

    if (!area) {
        return (
            <main style={{ paddingTop: 120, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--text-primary)' }}>Area Not Found</h1>
                    <Link to="/service-areas" style={{ color: 'var(--accent-bright)', fontWeight: 600 }}>← Back to Service Areas</Link>
                </div>
            </main>
        );
    }

    const canonicalUrl = `${SITE_URL}/service-areas/${slug}`;

    // Local Business JSON-LD schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Coast to Coast Landscape & Design',
        description: area.metaDesc,
        url: canonicalUrl,
        telephone: '+13613165251',
        image: `${SITE_URL}${area.photo}`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '201 16th St',
            addressLocality: area.schema.locality,
            addressRegion: area.schema.region,
            postalCode: area.schema.postalCode,
            addressCountry: 'US',
        },
        areaServed: {
            '@type': 'City',
            name: area.name,
            containedInPlace: {
                '@type': 'State',
                name: 'Texas',
            },
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Outdoor Design Services',
            itemListElement: area.services.map((s, i) => ({
                '@type': 'Offer',
                position: i + 1,
                itemOffered: {
                    '@type': 'Service',
                    name: s,
                    areaServed: area.name,
                },
            })),
        },
        sameAs: [
            'https://www.instagram.com/coasttocoastlandscapedesign',
        ],
    };

    return (
        <>
            <Helmet>
                {/* Primary meta */}
                <title>{area.metaTitle}</title>
                <meta name="description" content={area.metaDesc} />
                <meta name="keywords" content={area.keywords} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={area.metaTitle} />
                <meta property="og:description" content={area.metaDesc} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={`${SITE_URL}${area.photo}`} />
                <meta property="og:image:alt" content={area.photoAlt} />
                <meta property="og:site_name" content="Coast to Coast Landscape & Design" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={area.metaTitle} />
                <meta name="twitter:description" content={area.metaDesc} />
                <meta name="twitter:image" content={`${SITE_URL}${area.photo}`} />

                {/* Geo tags */}
                <meta name="geo.region" content={`US-TX`} />
                <meta name="geo.placename" content={`${area.name}, Texas`} />

                {/* JSON-LD structured data */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <main className={styles.page}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className="container">
                        <motion.div
                            className={styles.heroInner}
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link to="/service-areas" className={styles.breadcrumb}>
                                <MapPin size={11} strokeWidth={2} />
                                Service Areas
                            </Link>
                            {/* H1 — primary keyword target */}
                            <h1 className={styles.heroHeadline}>
                                {area.name},&nbsp;<em>{area.state}</em>
                            </h1>
                            <p className={styles.heroTagline}>{area.tagline}</p>
                            <p className={styles.heroBody}>{area.heroBody}</p>
                        </motion.div>
                    </div>
                </section>

                <div className={styles.goldRule} />

                {/* Hero photo */}
                <motion.div
                    className={styles.heroPhoto}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        src={area.photo}
                        alt={area.photoAlt}
                        className={styles.heroPhotoImg}
                        width="1440"
                        height="580"
                        loading="eager"
                        fetchpriority="high"
                    />
                    <div className={styles.heroPhotoOverlay} />
                </motion.div>

                {/* Body + Sidebar */}
                <section className={`section ${styles.bodySection}`} aria-label={`Landscape services in ${area.name}, TX`}>
                    <div className="container">
                        <div className={styles.bodyGrid}>
                            {/* Copy */}
                            <div className={styles.bodyCopy}>
                                {/* H2 — secondary keyword anchor */}
                                <h2 className={styles.sectionHeadline}>
                                    Landscape &amp; Hardscape Design in {area.name}, TX
                                </h2>

                                {area.body.map((para, i) => (
                                    <motion.p
                                        key={i}
                                        className={styles.para}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {para}
                                    </motion.p>
                                ))}

                                <motion.button
                                    onClick={openForm}
                                    className={styles.cta}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    Get a Free Consultation
                                    <ArrowRight size={14} strokeWidth={2} />
                                </motion.button>

                                {/* Inline inquiry form */}
                                <div ref={formRef}>
                                    <AnimatePresence>
                                        {formOpen && (
                                            <motion.div
                                                className={styles.inlineFormWrap}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div className={styles.inlineFormInner}>
                                                    <div className={styles.inlineFormHeader}>
                                                        <div>
                                                            <span className={styles.inlineFormEyebrow}>Start a Project</span>
                                                            <h3 className={styles.inlineFormTitle}>
                                                                Schedule a Consultation in {area.name}
                                                            </h3>
                                                        </div>
                                                        <button
                                                            className={styles.closeBtn}
                                                            onClick={() => setFormOpen(false)}
                                                            aria-label="Close form"
                                                        >
                                                            <X size={18} strokeWidth={1.5} />
                                                        </button>
                                                    </div>

                                                    {success ? (
                                                        <div className={styles.successState}>
                                                            <CheckCircle size={38} strokeWidth={1.5} className={styles.successIcon} />
                                                            <h3 className={styles.successTitle}>Inquiry Received</h3>
                                                            <p className={styles.successText}>
                                                                We'll review your project details and be in touch within one business day.
                                                            </p>
                                                            <button className={styles.resetBtn} onClick={reset}>Submit Another</button>
                                                        </div>
                                                    ) : (
                                                        <form onSubmit={handleSubmit} className={styles.form}>
                                                            <div className={styles.row}>
                                                                <div className={styles.field}>
                                                                    <label className={styles.fieldLabel}>Full Name</label>
                                                                    <input name="name" type="text" required className={styles.input} value={form.name} onChange={handleChange} placeholder="Eloise Hartmann" />
                                                                </div>
                                                                <div className={styles.field}>
                                                                    <label className={styles.fieldLabel}>Email</label>
                                                                    <input name="email" type="email" required className={styles.input} value={form.email} onChange={handleChange} placeholder="eloise@example.com" />
                                                                </div>
                                                            </div>
                                                            <div className={styles.row}>
                                                                <div className={styles.field}>
                                                                    <label className={styles.fieldLabel}>Phone</label>
                                                                    <input name="phone" type="tel" className={styles.input} value={form.phone} onChange={handleChange} placeholder="+1 (361) 316-5251" />
                                                                </div>
                                                                <div className={styles.field}>
                                                                    <label className={styles.fieldLabel}>Project Type</label>
                                                                    <select name="projectType" required className={styles.select} value={form.projectType} onChange={handleChange}>
                                                                        <option value="" disabled>Select type</option>
                                                                        {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={styles.field}>
                                                                <label className={styles.fieldLabel}>Estimated Budget</label>
                                                                <select name="budget" required className={styles.select} value={form.budget} onChange={handleChange}>
                                                                    <option value="" disabled>Select a range</option>
                                                                    <option value="under-10k">Under $10,000</option>
                                                                    <option value="10k-25k">$10,000 – $25,000</option>
                                                                    <option value="25k-50k">$25,000 – $50,000</option>
                                                                    <option value="50k-100k">$50,000 – $100,000</option>
                                                                    <option value="100k-250k+">$100,000 – $250,000+</option>
                                                                </select>
                                                            </div>
                                                            <div className={styles.field}>
                                                                <label className={styles.fieldLabel}>Project Description</label>
                                                                <textarea name="message" rows={4} className={styles.textarea} value={form.message} onChange={handleChange} placeholder="Describe your site, goals, and any materials or styles you have in mind..." />
                                                            </div>
                                                            <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                                                {submitting
                                                                    ? <span className={styles.spinner} />
                                                                    : <><span>Submit Inquiry</span><Send size={14} strokeWidth={2} /></>
                                                                }
                                                            </button>
                                                        </form>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <aside className={styles.sidebar} aria-label="Services and navigation">
                                <div className={styles.sideCard}>
                                    <span className={styles.sideLabel}>Services in {area.name}</span>
                                    <ul className={styles.sideList}>
                                        {area.services.map(s => (
                                            <li key={s} className={styles.sideItem}>{s}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.sideCard}>
                                    <span className={styles.sideLabel}>Explore Services</span>
                                    <ul className={styles.sideList}>
                                        {allServices.map(({ label, href }) => (
                                            <li key={label}>
                                                <Link to={href} className={styles.sideLink}>
                                                    {label}
                                                    <ArrowRight size={11} strokeWidth={2} />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.sideContact}>
                                    <span className={styles.sideLabel}>Contact Us</span>
                                    <a href="tel:+13613165251" className={styles.sidePhone}>{PHONE}</a>
                                    <p className={styles.sideAddr}>{ADDRESS}</p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* CTA Band */}
                <section className={styles.ctaBand} aria-label="Call to action">
                    <div className="container">
                        <div className={styles.ctaInner}>
                            <div>
                                <p className={styles.ctaEyebrow}>Serving {area.name}, TX</p>
                                <h2 className={styles.ctaHeadline}>
                                    Ready to elevate your<br />
                                    <em>outdoor space?</em>
                                </h2>
                            </div>
                            <button className={styles.ctaBtn} onClick={openForm}>
                                Schedule a Consultation
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
