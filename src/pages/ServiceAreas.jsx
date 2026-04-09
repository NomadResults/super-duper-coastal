import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './ServiceAreas.module.css';

const areas = [
    {
        name: 'Corpus Christi',
        slug: 'corpus-christi',
        body: "The heart of our work. From Southside estates to Padre Island waterfront properties, we design and install hardscape, landscape, outdoor kitchens, and lighting systems for homeowners who expect more from their outdoor space.",
    },
    {
        name: 'Rockport',
        slug: 'rockport',
        body: "Rockport's coastal charm deserves outdoor spaces that match it. We bring the same bespoke design process to Rockport properties — built to withstand salt air, Gulf winds, and the unique conditions of coastal living.",
    },
    {
        name: 'Port Aransas',
        slug: 'port-aransas',
        body: "Island living demands outdoor spaces designed for it. We work with Port Aransas homeowners and vacation property owners who want durable, high-end outdoor environments that hold up to the elements and look exceptional doing it.",
    },
    {
        name: 'Portland',
        slug: 'portland',
        body: "Across the harbor from Corpus Christi, Portland is home to some of the Coastal Bend's most well-maintained residential properties. We bring the same design standards here — clean, architectural, and built to last.",
    },
    {
        name: 'Ingleside',
        slug: 'ingleside',
        body: "A growing community with serious potential. We work with Ingleside homeowners ready to invest in their outdoor space and elevate the standard of their property.",
    },
    {
        name: 'Calallen',
        slug: 'calallen',
        body: "One of Corpus Christi's most established suburban corridors. Calallen homeowners trust us to design outdoor living environments that match the scale and quality of their homes.",
    },
    {
        name: 'Flour Bluff',
        slug: 'flour-bluff',
        body: "Tucked between Corpus Christi proper and the island, Flour Bluff properties benefit from our coastal-conscious design approach — durable materials, smart plant selection, and outdoor systems built for the environment.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { type: 'spring', stiffness: 70, damping: 20, delay: i * 0.07 }
    }),
};

export default function ServiceAreas() {
    return (
        <main className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroInner}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.heroLabel}>
                            <MapPin size={12} strokeWidth={2} />
                            Service Areas
                        </span>
                        <h1 className={styles.heroHeadline}>
                            Serving the<br />
                            <em>Coastal Bend</em> &amp; South Texas
                        </h1>
                        <p className={styles.heroBody}>
                            We work where the Gulf Coast meets serious outdoor living. Our projects span across Corpus Christi and the surrounding communities — each one designed with the same level of intention, craftsmanship, and attention to the South Texas environment. If you're in the Coastal Bend, we're your team.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gold divider */}
            <div className={styles.goldRule} />

            {/* Areas grid */}
            <section className={`section ${styles.areasSection}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {areas.map((area, i) => (
                            <motion.div
                                key={area.slug}
                                className={styles.card}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <div className={styles.cardTop}>
                                    <span className={styles.cardNum}>0{i + 1}</span>
                                    <div className={styles.cardGoldLine} />
                                </div>
                                <h2 className={styles.cardName}>{area.name}</h2>
                                <p className={styles.cardBody}>{area.body}</p>
                                <Link to={`/service-areas/${area.slug}`} className={styles.cardCta}>
                                    Learn More
                                    <ArrowRight size={13} strokeWidth={2} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Navy CTA band */}
            <section className={styles.ctaBand}>
                <div className="container">
                    <div className={styles.ctaInner}>
                        <h2 className={styles.ctaHeadline}>
                            Don't see your city?<br />
                            <em>We probably serve it.</em>
                        </h2>
                        <a href="#contact" className={styles.ctaBtn}>
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
