import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Send, CheckCircle, MapPin, Clock, DollarSign, ShieldCheck, MessageSquare,
    CalendarCheck, TrendingUp, Award, HandHeart,
} from 'lucide-react';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { formatUSPhone, validateLead } from '../lib/leadValidation';
import { getAttribution, trackPixel } from '../lib/tracking';
import { CATEGORIES } from '../data/portfolioData';
import {
    WHY_WORK_HERE, ROLES, GENERAL_APPLICATION,
    PROOF_POINTS, HIRING_CONTACT, TESTIMONIALS,
} from '../data/careersData';
import styles from './Careers.module.css';

const ICONS = { CalendarCheck, TrendingUp, Award, HandHeart };

const SITE_URL = 'https://www.coast2coastlandscapes.com';

const EMPLOYMENT_TYPE = { 'Full-Time': 'FULL_TIME', 'Part-Time': 'PART_TIME', Seasonal: 'TEMPORARY' };

// Cities we actually staff jobsites in — mirrors the business schema's areaServed.
const JOB_LOCALITIES = ['Corpus Christi', 'Rockport', 'Port Aransas', 'Portland', 'Ingleside'];

/** Display pay range, or null when a role has no confirmed numbers (hides the line). */
function payRange(role) {
    if (!role.payMin || !role.payMax) return null;
    return `$${role.payMin}–$${role.payMax}/hr DOE`;
}

/**
 * Google for Jobs ingests JobPosting structured data — it's the main free
 * applicant channel for a trade role. `baseSalary` is included only when the
 * role has confirmed numbers: Google rejects listings with fabricated or
 * placeholder compensation, so a wrong number is worse than none.
 */
function jobPostingSchema(role) {
    const requirements = role.requirements.map((r) => `<li>${r}</li>`).join('');
    const responsibilities = role.responsibilities.map((r) => `<li>${r}</li>`).join('');
    return {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: role.title,
        identifier: { '@type': 'PropertyValue', name: 'Coast to Coast Landscape & Design', value: role.slug },
        description:
            `<p>${role.summary}</p>`
            + `<p><strong>What you'll do</strong></p><ul>${responsibilities}</ul>`
            + `<p><strong>What we're looking for</strong></p><ul>${requirements}</ul>`,
        datePosted: role.datePosted,
        employmentType: EMPLOYMENT_TYPE[role.type] || 'FULL_TIME',
        hiringOrganization: { '@id': `${SITE_URL}/#business` },
        jobLocation: JOB_LOCALITIES.map((city) => ({
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: city,
                addressRegion: 'TX',
                addressCountry: 'US',
            },
        })),
        applicantLocationRequirements: { '@type': 'Country', name: 'US' },
        directApply: true,
        url: `${SITE_URL}/careers`,
        ...(payRange(role) && {
            baseSalary: {
                '@type': 'MonetaryAmount',
                currency: 'USD',
                value: {
                    '@type': 'QuantitativeValue',
                    minValue: role.payMin,
                    maxValue: role.payMax,
                    unitText: 'HOUR',
                },
            },
        }),
    };
}

const cultureImages = ['hardscaping', 'landscaping', 'outdoor-kitchens']
    .map((slug) => CATEGORIES.find((c) => c.slug === slug)?.cover)
    .filter(Boolean);

const EMPTY = {
    name: '', phone: '', email: '', role: '', experience: '',
    license: '', transportation: '', workAuth: '', availability: '',
    resumeLink: '', about: '', smsConsent: false,
    hpField: '', // hpField = honeypot (non-semantic name so browsers don't autofill it)
};

const openRoles = ROLES.filter((r) => r.open);

