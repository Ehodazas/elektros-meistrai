/**
 * Runs after `vite build`:
 *  - writes dist/<route>/index.html for every route with its own <title>, description,
 *    canonical and Open Graph tags (crawlers and link previews see them without JS,
 *    and deep links work on static hosts such as GitHub Pages);
 *  - writes 404.html (SPA fallback, noindex), sitemap.xml, robots.txt and .nojekyll;
 *  - adds Electrician JSON-LD to the home page with only the details that are configured.
 *
 * Run with Node 23.6+ (TypeScript types are stripped natively).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { loadEnv } from "vite";
import { pages, notFoundSeo, type PageSeo } from "../src/data/seo.ts";
import { company } from "../src/data/company.ts";
import { faq } from "../src/data/faq.ts";

const env = loadEnv(process.env.NODE_ENV === "development" ? "development" : "production", process.cwd(), "");
const DIST = "dist";
const PLACEHOLDER_URL = "https://www.jusu-domenas.lt";
const SITE_URL = (env.SITE_URL || "").replace(/\/$/, "");
const siteUrl = SITE_URL || PLACEHOLDER_URL;

if (!SITE_URL) {
  console.warn(`\n⚠  SITE_URL is not set – sitemap.xml and canonical URLs use ${PLACEHOLDER_URL}. Set it in .env before deploying.\n`);
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const pexelsUrl = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop`;
const pageUrl = (p: PageSeo) => siteUrl + (p.path === "/" ? "/" : `${p.path}/`);

function headFor(p: PageSeo, opts: { noindex?: boolean } = {}): string {
  const tags = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<meta name="robots" content="${opts.noindex ? "noindex" : "index, follow"}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="lt_LT" />`,
    `<meta property="og:site_name" content="${esc(company.name)}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (!opts.noindex) {
    tags.push(`<link rel="canonical" href="${pageUrl(p)}" />`, `<meta property="og:url" content="${pageUrl(p)}" />`);
  }
  if (p.ogImage) tags.push(`<meta property="og:image" content="${esc(pexelsUrl(p.ogImage))}" />`);
  if (p.path === "/") tags.push(jsonLd());
  return tags.join("\n    ");
}

function jsonLd(): string {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: company.legalName || company.name,
    url: siteUrl + "/",
    image: pexelsUrl(27928762),
  };
  if (company.phone) data.telephone = company.phone;
  if (company.email) data.email = company.email;
  if (company.serviceArea) data.areaServed = company.serviceArea;
  if (company.address) data.address = company.address;
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return [data, faqData].map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`).join("\n    ");
}

const template = readFileSync(join(DIST, "index.html"), "utf8");
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template)) throw new Error("SEO markers not found in dist/index.html");

const render = (p: PageSeo, opts?: { noindex?: boolean }) => template.replace(SEO_BLOCK, headFor(p, opts));

for (const p of pages) {
  const file = p.path === "/" ? join(DIST, "index.html") : join(DIST, p.path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(p));
}

writeFileSync(join(DIST, "404.html"), render(notFoundSeo, { noindex: true }));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => p.sitemap !== false)
  .map((p) => `  <url><loc>${pageUrl(p)}</loc><lastmod>${today}</lastmod><priority>${(p.priority ?? 0.5).toFixed(1)}</priority></url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);
writeFileSync(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
writeFileSync(join(DIST, ".nojekyll"), "");

console.log(`postbuild: ${pages.length} pages, 404.html, sitemap.xml, robots.txt → ${siteUrl}`);
