import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, MapPin, Star } from 'lucide-react';
import styles from './OurStorySection.module.css';

const VALUES = [
    { icon: ShieldCheck, label: 'Licensed & Insured',     stat: '100%',   sub: 'Credentialed & Covered' },
    { icon: MapPin,      label: 'Corpus Christi Based',   stat: 'Local',  sub: 'Coastal Bend Experts' },
    { icon: Star,        label: 'Workmanship Guarantee',  stat: '★★★★★', sub: 'Backed by Our Name' },
];

export default function OurStorySection({ showValues = true }) {
    return (
        <>
            {/* Story */}
            <section className={`section ${styles.storySection}`}>
                <div className="container">
                    <div className={styles.storyGrid}>
                        <motion.div
                            className={styles.storyCopy}
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className={styles.eyebrow}>Our Story</span>
                            <h2 className={styles.storyHeadline}>Built for the Coastal Bend</h2>
                            <p className={styles.para}>
                                Coast to Coast Landscape &amp; Design was founded in 2024 with a single conviction: South Texas homeowners deserve the same level of outdoor design craftsmanship as anywhere else in the country — built specifically for the demands of the Gulf Coast environment.
                            </p>
                            <p className={styles.para}>
                                We're based in Corpus Christi and we serve the Coastal Bend exclusively. That focus isn't a limitation — it's a commitment. We know the soil composition, the salt air, the heat cycles, and the storm patterns that shape every design decision we make. That local knowledge is built into every project we deliver.
                            </p>
                            <p className={styles.para}>
                                Our design-build model means one team handles everything from first consultation through final installation. No subcontractors. No miscommunication between designers and crews. No dilution of the vision between concept and reality.
                            </p>
                            <p className={`${styles.para} ${styles.pullQuote}`}>
                                We don't build projects. We build the outdoor environments our clients will live in for decades.
                            </p>
                            <a href="/#contact" className={styles.cta}>
                                Start a Conversation
                                <ArrowRight size={14} strokeWidth={2} />
                            </a>
                        </motion.div>

                        <motion.div
                            className={styles.storyImage}
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        >
                            <img
                                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9eee92b355b801f96d35.png"
                                alt="Coast to Coast Landscape & Design project"
                                className={styles.img}
                                loading="lazy"
                            />
                            <div className={styles.imgGlow} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            {showValues && (
                <section className={`section ${styles.valuesSection}`}>
                    <div className="container">
                        <motion.div
                            className={styles.valuesHeader}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                        >
                            <span className={styles.valuesEyebrow}>Why Choose Us</span>
                            <h2 className={styles.valuesHeading}>What Sets Us Apart</h2>
                        </motion.div>

                        <div className={styles.valuesGrid}>
                            {VALUES.map((v, i) => (
                                <motion.div
                                    key={v.label}
                                    className={styles.valueCard}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.1 }}
                                >
                                    <div className={styles.valueIcon}>
                                        <v.icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <p className={styles.valueStat}>{v.stat}</p>
                                    <p className={styles.valueLabel}>{v.label}</p>
                                    <p className={styles.valueSub}>{v.sub}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
