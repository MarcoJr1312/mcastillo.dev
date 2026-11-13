import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mcastillo.dev',
  integrations: [
    sitemap({
      // Keep legacy redirect pages out of the sitemap.
      filter: (page) => {
        const path = new URL(page).pathname;
        return !(
          path === '/en/' ||
          path.startsWith('/en/projects/') ||
          path.startsWith('/proyectos/')
        );
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
  },
});
