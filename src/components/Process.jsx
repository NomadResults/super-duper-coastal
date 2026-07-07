import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CalendarCheck, HardHat, Clock } from 'lucide-react';
import styles from './Process.module.css';

const STEPS = [
    {
        num: 'I',
        Icon: MessageSquare,
        title: 'Contact Us',
        desc: "Start by reaching out to share your Landscape Design & Build vision with us. No lengthy forms — just a real conversation about what you want to create.",
        timeline: 'Response within one business day',
    },
    {
        num: 'II',
        Icon: CalendarCheck,
        title: 'Schedule Your Estimate',
        desc: "We'll arrange an in-person property visit at a time that works for you. We assess your space, discuss materials, and provide a detailed estimate — no surprises.",
        timeline: 'On-site estimate within 1–3 business days',
    },
    {
        num: 'III',
        Icon: HardHat,
        title: 'Get The Job Done',
        desc: "After you approve the plan, we schedule your build and get to work. Our team handles everything — delivering the finished outdoor environment you envisioned.",
        timeline: 'Typical build: 2–8 weeks (weather permitting)',
    },
];

export default function Process() {
    return (
        <section id="process" className={`section ${styles.section}`}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                >
                    <span className={styles.label}>How It Works</span>
                    <h2 className={styles.headline}>From First Call to<br />Final Walkthrough</h2>
                    <div className={styles.vertLine} />
                </motion.div>

                <div className={styles.steps}>
                    {STEPS.map(({ num, Icon, title, desc, timeline }, i) => (
                        <motion.div
                            key={num}
                            className={styles.step}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ type: 'spring', stiffness: 70, damping: 20, delay: i * 0.1 }}
                        >
                            <div className={styles.iconBox}>
                                <Icon size={40} strokeWidth={1} />
                            </div>
                            <h3 className={styles.stepTitle}>{num}. {title}</h3>
                            <p className={styles.stepDesc}>{desc}</p>
                            <div className={styles.stepTimeline}>
                                <Clock size={11} strokeWidth={2} />
                                {timeline}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.ctaRow}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                >
                    <a href="/#contact" className={styles.stepCta}>
                        Get A Quote &rarr;
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
