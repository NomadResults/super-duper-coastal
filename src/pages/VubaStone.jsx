import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Droplets, Sun, Waves, Footprints, Sparkles, Layers, ChevronDown } from 'lucide-react';
import Seo from '../components/Seo';
import InquiryForm from '../components/InquiryForm';
import PhotoGallery from '../components/PhotoGallery';
import { CATEGORIES } from '../data/portfolioData';
import { VUBA_BLENDS } from '../data/vubaBlends';
import styles from './VubaStone.module.css';

const photos = CATEGORIES.find(c => c.slug === 'vuba-stone')?.photos ?? [];

const BENEFITS = [
    {
        icon: Droplets,
        title: 'Fully Permeable',
        text: "Rainwater drains straight through the surface instead of pooling or running off — a serious advantage during Coastal Bend storm season.",
    },
    {
        icon: Sun,
        title: 'UV-Stable Resin',
        text: "Engineered aliphatic resin that won't amber or yellow under relentless South Texas sun, unlike cheaper epoxy-bound systems.",
    },
    {
        icon: Waves,
        title: 'Built for the Coast',
        text: "No loose gravel to scatter in wind or wash out in heavy rain. The aggregate is locked into a single bound surface.",
    },
    {
        icon: Footprints,
        title: 'Barefoot Friendly',
        text: "Smooth, splinter-free, and cooler underfoot than most paving — which is exactly what a pool deck should be.",
    },
    {
        icon: Sparkles,
        title: 'Seamless & Low Maintenance',
        text: "No joints for weeds to invade, no cracking grout lines. An occasional rinse and sweep keeps it looking installed-yesterday.",
    },
    {
        icon: Layers,
        title: 'Installs Over Concrete',
        text: "Sound existing concrete often makes an ideal base — meaning your tired patio or driveway can be resurfaced without demolition.",
    },
];

const APPLICATIONS = [
    { num: '01', title: 'Pool Decks', text: 'Slip-resistant, cool, and seamless around water.' },
    { num: '02', title: 'Driveways', text: 'A statement entrance that drains instead of floods.' },
    { num: '03', title: 'Walkways & Paths', text: 'Flowing, joint-free lines through your landscape.' },
    { num: '04', title: 'Patios & Courtyards', text: 'A refined surface for the spaces you live in most.' },
];

const FAQS = [
    {
        q: 'What exactly is Vuba Stone?',
        a: "Vuba Stone is a resin-bound surfacing system: natural decorative aggregate blended with a clear, UV-stable resin and hand-troweled into a smooth, seamless surface. The result looks like elegant natural stone but behaves like a single engineered slab — permeable, durable, and locked in place.",
    },
    {
        q: 'How is it different from loose gravel or epoxy pebble coatings?',
        a: "Loose gravel scatters, ruts, and washes out. Epoxy pebble systems seal the surface and tend to yellow in the sun. Resin-bound stone locks every stone into the matrix while staying fully permeable, and the aliphatic resin is engineered not to amber under UV exposure.",
    },
    {
        q: 'Will it hold up in South Texas heat and storms?',
        a: "That's exactly where it shines. The resin is UV-stable for our sun, the surface is permeable so tropical downpours drain through instead of pooling, and there's no loose material to end up in your pool or flowerbeds after a storm.",
    },
    {
        q: 'Can it be installed over my existing concrete?',
        a: "In many cases, yes. Structurally sound concrete is one of the best bases for resin-bound stone, which means a cracked-but-solid patio or driveway can often be transformed without tear-out. We confirm base condition during your site visit.",
    },
    {
        q: 'What maintenance does it need?',
        a: "Very little. A periodic rinse with a hose and an occasional sweep keeps the surface clean. There are no joints to re-sand, no grout to repair, and no sealing schedule to keep up with. Every install also comes with Vuba's official aftercare guide, so you know exactly how to keep the surface at its best.",
    },
    {
        q: 'How many colors can I choose from?',
        a: "Vuba offers more than thirty blends of natural marble and granite aggregate — from bright coastal creams to deep charcoals — and as a certified installer we can source any of them. Browse the blend gallery above, and we'll bring physical samples of your shortlist to your consultation.",
    },
];

