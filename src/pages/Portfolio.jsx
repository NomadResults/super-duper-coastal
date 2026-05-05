import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/portfolioData';
import styles from './Portfolio.module.css';

export default function Portfolio() {
    return (
        <main className={styles.page}>
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

            <section className={styles.body}>
                <div className="container">
                    <div className={styles.grid}>
                        {CATEGORIES.map(({ slug, label, cover }, i) => (
                            <motion.div
                                key={slug}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                            >
                                <Link to={`/portfolio/${slug}`} className={styles.card}>
                                    <div className={styles.imgWrap}>
                                        <img src={cover} alt={label} className={styles.img} loading="lazy" />
                                        <div className={styles.overlay}>
                                            <span className={styles.overlayLabel}>View Projects <ArrowRight size={12} strokeWidth={2} /></span>
                                        </div>
                                    </div>
                                    <h3 className={styles.cardTitle}>{label}</h3>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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
