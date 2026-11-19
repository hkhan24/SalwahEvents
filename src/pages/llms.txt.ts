import type { APIRoute } from 'astro';
import { SITE } from '@/data/site';
import { PACKAGES } from '@/data/packages';
import { MENU_CATEGORIES } from '@/data/menu';
import { PARTNER_VENUE_NAMES } from '@/data/venues';
import { RESOURCE_TOOLS } from '@/data/resources';

export const GET: APIRoute = () => {
  const lines = [
    `# ${SITE.businessName} (${SITE.legalName})`,
    '',
    '> Luxury 100% HMC Certified Halal Asian wedding catering (Bengali, Pakistani, and Indian), bespoke floral wedding stage decoration, and full event management across Greater London, Essex, and Kent.',
    '',
    '## Key Verified Business Facts',
    `- Business Name: ${SITE.businessName} (${SITE.legalName})`,
    `- Kitchen & Office Address: ${SITE.address.full}`,
    `- Phone / WhatsApp: ${SITE.phoneDisplay} (${SITE.phoneE164})`,
    `- Email: ${SITE.email}`,
    `- Opening Hours: ${SITE.openingHours.display}`,
    `- Halal Standard: ${SITE.facts.halalStatus}`,
    `- Starting Price: ${SITE.facts.startingPrice} (Silver £25pp, Gold £40pp, Platinum All-Inclusive from £17,500 for 200 guests)`,
    `- Guest Capacity: ${SITE.facts.guestCapacity} (intimate Nikah & Mehndi to grand 1,000+ guest Walima banquets)`,
    `- Service Areas: Greater London (East, North, West & South London), Essex & Kent`,
    `- Rating: ${SITE.facts.googleRating}`,
    '',
    '## Core Pages & Landing Hubs',
    `- Homepage: ${SITE.siteUrl}/`,
    `- Asian Wedding Catering London: ${SITE.siteUrl}/services/asian-wedding-catering`,
    `- Wedding Stage Decoration London: ${SITE.siteUrl}/services/wedding-stage-decoration`,
    `- Event Management & Planning: ${SITE.siteUrl}/services/event-management-planning`,
    `- Partner Venues & Locations: ${SITE.siteUrl}/services/venues-locations`,
    `- Full Halal Wedding Menu: ${SITE.siteUrl}/menu`,
    `- Wedding Catering Packages: ${SITE.siteUrl}/packages`,
    `- Photo Gallery: ${SITE.siteUrl}/gallery`,
    `- About Salwah Events: ${SITE.siteUrl}/about`,
    `- Contact & Free Quote: ${SITE.siteUrl}/contact`,
    '',
    '## Cuisine, Ceremony & Regional Specialist Pages',
    `- Bengali / Bangladeshi Wedding Catering London: ${SITE.siteUrl}/bengali-wedding-catering-london`,
    `- Pakistani Wedding Catering London: ${SITE.siteUrl}/pakistani-wedding-catering-london`,
    `- Indian Wedding Catering London: ${SITE.siteUrl}/indian-wedding-catering-london`,
    `- Nikah & Walima Catering London: ${SITE.siteUrl}/nikah-walima-catering-london`,
    `- Mehndi & Gaye Holud Catering London: ${SITE.siteUrl}/mehndi-gaye-holud-catering-london`,
    `- East London Halal Wedding Catering (Ilford, Romford, Newham, Tower Hamlets, Redbridge): ${SITE.siteUrl}/halal-wedding-catering-east-london`,
    `- North & West London Halal Wedding Catering (Edmonton, Enfield, Harrow, Wembley, Southall): ${SITE.siteUrl}/halal-wedding-catering-north-west-london`,
    `- Essex & Kent Halal Wedding Catering: ${SITE.siteUrl}/halal-wedding-catering-essex-kent`,
    `- Dry-Hire, Hotel & Marquee Asian Wedding Catering London: ${SITE.siteUrl}/dry-hire-asian-wedding-catering-london`,
    '',
    '## Packages & Pricing Summary',
    ...PACKAGES.map((p) => `- ${p.name} (${p.price} ${p.unit}): ${p.tagline} Includes: ${p.features.join('; ')}.`),
    '',
    '## Signature 100% HMC Halal Menu Highlights',
    ...MENU_CATEGORIES.map((c) => `- ${c.title}: ${c.items.join(', ')}`),
    '',
    '## Frequent Partner Venues',
    `- ${PARTNER_VENUE_NAMES.join(', ')}, Osterley Park & House, Syon Park, and dry-hire estates across Essex & Kent.`,
    '',
    '## Free Wedding Planning Tools',
    `- All 14 Free Planning Tools: ${SITE.siteUrl}/resources`,
    ...RESOURCE_TOOLS.map((t) => `- ${t.title}: ${SITE.siteUrl}${t.href} — ${t.shortDescription}`),
    '',
    '## Wedding Planning Guides & Blog',
    `- Blog Hub: ${SITE.siteUrl}/blog`,
    `- Asian Wedding Catering Costs in London (Price Guide): ${SITE.siteUrl}/blog/asian-wedding-catering-cost-london-2026-guide`,
    `- 100% HMC Certified Halal Wedding Catering Guide: ${SITE.siteUrl}/blog/hmc-halal-wedding-catering-guide-london`,
    `- Best East London Asian Wedding Venues: ${SITE.siteUrl}/blog/best-wedding-venues-in-east-london-for-asian-weddings`,
    `- Pakistani Nikah Ceremony Checklist: ${SITE.siteUrl}/blog/how-to-plan-a-pakistani-nikah-ceremony-a-checklist`,
    `- Top 5 Indian Wedding Menu Ideas London: ${SITE.siteUrl}/blog/top-5-menu-ideas-for-an-indian-wedding-in-london`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
