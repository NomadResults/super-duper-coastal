import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './Testimonials.module.css';
import { useGoogleReviews } from '../hooks/useGoogleReviews';

const REVIEW_URL = import.meta.env.VITE_GOOGLE_REVIEW_URL;

// Fallback photos shown only if Google returns no photos
const FALLBACK_PHOTOS = [
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c77095b9c9103d5fe39.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776e306f5b0b63d8cc.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c7792b3555384f90322.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9c776917d28e929fd287.png',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b9a07095b9ca106d5afdb.jpg',
    'https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/690b8aa492b355e9fbf61ed8.jpg',
];

// Shown while the API loads or if it fails
const FALLBACK_REVIEWS = [
    {
        author_name: 'David R.',
        rating: 5,
        text: 'Coast to Coast transformed our backyard into something we actually use every day. The patio and outdoor kitchen came out exactly like we envisioned — and the team was professional from the first call to the final walkthrough.',
        relative_time_description: 'a month ago',
    },
    {
        author_name: 'Maria G.',
        rating: 5,
        text: 'From the initial design meeting to the final installation, every step was handled with professionalism. Our new stone patio is absolutely beautiful.',
        relative_time_description: '2 months ago',
    },
    {
        author_name: 'James T.',
        rating: 5,
        text: 'The crew showed up on time every single day and cleaned up after themselves. The outdoor kitchen came out better than we imagined.',
        relative_time_description: '3 months ago',
    },
];

function StarRow({ rating, size = 16 }) {
    return (
        <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={size}
                    strokeWidth={1.5}
                    fill={i <= rating ? 'var(--accent)' : 'none'}
                    stroke={i <= rating ? 'var(--accent)' : 'var(--text-secondary)'}
                />
            ))}
        </div>
    );
}

function GoogleLogo() {
    return (
        <svg className={styles.googleLogo} viewBox="0 0 24 24" aria-label="Google" fill="none">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

const VARIANTS = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function Testimonials() {
    const { reviews, photos, rating, totalRatings, loading } = useGoogleReviews();

    const activeReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS;
    const activePhotos = photos.length > 0 ? photos : FALLBACK_PHOTOS;
    const total = activeReviews.length;

    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(1);
    const paused = useRef(false);
    const timerRef = useRef(null);

    function startTimer() {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            if (!paused.current) {
                setDir(1);
                setIndex(i => (i + 1) % total);
            }
        }, 6500);
    }

    // Restart timer whenever total becomes known or changes
    useEffect(() => {
        if (total <= 1) return;
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [total]);

    function navigate(newDir) {
        setDir(newDir);
        setIndex(i => (i + newDir + total) % total);
        startTimer(); // reset timer on manual nav
    }

    function jumpTo(i) {
        setDir(i > index ? 1 : -1);
        setIndex(i);
        startTimer();
    }

    const review = activeReviews[index];
    const photoSrc = activePhotos[index % activePhotos.length];

    return (
        <section
            className={`section ${styles.section}`}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => { paused.current = false; }}
        >
            {/* Slide area */}
            <div className={styles.slideWrap}>
                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={index}
                        className={`container ${styles.inner}`}
                        custom={dir}
                        variants={VARIANTS}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 80, damping: 22 }}
                    >
                        {/* Left — quote */}
                        <div className={styles.quoteCol}>
                            <div className={styles.quoteIcon} aria-hidden="true">"</div>
                            <StarRow rating={review.rating} />
                            <blockquote className={styles.quote}>{review.text}</blockquote>
                            <div className={styles.author}>
                                <div className={styles.name}>{review.author_name}</div>
                                <div className={styles.project}>{review.relative_time_description}</div>
                            </div>
                        </div>

                        {/* Right — photo from Google Business profile */}
                        <div className={styles.imageCol}>
                            <div className={styles.imgWrap}>
                                <img
                                    src={photoSrc}
                                    alt="Coast to Coast Landscape & Design project"
                                    className={styles.img}
                                />
                            </div>
                            <div className={styles.statBox}>
                                <p className={styles.statNum}>98%</p>
                                <p className={styles.statLabel}>Client Satisfaction</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Carousel controls */}
            <div className={`container ${styles.controls}`}>
                <div className={styles.dots}>
                    {activeReviews.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                            onClick={() => jumpTo(i)}
                            aria-label={`Go to review ${i + 1}`}
                        />
                    ))}
                </div>
                <div className={styles.counter}>
                    {index + 1} / {total}
                </div>
                <div className={styles.arrows}>
                    <button
                        className={styles.arrowBtn}
                        onClick={() => navigate(-1)}
                        aria-label="Previous review"
                    >
                        <ChevronLeft size={18} strokeWidth={1.5} />
                    </button>
                    <button
                        className={styles.arrowBtn}
                        onClick={() => navigate(1)}
                        aria-label="Next review"
                    >
                        <ChevronRight size={18} strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* Google footer */}
            <div className={`container ${styles.googleFooter}`}>
                <div className={styles.googleRating}>
                    <GoogleLogo />
                    {!loading && rating && (
                        <>
                            <span className={styles.ratingNum}>{rating.toFixed(1)}</span>
                            <StarRow rating={Math.round(rating)} size={13} />
                            {totalRatings && (
                                <span className={styles.ratingCount}>({totalRatings.toLocaleString()} reviews)</span>
                            )}
                        </>
                    )}
                    <a
                        href={REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.googleLink}
                    >
                        See all reviews on Google →
                    </a>
                </div>
                <a
                    href={REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.leaveReview}
                >
                    Leave Us a Review
                </a>
            </div>
        </section>
    );
}
