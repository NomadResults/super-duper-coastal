import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 140, damping: 18 }
    }
};

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.bg}>
                <video
                    className={styles.bgVideo}
                    src="/c2c_header.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className={styles.overlay} />
                <div className={styles.vignette} />
                <div className={styles.gradientTop} />
                <div className={styles.gradientBottom} />
            </div>

            <div className={styles.center}>
                <motion.div
                    className={styles.content}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span variants={item} className={styles.badge}>
                        Corpus Christi & the Coastal Bend
                    </motion.span>

                    <motion.h1 variants={item} className={styles.headline}>
                        Outdoor Living,<br />
                        <strong className={styles.headlineBold}>Elevated</strong>
                    </motion.h1>

                    <motion.p variants={item} className={styles.subtext}>
                        Hardscape, landscape, and outdoor kitchen design built for the way
                        South Texas lives — durable, architectural, and built to last.
                    </motion.p>

                    <motion.div variants={item} className={styles.ctaRow}>
                        <a href="#contact" className={styles.ctaBtn}>Request a Consultation</a>
                        <a href="/portfolio" className={styles.ctaBtnGhost}>See Our Work</a>
                    </motion.div>

                    <motion.div variants={item} className={styles.reviewBadge}>
                        <span className={styles.reviewStars}>★★★★★</span>
                        <span className={styles.reviewText}>
                            {import.meta.env.VITE_GOOGLE_RATING ?? '5.0'} · {import.meta.env.VITE_GOOGLE_REVIEW_COUNT ? `${import.meta.env.VITE_GOOGLE_REVIEW_COUNT} Google Reviews` : '5-Star Rated on Google'}
                        </span>
                    </motion.div>
                </motion.div>
            </div>

            <div className={styles.bottomLeft}>
                <div className={styles.goldLine} />
                <span className={styles.estText}>Est. 2024</span>
            </div>
        </section>
    );
}
