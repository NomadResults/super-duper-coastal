import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { areaSlugs } from './pages/AreaDetailPage.jsx';
import './index.css';

// Every route the prerender build writes to disk. Redirect-only routes
// (/portfolio/*) are excluded — vercel.json handles those.
export const prerenderRoutes = [
    '/',
    '/services',
    '/services/stone-patios',
    '/services/outdoor-kitchens',
    '/services/outdoor-lighting',
    '/services/landscaping',
    '/services/artificial-turf',
    '/vuba-stone',
    '/service-areas',
    ...areaSlugs.map((slug) => `/service-areas/${slug}`),
    '/about',
    '/careers',
];

// With React 19, helmet tags render as native elements that React hoists to
// the front of the output string; scripts/prerender.mjs splits them off there.
export function render(url) {
    const html = renderToString(
        <StrictMode>
            <HelmetProvider>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </HelmetProvider>
        </StrictMode>,
    );
    return { html };
}
