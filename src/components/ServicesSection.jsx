import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './ServicesSection.module.css';

export const SERVICES = [
    {
        id: '01',
        title: 'Stone Patios & Hardscaping',
        tagline: 'The Foundation of Your Outdoor Space',
        description:
            "Custom patios, walkways, driveways, and retaining walls built from travertine, limestone, flagstone, and concrete pavers. Designed for South Texas conditions — architecturally precise, structurally sound, and built to outlast the climate.",
        href: '/services/stone-patios',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eee92b355b801f96d35.png',
    },
    {
        id: '02',
        title: 'Outdoor Kitchens',
        tagline: 'Entertainment-Grade Outdoor Cooking',
        description:
            "Full outdoor kitchen builds designed around your cooking style and social space. Stone-clad counters, premium grill stations, refrigeration, and bar seating — engineered for the Coastal Bend lifestyle and built to handle the elements.",
        href: '/services/outdoor-kitchens',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eeedc2a5419d8819491.png',
    },
    {
        id: '03',
        title: 'Outdoor Lighting',
        tagline: 'Architecture After Dark',
        description:
            "Architectural lighting systems that transform your property from dusk onward. Path lighting, uplighting, and precision accent fixtures — all spec'd for coastal humidity, UV exposure, and long-term performance with zero compromise on aesthetics.",
        href: '/services/outdoor-lighting',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eeedc2a54804d819490.png',
    },
    {
        id: '04',
        title: 'Landscaping',
        tagline: 'Designed to Perform in South Texas',
        description:
            "Native and adaptive plantings, drainage solutions, and structured beds engineered for South Texas heat, salt air, and storm season. Built to perform year-round — not just look good on day one.",
        href: '/services/landscaping',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776fadaac0b25cdf11.png',
    },
    {
        id: '05',
        title: 'Artificial Turf',
        tagline: 'Lush, Low-Maintenance, All Year',
        description:
            "Premium synthetic turf systems installed with proper base prep, infill, and drainage for a natural look that survives South Texas heat without the maintenance. Full backyard replacements, play areas, and custom putting greens.",
        href: '/services/artificial-turf',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776fadaad84c5cdf12.png',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Shared services grid block.
 * showHeader  — renders the "What We Build" eyebrow + headline (default true)
 * showCta     — renders the bottom navy CTA band (default true)
 */
export default function ServicesSection({ showHeader = true, showCta = true }) {
    return (
        <>
            <div className={styles.goldRule} />

            {/* ── Section Header ── */}
            {showHeader && (
                <div className={styles.sectionHeader}>
                    <div className="container">
                        <motion.div
                            className={styles.headerInner}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className={styles.eyebrow}>What We Build</span>
                            <h2 className={styles.sectionHeadline}>
                                Outdoor Living,{' '}
                                <em>Crafted for the Coast</em>
                            </h2>
                            <p className={styles.sectionBody}>
                                Five core services. One design-build philosophy. Every project is conceived with architectural precision and built to perform in South Texas conditions for decades.
                            </p>
                        </motion.div>
                    </div>
                </div>
            )}

            {/* ── Services Grid ── */}
            <section className={styles.servicesSection} id="services-overview">
                <div className="container">
                    <motion.div
                        className={styles.grid}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.05 }}
                    >
                        {SERVICES.map((svc, i) => (
                            <motion.div key={svc.id} variants={cardVariants} className={styles.card}>
                                <Link to={svc.href} className={styles.cardLink}>
                                    <div className={styles.cardImgWrap}>
                                        <img
                                            src={svc.image}
                                            alt={svc.title}
                                            className={styles.cardImg}
                                            loading="lazy"
                                        />
                                        <div className={styles.cardImgOverlay} />
                                        <span className={styles.cardNum}>{svc.id}</span>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.cardText}>
                                            <span className={styles.cardTagline}>{svc.tagline}</span>
                                            <h3 className={styles.cardTitle}>{svc.title}</h3>
                                            <p className={styles.cardDesc}>{svc.description}</p>
                                        </div>
                                        <span className={styles.cardCta}>
                                            Explore Service
                                            <ArrowRight size={13} strokeWidth={2} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA Band ── */}
            {showCta && (
                <section className={styles.ctaBand}>
                    <div className="container">
                        <div className={styles.ctaInner}>
                            <div>
                                <p className={styles.ctaEyebrow}>Ready to get started?</p>
                                <h2 className={styles.ctaHeadline}>
                                    Let's design your<br />
                                    <em>outdoor environment.</em>
                                </h2>
                            </div>
                            <a href="/#contact" className={styles.ctaBtn}>
                                Schedule a Consultation
                            </a>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
