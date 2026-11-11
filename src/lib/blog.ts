import type { CollectionEntry } from 'astro:content';

export const blogCategories = [
  { slug: 'web-development', name: 'Web Development', intro: 'Choosing, planning and building websites and web applications.' },
  { slug: 'ai-development', name: 'AI Development', intro: 'Building with language models, agents and AI coding tools.' },
  { slug: 'digital-marketing', name: 'Digital Marketing', intro: 'Marketing that small businesses in Kerala can measure.' },
  { slug: 'video-editing', name: 'Video Editing', intro: 'Editing, motion and first-hand production notes.' },
  { slug: 'seo', name: 'SEO', intro: 'Technical and local search, explained plainly.' },
] as const;

export const postPath = (post: CollectionEntry<'blog'>) => `/blog/${post.data.category}/${post.id}/`;
/** Category pages only count as search landing pages once they hold at least two articles. */
export const MIN_POSTS_TO_INDEX = 2;
