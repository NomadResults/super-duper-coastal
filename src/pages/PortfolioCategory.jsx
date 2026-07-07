import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/portfolioData';
import Seo from '../components/Seo';
import styles from './PortfolioCategory.module.css';

export default function PortfolioCategory() {
    const { slug } = useParams();
    const category = CATEGORIES.find((c) => c.slug === slug);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    if (!category) {
        return (
            <main className={styles.page}>
                <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                    <p>Category not found.</p>
                    <Link to="/portfolio">Back to Portfolio</Link>
                </div>
            </main>
        );
    }

    const { label, photos } = category;

    const prev = () => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
    const next = () => setLightboxIndex((i) => (i + 1) % photos.length);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape') setLightboxIndex(null);
    };

    return (
        <main className={styles.page}>
            <Seo
                title={`${label} Projects in Corpus Christi, TX | Coast to Coast Landscape & Design`}
                description={`Completed ${label.toLowerCase()} projects by Coast to Coast Landscape & Design across Corpus Christi and the Coastal Bend.`}
                path={`/portfolio/${slug}`}
                image={photos[0]?.img}
            />
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroInner}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link to="/portfolio" className={styles.back}>
                            <ArrowLeft size={13} strokeWidth={2} /> All Projects
                        </Link>
                        <span className={styles.label}>Portfolio</span>
                        <h1 className={styles.headline}><em>{label}</em></h1>
                    </motion.div>
                </div>
            </section>

            <div className={styles.goldRule} />

            {/* Photo grid */}
            <section className={styles.body}>
                <div className="container">
                    <div className={styles.grid}>
                        {photos.map((photo, i) => (
                            <motion.button
                                key={i}
                                className={styles.card}
                                onClick={() => setLightboxIndex(i)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                                aria-label={`View ${photo.title}`}
                            >
                                <div className={styles.imgWrap}>
                                    <img src={photo.img} alt={photo.title} className={styles.img} loading="lazy" />
                                    <div className={styles.overlay}>
                                        <span className={styles.overlayLabel}>View Full Size</span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA band */}
            <section className={styles.ctaBand}>
                <div className="container">
                    <div className={styles.ctaInner}>
                        <div>
                            <p className={styles.ctaEyebrow}>Like what you see?</p>
                            <h2 className={styles.ctaHeadline}>Let's build your <em>outdoor space.</em></h2>
                        </div>
                        <a href="/#contact" className={styles.ctaBtn}>Get A Quote</a>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setLightboxIndex(null)}
                        onKeyDown={handleKeyDown}
                        tabIndex={-1}
                    >
                        <button className={styles.lbClose} onClick={() => setLightboxIndex(null)} aria-label="Close">
                            <X size={22} strokeWidth={1.5} />
                        </button>

                        {photos.length > 1 && (
                            <>
                                <button className={`${styles.lbArrow} ${styles.lbPrev}`} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
                                    <ChevronLeft size={28} strokeWidth={1.5} />
                                </button>
                                <button className={`${styles.lbArrow} ${styles.lbNext}`} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
                                    <ChevronRight size={28} strokeWidth={1.5} />
                                </button>
                            </>
                        )}

                        <motion.img
                            key={lightboxIndex}
                            src={photos[lightboxIndex].img}
                            alt={photos[lightboxIndex].title}
                            className={styles.lbImg}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />

                        <p className={styles.lbCaption}>{photos[lightboxIndex].title}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
