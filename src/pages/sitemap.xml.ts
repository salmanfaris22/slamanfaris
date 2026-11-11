import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { courses, isIndexable } from '../data/courses';
import { alternatesFor, locales } from '../data/i18n';
import { places } from '../data/locations';
import { projects, SITE_UPDATED } from '../data/portfolio';
import { MIN_POSTS_TO_INDEX, blogCategories, postPath } from '../lib/blog';
import { services } from '../lib/services';

interface Entry { path: string; lastmod: string; alternates?: { hreflang: string; href: string }[]; images?: string[]; }

const day = (date: Date) => date.toISOString().slice(0, 10);

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');
  const staticPages = ['/about/', '/services/', '/projects/', '/blog/', '/contact/', '/best-developer-in-kerala/', '/privacy/', '/terms/'];
  const entries: Entry[] = [
    { path: '/', lastmod: SITE_UPDATED, alternates: alternatesFor('home'), images: ['/images/portrait.webp'] },
    { path: '/courses/', lastmod: SITE_UPDATED, alternates: alternatesFor('courses') },
    ...staticPages.map((path) => ({ path, lastmod: SITE_UPDATED })),
    ...services.map((service) => ({ path: `/services/${service.slug}/`, lastmod: service.updated })),
    ...projects.map((project) => ({ path: `/projects/${project.id}/`, lastmod: project.updated, images: project.image ? [project.image] : undefined })),
    ...courses.filter(isIndexable).map((course) => ({ path: `/courses/${course.slug}/`, lastmod: course.updated })),
    ...places.map((place) => ({ path: `/locations/${place.slug}/`, lastmod: SITE_UPDATED })),
    ...posts.map((post) => ({ path: postPath(post), lastmod: day(post.data.updated ?? post.data.published) })),
    ...blogCategories.filter((category) => posts.filter((post) => post.data.category === category.slug).length >= MIN_POSTS_TO_INDEX).map((category) => ({ path: `/blog/${category.slug}/`, lastmod: SITE_UPDATED })),
    ...locales.flatMap((locale) => [
      { path: `/${locale.code}/`, lastmod: SITE_UPDATED, alternates: alternatesFor('home') },
      { path: `/${locale.code}/courses/`, lastmod: SITE_UPDATED, alternates: alternatesFor('courses') },
    ]),
  ];
  const absolute = (path: string) => new URL(path, site).href;
  const xml = entries.map((entry) => {
    const links = (entry.alternates ?? []).map((item) => `<xhtml:link rel="alternate" hreflang="${item.hreflang}" href="${absolute(item.href)}"/>`).join('');
    const images = (entry.images ?? []).map((image) => `<image:image><image:loc>${absolute(image)}</image:loc></image:image>`).join('');
    return `<url><loc>${absolute(entry.path)}</loc><lastmod>${entry.lastmod}</lastmod>${links}${images}</url>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${xml}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
