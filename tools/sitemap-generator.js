import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join, parse } from 'path';

const BASE_URL = 'https://www.salwahevents.com';
const PAGES_DIR = 'src/pages';
const SITEMAP_PATH = 'public/sitemap.xml';

function getReactRoutes(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const routeRegex = /<Route\s+path="([^"]+)"/g;
  let matches;
  const routes = [];
  while ((matches = routeRegex.exec(content)) !== null) {
    let path = matches[1];
    if (path.endsWith('/*')) {
      path = path.slice(0, -2);
    }
    routes.push(path);
  }
  return routes;
}


function generateSitemap() {
  console.log('Generating sitemap...');
  try {
    const routes = getReactRoutes('src/AppRoutes.jsx');
    
    const today = new Date().toISOString();

    const urls = routes
      .filter(path => !path.includes(':')) // Exclude dynamic routes like /post/:id
      .map(path => {
        const urlPath = path === '/' ? '' : path;
        return `
  <url>
    <loc>${BASE_URL}${urlPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
      });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

    writeFileSync(SITEMAP_PATH, sitemap);
    console.log(`Sitemap generated successfully at ${SITEMAP_PATH}`);

  } catch(e) {
    console.error('Error generating sitemap:', e);
  }
}

generateSitemap();