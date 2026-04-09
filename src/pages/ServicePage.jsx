import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Send, CheckCircle, X } from 'lucide-react';
import styles from './ServicePage.module.css';

const PROJECT_TYPES = [
    'Stone Patio & Hardscaping',
    'Outdoor Kitchen',
    'Outdoor Lighting',
    'Landscaping',
    'Artificial Turf',
    'Full Property Design-Build',
    'Other',
];

const EMPTY_FORM = { name: '', email: '', phone: '', projectType: '', budget: '', message: '' };

export default function ServicePage({ label, headline, body, ctaText, relatedServices = [], photos = [] }) {
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const formRef = useRef(null);

    const openForm = () => {
        setFormOpen(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => { setSubmitting(false); setSuccess(true); }, 1400);
    };

    const reset = () => { setSuccess(false); setForm(EMPTY_FORM); };

    return (
        <main className={styles.page}>
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
                                <AnimatePresence>
                                    {formOpen && (
                                        <motion.div
                                            className={styles.inlineFormWrap}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div className={styles.inlineFormInner}>
                                                <div className={styles.inlineFormHeader}>
                                                    <div>
                                                        <span className={styles.inlineFormEyebrow}>Start a Project</span>
                                                        <h3 className={styles.inlineFormTitle}>{ctaText}</h3>
                                                    </div>
                                                    <button
                                                        className={styles.closeBtn}
                                                        onClick={() => setFormOpen(false)}
                                                        aria-label="Close form"
                                                    >
                                                        <X size={18} strokeWidth={1.5} />
                                                    </button>
                                                </div>

                                                {success ? (
                                                    <div className={styles.successState}>
                                                        <CheckCircle size={38} strokeWidth={1.5} className={styles.successIcon} />
                                                        <h3 className={styles.successTitle}>Inquiry Received</h3>
                                                        <p className={styles.successText}>
                                                            We'll review your project details and be in touch within one business day.
                                                        </p>
                                                        <button className={styles.resetBtn} onClick={reset}>Submit Another</button>
                                                    </div>
                                                ) : (
                                                    <form onSubmit={handleSubmit} className={styles.form}>
                                                        <div className={styles.row}>
                                                            <div className={styles.field}>
                                                                <label className={styles.fieldLabel}>Full Name</label>
                                                                <input
                                                                    name="name" type="text" required
                                                                    className={styles.input}
                                                                    value={form.name} onChange={handleChange}
                                                                    placeholder="Eloise Hartmann"
                                                                />
                                                            </div>
                                                            <div className={styles.field}>
                                                                <label className={styles.fieldLabel}>Email</label>
                                                                <input
                                                                    name="email" type="email" required
                                                                    className={styles.input}
                                                                    value={form.email} onChange={handleChange}
                                                                    placeholder="eloise@example.com"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className={styles.row}>
                                                            <div className={styles.field}>
                                                                <label className={styles.fieldLabel}>Phone</label>
                                                                <input
                                                                    name="phone" type="tel"
                                                                    className={styles.input}
                                                                    value={form.phone} onChange={handleChange}
                                                                    placeholder="+1 (361) 316-5251"
                                                                />
                                                            </div>
                                                            <div className={styles.field}>
                                                                <label className={styles.fieldLabel}>Project Type</label>
                                                                <select
                                                                    name="projectType" required
                                                                    className={styles.select}
                                                                    value={form.projectType} onChange={handleChange}
                                                                >
                                                                    <option value="" disabled>Select type</option>
                                                                    {PROJECT_TYPES.map(t => (
                                                                        <option key={t} value={t}>{t}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className={styles.field}>
                                                            <label className={styles.fieldLabel}>Estimated Budget</label>
                                                            <select
                                                                name="budget" required
                                                                className={styles.select}
                                                                value={form.budget} onChange={handleChange}
                                                            >
                                                                <option value="" disabled>Select a range</option>
                                                                <option value="under-10k">Under $10,000</option>
                                                                <option value="10k-25k">$10,000 – $25,000</option>
                                                                <option value="25k-50k">$25,000 – $50,000</option>
                                                                <option value="50k-100k">$50,000 – $100,000</option>
                                                                <option value="100k-250k+">$100,000 – $250,000+</option>
                                                            </select>
                                                        </div>

                                                        <div className={styles.field}>
                                                            <label className={styles.fieldLabel}>Project Description</label>
                                                            <textarea
                                                                name="message" rows={4}
                                                                className={styles.textarea}
                                                                value={form.message} onChange={handleChange}
                                                                placeholder="Describe your site, goals, and any materials or styles you have in mind..."
                                                            />
                                                        </div>

                                                        <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                                            {submitting
                                                                ? <span className={styles.spinner} />
                                                                : <><span>Submit Inquiry</span><Send size={14} strokeWidth={2} /></>
                                                            }
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.sideCard}>
                                <span className={styles.sideLabel}>Service Areas</span>
                                <ul className={styles.sideList}>
                                    {['Corpus Christi', 'Rockport', 'Port Aransas', 'Portland', 'Ingleside', 'Calallen', 'Flour Bluff'].map(area => (
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

            {/* Photo grid */}
            {photos.length > 0 && (
                <section className={styles.photoSection}>
                    <div className="container">
                        <div className={styles.photoGrid}>
                            {photos.map((src, i) => (
                                <motion.div
                                    key={i}
                                    className={`${styles.photoWrap} ${i === 0 ? styles.photoFeatured : ''}`}
                                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ scale: 1.025 }}
                                >
                                    <img src={src} alt={`${label} project ${i + 1}`} className={styles.photoImg} loading="lazy" />
                                    <div className={styles.photoGlow} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
