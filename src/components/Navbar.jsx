import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const WHAT_WE_BUILD = [
    { label: 'Hardscaping',      href: '/services/stone-patios' },
    { label: 'Landscaping',      href: '/services/landscaping' },
    { label: 'Outdoor Kitchens', href: '/services/outdoor-kitchens' },
    { label: 'Outdoor Lighting', href: '/services/outdoor-lighting' },
    { label: 'Artificial Turf',  href: '/services/artificial-turf' },
];

const LOCATIONS = [
    { label: 'Corpus Christi', href: '/service-areas/corpus-christi' },
    { label: 'Rockport',       href: '/service-areas/rockport' },
    { label: 'Port Aransas',   href: '/service-areas/port-aransas' },
    { label: 'Portland, TX',   href: '/service-areas/portland' },
    { label: 'Ingleside',      href: '/service-areas/ingleside' },
    { label: 'Calallen',       href: '/service-areas/calallen' },
    { label: 'Flour Bluff',    href: '/service-areas/flour-bluff' },
];

const NAV_LINKS = [
    { label: 'About Us',      href: '/about' },
    { label: 'What We Build', href: '/services', dropdown: WHAT_WE_BUILD },
    { label: 'Portfolio',     href: '/portfolio' },
    { label: 'Locations',     href: '/service-areas', dropdown: LOCATIONS },
];

function NavItem({ link, scrolled }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    if (link.dropdown) {
        return (
            <div
                ref={ref}
                className={styles.dropdownWrap}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <button
                    className={`${styles.navLink} ${styles.navLinkBtn}`}
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                >
                    {link.label}
                    <ChevronDown size={12} strokeWidth={2} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
                </button>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className={`${styles.dropdown} ${scrolled ? styles.dropdownDark : ''}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15 }}
                        >
                            {link.dropdown.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    to={href}
                                    className={styles.dropdownItem}
                                    onClick={() => setOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    if (link.href.startsWith('/') && !link.href.startsWith('/#')) {
        return <Link to={link.href} className={styles.navLink}>{link.label}</Link>;
    }
    return <a href={link.href} className={styles.navLink}>{link.label}</a>;
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState(null); // 'what-we-build' | 'locations' | null
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); setMobileExpanded(null); }, [location]);

    const toggleMobile = (key) => setMobileExpanded(prev => prev === key ? null : key);

    return (
        <header className={`${styles.header} ${(scrolled || !isHome) ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                {/* Logo */}
                <Link to="/" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className={styles.logoIcon}>
                        <svg viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 9 C8 4, 14 14, 22 9 C30 4, 36 14, 42 9" stroke="currentColor" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
                            <line x1="2" y1="19" x2="42" y2="19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
                            <line x1="2" y1="29" x2="42" y2="29" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <div className={styles.logoDivider} />
                    <div className={styles.logoTextBlock}>
                        <span className={styles.logoLine1}>Coast to Coast</span>
                        <span className={styles.logoLine2}>Landscape &amp; Design</span>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className={styles.desktopNav}>
                    {NAV_LINKS.map((link) => (
                        <NavItem key={link.label} link={link} scrolled={scrolled} />
                    ))}
                </nav>

                {/* CTA + hamburger */}
                <div className={styles.actions}>
                    <a href="tel:+13613165251" className={styles.phoneLink}>(361) 316-5251</a>
                    <a href="/#contact" className={styles.ctaBtn}>Schedule a Consultation</a>
                    <button
                        className={styles.menuBtn}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.mobileLinks}>

                            <Link to="/about" className={styles.mobileLink}>About Us</Link>

                            {/* What We Build accordion */}
                            <button
                                className={`${styles.mobileLink} ${styles.mobileLinkBtn}`}
                                onClick={() => toggleMobile('what-we-build')}
                            >
                                What We Build
                                <ChevronDown size={14} strokeWidth={2} className={`${styles.chevron} ${mobileExpanded === 'what-we-build' ? styles.chevronOpen : ''}`} />
                            </button>
                            <AnimatePresence>
                                {mobileExpanded === 'what-we-build' && (
                                    <motion.div
                                        className={styles.mobileSubmenu}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link to="/services" className={`${styles.mobileSubLink} ${styles.mobileSubLinkAll}`}>View All Services</Link>
                                        {WHAT_WE_BUILD.map(({ label, href }) => (
                                            <Link key={label} to={href} className={styles.mobileSubLink}>{label}</Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Link to="/portfolio" className={styles.mobileLink}>Portfolio</Link>

                            {/* Locations accordion */}
                            <button
                                className={`${styles.mobileLink} ${styles.mobileLinkBtn}`}
                                onClick={() => toggleMobile('locations')}
                            >
                                Locations
                                <ChevronDown size={14} strokeWidth={2} className={`${styles.chevron} ${mobileExpanded === 'locations' ? styles.chevronOpen : ''}`} />
                            </button>
                            <AnimatePresence>
                                {mobileExpanded === 'locations' && (
                                    <motion.div
                                        className={styles.mobileSubmenu}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {LOCATIONS.map(({ label, href }) => (
                                            <Link key={label} to={href} className={styles.mobileSubLink}>{label}</Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <a href="/#contact" className={styles.mobileCta} onClick={() => setMobileOpen(false)}>Schedule a Consultation</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
