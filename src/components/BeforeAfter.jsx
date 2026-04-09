import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight, ArrowRight } from 'lucide-react';
import styles from './BeforeAfter.module.css';

const BEFORE_IMG = 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9a07095b9ca106d5afdb.jpg';
const AFTER_IMG  = 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69063c713081bc07773b8137.png';

export default function BeforeAfter() {
    const [position, setPosition] = useState(50);
    const dragging = useRef(false);
    const wrapRef = useRef(null);

    const calcPosition = useCallback((clientX) => {
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPosition(Math.min(95, Math.max(5, pct)));
    }, []);

    const onPointerDown = (e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onPointerMove = useCallback((e) => {
        if (!dragging.current) return;
        calcPosition(e.clientX);
    }, [calcPosition]);

    const onPointerUp = () => { dragging.current = false; };

    // Also allow clicking anywhere on the slider wrap to jump position
    const onWrapClick = (e) => {
        if (e.target === wrapRef.current || wrapRef.current?.contains(e.target)) {
            calcPosition(e.clientX);
        }
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                >
                    <span className={styles.eyebrow}>Our Work</span>
                    <h2 className={styles.heading}>The Transformation</h2>
                    <p className={styles.sub}>Drag to reveal the difference a single project makes.</p>
                </motion.div>

                <motion.div
                    className={styles.sliderWrap}
                    ref={wrapRef}
                    onClick={onWrapClick}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* After image — full width, underneath */}
                    <img src={AFTER_IMG} alt="After" className={styles.imgAfter} draggable={false} />

                    {/* Before image — clipped from right */}
                    <img
                        src={BEFORE_IMG}
                        alt="Before"
                        className={styles.imgBefore}
                        draggable={false}
                        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                    />

                    {/* Labels */}
                    <span className={`${styles.label} ${styles.labelBefore}`}>Before</span>
                    <span className={`${styles.label} ${styles.labelAfter}`}>After</span>

                    {/* Divider + handle */}
                    <div
                        className={styles.divider}
                        style={{ left: `${position}%` }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                    >
                        <div className={styles.handle}>
                            <ChevronsLeftRight size={18} strokeWidth={2} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.footer}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <p className={styles.footerNote}>
                        This Corpus Christi backyard went from bare concrete to a full outdoor living space in 6 weeks.
                    </p>
                    <a href="/portfolio" className={styles.footerCta}>
                        See More Transformations <ArrowRight size={13} strokeWidth={2} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
