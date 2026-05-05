import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './Portfolio.module.css';

const FILTERS = ['All', 'Hardscaping', 'Outdoor Kitchens', 'Landscaping', 'Lighting', 'Turf'];

const PROJECTS = [
    {
        id: 1,
        title: 'Stone Patio & Retaining Wall',
        tag: 'Hardscaping',
        location: 'Corpus Christi, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69f8d6dbca15d8ddc42ec72c.jpg',
    },
    {
        id: 2,
        title: 'Custom Hardscape Design',
        tag: 'Hardscaping',
        location: 'Portland, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69f8ddee273a62411d7daad8.jpeg',
    },
    {
        id: 3,
        title: 'Outdoor Living & Stonework',
        tag: 'Hardscaping',
        location: 'Rockport, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0052d38dd61887f9f95b.png',
    },
    {
        id: 4,
        title: 'Coastal Landscape Design',
        tag: 'Landscaping',
        location: 'Port Aransas, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0051becb53a735f918f1.png',
    },
    {
        id: 5,
        title: 'Native Plant Landscaping',
        tag: 'Landscaping',
        location: 'Ingleside, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0052d38dd61887f9f956.png',
    },
    {
        id: 6,
        title: 'Full Property Landscape Build',
        tag: 'Landscaping',
        location: 'Calallen, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0e853637549c491b7780.png',
    },
    {
        id: 7,
        title: 'Full Outdoor Kitchen Build',
        tag: 'Outdoor Kitchens',
        location: 'Rockport, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11becb53a735fc5fe0.png',
    },
    {
        id: 8,
        title: 'Custom Outdoor Kitchen & Bar',
        tag: 'Outdoor Kitchens',
        location: 'Corpus Christi, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11becb53a735fc5fd2.png',
    },
    {
        id: 9,
        title: 'Pergola & Outdoor Kitchen',
        tag: 'Outdoor Kitchens',
        location: 'Portland, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11a7386fa30896c875.png',
    },
    {
        id: 10,
        title: 'Premium Synthetic Turf Install',
        tag: 'Turf',
        location: 'Corpus Christi, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e696effa7019112a00.jpg',
    },
    {
        id: 11,
        title: 'Backyard Turf Transformation',
        tag: 'Turf',
        location: 'Flour Bluff, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e798d76f73a11f7d73.jpeg',
    },
    {
        id: 12,
        title: 'Artificial Turf & Stone Border',
        tag: 'Turf',
        location: 'Rockport, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e696effa70191129fe.jpeg',
    },
    {
        id: 13,
        title: 'Low-Maintenance Turf Install',
        tag: 'Turf',
        location: 'Portland, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e6a7386fa30893eaff.jpeg',
    },
    {
        id: 14,
        title: 'Architectural Lighting System',
        tag: 'Lighting',
        location: 'Portland, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b407167fd9a35845675.png',
    },
    {
        id: 15,
        title: 'Landscape Uplighting Design',
        tag: 'Lighting',
        location: 'Corpus Christi, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b40becb53a735fc2440.png',
    },
    {
        id: 16,
        title: 'Evening Pathway Lighting',
        tag: 'Lighting',
        location: 'Ingleside, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b40becb53a735fc2447.png',
    },
    {
        id: 6,
        title: 'Stone Patio & Outdoor Living Space',
        tag: 'Hardscaping',
        location: 'Calallen, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9a07095b9ca106d5afdb.jpg',
    },
];

export default function Portfolio() {
    const [active, setActive] = useState('All');

    const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tag === active);

    return (
        <main className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroInner}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.label}>Our Work</span>
                        <h1 className={styles.headline}>Built to Last,<br /><em>Designed to Impress</em></h1>
                    </motion.div>
                </div>
            </section>

            <div className={styles.goldRule} />

            {/* Project grid */}
            <section className={styles.body}>
                <div className="container">

                    {/* Filter row */}
                    <div className={styles.filterRow}>
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                className={`${styles.filterBtn} ${active === f ? styles.filterBtnActive : ''}`}
                                onClick={() => setActive(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className={styles.grid}>
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className={styles.card}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                            >
                                <div className={styles.imgWrap}>
                                    <img src={project.img} alt={project.title} className={styles.img} loading="lazy" />
                                    <div className={styles.overlay}>
                                        <span className={styles.overlayLabel}>View Project</span>
                                    </div>
                                </div>
                                <div className={styles.cardInfo}>
                                    <span className={styles.cardTag}>{project.tag}</span>
                                    <h3 className={styles.cardTitle}>{project.title}</h3>
                                    <span className={styles.cardLocation}>{project.location}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA below grid */}
                    <motion.div
                        className={styles.gridCta}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className={styles.gridCtaNote}>Ready to add your project to this portfolio?</p>
                        <a href="/#contact" className={styles.gridCtaBtn}>
                            Start Your Project <ArrowRight size={14} strokeWidth={2} />
                        </a>
                    </motion.div>

                </div>
            </section>

            {/* CTA band */}
            <section className={styles.ctaBand}>
                <div className="container">
                    <div className={styles.ctaInner}>
                        <div>
                            <p className={styles.ctaEyebrow}>Ready to get started?</p>
                            <h2 className={styles.ctaHeadline}>Let's build your <em>outdoor space.</em></h2>
                        </div>
                        <a href="/#contact" className={styles.ctaBtn}>Schedule a Consultation</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
