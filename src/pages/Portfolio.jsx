import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './Portfolio.module.css';

const FILTERS = ['All', 'Hardscaping', 'Outdoor Kitchens', 'Landscaping', 'Lighting', 'Turf'];

const PROJECTS = [
    {
        id: 1,
        title: 'Travertine Patio & Retaining Wall',
        tag: 'Hardscaping',
        location: 'Corpus Christi, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69063c713081bc07773b8137.png',
    },
    {
        id: 2,
        title: 'Full Outdoor Kitchen Build',
        tag: 'Outdoor Kitchens',
        location: 'Rockport, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eee92b355b801f96d35.png',
    },
    {
        id: 3,
        title: 'Coastal Landscape Design',
        tag: 'Landscaping',
        location: 'Port Aransas, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9a07095b9ca106d5afdb.jpg',
    },
    {
        id: 4,
        title: 'Architectural Lighting System',
        tag: 'Lighting',
        location: 'Portland, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eee92b355b801f96d35.png',
    },
    {
        id: 5,
        title: 'Premium Synthetic Turf Install',
        tag: 'Turf',
        location: 'Corpus Christi, TX',
        img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69063c713081bc07773b8137.png',
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
