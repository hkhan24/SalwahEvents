export interface PartnerVenue {
  name: string;
  area: string;
  region: 'East London' | 'North London' | 'West London' | 'Essex & Kent';
  capacity: string;
  blurb: string;
}

export const PARTNER_VENUE_NAMES = [
  'The City Pavilion',
  'Meridian Grand',
  'The Willows',
  'Mayfair Venue',
  'Ariana Banqueting Hall',
  'The Royal Regency',
  'Palm Tree',
  'Oasis Venue',
];

export const PARTNER_VENUES: PartnerVenue[] = [
  {
    name: 'The City Pavilion',
    area: 'Romford, East London / Essex Border',
    region: 'East London',
    capacity: 'Up to 1,200 guests',
    blurb: 'A landmark banqueting venue built for grand Asian weddings, with spacious commercial kitchens suited to large-scale HMC Halal catering.',
  },
  {
    name: 'The Willows',
    area: 'Hainault, Ilford',
    region: 'East London',
    capacity: '150–650 guests',
    blurb: 'A versatile blank-canvas ballroom with landscaped grounds and ample parking — ideal for custom floral stage decor and multi-course receptions.',
  },
  {
    name: 'Mayfair Venue',
    area: 'Chadwell Heath, Romford',
    region: 'East London',
    capacity: '150–650 guests',
    blurb: 'Contemporary interior with state-of-the-art lighting and AV, favoured for modern Bengali, Pakistani, and Indian Walima celebrations.',
  },
  {
    name: 'The Royal Regency',
    area: 'Manor Park, East London',
    region: 'East London',
    capacity: '200–1,000+ guests',
    blurb: 'A historic East London venue with grand chandeliers and dramatic ceilings, renowned for vibrant South Asian weddings.',
  },
  {
    name: 'Palm Tree & Oasis Venues',
    area: 'East London',
    region: 'East London',
    capacity: '100–500 guests',
    blurb: 'Well-loved East London community spaces offering flexible layouts for Mehndi nights, Nikah ceremonies, and family celebrations.',
  },
  {
    name: 'Meridian Grand',
    area: 'Edmonton, North London (N18)',
    region: 'North London',
    capacity: '200–900 guests',
    blurb: 'Opulent North London banqueting suites just minutes from our Edmonton kitchen — guaranteeing piping-hot, freshly cooked dishes.',
  },
  {
    name: 'Ariana Banqueting Hall',
    area: 'North London',
    region: 'North London',
    capacity: '150–500 guests',
    blurb: 'Refined, chandelier-lit suites popular for Pakistani, Afghani, and Indian Nikah and Walima receptions.',
  },
  {
    name: 'Osterley Park & House',
    area: 'Isleworth, West London',
    region: 'West London',
    capacity: '100–400 guests',
    blurb: 'A picturesque National Trust Georgian estate offering a stately backdrop for luxury marquee and dry-hire weddings.',
  },
  {
    name: 'Syon Park (Great Conservatory)',
    area: 'Brentford, West London',
    region: 'West London',
    capacity: '100–500 guests',
    blurb: 'Iconic glasshouse and parkland setting for bespoke luxury Asian weddings and marquee catering.',
  },
  {
    name: 'Essex Country Estates & Dry-Hire Halls',
    area: 'Chigwell, Brentwood, Chelmsford & Romford',
    region: 'Essex & Kent',
    capacity: '50–1,000+ guests',
    blurb: 'Full mobile catering setup across Essex country houses, marquees, and banqueting halls with dedicated finishing kitchens and service teams.',
  },
  {
    name: 'Kent Manor Houses & Marquee Venues',
    area: 'Dartford, Gravesend, Sevenoaks & Maidstone',
    region: 'Essex & Kent',
    capacity: '50–800+ guests',
    blurb: 'End-to-end Halal catering, mocktail bars, and floral stage styling delivered smoothly across Kent dry-hire estates and wedding barns.',
  },
];
