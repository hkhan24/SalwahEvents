import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
let failures = 0;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures++;
}

function pass(msg) {
  console.log(`PASS: ${msg}`);
}

// 1. Critical Google Ads + GEO/AEO + Legacy HTML files
const requiredFiles = [
  'index.html',
  'services/asian-wedding-catering.html',
  'services/wedding-stage-decoration.html',
  'services/event-management-planning.html',
  'services/venues-locations.html',
  'services.html',
  'menu.html',
  'packages.html',
  'gallery.html',
  'contact.html',
  'about.html',
  'blog.html',
  'blog/top-5-menu-ideas-for-an-indian-wedding-in-london.html',
  'blog/how-to-plan-a-pakistani-nikah-ceremony-a-checklist.html',
  'blog/best-wedding-venues-in-east-london-for-asian-weddings.html',
  'bengali-wedding-catering-london.html',
  'pakistani-wedding-catering-london.html',
  'indian-wedding-catering-london.html',
  'halal-wedding-catering-essex-kent.html',
  'wedding-stage-decor-london.html',
  'resources.html',
  'resources/quote-builder.html',
  'resources/budget-calculator.html',
  'resources/gold-calculator.html',
  'resources/budget-splitter.html',
  'resources/guest-estimator.html',
  'resources/invitation-generator.html',
  'resources/per-guest-calculator.html',
  'resources/rsvp-dietary-tracker.html',
  'resources/seating-planner.html',
  'resources/seating-visualiser.html',
  'resources/timeline-ics.html',
  'resources/timeline-templates.html',
  'resources/vendor-scorecard.html',
  'resources/wedding-checklist.html',
  'privacy-policy.html',
  'cookie-notice.html',
  'admin.html',
  'admin/invoices.html',
  'admin/quotations.html',
  '404.html',
  '.htaccess',
  'robots.txt',
  'sitemap.xml',
  'sitemap-index.xml',
  'favicon.png',
];

for (const rel of requiredFiles) {
  const full = path.join(DIST, rel);
  if (!fs.existsSync(full)) {
    fail(`Missing required output file: dist/${rel}`);
  }
}
pass(`Checked ${requiredFiles.length} required output files in dist/`);

// 2. Walk all HTML files in dist/
function walkHtml(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkHtml(full));
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = walkHtml(DIST);
const titles = new Map();
const forbiddenPolicyRegex = /\b(alcohol|alcoholic|tasting|tastings|cocktail|cocktails|mojito|champagne|prosecco|wine|wines)\b/i;

