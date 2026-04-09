import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Layers, Star, ArrowRight } from 'lucide-react';
import styles from './WhyUs.module.css';

const CARDS = [
    {
        icon: ShieldCheck,
        title: 'Licensed & Insured',
        body: 'Fully licensed and insured for all residential and commercial hardscape and landscape work across Texas. Every project is backed by proper credentials — no shortcuts.',
    },
    {
        icon: MapPin,
        title: 'Local Expertise',
        body: 'Born and built in Corpus Christi. We know the soil, the salt air, the seasons, and exactly what your Coastal Bend property needs to look exceptional year-round.',
    },
    {
        icon: Layers,
        title: 'Design-Build Under One Roof',
        body: 'From the first sketch to the final installation, one team handles everything. No subcontractors. No miscommunication. No compromises on quality.',
    },
    {
        icon: Star,
        title: 'Guaranteed Craftsmanship',
        body: 'Every project comes backed by our workmanship guarantee. We stand behind what we build — long after the job is done and the crew has left.',
        guarantee: 'Covers labor & materials for 2 years post-installation.',
    },
];

export default function WhyUs() {
    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                >
                    <span className={styles.eyebrow}>Why Coast to Coast</span>
                    <h2 className={styles.heading}>The Standard We Hold Ourselves To</h2>
                </motion.div>

                <div className={styles.grid}>
                    {CARDS.map((card, i) => (
                        <motion.div
                            key={card.title}
                            className={styles.card}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.1 }}
                        >
                            <div className={styles.iconWrap}>
                                <card.icon size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardBody}>{card.body}</p>
                            {card.guarantee && (
                                <p className={styles.guaranteeNote}>{card.guarantee}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.ctaRow}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
                >
                    <a href="/#contact" className={styles.ctaLink}>
                        Have questions? Let's talk <ArrowRight size={13} strokeWidth={2} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
