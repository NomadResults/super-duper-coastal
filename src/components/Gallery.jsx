import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Gallery.module.css';

const PROJECTS = [
    { id: 1, title: 'Stone Patio & Hardscape', location: 'Corpus Christi, TX', year: '2024', src: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c77095b9c9103d5fe39.png' },
    { id: 2, title: 'Outdoor Living Space', location: 'Rockport, TX', year: '2024', src: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776e306f5b0b63d8cc.png' },
    { id: 3, title: 'Custom Paver Patio', location: 'Portland, TX', year: '2023', src: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c7792b3555384f90322.png' },
    { id: 4, title: 'Landscaping & Beds', location: 'Corpus Christi, TX', year: '2023', src: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776917d28e929fd287.png' },
    { id: 5, title: 'Outdoor Kitchen Build', location: 'Port Aransas, TX', year: '2023', src: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9a07095b9ca106d5afdb.jpg' },
    { id: 6, title: 'Landscape Installation', location: 'Ingleside, TX', year: '2022', src: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b8aa492b355e9fbf61ed8.jpg' },
];

export default function Gallery() {
    const trackRef = useRef(null);

    const scroll = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * 620, behavior: 'smooth' });
    };

    return (
        <section id="work" className={`section ${styles.section}`}>
            <div className={`container ${styles.header}`}>
                <motion.h2
                    className={styles.headline}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                >
                    Featured Works
                </motion.h2>
                <div className={styles.arrows}>
                    <button className={styles.arrowBtn} onClick={() => scroll(-1)} aria-label="Previous">
                        <ChevronLeft size={20} strokeWidth={1.5} />
                    </button>
                    <button className={styles.arrowBtn} onClick={() => scroll(1)} aria-label="Next">
                        <ChevronRight size={20} strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            <div className={styles.track} ref={trackRef}>
                {PROJECTS.map((p, i) => (
                    <motion.div
                        key={p.id}
                        className={styles.card}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ type: 'spring', stiffness: 70, damping: 20, delay: i * 0.06 }}
                    >
                        <div className={styles.imgWrap}>
                            <img src={p.src} alt={p.title} className={styles.img} loading="lazy" />
                        </div>
                        <div className={styles.cardMeta}>
                            <div className={styles.cardLeft}>
                                <span className={styles.cardLoc}>{p.location}</span>
                                <h3 className={styles.cardTitle}>{p.title}</h3>
                            </div>
                            <span className={styles.cardYear}>{p.year}</span>
                        </div>
                        <div className={styles.goldRule} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
