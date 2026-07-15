import React from 'react';
import { motion } from 'framer-motion';
import ServicesSection from '../components/ServicesSection';
import Seo from '../components/Seo';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
    return (
        <main className={styles.page}>
            <Seo
                title="Outdoor Living Services in Corpus Christi, TX | Coast to Coast Landscape & Design"
                description="Stone patios, outdoor kitchens, landscape lighting, landscaping, artificial turf, and Vuba resin-bound stone — one design-build team serving Corpus Christi and the Coastal Bend."
                path="/services"
            />

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroInner}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.eyebrow}>What We Build</span>
                        <h1 className={styles.headline}>
                            Outdoor Living,<br />
                            <em>Crafted for the Coast</em>
                        </h1>
                        <p className={styles.heroBody}>
                            Six core services. One design-build philosophy. Every project is conceived with architectural precision and built to perform in South Texas conditions for decades.
                        </p>
                    </motion.div>
                </div>
                <div className={styles.heroBg} />
            </section>

            {/* ── Shared grid + CTA (header hidden — hero already covers it) ── */}
            <ServicesSection showHeader={false} showCta={true} />
        </main>
    );
}
