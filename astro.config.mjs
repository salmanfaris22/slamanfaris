import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://www.salmanfaris.in',
  trailingSlash: 'always',
  // Inline CSS into the HTML so no render-blocking stylesheet request delays first paint.
  build: { inlineStylesheets: 'always' },
});
