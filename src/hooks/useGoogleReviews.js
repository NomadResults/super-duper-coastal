import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

// Uses the Places API (New) REST endpoint — no Maps JS SDK required.
// Requires "Places API (New)" enabled in Google Cloud Console.
export function useGoogleReviews() {
    const [reviews, setReviews] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [rating, setRating] = useState(null);
    const [totalRatings, setTotalRatings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchPlace() {
            try {
                const res = await fetch(
                    `https://places.googleapis.com/v1/places/${PLACE_ID}`,
                    {
                        method: 'GET',
                        headers: {
                            'X-Goog-Api-Key': API_KEY,
                            'X-Goog-FieldMask': 'reviews,photos,rating,userRatingCount',
                        },
                    }
                );

                if (!res.ok) {
                    const body = await res.text();
                    throw new Error(`Places API ${res.status}: ${body}`);
                }

                const data = await res.json();
                if (cancelled) return;

                // Normalize reviews to a consistent shape
                const raw = (data.reviews || []).map(r => ({
                    author_name: r.authorAttribution?.displayName ?? 'Google Reviewer',
                    author_photo: r.authorAttribution?.photoUri ?? null,
                    rating: r.rating ?? 5,
                    text: r.text?.text ?? r.originalText?.text ?? '',
                    relative_time_description: r.relativePublishTimeDescription ?? '',
                }));

                // Prefer 5-star reviews first, then 4-star
                const fiveStars = raw.filter(r => r.rating === 5);
                const fourStars = raw.filter(r => r.rating === 4);
                const rest = raw.filter(r => r.rating < 4);
                const sorted = [...fiveStars, ...fourStars, ...rest];

                setReviews(sorted.length > 0 ? sorted : raw);
                setRating(data.rating ?? null);
                setTotalRatings(data.userRatingCount ?? null);

                // Build direct photo media URLs from the Places API (New)
                const photoUrls = (data.photos || []).map(p =>
                    `https://places.googleapis.com/v1/${p.name}/media?maxHeightPx=1600&maxWidthPx=1200&key=${API_KEY}`
                );
                setPhotos(photoUrls);
            } catch (e) {
                if (!cancelled) {
                    console.error('[useGoogleReviews]', e);
                    setError(e.message);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPlace();
        return () => { cancelled = true; };
    }, []);

    return { reviews, photos, rating, totalRatings, loading, error };
}
