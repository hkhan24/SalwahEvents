export const SITE = {
  businessName: 'Salwah Events and Catering',
  shortName: 'Salwah Events',
  legalName: 'Salwah Events Ltd',
  companiesHouseNo: '16503532',
  vatNo: '497422947',
  siteUrl: 'https://www.salwahevents.com',
  stagingUrl: 'https://calming-white-penguin-96.hostingersite.com',
  isStaging: (import.meta.env.PUBLIC_STAGING_MODE ?? 'false') === 'true',

  // Verified Business Profile & Live Site NAP
  address: {
    street: 'Number 19, Unit 7 Landmark Commercial Centre, Commercial Road',
    locality: 'Edmonton',
    city: 'London',
    postcode: 'N18 1UB',
    country: 'GB',
    countryName: 'United Kingdom',
    full: 'Number 19, Unit 7 Landmark Commercial Centre, Commercial Road, Edmonton, London, N18 1UB',
  },
  geo: {
    latitude: 51.6118,
    longitude: -0.0528,
  },
  openingHours: {
    display: 'Mon–Sun: 9:00 AM – 7:00 PM',
    opens: '09:00',
    closes: '19:00',
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },

  // Contact & Conversion Endpoints
  phoneDisplay: '07359 337887',
  phoneE164: '+447359337887',
  phoneHref: 'tel:+447359337887',
  whatsappNumber: '447359337887',
  whatsappHref:
    'https://wa.me/447359337887?text=Assalamu%20Alaikum%20Salwah%20Events%2C%20I%27d%20like%20a%20quote%20for%20my%20event.',
  email: 'info@salwahevents.com',
  emailHref: 'mailto:info@salwahevents.com',
  mapsUrl:
    'https://www.google.com/maps/place/Salwah+Events+%26+Catering/@51.6118056,-0.0553889,17z/data=!3m1!4b1!4m6!3m5!1s0x48761e0969562635:0xed43594fb3763f6!8m2!3d51.6118056!4d-0.052814!16s%2Fg%2F11vnlx3j7x?entry=ttu',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.0395249813!2d-0.2416815349688282!3d51.52877184085964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761e0969562635%3A0xed43594fb3763f6!2sLandmark%20Commercial%20Centre%2C%20Commercial%20Rd%2C%20London%20N18%201UB!5e0!3m2!1sen!2suk!4v1721834534653!5m2!1sen!2suk',

  // Verified Trust & Key Facts (synced with salwahevents.com)
  facts: {
    startingPrice: 'From £25 per person',
    startingPriceShort: 'From £25pp',
    guestCapacity: '50–1,000+ guests',
    halalStatus: '100% HMC Certified Halal — Dedicated Halal Kitchen',
    halalShort: '100% HMC Certified Halal',
    googleRating: '5.0★ Google Rating',
    serviceAreas: 'Greater London, Essex & Kent',
    serviceAreasList: ['Greater London', 'East London', 'North London', 'West London', 'South London', 'Essex', 'Kent'],
  },

  // Google Tag Manager & Google Ads Conversion Tracking
  tracking: {
    gtmId: 'GTM-TBNC6DQ4',
    googleAdsId: 'AW-18462398776',
    formSubmitSendTo: 'AW-18462398776/39rsCK_BoLcdELiyx-NE',
    callWhatsappSendTo: 'AW-18462398776/fYy9CLLBoLcdELiyx-NE',
  },

  // Form Submission (Web3Forms public endpoint)
  web3formsAccessKey: '131d93a8-6307-4ab4-b2dd-ae1c564038af',

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61577041720144',
    instagram: 'https://www.instagram.com/salwah.events/',
    trustpilot: 'https://uk.trustpilot.com/review/salwahevents.com',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Catering',
    href: '/services/asian-wedding-catering',
    children: [
      { label: 'Asian Wedding Catering London', href: '/services/asian-wedding-catering' },
      { label: 'Bengali Wedding Catering', href: '/bengali-wedding-catering-london' },
      { label: 'Pakistani Wedding Catering', href: '/pakistani-wedding-catering-london' },
      { label: 'Indian Wedding Catering', href: '/indian-wedding-catering-london' },
      { label: 'Nikah & Walima Catering', href: '/nikah-walima-catering-london' },
      { label: 'Mehndi & Gaye Holud Catering', href: '/mehndi-gaye-holud-catering-london' },
      { label: 'Dry-Hire, Hotel & Marquee', href: '/dry-hire-asian-wedding-catering-london' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services Overview', href: '/services' },
      { label: 'Wedding Stage Decoration', href: '/services/wedding-stage-decoration' },
      { label: 'Event Management & Planning', href: '/services/event-management-planning' },
      { label: 'Partner Venues & Locations', href: '/services/venues-locations' },
      { label: 'East London Halal Catering', href: '/halal-wedding-catering-east-london' },
      { label: 'North & West London Catering', href: '/halal-wedding-catering-north-west-london' },
      { label: 'Essex & Kent Halal Catering', href: '/halal-wedding-catering-essex-kent' },
    ],
  },
  { label: 'Menu', href: '/menu' },
  { label: 'Packages', href: '/packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
