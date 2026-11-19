import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = process.env.SITE_URL || 'https://www.salwahevents.com';

const EXCLUDED_SITEMAP_PATHS = [
  '/admin',
  '/admin/invoices',
  '/admin/quotations',
  '/privacy-policy',
  '/cookie-notice',
  '/404',
  '/wedding-stage-decor-london',
];

/**
 * Copies the generated sitemap-0.xml to /sitemap.xml so both
 * /sitemap.xml (standard GSC URL) and /sitemap-index.xml return valid XML.
 */
function copyDirectSitemap() {
  return {
    name: 'salwah-direct-sitemap',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const sitemap0 = path.join(outDir, 'sitemap-0.xml');
        const directSitemap = path.join(outDir, 'sitemap.xml');
        if (fs.existsSync(sitemap0)) {
          fs.copyFileSync(sitemap0, directSitemap);
        }
      },
    },
  };
}

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '') || '/';
        return !EXCLUDED_SITEMAP_PATHS.includes(pathname);
      },
      changefreq: 'weekly',
      priority: 0.8,
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (pathname === '/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        if (
          pathname.startsWith('/services/') ||
          pathname.endsWith('-london') ||
          pathname.endsWith('-kent') ||
          ['/menu', '/packages', '/contact'].includes(pathname)
        ) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        return item;
      },
    }),
    copyDirectSitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
