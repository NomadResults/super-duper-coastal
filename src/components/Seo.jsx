import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.coast2coastlandscapes.com';
const SITE_NAME = 'Coast to Coast Landscape & Design';
// Same default social image index.html uses
const DEFAULT_IMAGE = 'https://images.leadconnectorhq.com/image/f_jpg/q_80/r_1200/u_https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69f8d6dbca15d8ddc42ec72c.jpg';

/**
 * Per-page meta tags. `path` is the route path ('/services/stone-patios');
 * `image` may be absolute (CDN) or site-relative.
 */
export default function Seo({ title, description, path, image }) {
    const canonicalUrl = `${SITE_URL}${path}`;
    const ogImage = image
        ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
        : DEFAULT_IMAGE;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
}
