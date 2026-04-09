import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './ScrollStory.module.css';

const panels = [
    {
        phase: [0, 0.28, 0.38],
        label: 'I',
        headline: 'Conceived\nin Stone',
        body: 'Every project begins with the land itself — its grade, its grain, its memory. We read the site before we ever touch a pencil, translating topography into architecture that feels inevitable.',
    },
    {
        phase: [0.32, 0.52, 0.62],
        label: 'II',
        headline: 'Engineered\nfor Permanence',
        body: 'Our process marries structural precision with material intuition. Drainage, load, thermal movement — each calculated so that nothing shifts, cracks, or compromises a decade from now.',
    },
    {
        phase: [0.64, 0.82, 0.94],
        label: 'III',
        headline: 'Built to Last\nGenerations',
        body: 'The finest hardscapes are measured not in seasons but in legacies. We select stone that weathers into beauty, and we stand behind every joint, every course, every courtyard we set.',
    },
];

// ── Desktop panel (hooks-safe, one per panel) ─────────────────────────────
function DesktopPanel({ panel, scrollYProgress }) {
    const [enter, peak, exit] = panel.phase;
    const opacity = useTransform(
        scrollYProgress,
        [enter, peak, exit, exit + 0.08],
        [0, 1, 1, 0]
    );
    const y = useTransform(scrollYProgress, [enter, peak], [40, 0]);
    return (
        <motion.div className={styles.panel} style={{ opacity, y }}>
            <span className={styles.roman}>{panel.label}</span>
            <div className={styles.rule} />
            <h2 className={styles.panelHeadline}>
                {panel.headline.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                ))}
            </h2>
            <p className={styles.panelBody}>{panel.body}</p>
        </motion.div>
    );
}

// ── Desktop: scroll-scrubbed video panel ──────────────────────────────────
function DesktopScrollStory() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();

        let pending = null;
        let rafId = null;

        const seek = (progress) => {
            if (!video.duration || isNaN(video.duration)) return;
            const t = progress * video.duration;
            if (video.fastSeek) {
                video.fastSeek(t);
            } else {
                video.currentTime = t;
            }
            pending = null;
            rafId = null;
        };

        const unsub = scrollYProgress.on('change', (progress) => {
            pending = progress;
            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    if (pending !== null) seek(pending);
                });
            }
        });

        return () => {
            unsub();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [scrollYProgress]);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.sticky}>
                <video
                    ref={videoRef}
                    className={styles.video}
                    src="/scroll_animation.mp4"
                    muted
                    playsInline
                    preload="auto"
                />
                <div className={styles.vignetteTop} />
                <div className={styles.vignette} />
                <div className={styles.vignetteBottom} />

                <div className={styles.overlay}>
                    {panels.map((panel) => (
                        <DesktopPanel
                            key={panel.label}
                            panel={panel}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>

                <motion.div
                    className={styles.progressBar}
                    style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                />
            </div>
        </section>
    );
}

// ── Mobile: static stacked panels with viewport animations ────────────────
function MobileScrollStory() {
    return (
        <section className={styles.mobileSectionWrapper}>
            <div className={styles.mobileBg} />
            <div className={styles.vignetteTop} />
            <div className={styles.vignette} />
            <div className={styles.vignetteBottom} />
            <div className={styles.mobilePanels}>
                {panels.map((panel, i) => (
                    <motion.div
                        key={panel.label}
                        className={styles.panel}
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.roman}>{panel.label}</span>
                        <div className={styles.rule} />
                        <h2 className={styles.panelHeadline}>
                            {panel.headline.split('\n').map((line, idx) => (
                                <React.Fragment key={idx}>{line}{idx === 0 && <br />}</React.Fragment>
                            ))}
                        </h2>
                        <p className={styles.panelBody}>{panel.body}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ── Root: pick desktop vs mobile ──────────────────────────────────────────
export default function ScrollStory() {
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    );

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return isMobile ? <MobileScrollStory /> : <DesktopScrollStory />;
}
