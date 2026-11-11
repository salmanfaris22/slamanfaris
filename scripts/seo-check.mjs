// Post-build SEO checks on dist/. Fails the build on real errors and prints warnings for review.
// Run: node scripts/seo-check.mjs
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const ORIGIN = process.env.SITE_URL || 'https://www.salmanfaris.in';
const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html') && !/^google[0-9a-f]+\.html$/.test(path.basename(f)));
const routeOf = (f) => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\.html$/, '');
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const textOf = (html) => decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));

const exists = (href) => {
  const clean = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (!clean || clean === '/') return true;
  const full = path.join(DIST, clean);
  return clean.endsWith('/') ? fs.existsSync(path.join(full, 'index.html')) : fs.existsSync(full) || fs.existsSync(`${full}.html`);
};

const redirects = new Set(JSON.parse(fs.readFileSync('vercel.json', 'utf8')).redirects.map((r) => r.source));
const pages = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeOf(file);
  const head = html.split('</head>')[0];
  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(attr(head.match(/<meta name="description"[^>]*>/)?.[0] ?? '', 'content') ?? '');
  const canonical = attr(head.match(/<link rel="canonical"[^>]*>/)?.[0] ?? '', 'href');
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(head);
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const body = html.slice(html.indexOf('<body'));
  pages.push({ route, title, desc, canonical, noindex, html, body });

  if (route === '/404') {
    if (!noindex) err(route, '404 page must be noindex');
    continue;
  }
  if (!title) err(route, 'missing <title>');
  else if (title.length > 70) warn(route, `title is ${title.length} characters`);
  if (!desc) err(route, 'missing meta description');
  else if (desc.length < 90 || desc.length > 175) warn(route, `description is ${desc.length} characters`);
  if (canonical !== `${ORIGIN}${route}`) err(route, `canonical is ${canonical}`);
  if (h1s !== 1) err(route, `${h1s} H1 headings`);
  if (/chatgpt\.site/.test(html)) err(route, 'old chatgpt.site host found');
  for (const need of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card']) if (!head.includes(need)) err(route, `missing ${need}`);

  for (const tag of body.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt="[^"]+"/.test(tag)) err(route, `image without alt text: ${attr(tag, 'src')}`);
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) err(route, `image without dimensions: ${attr(tag, 'src')}`);
    const src = attr(tag, 'src');
    if (src?.startsWith('/') && !exists(src)) err(route, `missing image ${src}`);
  }
  for (const tag of body.match(/<a\b[^>]*>/g) ?? []) {
    const href = attr(tag, 'href');
    if (!href) { err(route, 'link without href'); continue; }
    if (!href.startsWith('/')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!exists(href)) err(route, `broken internal link ${href}`);
    else if (clean.length > 1 && !clean.endsWith('/') && !path.extname(clean)) warn(route, `link without trailing slash ${href}`);
  }
  for (const id of [...body.matchAll(/href="#([^"]+)"/g)].map((m) => m[1])) if (!body.includes(`id="${id}"`)) err(route, `missing anchor #${id}`);

  for (const block of html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) ?? []) {
    let data;
    try {
      data = JSON.parse(block.replace(/<\/?script[^>]*>/g, ''));
    } catch {
      err(route, 'invalid JSON-LD');
      continue;
    }
    const types = (data['@graph'] ?? [data]).flatMap((node) => node['@type']);
    if (types.some((t) => ['AggregateRating', 'Review', 'LocalBusiness'].includes(t))) err(route, `forbidden schema type: ${types.join(', ')}`);
    if (!types.includes('Person')) err(route, 'Person missing from JSON-LD');
    if (JSON.stringify(data).match(/aggregateRating/i)) err(route, 'aggregateRating in JSON-LD');
    for (const node of data['@graph'] ?? []) {
      if (node['@type'] !== 'FAQPage') continue;
      const text = textOf(body);
      for (const q of node.mainEntity) if (!text.includes(q.name)) err(route, `FAQ not visible on page: ${q.name}`);
    }
  }

  const words = textOf(body).split(' ').length;
  if (!noindex && words < 150) warn(route, `only ${words} words`);
}

const indexable = pages.filter((page) => !page.noindex && page.route !== '/404');
for (const key of ['title', 'desc']) {
  const seen = new Map();
  for (const page of indexable) {
    if (seen.has(page[key])) err(page.route, `duplicate ${key} with ${seen.get(page[key])}`);
    seen.set(page[key], page.route);
  }
}

// hreflang must point both ways.
const hreflangOf = (page) => new Map([...page.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
for (const page of pages) {
  const links = hreflangOf(page);
  for (const [lang, href] of links) {
    const route = href.replace(ORIGIN, '');
    const target = pages.find((item) => item.route === route);
    if (!target) { err(page.route, `hreflang ${lang} points to a missing page ${href}`); continue; }
    if (![...hreflangOf(target).values()].includes(`${ORIGIN}${page.route}`)) err(page.route, `hreflang ${lang} is not reciprocal with ${route}`);
  }
}

// Sitemap and pages must agree, and old flat URLs must all redirect.
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, ''));
for (const route of listed) {
  const page = pages.find((item) => item.route === route);
  if (!page) err('/sitemap.xml', `lists a missing page ${route}`);
  else if (page.noindex) err('/sitemap.xml', `lists a noindex page ${route}`);
}
for (const page of indexable) if (!listed.includes(page.route)) err(page.route, 'indexable page is missing from the sitemap');
if (/chatgpt\.site/.test(sitemap)) err('/sitemap.xml', 'old host');
const robots = fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8');
if (!robots.includes(`${ORIGIN}/sitemap.xml`)) err('/robots.txt', 'sitemap line is wrong');
for (const source of redirects) if (source.includes(':') === false && exists(`${source}/`) && !source.startsWith('/digital-marketer') ) err(source, 'redirect source also exists as a page');

// Every indexable page needs at least one link from another page.
const linked = new Set();
for (const page of pages) for (const match of page.body.matchAll(/href="(\/[^"#?]*)/g)) if (match[1] !== page.route) linked.add(match[1]);
for (const page of indexable) if (page.route !== '/' && !linked.has(page.route)) warn(page.route, 'orphan page with no internal links');

console.log(`SEO check: ${pages.length} pages, ${indexable.length} indexable, ${listed.length} in sitemap`);
for (const warning of warnings) console.log(`  warn  ${warning}`);
for (const error of errors) console.error(`  ERROR ${error}`);
if (errors.length) {
  console.error(`SEO check failed with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`SEO check passed with ${warnings.length} warning(s).`);
