import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import InquiryForm from '../components/InquiryForm';
import PhotoGallery from '../components/PhotoGallery';
import JsonLd from '../components/JsonLd';
import FaqSection from '../components/FaqSection';
import styles from './ServicePage.module.css';

const SITE_URL = 'https://www.coast2coastlandscapes.com';
const SERVICE_AREAS = ['Corpus Christi', 'Rockport', 'Port Aransas', 'Portland', 'Ingleside', 'Calallen', 'Flour Bluff'];

export default function ServicePage({ label, headline, body, ctaText, relatedServices = [], photos = [], defaultProjectType = '', seo, serviceType, faqs = [] }) {
    const [formOpen, setFormOpen] = useState(false);
    const formRef = useRef(null);

    const openForm = () => {
        setFormOpen(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
    };

    return (
        <main className={styles.page}>
            {seo && <Seo {...seo} image={photos[0]?.img} />}
            {serviceType && seo && (
                <JsonLd
                    data={{
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        serviceType,
                        name: headline,
                        description: seo.description,
                        url: `${SITE_URL}${seo.path}`,
                        provider: { '@id': `${SITE_URL}/#business` },
                        areaServed: SERVICE_AREAS.map((city) => ({ '@type': 'City', name: `${city}, TX` })),
                    }}
                />
            )}

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroInner}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.label}>{label}</span>
                        <h1 className={styles.headline}>{headline}</h1>
                    </motion.div>
                </div>
            </section>

            <div className={styles.goldRule} />

            {/* Body copy */}
            <section className={`section ${styles.bodySection}`}>
                <div className="container">
                    <div className={styles.bodyGrid}>
                        <div className={styles.bodyCopy}>
                            {body.map((para, i) => (
                                <motion.p
                                    key={i}
                                    className={styles.para}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {para}
                                </motion.p>
                            ))}

                            <motion.button
                                onClick={openForm}
                                className={styles.cta}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {ctaText}
                                <ArrowRight size={14} strokeWidth={2} />
                            </motion.button>

                            {/* Inline inquiry form */}
                            <div ref={formRef}>
                                <InquiryForm
                                    open={formOpen}
                                    onClose={() => setFormOpen(false)}
                                    ctaText={ctaText}
                                    defaultProjectType={defaultProjectType}
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.sideCard}>
                                <span className={styles.sideLabel}>Service Areas</span>
                                <ul className={styles.sideList}>
                                    {SERVICE_AREAS.map(area => (
                                        <li key={area} className={styles.sideItem}>{area}</li>
                                    ))}
                                </ul>
                            </div>

                            {relatedServices.length > 0 && (
                                <div className={styles.sideCard}>
                                    <span className={styles.sideLabel}>Related Services</span>
                                    <ul className={styles.sideList}>
                                        {relatedServices.map(({ name, href }) => (
                                            <li key={name}>
                                                <a href={href} className={styles.sideLink}>
                                                    {name}
                                                    <ArrowRight size={11} strokeWidth={2} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

            {/* Project gallery */}
            {photos.length > 0 && (
                <section className={styles.photoSection}>
                    <div className="container">
                        <div className={styles.photoHeader}>
                            <span className={styles.photoEyebrow}>Our Work</span>
                            <h2 className={styles.photoHeadline}>Recent {label.replace(/^Services — /, '')} Projects</h2>
                        </div>
                        <PhotoGallery photos={photos} label={label} />
                    </div>
                </section>
            )}

            <FaqSection items={faqs} />

            {/* Navy CTA band */}
            <section className={styles.ctaBand}>
                <div className="container">
                    <div className={styles.ctaInner}>
                        <div>
                            <p className={styles.ctaEyebrow}>Ready to get started?</p>
                            <h2 className={styles.ctaHeadline}>{ctaText}</h2>
                        </div>
                        <button className={styles.ctaBtn} onClick={openForm}>
                            Contact Us Today
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
