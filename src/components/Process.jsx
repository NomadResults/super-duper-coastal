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
        timeline: 'Response within 1 business day',
        cta: 'Get A Quote',
        href: '/#contact',
    },
    {
        num: 'II',
        Icon: CalendarCheck,
        title: 'Schedule Your Estimate',
        desc: "We'll arrange an in-person property visit at a time that works for you. We assess your space, discuss materials, and provide a detailed estimate — no surprises.",
        timeline: 'On-site estimate within 5–7 days',
        cta: 'Get A Quote',
        href: '/#contact',
    },
    {
        num: 'III',
        Icon: HardHat,
        title: 'Get The Job Done',
        desc: "After you approve the plan, we schedule your build and get to work. Our team handles everything — delivering the finished outdoor environment you envisioned.",
        timeline: 'Typical build: 4–8 weeks',
        cta: 'Get A Quote',
        href: '/#contact',
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
                    <span className={styles.label}>The Journey</span>
                    <h2 className={styles.headline}>Refined Precision</h2>
                    <div className={styles.vertLine} />
                </motion.div>

                <div className={styles.steps}>
                    {STEPS.map(({ num, Icon, title, desc, timeline, cta, href }, i) => (
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
                            <a href={href} className={styles.stepCta}>
                                {cta} &rarr;
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
