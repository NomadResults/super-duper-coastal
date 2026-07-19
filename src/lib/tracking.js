// Lightweight attribution + Meta Pixel helpers.
//
// Attribution: on first page load anywhere on the site we snapshot the UTM
// params, click IDs, referrer, and landing path into sessionStorage. That way a
// visitor who lands on the homepage from a Facebook ad and *then* navigates to
// /careers still carries the campaign data into their application.
//
// Meta Pixel: only loads if VITE_META_PIXEL_ID is set (Vercel env var), so the
// site runs pixel-free in dev / before you have an ad account.

const STORAGE_KEY = 'c2c_attribution';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const CLICK_KEYS = ['fbclid', 'gclid', 'ttclid', 'msclkid'];

/** Snapshot campaign data once per session (first touch wins). */
export function captureAttribution() {
    if (typeof window === 'undefined') return;
    try {
        if (sessionStorage.getItem(STORAGE_KEY)) return; // already captured this session
        const params = new URLSearchParams(window.location.search);
        const data = {};
        for (const k of [...UTM_KEYS, ...CLICK_KEYS]) {
            const v = params.get(k);
            if (v) data[k] = v;
        }
        data.landing_path = window.location.pathname;
        data.referrer = document.referrer || '';
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        /* sessionStorage blocked (private mode) — attribution is best-effort */
    }
}

/** Read the captured attribution back (returns {} if none). */
export function getAttribution() {
    if (typeof window === 'undefined') return {};
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
        return {};
    }
}

/** Load the Meta Pixel if a pixel id is configured. Safe to call once on boot. */
export function initMetaPixel() {
    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    if (!pixelId || typeof window === 'undefined' || window.fbq) return;
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
}

/** Fire a Meta Pixel event (no-op if the pixel isn't loaded). */
export function trackPixel(event, params = {}) {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', event, params);
    }
}
