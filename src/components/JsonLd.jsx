/**
 * Inline JSON-LD structured data. Rendered in the page body (valid per
 * schema.org / Google) so it survives prerendering and client-side nav.
 */
export default function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
