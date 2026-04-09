import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './Capabilities.module.css';

const SERVICES = [
    {
        id: '01',
        title: 'Stone Patios & Hardscaping',
        description:
            "Natural stone, pavers, and concrete designed to hold up against South Texas heat, storms, and salt air — and still look exceptional years after installation.",
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eee92b355b801f96d35.png',
    },
    {
        id: '02',
        title: 'Outdoor Kitchens',
        description:
            'Custom outdoor kitchens built for the Coastal Bend lifestyle — full cooking stations, stone-clad counters, and entertainment spaces designed around how you actually use your yard.',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eeedc2a5419d8819491.png',
    },
    {
        id: '03',
        title: 'Outdoor Lighting',
        description:
            'Architectural lighting systems that extend your outdoor living well past sunset — path lighting, uplighting, and accent fixtures that are built for coastal humidity and UV exposure.',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eeedc2a54804d819490.png',
    },
    {
        id: '04',
        title: 'Landscaping',
        description:
            'Native and adaptive plantings, drainage solutions, and structured beds designed to perform through South Texas heat, coastal wind, and storm season — not just look good on day one.',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776fadaac0b25cdf11.png',
    },
    {
        id: '05',
        title: 'Artificial Turf',
        description:
            'Premium synthetic turf installations built for South Texas — no irrigation, no mowing, and a surface that stays green through drought, salt air, and heavy use year-round.',
        image: 'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776fadaad84c5cdf12.png',
    },
];

export default function Capabilities() {
    return (
        <section id="services" className={`section ${styles.section}`}>
            <div className="container">
                <motion.div
                    className={styles.sectionHeader}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                >
                    <h2 className={styles.sectionTitle}>The Craft</h2>
                    <span className={styles.sectionLabel}>Our Expertise</span>
                </motion.div>

                <div className={styles.list}>
                    {SERVICES.map((svc, i) => (
                        <motion.div
                            key={svc.id}
                            className={`${styles.row} ${i % 2 !== 0 ? styles.reversed : ''}`}
                            initial={{ opacity: 0, y: 36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ type: 'spring', stiffness: 70, damping: 20, delay: 0.08 }}
                        >
                            <div className={`${styles.imgWrap} ${i % 2 !== 0 ? styles.accentTopLeft : styles.accentBottomRight}`}>
                                <img src={svc.image} alt={svc.title} className={styles.img} loading="lazy" />
                            </div>

                            <div className={styles.copy}>
                                <span className={styles.ghostNum}>{svc.id}</span>
                                <h3 className={styles.title}>{svc.title}</h3>
                                <p className={styles.desc}>{svc.description}</p>
                                <a href="#contact" className={styles.link}>
                                    Explore Design
                                    <ArrowRight size={15} strokeWidth={1.5} className={styles.linkArrow} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
