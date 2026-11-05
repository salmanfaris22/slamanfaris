import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://salman-faris-studio.salman567633800.chatgpt.site',
  vite: { plugins: [tailwindcss()] },
});
