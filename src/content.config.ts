import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    seoTitle: z.string().max(65),
    description: z.string().min(110).max(170),
    category: z.enum(['web-development', 'ai-development', 'digital-marketing', 'video-editing', 'seo']),
    categoryName: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    keyword: z.string(),
    relatedServices: z.array(z.string()).min(1),
    relatedCourse: z.string().optional(),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
  }),
});

export const collections = { blog };
