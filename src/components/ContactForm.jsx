import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import styles from './ContactForm.module.css';

const PROJECT_TYPES = [
    'Residential Fencing',
    'Commercial Fencing',
    'Automatic Gates',
    'Agricultural Fencing',
    'Access Control System',
    'Fence Staining & Sealing',
    'Fence Repair',
    'Other',
];

export default function ContactForm() {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', projectType: '', message: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(false);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Failed');
            setSuccess(true);
        } catch {
            setSubmitError(true);
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => {
        setSuccess(false);
        setSubmitError(false);
        setForm({ name: '', email: '', phone: '', projectType: '', message: '' });
    };

    return (
        <section id="contact" className={`section ${styles.section}`}>
            <div className="container">

                {/* Section header */}
                <motion.div
                    className={styles.sectionHeader}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    <span className={styles.sectionLabel}>Free Estimate</span>
                    <h2 className={styles.sectionTitle}>
                        Ready to secure your<br /><em>property?</em>
                    </h2>
                    <p className={styles.sectionSubtext}>
                        We offer free, no-obligation estimates to all prospective clients across South Texas.
                        Fill out the form and we'll be in touch within one business day.
                    </p>
                </motion.div>

                {/* Form box */}
                <motion.div
                    className={styles.formBox}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
                >
                    {success ? (
                        <motion.div
                            className={styles.successState}
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
                        >
                            <CheckCircle size={42} strokeWidth={1.5} className={styles.successIcon} />
                            <h3 className={styles.successTitle}>Quote Request Received</h3>
                            <p className={styles.successText}>
                                We'll review your project details and be in touch within one business day.
                            </p>
                            <button className={styles.resetBtn} onClick={reset}>Submit Another</button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="name" className={styles.fieldLabel}>Full Name</label>
                                    <input id="name" name="name" type="text" required className={styles.input}
                                        value={form.name} onChange={handleChange} placeholder="Your full name" />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="phone" className={styles.fieldLabel}>Phone Number</label>
                                    <input id="phone" name="phone" type="tel" required className={styles.input}
                                        value={form.phone} onChange={handleChange} placeholder="(361) 000-0000" />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="email" className={styles.fieldLabel}>Email Address</label>
                                    <input id="email" name="email" type="email" className={styles.input}
                                        value={form.email} onChange={handleChange} placeholder="your@email.com" />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="projectType" className={styles.fieldLabel}>Service Needed</label>
                                    <select id="projectType" name="projectType" required className={styles.select}
                                        value={form.projectType} onChange={handleChange}>
                                        <option value="" disabled>Select a service</option>
                                        {PROJECT_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="message" className={styles.fieldLabel}>Short Description</label>
                                <textarea id="message" name="message" rows={3} className={styles.textarea}
                                    value={form.message} onChange={handleChange}
                                    placeholder="Briefly describe your project — property type, approximate linear footage, material preferences, etc." />
                            </div>

                            {submitError && (
                                <p className={styles.errorLine}>
                                    Something went wrong — please call us at (361) 777-9218.
                                </p>
                            )}
                            <p className={styles.trustLine}>
                                Free estimates &middot; No obligation &middot; Mon–Fri, 9am–5pm &middot; (361) 777-9218
                            </p>
                            <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                {submitting
                                    ? <span className={styles.spinner} />
                                    : <><span>Request Free Quote</span><Send size={14} strokeWidth={2} /></>
                                }
                            </button>
                        </form>
                    )}
                </motion.div>

            </div>
        </section>
    );
}
