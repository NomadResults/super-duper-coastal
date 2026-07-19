import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import JsonLd from './JsonLd';
import styles from './FaqSection.module.css';

/**
 * Collapsible FAQ block with FAQPage structured data. Answers stay mounted
 * (collapsed via height, not conditional render) so prerendered HTML contains
 * the full Q&A text for search and AI crawlers.
 */
export default function FaqSection({ eyebrow = 'Good Questions', headline, items }) {
    const [open, setOpen] = useState(null);

    if (!items?.length) return null;

    return (
        <section className={styles.faqSection}>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: items.map(({ q, a }) => ({
                        '@type': 'Question',
                        name: q,
                        acceptedAnswer: { '@type': 'Answer', text: a },
                    })),
                }}
            />
            <div className="container">
                <div className={styles.faqGrid}>
                    <div>
                        <span className={styles.eyebrow}>{eyebrow}</span>
                        <h2 className={styles.headline}>
                            {headline ?? <>Frequently Asked <em>Questions</em></>}
                        </h2>
                    </div>
                    <div className={styles.faqList}>
                        {items.map((faq, i) => (
                            <div key={i} className={styles.faqItem}>
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => setOpen(open === i ? null : i)}
                                    aria-expanded={open === i}
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown
                                        size={16}
                                        strokeWidth={2}
                                        className={`${styles.faqChevron} ${open === i ? styles.faqChevronOpen : ''}`}
                                    />
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <p className={styles.faqAnswer}>{faq.a}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