for (const file of htmlFiles) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf-8');

  if (rel === 'wedding-stage-decor-london.html') continue;

  // Title uniqueness & meta description
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    fail(`${rel}: missing <title>`);
  } else {
    const t = titleMatch[1].trim();
    if (titles.has(t)) {
      fail(`${rel}: duplicate <title> "${t}" (also on ${titles.get(t)})`);
    }
    titles.set(t, rel);
  }

  if (!/<meta\s+name="description"\s+content="[^"]{20,}"/i.test(html)) {
    fail(`${rel}: missing or too short <meta name="description">`);
  }

  // GTM & Google Ads Tag presence
  if (!html.includes('GTM-TBNC6DQ4')) fail(`${rel}: missing GTM-TBNC6DQ4`);
  if (!html.includes('AW-18462398776')) fail(`${rel}: missing AW-18462398776`);
  if (!html.includes('AW-18462398776/fYy9CLLBoLcdELiyx-NE')) {
    fail(`${rel}: missing Call/WhatsApp conversion send_to`);
  }

  // No Horizons CDN or debug leftovers
  if (html.includes('horizons-cdn.hostinger.com')) {
    fail(`${rel}: still references horizons-cdn.hostinger.com`);
  }
  if (html.includes('horizons-runtime-error') || html.includes('{GA4_ID}')) {
    fail(`${rel}: contains legacy Horizons debug or broken GA4 placeholder`);
  }

  // Strip scripts & styles to check visible text & policy words
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Check full HTML (visible text, meta tags & JSON-LD) for Google Ads policy guardrail words
  const policyMatch = html.match(forbiddenPolicyRegex);
  if (policyMatch) {
    fail(`${rel}: Google Ads policy guardrail hit forbidden word "${policyMatch[0]}"`);
  }

  // Validate every JSON-LD block parses cleanly
  const ldMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (ldMatches.length === 0) {
    fail(`${rel}: missing JSON-LD structured data`);
  }
  for (const m of ldMatches) {
    try {
      JSON.parse(m[1]);
    } catch (err) {
      fail(`${rel}: invalid JSON-LD (${err.message})`);
    }
  }

  // Check admin & legal pages have noindex
  if (rel.startsWith('admin') || rel === 'privacy-policy.html' || rel === 'cookie-notice.html' || rel === '404.html') {
    if (!html.includes('noindex')) {
      fail(`${rel}: expected noindex meta tag`);
    }
  }

  // Check visible word count on core marketing pages
  const coreMarketing = [
    'index.html',
    'services/asian-wedding-catering.html',
    'services/wedding-stage-decoration.html',
    'bengali-wedding-catering-london.html',
    'pakistani-wedding-catering-london.html',
    'indian-wedding-catering-london.html',
    'halal-wedding-catering-essex-kent.html',
    'menu.html',
    'packages.html',
  ];
  if (coreMarketing.includes(rel)) {
    const words = visible.split(' ').filter(Boolean).length;
    if (words < 300) {
      fail(`${rel}: low pre-rendered word count (${words} words)`);
    } else {
      console.log(`  INFO: ${rel} -> ${words} pre-rendered visible words, ${ldMatches.length} JSON-LD blocks`);
    }
  }
}

// 3. Validate sitemap.xml
const sitemapPath = path.join(DIST, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`  INFO: sitemap.xml lists ${locs.length} public URLs`);
  if (locs.length < 30) fail(`sitemap.xml expected >=30 URLs, found ${locs.length}`);
  for (const forbidden of ['/admin', '/privacy-policy', '/cookie-notice', '/404', '/wedding-stage-decor-london']) {
    if (locs.some((u) => u.endsWith(forbidden) || u.includes(`${forbidden}/`))) {
      fail(`sitemap.xml should not list ${forbidden}`);
    }
  }
  for (const mustHave of [
    'https://www.salwahevents.com/',
    'https://www.salwahevents.com/services/asian-wedding-catering',
    'https://www.salwahevents.com/services/wedding-stage-decoration',
    'https://www.salwahevents.com/menu',
    'https://www.salwahevents.com/packages',
    'https://www.salwahevents.com/gallery',
    'https://www.salwahevents.com/contact',
    'https://www.salwahevents.com/bengali-wedding-catering-london',
    'https://www.salwahevents.com/pakistani-wedding-catering-london',
    'https://www.salwahevents.com/indian-wedding-catering-london',
    'https://www.salwahevents.com/halal-wedding-catering-essex-kent',
  ]) {
    if (!locs.includes(mustHave)) {
      fail(`sitemap.xml missing required URL: ${mustHave}`);
    }
  }
}

// 4. Verify Form Conversion ID exists inside compiled QuoteForm JS bundle
const astroDir = path.join(DIST, '_astro');
if (fs.existsSync(astroDir)) {
  const jsFiles = fs.readdirSync(astroDir).filter((f) => f.endsWith('.js'));
  const combinedJs = jsFiles.map((f) => fs.readFileSync(path.join(astroDir, f), 'utf-8')).join('\n');
  if (!combinedJs.includes('AW-18462398776/39rsCK_BoLcdELiyx-NE')) {
    fail('Compiled JS bundle missing Form Submit conversion send_to (AW-18462398776/39rsCK_BoLcdELiyx-NE)');
  } else {
    pass('Form Submit Google Ads conversion verified in compiled QuoteForm bundle');
  }
}

if (failures > 0) {
  console.error(`\nBuild verification FAILED with ${failures} error(s).`);
  process.exit(1);
}
console.log('\nALL BUILD VERIFICATION CHECKS PASSED!');
