import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, X } from 'lucide-react';
import styles from './InquiryForm.module.css';

export const PROJECT_TYPES = [
    'Stone Patio & Hardscaping',
    'Outdoor Kitchen',
    'Outdoor Lighting',
    'Landscaping',
    'Artificial Turf',
    'Vuba Stone (Resin-Bound Surfacing)',
    'Full Property Design-Build',
    'Other',
];

/**
 * Collapsible inline inquiry form shared by service pages.
 * `defaultProjectType` pre-selects the dropdown (e.g. Vuba page);
 * `idPrefix` keeps input ids unique if two forms ever share a page.
 */
export default function InquiryForm({ open, onClose, ctaText, defaultProjectType = '', idPrefix = 'svc' }) {
    const emptyForm = { name: '', email: '', phone: '', projectType: defaultProjectType, budget: '', message: '' };
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

    const reset = () => { setSuccess(false); setSubmitError(false); setForm(emptyForm); };

    return (
        <AnimatePresence>
            {open && (
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
                                onClick={onClose}
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
                                        <label htmlFor={`${idPrefix}-name`} className={styles.fieldLabel}>Full Name</label>
                                        <input
                                            id={`${idPrefix}-name`} name="name" type="text" required
                                            className={styles.input}
                                            value={form.name} onChange={handleChange}
                                            placeholder="Eloise Hartmann"
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor={`${idPrefix}-email`} className={styles.fieldLabel}>Email</label>
                                        <input
                                            id={`${idPrefix}-email`} name="email" type="email" required
                                            className={styles.input}
                                            value={form.email} onChange={handleChange}
                                            placeholder="eloise@example.com"
                                        />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label htmlFor={`${idPrefix}-phone`} className={styles.fieldLabel}>Phone</label>
                                        <input
                                            id={`${idPrefix}-phone`} name="phone" type="tel"
                                            className={styles.input}
                                            value={form.phone} onChange={handleChange}
                                            placeholder="+1 (361) 316-5251"
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor={`${idPrefix}-projectType`} className={styles.fieldLabel}>Project Type</label>
                                        <select
                                            id={`${idPrefix}-projectType`} name="projectType" required
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
                                    <label htmlFor={`${idPrefix}-budget`} className={styles.fieldLabel}>Estimated Budget</label>
                                    <select
                                        id={`${idPrefix}-budget`} name="budget" required
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
                                    <label htmlFor={`${idPrefix}-message`} className={styles.fieldLabel}>Project Description</label>
                                    <textarea
                                        id={`${idPrefix}-message`} name="message" rows={4}
                                        className={styles.textarea}
                                        value={form.message} onChange={handleChange}
                                        placeholder="Describe your site, goals, and any materials or styles you have in mind..."
                                    />
                                </div>

                                {submitError && (
                                    <p className={styles.errorLine}>
                                        Something went wrong — please call us at{' '}
                                        <a href="tel:+13613165251">(361) 316-5251</a>.
                                    </p>
                                )}
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
    );
}
