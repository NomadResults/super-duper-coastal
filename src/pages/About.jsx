import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import OurStorySection from '../components/OurStorySection';
import Seo from '../components/Seo';

export default function About() {
    return (
        <main className={styles.page}>
            <Seo
                title="About Us — Design-Build Outdoor Living | Coast to Coast Landscape & Design"
                description="Corpus Christi–based design-build firm creating stone patios, outdoor kitchens, and landscapes engineered for Gulf Coast conditions. One team from concept to completion."
                path="/about"
            />
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroInner}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.label}>Our Story</span>
                        <h1 className={styles.headline}>Built for the Coastal Bend</h1>
                    </motion.div>
                </div>
            </section>

            <div className={styles.goldRule} />

            {/* Page hero already says "Built for the Coastal Bend" — skip the section's own intro */}
            <OurStorySection showIntro={false} />

            {/* CTA band */}
            <section className={styles.ctaBand}>
                <div className="container">
                    <div className={styles.ctaInner}>
                        <div>
                            <p className={styles.ctaEyebrow}>Ready to get started?</p>
                            <h2 className={styles.ctaHeadline}>Let's design your outdoor space.</h2>
                        </div>
                        <a href="/#contact" className={styles.ctaBtn}>Request a Consultation</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
