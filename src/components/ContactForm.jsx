import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { formatUSPhone, validateLead } from '../lib/leadValidation';
import styles from './ContactForm.module.css';

const PROJECT_TYPES = [
    'Stone Patio & Hardscaping',
    'Outdoor Kitchen',
    'Outdoor Lighting',
    'Landscaping',
    'Artificial Turf',
    'Vuba Stone (Resin-Bound Surfacing)',
    'Full Property Design-Build',
    'Other',
];

const EMPTY = {
    name: '', email: '', phone: '', projectType: '', budget: '', message: '',
    company: '', // honeypot — hidden field real users never see
};

export default function ContactForm() {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'phone' ? formatUSPhone(value) : value });
        if (errors[name]) setErrors({ ...errors, [name]: undefined });
    };

    // Validate a single field when the user leaves it — gentle, non-blocking
    const handleBlur = (e) => {
        const { name } = e.target;
        const fieldError = validateLead(form)[name];
        if (fieldError) setErrors({ ...errors, [name]: fieldError });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateLead(form);
        if (!form.projectType) validationErrors.projectType = 'Please select a project type.';
        if (!form.budget) validationErrors.budget = 'Please select a budget range.';
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstInvalid = ['name', 'email', 'phone', 'projectType', 'budget']
                .find((f) => validationErrors[f]);
            document.getElementById(firstInvalid)?.focus();
            return;
        }
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
        setErrors({});
        setForm(EMPTY);
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
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                >
                    <span className={styles.sectionLabel}>Start a Project</span>
                    <h2 className={styles.sectionTitle}>
                        Ready to transform<br />your <em>outdoor space?</em>
                    </h2>
                    <p className={styles.sectionSubtext}>
                        Limited design slots available each month. We respond within one business day.
                    </p>
                </motion.div>

                {/* Form box */}
                <motion.div
                    className={styles.formBox}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 70, damping: 20, delay: 0.1 }}
                >
                    {success ? (
                        <motion.div
                            className={styles.successState}
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
                        >
                            <CheckCircle size={42} strokeWidth={1.5} className={styles.successIcon} />
                            <h3 className={styles.successTitle}>Inquiry Received</h3>
                            <p className={styles.successText}>
                                We will review your project details and be in touch within one business day.
                            </p>
                            <button className={styles.resetBtn} onClick={reset}>Submit Another</button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form} noValidate>
                            <input
                                type="text" name="company" tabIndex={-1} autoComplete="off"
                                className={styles.honeypot} value={form.company} onChange={handleChange}
                                aria-hidden="true"
                            />

                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="name" className={styles.fieldLabel}>Full Name</label>
                                    <input id="name" name="name" type="text" required
                                        className={`${styles.input} ${errors.name ? styles.inputInvalid : ''}`}
                                        value={form.name} onChange={handleChange} onBlur={handleBlur}
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                        placeholder="Frank Lloyd Wright" />
                                    {errors.name && <span id="name-error" className={styles.fieldError}>{errors.name}</span>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="email" className={styles.fieldLabel}>Email</label>
                                    <input id="email" name="email" type="email" required
                                        className={`${styles.input} ${errors.email ? styles.inputInvalid : ''}`}
                                        value={form.email} onChange={handleChange} onBlur={handleBlur}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        placeholder="flwright@gmail.com" />
                                    {errors.email && <span id="email-error" className={styles.fieldError}>{errors.email}</span>}
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label htmlFor="phone" className={styles.fieldLabel}>Phone</label>
                                    <input id="phone" name="phone" type="tel" required inputMode="tel"
                                        className={`${styles.input} ${errors.phone ? styles.inputInvalid : ''}`}
                                        value={form.phone} onChange={handleChange} onBlur={handleBlur}
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                                        placeholder="(361) 316-5251" />
                                    {errors.phone && <span id="phone-error" className={styles.fieldError}>{errors.phone}</span>}
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="projectType" className={styles.fieldLabel}>Project Type</label>
                                    <select id="projectType" name="projectType" required
                                        className={`${styles.select} ${errors.projectType ? styles.inputInvalid : ''}`}
                                        value={form.projectType} onChange={handleChange}
                                        aria-invalid={!!errors.projectType}>
                                        <option value="" disabled>Select type</option>
                                        {PROJECT_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                    {errors.projectType && <span className={styles.fieldError}>{errors.projectType}</span>}
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="budget" className={styles.fieldLabel}>Estimated Budget</label>
                                <select id="budget" name="budget" required
                                    className={`${styles.select} ${errors.budget ? styles.inputInvalid : ''}`}
                                    value={form.budget} onChange={handleChange}
                                    aria-invalid={!!errors.budget}>
                                    <option value="" disabled>Select a range</option>
                                    <option value="under-10k">Under $10,000</option>
                                    <option value="10k-25k">$10,000 – $25,000</option>
                                    <option value="25k-50k">$25,000 – $50,000</option>
                                    <option value="50k-100k">$50,000 – $100,000</option>
                                    <option value="100k-250k+">$100,000 – $250,000+</option>
                                </select>
                                {errors.budget && <span className={styles.fieldError}>{errors.budget}</span>}
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="message" className={styles.fieldLabel}>Project Description</label>
                                <textarea id="message" name="message" rows={3} className={styles.textarea}
                                    value={form.message} onChange={handleChange}
                                    placeholder="Describe your site, goals, and any materials or styles you have in mind..." />
                            </div>

                            {submitError && (
                                <p className={styles.errorLine}>
                                    Something went wrong — please call us at{' '}
                                    <a href="tel:+13613165251">(361) 316-5251</a>.
                                </p>
                            )}
                            <p className={styles.trustLine}>Join 100+ homeowners who've transformed their outdoor space.</p>
                            <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                {submitting
                                    ? <span className={styles.spinner} />
                                    : <><span>Submit Project Inquiry</span><Send size={14} strokeWidth={2} /></>
                                }
                            </button>
                        </form>
                    )}
                </motion.div>

            </div>
        </section>
    );
}
