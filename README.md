# Salwah Events and Catering (`www.salwahevents.com`)

Pre-rendered static **Astro 5 + Tailwind CSS + TypeScript** website with scoped React islands, engineered for 95–100 mobile PageSpeed, Google Ads Quality Score & conversion tracking, and Google AI Overview (GEO/AEO) visibility.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Automated Verification

```bash
npm run build   # Runs astro check + static SSG build into dist/
npm run verify  # Verifies routes, GTM/Ads tags, JSON-LD, sitemap, and policy guardrails
npm run preview # Preview dist/ locally
```

## Staging vs. Production Cutover (`salwahevents.com`)

Staging mode is controlled by `PUBLIC_STAGING_MODE` inside [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

- **Staging (`PUBLIC_STAGING_MODE: 'true'`):**
  - Injects `<meta name="robots" content="noindex, nofollow">` on every page.
  - Serves `Disallow: /` in `robots.txt` so `calming-white-penguin-96.hostingersite.com` is never indexed.
- **Live Production Cutover (`PUBLIC_STAGING_MODE: 'false'`):**
  1. Point `salwahevents.com` / `www.salwahevents.com` DNS to Hostinger.
  2. Flip `PUBLIC_STAGING_MODE: 'false'` in `.github/workflows/deploy.yml` and push to `main`.
  3. GitHub Actions automatically rebuilds `dist/`, runs `npm run verify`, and pushes to the `deploy` branch for Hostinger auto-deploy (~2 seconds).
  4. Re-submit `https://www.salwahevents.com/sitemap.xml` in Google Search Console.

## Tracking & Policy Guardrails

- **GTM Container:** `GTM-TBNC6DQ4`
- **Google Ads Tag:** `AW-18462398776`
- **Form Submit Conversion:** `AW-18462398776/39rsCK_BoLcdELiyx-NE` (fired on confirmed Web3Forms submission)
- **Call / WhatsApp Click Conversion:** `AW-18462398776/fYy9CLLBoLcdELiyx-NE` (global click delegation on `tel:`, `wa.me`, `whatsapp.com`)
- **Alcohol Policy Guardrail:** `npm run verify` fails the build if restricted alcohol-triggering terms appear in public HTML.