function FaqItem({ faq, open, onToggle }) {
    return (
        <div className={styles.faqItem}>
            <button className={styles.faqQuestion} onClick={onToggle} aria-expanded={open}>
                <span>{faq.q}</span>
                <ChevronDown size={16} strokeWidth={2} className={`${styles.faqChevron} ${open ? styles.faqChevronOpen : ''}`} />
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p className={styles.faqAnswer}>{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function VubaStone() {
    const [formOpen, setFormOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const formRef = useRef(null);

    const openForm = () => {
        setFormOpen(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
    };

    return (
        <main className={styles.page}>
            <Seo
                title="Certified Vuba Stone Installer in Corpus Christi, TX | Coast to Coast Landscape & Design"
                description="Resin-bound Vuba Stone surfacing for pool decks, driveways, walkways, and patios — permeable, UV-stable, and seamless. Certified installation across Corpus Christi and the Coastal Bend."
                path="/vuba-stone"
                image={photos[0]?.img}
            />

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <div className="container">
                    <motion.div
                        className={styles.heroInner}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.certChip}>
                            <ShieldCheck size={14} strokeWidth={2} />
                            <span>Certified Vuba Installation Team</span>
                        </div>
                        <span className={styles.label}>Vuba Stone — A Standalone Service</span>
                        <h1 className={styles.headline}>
                            Resin-Bound Stone,<br />
                            <em>Installed by Certified Hands</em>
                        </h1>
                        <p className={styles.heroBody}>
                            Seamless, permeable, UV-stable stone surfacing for pool decks, driveways,
                            and patios — engineered in the UK, proven on the Texas coast, and installed
                            by a crew certified to do it right.
                        </p>
                        <button className={styles.heroCta} onClick={openForm}>
                            Request a Vuba Stone Quote
                            <ArrowRight size={14} strokeWidth={2} />
                        </button>
                    </motion.div>
                </div>
            </section>

            <div className={styles.goldRule} />

            {/* ── What is it ── */}
            <section className={`section ${styles.introSection}`}>
                <div className="container">
                    <div className={styles.introGrid}>
                        <div className={styles.introCopy}>
                            <motion.span
                                className={styles.eyebrow}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.5 }}
                            >
                                The Surface
                            </motion.span>
                            <motion.h2
                                className={styles.sectionHeadline}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                What Is <em>Vuba Stone?</em>
                            </motion.h2>
                            {[
                                "Vuba Stone is a resin-bound surfacing system: natural decorative stone blended with a crystal-clear, UV-stable resin, then hand-troweled into one continuous, seamless surface. No joints, no grout lines, no loose gravel — just refined natural stone that stays exactly where it was installed.",
                                "It's one of the fastest-growing premium surfaces in the country, and for good reason: it's fully permeable, so rain drains straight through instead of pooling; it stays cooler and smoother underfoot than most paving; and the color doesn't fade or yellow in the sun.",
                                "It is a precision product — and precision is the point. Resin ratios, base preparation, and troweling technique decide whether the surface lasts decades or fails in two summers. That's why we became certified before we ever offered it.",
                            ].map((para, i) => (
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
                                Request a Vuba Stone Quote
                                <ArrowRight size={14} strokeWidth={2} />
                            </motion.button>

                            <div ref={formRef}>
                                <InquiryForm
                                    open={formOpen}
                                    onClose={() => setFormOpen(false)}
                                    ctaText="Request a Vuba Stone Quote"
                                    defaultProjectType="Vuba Stone (Resin-Bound Surfacing)"
                                    idPrefix="vuba"
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={`${styles.sideCard} ${styles.sideCardCert}`}>
                                <ShieldCheck size={26} strokeWidth={1.5} className={styles.sideCertIcon} />
                                <span className={styles.sideLabel}>Certified Installer</span>
                                <p className={styles.sideCertText}>
                                    Our team completed Vuba's installer certification program — trained on
                                    base preparation, mixing ratios, and troweling technique to manufacturer
                                    specification.
                                </p>
                            </div>
                            <div className={styles.sideCard}>
                                <span className={styles.sideLabel}>Service Areas</span>
                                <ul className={styles.sideList}>
                                    {['Corpus Christi', 'Rockport', 'Port Aransas', 'Portland', 'Ingleside', 'Calallen', 'Flour Bluff'].map(area => (
                                        <li key={area} className={styles.sideItem}>{area}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.sideCard}>
                                <span className={styles.sideLabel}>Related Services</span>
                                <ul className={styles.sideList}>
                                    {[
                                        { name: 'Stone Patios & Hardscaping', href: '/services/stone-patios' },
                                        { name: 'Landscaping', href: '/services/landscaping' },
                                    ].map(({ name, href }) => (
                                        <li key={name}>
                                            <a href={href} className={styles.sideLink}>
                                                {name}
                                                <ArrowRight size={11} strokeWidth={2} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className={styles.benefitsSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>Why Vuba Stone Here</span>
                        <h2 className={styles.sectionHeadline}>
                            Made for the <em>Coastal Bend</em>
                        </h2>
                    </div>
                    <div className={styles.benefitsGrid}>
                        {BENEFITS.map(({ icon: Icon, title, text }, i) => (
                            <motion.div
                                key={title}
                                className={styles.benefitCard}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Icon size={22} strokeWidth={1.5} className={styles.benefitIcon} />
                                <h3 className={styles.benefitTitle}>{title}</h3>
                                <p className={styles.benefitText}>{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Certification band ── */}
            <section className={styles.certBand}>
                <div className="container">
                    <motion.div
                        className={styles.certInner}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <ShieldCheck size={40} strokeWidth={1.2} className={styles.certIcon} />
                        <p className={styles.certEyebrow}>Certified, Not Just Capable</p>
                        <h2 className={styles.certHeadline}>
                            Resin-bound stone rewards <em>precision</em> — and punishes shortcuts.
                        </h2>
                        <p className={styles.certBody}>
                            Vuba Stone isn't something a crew figures out on your driveway. Base preparation,
                            resin ratios, ambient temperature, and troweling technique all determine whether
                            the surface performs for decades. Our installation team is certified by Vuba and
                            installs to manufacturer specification — so your investment is protected by
                            process, not promises.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Applications ── */}
            <section className={styles.appsSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>Where It Belongs</span>
                        <h2 className={styles.sectionHeadline}>
                            One Surface, <em>Many Applications</em>
                        </h2>
                    </div>
                    <div className={styles.appsGrid}>
                        {APPLICATIONS.map(({ num, title, text }, i) => (
                            <motion.div
                                key={num}
                                className={styles.appCard}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className={styles.appNum}>{num}</span>
                                <h3 className={styles.appTitle}>{title}</h3>
                                <p className={styles.appText}>{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Blends & colors ── */}
            <section className={styles.blendsSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>Blends &amp; Colors</span>
                        <h2 className={styles.sectionHeadline}>
                            Thirty-Plus Blends, <em>One Perfect Match</em>
                        </h2>
                        <p className={styles.blendsIntro}>
                            Every Vuba blend is a curated mix of natural marble and granite aggregate —
                            and as a certified installer, we can source all of them. The swatches below
                            are Vuba's official blend imagery: the exact stone that goes into your surface.
                        </p>
                    </div>
                    <div className={styles.blendsGrid}>
                        {VUBA_BLENDS.map(({ name, img }, i) => (
                            <motion.div
                                key={name}
                                className={styles.blendCard}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.45, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className={styles.blendImgWrap}>
                                    <img
                                        src={img}
                                        alt={`Vuba Stone ${name} resin-bound blend`}
                                        className={styles.blendImg}
                                        loading="lazy"
                                    />
                                </div>
                                <span className={styles.blendName}>{name}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className={styles.blendsFootnote}>
                        <p className={styles.blendsFootnoteText}>
                            Colors on a screen only go so far — ask us to bring physical samples of
                            your shortlist to your on-site consultation.
                        </p>
                        <button className={styles.blendsCta} onClick={openForm}>
                            Request Blend Samples
                            <ArrowRight size={14} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Project gallery ── */}
            {photos.length > 0 && (
                <section className={styles.photoSection}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <span className={styles.eyebrow}>Our Work</span>
                            <h2 className={styles.sectionHeadline}>
                                Recent <em>Vuba Stone</em> Installations
                            </h2>
                        </div>
                        <PhotoGallery photos={photos} label="Vuba Stone" />
                    </div>
                </section>
            )}

            {/* ── FAQ ── */}
            <section className={styles.faqSection}>
                <div className="container">
                    <div className={styles.faqGrid}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.eyebrow}>Good Questions</span>
                            <h2 className={styles.sectionHeadline}>
                                Vuba Stone, <em>Answered</em>
                            </h2>
                        </div>
                        <div className={styles.faqList}>
                            {FAQS.map((faq, i) => (
                                <FaqItem
                                    key={i}
                                    faq={faq}
                                    open={openFaq === i}
                                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA band ── */}
            <section className={styles.ctaBand}>
                <div className="container">
                    <div className={styles.ctaInner}>
                        <div>
                            <p className={styles.ctaEyebrow}>Ready for a surface that lasts?</p>
                            <h2 className={styles.ctaHeadline}>
                                Let's design your <em>Vuba Stone</em> project.
                            </h2>
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
