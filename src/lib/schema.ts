import { SITE } from '@/data/site';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['FoodEstablishment', 'LocalBusiness'],
    '@id': `${SITE.siteUrl}/#organization`,
    name: SITE.businessName,
    legalName: SITE.legalName,
    url: SITE.siteUrl,
    logo: `${SITE.siteUrl}/salwah-logo.png`,
    image: `${SITE.siteUrl}/og-default.jpg`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: '££-£££ (From £30pp)',
    servesCuisine: ['Bangladeshi', 'Pakistani', 'Indian', 'South Asian', 'Halal'],
    acceptsReservations: 'True',
    description:
      '100% HMC Certified Halal Asian wedding catering, bespoke stage decoration, and full event management across Greater London, Essex, and Kent. Packages from £30 per person for 50 to 1,000+ guests.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: `${SITE.address.locality}, ${SITE.address.city}`,
      addressRegion: 'Greater London',
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Greater London' },
      { '@type': 'AdministrativeArea', name: 'East London' },
      { '@type': 'AdministrativeArea', name: 'North London' },
      { '@type': 'AdministrativeArea', name: 'West London' },
      { '@type': 'AdministrativeArea', name: 'South London' },
      { '@type': 'AdministrativeArea', name: 'Essex' },
      { '@type': 'AdministrativeArea', name: 'Kent' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SITE.openingHours.days,
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    hasMenu: `${SITE.siteUrl}/menu`,
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.trustpilot],
  };
}

export function buildServiceSchema(params: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  areaServed?: string[];
  priceSpecification?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    serviceType: params.serviceType,
    description: params.description,
    url: params.url.startsWith('http') ? params.url : `${SITE.siteUrl}${params.url}`,
    provider: {
      '@id': `${SITE.siteUrl}/#organization`,
      '@type': 'LocalBusiness',
      name: SITE.businessName,
      telephone: SITE.phoneE164,
    },
    areaServed: (params.areaServed ?? ['Greater London', 'Essex', 'Kent']).map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: '30',
      description:
        params.priceSpecification ??
        '100% HMC Certified Halal packages starting from £30 per person (50–1,000+ guests).',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      ...(item.href
        ? {
            item: item.href.startsWith('http') ? item.href : `${SITE.siteUrl}${item.href}`,
          }
        : {}),
    })),
  };
}

export function buildBlogPostingSchema(params: {
  title: string;
  description: string;
  url: string;
  publishedIso: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    datePublished: params.publishedIso,
    dateModified: params.publishedIso,
    image: params.image ?? `${SITE.siteUrl}/og-default.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.siteUrl}${params.url}`,
    },
    author: {
      '@type': 'Organization',
      name: SITE.businessName,
      url: SITE.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.businessName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.siteUrl}/salwah-logo.png`,
      },
    },
  };
}
