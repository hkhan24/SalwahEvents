import { SITE } from '@/data/site';
import { PACKAGES } from '@/data/packages';
import { MENU_CATEGORIES } from '@/data/menu';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.siteUrl}/#website`,
    name: SITE.businessName,
    url: SITE.siteUrl,
    inLanguage: 'en-GB',
    publisher: {
      '@id': `${SITE.siteUrl}/#organization`,
    },
  };
}

export function buildOfferCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${SITE.siteUrl}/packages#catalog`,
    name: 'Salwah Events 100% HMC Halal Asian Wedding Catering Packages',
    itemListElement: PACKAGES.map((pkg, idx) => {
      const numericPrice = pkg.price.replace(/[^0-9.]/g, '');
      return {
        '@type': 'Offer',
        position: idx + 1,
        name: pkg.name,
        description: `${pkg.tagline} Includes: ${pkg.features.join(', ')}.`,
        priceCurrency: 'GBP',
        price: numericPrice,
        url: `${SITE.siteUrl}/packages#${pkg.id}`,
        availability: 'https://schema.org/InStock',
        seller: {
          '@id': `${SITE.siteUrl}/#organization`,
        },
      };
    }),
  };
}

export function buildMenuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE.siteUrl}/menu#halal-menu`,
    name: 'Salwah Events 100% HMC Certified Halal Asian Wedding Catering Menu',
    description:
      'Authentic Bengali, Pakistani, and Indian 100% HMC Certified Halal wedding catering menus cooked fresh in London for 50 to 1,000+ guests.',
    url: `${SITE.siteUrl}/menu`,
    inLanguage: 'en-GB',
    hasMenuSection: MENU_CATEGORIES.map((category) => ({
      '@type': 'MenuSection',
      name: category.title,
      description: category.subtitle,
      hasMenuItem: category.items.map((item) => ({
        '@type': 'MenuItem',
        name: item,
        suitableForDiet: 'https://schema.org/HalalDiet',
      })),
    })),
  };
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
    priceRange: '££-£££ (From £25pp)',
    servesCuisine: ['Bangladeshi', 'Bengali', 'Pakistani', 'Indian', 'South Asian', 'Halal'],
    acceptsReservations: 'True',
    description:
      'Family-led 100% HMC Certified Halal Asian wedding catering (Bengali, Pakistani & Indian), bespoke wedding stage decoration, and full event management across Greater London, Essex, and Kent. Packages from £25 per person for 50 to 1,000+ guests.',
    knowsAbout: [
      'Asian Wedding Catering London',
      '100% HMC Certified Halal Catering',
      'Bengali Wedding Catering & Dhakai Kacchi Biryani',
      'Pakistani Wedding Catering (Nikah, Mehndi, Baraat, Walima)',
      'Indian Halal Wedding Catering & Live Chaat Stations',
      'Bespoke Wedding Stage Decoration London',
      'Dry-Hire Hotel & Marquee Asian Wedding Catering',
      'East London, North London, West London, Essex & Kent Wedding Catering',
    ],
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
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phoneE164,
      email: SITE.email,
      contactType: 'reservations',
      areaServed: 'GB',
      availableLanguage: ['English', 'Bengali', 'Urdu', 'Hindi'],
    },
    areaServed: [
      'Greater London',
      'East London',
      'North London',
      'West London',
      'South London',
      'Ilford',
      'Romford',
      'Edmonton',
      'Enfield',
      'Newham',
      'Tower Hamlets',
      'Redbridge',
      'Harrow',
      'Wembley',
      'Southall',
      'Essex',
      'Chigwell',
      'Brentwood',
      'Chelmsford',
      'Kent',
      'Dartford',
      'Gravesend',
      'Maidstone',
    ].map((name) => ({ '@type': 'AdministrativeArea', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SITE.openingHours.days,
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    hasMenu: `${SITE.siteUrl}/menu`,
    hasOfferCatalog: buildOfferCatalogSchema(),
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
      price: '25',
      description:
        params.priceSpecification ??
        '100% HMC Certified Halal packages starting from £25 per person (50–1,000+ guests).',
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
