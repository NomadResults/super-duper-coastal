import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const locations = [
    { label: 'Corpus Christi', href: '/service-areas/corpus-christi' },
    { label: 'Rockport',       href: '/service-areas/rockport' },
    { label: 'Port Aransas',   href: '/service-areas/port-aransas' },
    { label: 'Portland, TX',   href: '/service-areas/portland' },
    { label: 'Ingleside',      href: '/service-areas/ingleside' },
    { label: 'Calallen',       href: '/service-areas/calallen' },
    { label: 'Flour Bluff',    href: '/service-areas/flour-bluff' },
];
const services = [
    { label: 'Hardscaping',          href: '/services/stone-patios' },
    { label: 'Landscaping',          href: '/services/landscaping' },
    { label: 'Outdoor Kitchens',     href: '/services/outdoor-kitchens' },
    { label: 'Outdoor Lighting',     href: '/services/outdoor-lighting' },
    { label: 'Artificial Turf',      href: '/services/artificial-turf' },
];
const social = [
    { label: 'Facebook',  href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Google',    href: '#' },
    { label: 'Youtube',   href: '#' },
    { label: 'Houzz',     href: '#' },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <div className={styles.logoRow}>
                            <div className={styles.logoIcon} style={{ width: 36, height: 28, color: 'var(--accent-bright)', flexShrink: 0 }}>
                                <svg viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                    <path d="M2 9 C8 4, 14 14, 22 9 C30 4, 36 14, 42 9" stroke="currentColor" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
                                    <line x1="2" y1="19" x2="42" y2="19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
                                    <line x1="2" y1="29" x2="42" y2="29" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div style={{ width: 1, height: 32, background: 'var(--accent-bright)', opacity: 0.5, flexShrink: 0 }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
                                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.95rem', fontWeight: 600, fontVariant: 'small-caps', letterSpacing: '0.06em', color: 'var(--accent-bright)', lineHeight: 1.15 }}>Coast to Coast</span>
                                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.72rem', fontWeight: 400, fontVariant: 'small-caps', letterSpacing: '0.06em', color: 'rgba(196,168,96,0.7)', lineHeight: 1.15 }}>Landscape &amp; Design</span>
                            </div>
                        </div>
                        <p className={styles.brandDesc}>
                            Designing outdoor environments for the way South Texas lives. Our
                            design-build philosophy is rooted in architectural precision, coastal
                            durability, and the elevated standard the Coastal Bend deserves.
                        </p>
                        <div className={styles.contactInfo}>
                            <a href="tel:+13613165251" className={styles.contactLink}>(361) 316-5251</a>
                            <span className={styles.contactAddr}>201 16th St, Corpus Christi, TX</span>
                        </div>
                    </div>

                    {/* Locations */}
                    <div>
                        <h6 className={styles.colLabel}>Locations</h6>
                        <ul className={styles.list}>
                            {locations.map((loc) => (
                                <li key={loc.label}>
                                    <Link to={loc.href} className={styles.listLink}>{loc.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h6 className={styles.colLabel}>Services</h6>
                        <ul className={styles.list}>
                            {services.map((svc) => (
                                <li key={svc.label}>
                                    <Link to={svc.href} className={styles.listLink}>{svc.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h6 className={styles.colLabel}>Connect</h6>
                        <ul className={styles.list}>
                            {social.map((s) => (
                                <li key={s.label}>
                                    <a href={s.href} className={styles.listLink}>{s.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        &copy; 2026 Coast to Coast Landscape &amp; Design. All Rights Reserved.
                    </p>
                    <div className={styles.legal}>
                        {['Privacy Policy', 'Terms of Service'].map((l) => (
                            <a key={l} href="#" className={styles.legalLink}>{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
