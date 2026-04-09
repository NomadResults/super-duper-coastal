import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import OurStorySection from '../components/OurStorySection';

export default function About() {
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
                        <span className={styles.label}>Our Story</span>
                        <h1 className={styles.headline}>Built for the Coastal Bend</h1>
                    </motion.div>
                </div>
            </section>

            <div className={styles.goldRule} />

            <OurStorySection />

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
