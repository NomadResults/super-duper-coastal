// Financing via Enhancify (third-party lender/broker).
// Swap this single value for your real Enhancify application/partner URL and it
// updates the navbar, footer, and contact section everywhere at once.
export const ENHANCIFY_URL = 'https://www.enhancify.com/'; // TODO: replace with your Enhancify partner link

// Shared attributes for the outbound financing link.
// - target/rel: opens Enhancify's own hosted page in a new tab, safely.
// - rel "sponsored nofollow": the Google-recommended signal for a paid/partner
//   (financial) relationship, so this link doesn't affect SEO ranking.
export const FINANCING_LINK_PROPS = {
    href: ENHANCIFY_URL,
    target: '_blank',
    rel: 'sponsored nofollow noopener noreferrer',
};
