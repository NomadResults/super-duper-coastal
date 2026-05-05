import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Portfolio.module.css';

const CATEGORIES = [
    {
        label: 'Hardscaping',
        photos: [
            { id: 1, title: 'Stone Patio & Retaining Wall', location: 'Corpus Christi, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69f8d6dbca15d8ddc42ec72c.jpg' },
            { id: 2, title: 'Custom Hardscape Design', location: 'Portland, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69f8ddee273a62411d7daad8.jpeg' },
            { id: 3, title: 'Outdoor Living & Stonework', location: 'Rockport, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0052d38dd61887f9f95b.png' },
        ],
    },
    {
        label: 'Landscaping',
        photos: [
            { id: 4, title: 'Coastal Landscape Design', location: 'Port Aransas, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0051becb53a735f918f1.png' },
            { id: 5, title: 'Native Plant Landscaping', location: 'Ingleside, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0052d38dd61887f9f956.png' },
            { id: 6, title: 'Full Property Landscape Build', location: 'Calallen, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0e853637549c491b7780.png' },
        ],
    },
    {
        label: 'Outdoor Kitchens',
        photos: [
            { id: 7, title: 'Full Outdoor Kitchen Build', location: 'Rockport, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11becb53a735fc5fe0.png' },
            { id: 8, title: 'Custom Outdoor Kitchen & Bar', location: 'Corpus Christi, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11becb53a735fc5fd2.png' },
            { id: 9, title: 'Pergola & Outdoor Kitchen', location: 'Portland, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11a7386fa30896c875.png' },
        ],
    },
    {
        label: 'Turf',
        photos: [
            { id: 10, title: 'Premium Synthetic Turf Install', location: 'Corpus Christi, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e696effa7019112a00.jpg' },
            { id: 11, title: 'Backyard Turf Transformation', location: 'Flour Bluff, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e798d76f73a11f7d73.jpeg' },
            { id: 12, title: 'Artificial Turf & Stone Border', location: 'Rockport, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e696effa70191129fe.jpeg' },
            { id: 13, title: 'Low-Maintenance Turf Install', location: 'Portland, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e6a7386fa30893eaff.jpeg' },
        ],
    },
    {
        label: 'Lighting',
        photos: [
            { id: 14, title: 'Architectural Lighting System', location: 'Portland, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b407167fd9a35845675.png' },
            { id: 15, title: 'Landscape Uplighting Design', location: 'Corpus Christi, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b40becb53a735fc2440.png' },
            { id: 16, title: 'Evening Pathway Lighting', location: 'Ingleside, TX', img: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b40becb53a735fc2447.png' },
        ],
    },
];

export default function Portfolio() {
    const [openSections, setOpenSections] = useState({ Hardscaping: true });
    const [lightbox, setLightbox] = useState(null); // { catIdx, photoIdx }

    const toggleSection = (label) => {
        setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const openLightbox = (catIdx, photoIdx) => setLightbox({ catIdx, photoIdx });
    const closeLightbox = () => setLightbox(null);

    const navigate = useCallback((dir) => {
        if (!lightbox) return;
        const photos = CATEGORIES[lightbox.catIdx].photos;
        const next = (lightbox.photoIdx + dir + photos.length) % photos.length;
        setLightbox({ ...lightbox, photoIdx: next });
    }, [lightbox]);

    useEffect(() => {
        if (!lightbox) return;
        const onKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox, navigate]);

    useEffect(() => {
        document.body.style.overflow = lightbox ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [lightbox]);

    const currentPhoto = lightbox
        ? CATEGORIES[lightbox.catIdx].photos[lightbox.photoIdx]
        : null;

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

            {/* Accordion sections */}
            <section className={styles.body}>
                <div className="container">
                    {CATEGORIES.map((cat, catIdx) => (
                        <div key={cat.label} className={styles.accordion}>
                            <button
                                className={styles.accordionHeader}
                                onClick={() => toggleSection(cat.label)}
                                aria-expanded={!!openSections[cat.label]}
                            >
                                <span className={styles.accordionLabel}>{cat.label}</span>
                                <span className={styles.accordionMeta}>{cat.photos.length} projects</span>
                                <ChevronDown
                                    size={18}
                                    strokeWidth={1.5}
                                    className={`${styles.chevron} ${openSections[cat.label] ? styles.chevronOpen : ''}`}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {openSections[cat.label] && (
                                    <motion.div
                                        key="body"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        className={styles.accordionBody}
                                    >
                                        <div className={styles.photoGrid}>
                                            {cat.photos.map((photo, photoIdx) => (
                                                <button
                                                    key={photo.id}
                                                    className={styles.photoCard}
                                                    onClick={() => openLightbox(catIdx, photoIdx)}
                                                    aria-label={`View ${photo.title}`}
                                                >
                                                    <div className={styles.imgWrap}>
                                                        <img
                                                            src={photo.img}
                                                            alt={photo.title}
                                                            className={styles.img}
                                                            loading="lazy"
                                                        />
                                                        <div className={styles.overlay}>
                                                            <span className={styles.overlayLabel}>View Full</span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.cardInfo}>
                                                        <h3 className={styles.cardTitle}>{photo.title}</h3>
                                                        <span className={styles.cardLocation}>{photo.location}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* CTA */}
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

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && currentPhoto && (
                    <motion.div
                        className={styles.lightboxOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeLightbox}
                    >
                        <motion.div
                            className={styles.lightboxContent}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={currentPhoto.img}
                                alt={currentPhoto.title}
                                className={styles.lightboxImg}
                            />
                            <div className={styles.lightboxCaption}>
                                <span className={styles.lightboxTitle}>{currentPhoto.title}</span>
                                <span className={styles.lightboxLocation}>{currentPhoto.location}</span>
                            </div>
                        </motion.div>

                        <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
                            <X size={22} strokeWidth={1.5} />
                        </button>

                        {CATEGORIES[lightbox.catIdx].photos.length > 1 && (
                            <>
                                <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); navigate(-1); }} aria-label="Previous">
                                    <ChevronLeft size={28} strokeWidth={1.5} />
                                </button>
                                <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); navigate(1); }} aria-label="Next">
                                    <ChevronRight size={28} strokeWidth={1.5} />
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
