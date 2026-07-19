/**
 * Post-build prerender: renders every route in prerenderRoutes to static HTML
 * so search engines and AI crawlers (which mostly don't execute JS) see full
 * page content. Runs after `vite build` (client) + `vite build --ssr` (server).
 *
 * With React 19, helmet-managed tags (<title>/<meta>/<link>) are hoisted by
 * React to the front of the renderToString output rather than collected into
 * the helmet context. We split them off and swap them into the
 * <!--seo-start-->…<!--seo-end--> block of index.html; the remaining markup
 * goes into <div id="root">.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { render, prerenderRoutes } = await import(
    path.join(serverDir, 'entry-server.js')
);

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const SEO_BLOCK = /<!--seo-start[\s\S]*?<!--seo-end-->/;
if (!SEO_BLOCK.test(template)) {
    throw new Error('index.html is missing the <!--seo-start-->/<!--seo-end--> markers');
}
const ROOT_DIV = '<div id="root"></div>';
if (!template.includes(ROOT_DIV)) {
    throw new Error('index.html is missing an empty <div id="root"></div>');
}

// Contiguous run of hoisted head tags at the start of the rendered string
const HEAD_TAGS = /^(?:<title[^>]*>[\s\S]*?<\/title>|<meta\s[^>]*?\/?>|<link\s[^>]*?\/?>)+/;

for (const route of prerenderRoutes) {
    const { html } = render(route);

    const match = html.match(HEAD_TAGS);
    const headTags = match ? match[0] : '';
    const appHtml = html.slice(headTags.length);
    if (!headTags.includes('<title')) {
        console.warn(`WARNING: ${route} rendered no <title> — is its <Seo> missing?`);
    }

    const page = template
        .replace(SEO_BLOCK, headTags)
        .replace(ROOT_DIV, `<div id="root">${appHtml}</div>`);

    const outFile =
        route === '/'
            ? path.join(distDir, 'index.html')
            : path.join(distDir, route.slice(1), 'index.html');
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, page);
    console.log(`prerendered ${route} -> ${path.relative(root, outFile)}`);
}

await rm(serverDir, { recursive: true, force: true });
console.log(`\n${prerenderRoutes.length} routes prerendered.`);
