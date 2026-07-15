import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PhotoGallery.module.css';

/**
 * Shared project gallery: featured-first photo grid with a full-screen lightbox.
 * `photos` is an array of { img, title } (portfolioData shape).
 */
export default function PhotoGallery({ photos = [], label = 'Project' }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    if (photos.length === 0) return null;

    const prev = () => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
    const next = () => setLightboxIndex((i) => (i + 1) % photos.length);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape') setLightboxIndex(null);
    };

    const titleOf = (photo, i) => photo.title || `${label} project ${i + 1}`;

    return (
        <>
            <div className={styles.photoGrid}>
                {photos.map((photo, i) => (
                    <motion.button
                        key={i}
                        className={`${styles.photoWrap} ${i === 0 ? styles.photoFeatured : ''}`}
                        onClick={() => setLightboxIndex(i)}
                        initial={{ opacity: 0, y: 40, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ scale: 1.025 }}
                        aria-label={`View ${titleOf(photo, i)} full size`}
                    >
                        <img src={photo.img} alt={titleOf(photo, i)} className={styles.photoImg} loading="lazy" />
                        <div className={styles.photoGlow} />
                        <div className={styles.overlay}>
                            <span className={styles.overlayLabel}>View Full Size</span>
                        </div>
                    </motion.button>
                ))}
            </div>

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
                            alt={titleOf(photos[lightboxIndex], lightboxIndex)}
                            className={styles.lbImg}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />

                        <p className={styles.lbCaption}>{titleOf(photos[lightboxIndex], lightboxIndex)}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