export default function Careers() {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const next = type === 'checkbox' ? checked : (name === 'phone' ? formatUSPhone(value) : value);
        setForm({ ...form, [name]: next });
        if (errors[name]) setErrors({ ...errors, [name]: undefined });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        const fieldError = validateLead(form)[name];
        if (fieldError) setErrors({ ...errors, [name]: fieldError });
    };

    const applyFor = (roleTitle) => {
        setForm((f) => ({ ...f, role: roleTitle }));
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateLead(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstInvalid = ['name', 'phone', 'email'].find((f) => validationErrors[f]);
            document.getElementById(`a-${firstInvalid}`)?.focus();
            return;
        }
        setSubmitting(true);
        setSubmitError(false);
        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, attribution: getAttribution() }),
            });
            if (!res.ok) throw new Error('Failed');
            setSuccess(true);
            trackPixel('SubmitApplication', { content_name: form.role || 'General Application' });
        } catch {
            setSubmitError(true);
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => {
        setErrors({});
        setSuccess(false);
        setSubmitError(false);
        setForm(EMPTY);
    };

    return (
        <main className={styles.page}>
            <Seo
                title="Careers — Join the Crew | Coast to Coast Landscape & Design"
                description="Now hiring landscape & hardscape crew members and crew leaders across Corpus Christi and the Coastal Bend. Year-round work, real growth, and craftsmanship you can be proud of. Apply today."
                path="/careers"
            />

            {/* One JobPosting block per open role — Google for Jobs eligibility */}
            {openRoles.map((role) => (
                <JsonLd key={`schema-${role.slug}`} data={jobPostingSchema(role)} />
            ))}

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroInner}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.label}>Careers — Join the Crew</span>
                        <h1 className={styles.headline}>
                            Build outdoor spaces<br /><em>people remember.</em>
                        </h1>
                        <p className={styles.heroSub}>
                            We craft high-end hardscape and design-build projects across the Coastal Bend —
                            and we're looking for reliable, hardworking people who take pride in their work.
                        </p>
                        <button className={styles.heroCta} onClick={() => applyFor('')}>
                            See Open Roles <ArrowRight size={14} strokeWidth={2} />
                        </button>
                    </motion.div>
                </div>
            </section>

            <div className={styles.goldRule} />

            {/* Proof bar — quick legitimacy signals */}
            {PROOF_POINTS.length > 0 && (
                <section className={styles.proofBar}>
                    <div className="container">
                        <ul className={styles.proofList}>
                            {PROOF_POINTS.map((p) => (
                                <li key={p} className={styles.proofItem}>
                                    <ShieldCheck size={14} strokeWidth={2} /> {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Why work here */}
            <section className={`section ${styles.whySection}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>Why Coast to Coast</span>
                        <h2 className={styles.sectionTitle}>A crew worth joining</h2>
                    </div>
                    <div className={styles.whyGrid}>
                        {WHY_WORK_HERE.map((item, i) => {
                            const Icon = ICONS[item.icon] ?? Award;
                            return (
                                <motion.div
                                    key={item.title}
                                    className={styles.whyCard}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Icon size={22} strokeWidth={1.5} className={styles.whyIcon} />
                                    <h3 className={styles.whyTitle}>{item.title}</h3>
                                    <p className={styles.whyBody}>{item.body}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Culture strip */}
            {cultureImages.length > 0 && (
                <section className={styles.cultureStrip}>
                    {cultureImages.map((src, i) => (
                        <div key={i} className={styles.cultureImgWrap}>
                            <img src={src} alt="Coast to Coast project" className={styles.cultureImg} loading="lazy" />
                        </div>
                    ))}
                </section>
            )}

            {/* Employee quotes (hidden until real ones are added in careersData.js) */}
            {TESTIMONIALS.length > 0 && (
                <section className={`section ${styles.testimonialSection}`}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <span className={styles.eyebrow}>From the Crew</span>
                            <h2 className={styles.sectionTitle}>What our team says</h2>
                        </div>
                        <div className={styles.testimonialGrid}>
                            {TESTIMONIALS.map((t) => (
                                <figure key={t.name + t.role} className={styles.testimonialCard}>
                                    <blockquote className={styles.testimonialQuote}>“{t.quote}”</blockquote>
                                    <figcaption className={styles.testimonialWho}>
                                        <strong>{t.name}</strong> — {t.role}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Open roles */}
            <section className={`section ${styles.rolesSection}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>Open Positions</span>
                        <h2 className={styles.sectionTitle}>Where you fit in</h2>
                    </div>

                    <div className={styles.rolesList}>
                        {openRoles.map((role, i) => (
                            <motion.div
                                key={role.slug}
                                className={styles.roleCard}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className={styles.roleHead}>
                                    <div>
                                        <h3 className={styles.roleTitle}>{role.title}</h3>
                                        <div className={styles.roleMeta}>
                                            <span><Clock size={12} strokeWidth={2} /> {role.type}</span>
                                            <span><MapPin size={12} strokeWidth={2} /> {role.location}</span>
                                            {payRange(role) && (
                                                <span className={styles.rolePay}>
                                                    <DollarSign size={12} strokeWidth={2} /> {payRange(role)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button className={styles.roleApplyBtn} onClick={() => applyFor(role.title)}>
                                        Apply <ArrowRight size={13} strokeWidth={2} />
                                    </button>
                                </div>

                                <p className={styles.roleSummary}>{role.summary}</p>

                                <div className={styles.roleCols}>
                                    <div>
                                        <span className={styles.roleColLabel}>What you'll do</span>
                                        <ul className={styles.roleUl}>
                                            {role.responsibilities.map((r) => <li key={r}>{r}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <span className={styles.roleColLabel}>What we're looking for</span>
                                        <ul className={styles.roleUl}>
                                            {role.requirements.map((r) => <li key={r}>{r}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Evergreen general application */}
                        <div className={`${styles.roleCard} ${styles.generalCard}`}>
                            <div className={styles.roleHead}>
                                <div>
                                    <h3 className={styles.roleTitle}>{GENERAL_APPLICATION.title}</h3>
                                </div>
                                <button className={styles.roleApplyBtn} onClick={() => applyFor('General Application')}>
                                    Apply <ArrowRight size={13} strokeWidth={2} />
                                </button>
                            </div>
                            <p className={styles.roleSummary}>{GENERAL_APPLICATION.summary}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application form */}
            <section id="apply" ref={formRef} className={`section ${styles.applySection}`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>Apply Now</span>
                        <h2 className={styles.sectionTitle}>Tell us about you</h2>
                        <p className={styles.applySub}>
                            Takes about two minutes. A resume is optional — we care most about reliability and craft.
                        </p>
                        {HIRING_CONTACT?.phone && (
                            <p className={styles.hiringContact}>
                                <MessageSquare size={13} strokeWidth={2} />
                                Questions? Text {HIRING_CONTACT.name ? `${HIRING_CONTACT.name} ` : ''}
                                <a href={`sms:${HIRING_CONTACT.phoneHref || ''}`}>{HIRING_CONTACT.phone}</a>
                            </p>
                        )}
                    </div>

                    <div className={styles.formBox}>
                        {success ? (
                            <motion.div
                                className={styles.successState}
                                initial={{ scale: 0.94, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 160, damping: 22 }}
                            >
                                <CheckCircle size={42} strokeWidth={1.5} className={styles.successIcon} />
                                <h3 className={styles.successTitle}>Application Received</h3>
                                <p className={styles.successText}>
                                    Thanks for applying. We review every application and will reach out if there's a fit.
                                </p>
                                <button className={styles.resetBtn} onClick={reset}>Submit Another</button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                {/* Honeypot — hidden, non-semantic name so autofill/password managers leave it blank */}
                                <input
                                    type="text" name="hpField" tabIndex={-1} autoComplete="off"
                                    className={styles.honeypot} value={form.hpField} onChange={handleChange}
                                    aria-hidden="true"
                                />

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label htmlFor="a-name" className={styles.fieldLabel}>Full Name *</label>
                                        <input id="a-name" name="name" type="text" required
                                            className={`${styles.input} ${errors.name ? styles.inputInvalid : ''}`}
                                            value={form.name} onChange={handleChange} onBlur={handleBlur}
                                            aria-invalid={!!errors.name}
                                            placeholder="Jesse Ramirez" />
                                        {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="a-phone" className={styles.fieldLabel}>Phone *</label>
                                        <input id="a-phone" name="phone" type="tel" required inputMode="tel"
                                            className={`${styles.input} ${errors.phone ? styles.inputInvalid : ''}`}
                                            value={form.phone} onChange={handleChange} onBlur={handleBlur}
                                            aria-invalid={!!errors.phone}
                                            placeholder="(361) 555-0142" />
                                        {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label htmlFor="a-email" className={styles.fieldLabel}>Email *</label>
                                        <input id="a-email" name="email" type="email" required
                                            className={`${styles.input} ${errors.email ? styles.inputInvalid : ''}`}
                                            value={form.email} onChange={handleChange} onBlur={handleBlur}
                                            aria-invalid={!!errors.email}
                                            placeholder="you@example.com" />
                                        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="a-role" className={styles.fieldLabel}>Position *</label>
                                        <select id="a-role" name="role" required className={styles.select}
                                            value={form.role} onChange={handleChange}>
                                            <option value="" disabled>Select a role</option>
                                            {openRoles.map((r) => <option key={r.slug} value={r.title}>{r.title}</option>)}
                                            <option value="General Application">General Application</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label htmlFor="a-exp" className={styles.fieldLabel}>Years of Experience</label>
                                        <select id="a-exp" name="experience" className={styles.select}
                                            value={form.experience} onChange={handleChange}>
                                            <option value="" disabled>Select</option>
                                            <option>None yet — willing to learn</option>
                                            <option>Less than 1 year</option>
                                            <option>1–3 years</option>
                                            <option>3–5 years</option>
                                            <option>5+ years</option>
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="a-avail" className={styles.fieldLabel}>Availability</label>
                                        <select id="a-avail" name="availability" className={styles.select}
                                            value={form.availability} onChange={handleChange}>
                                            <option value="" disabled>Select</option>
                                            <option>Immediately</option>
                                            <option>Within 2 weeks</option>
                                            <option>Within a month</option>
                                            <option>Just exploring</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.row3}>
                                    <div className={styles.field}>
                                        <label htmlFor="a-license" className={styles.fieldLabel}>Driver's License?</label>
                                        <select id="a-license" name="license" className={styles.select}
                                            value={form.license} onChange={handleChange}>
                                            <option value="" disabled>Select</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="a-transport" className={styles.fieldLabel}>Reliable Transportation?</label>
                                        <select id="a-transport" name="transportation" className={styles.select}
                                            value={form.transportation} onChange={handleChange}>
                                            <option value="" disabled>Select</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="a-auth" className={styles.fieldLabel}>Authorized to work in US?</label>
                                        <select id="a-auth" name="workAuth" className={styles.select}
                                            value={form.workAuth} onChange={handleChange}>
                                            <option value="" disabled>Select</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="a-about" className={styles.fieldLabel}>Tell us about your experience</label>
                                    <textarea id="a-about" name="about" rows={3} className={styles.textarea}
                                        value={form.about} onChange={handleChange}
                                        placeholder="What kind of work have you done? Any skills, equipment, or certifications you'd like us to know about?" />
                                </div>

                                {/* Resume / portfolio link (optional) */}
                                <div className={styles.field}>
                                    <label htmlFor="a-resume" className={styles.fieldLabel}>Resume or Portfolio Link (optional)</label>
                                    <input id="a-resume" name="resumeLink" type="url" className={styles.input}
                                        value={form.resumeLink} onChange={handleChange}
                                        placeholder="Link to a resume, LinkedIn, or photos of your work" />
                                </div>

                                {submitError && (
                                    <p className={styles.errorLine}>
                                        Something went wrong — please call or text us at{' '}
                                        <a href="tel:+13613165251">(361) 316-5251</a>.
                                    </p>
                                )}

                                <label className={styles.consentRow}>
                                    <input type="checkbox" name="smsConsent"
                                        checked={form.smsConsent} onChange={handleChange} />
                                    <span>
                                        I agree to receive text messages from Coast to Coast Landscape &amp; Design
                                        about my application. Msg &amp; data rates may apply. Reply STOP to opt out.
                                    </span>
                                </label>

                                <p className={styles.eeoLine}>
                                    Coast to Coast Landscape &amp; Design is an equal opportunity employer.
                                </p>
                                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                    {submitting
                                        ? <span className={styles.spinner} />
                                        : <><span>Submit Application</span><Send size={14} strokeWidth={2} /></>
                                    }
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
