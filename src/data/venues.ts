export interface PartnerVenue {
  name: string;
  area: string;
  region: 'East London' | 'North London' | 'West London' | 'Essex & Kent';
  highlight: string;
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
  'Oasis',
];

export const PARTNER_VENUES: PartnerVenue[] = [
  {
    name: 'The City Pavilion',
    area: 'Romford, East London',
    region: 'East London',
    highlight: 'Preferred Caterer',
    blurb: 'A flagship Romford banqueting venue purpose-built for grand Asian weddings, with spacious back-of-house kitchens suited to large-scale Halal catering.',
  },
  {
    name: 'The Willows',
    area: 'Hainault, Ilford',
    region: 'East London',
    highlight: 'Versatile Ballroom & Grounds',
    blurb: 'A refined blank-canvas ballroom with landscaped grounds and generous parking — ideal for custom floral stage styling and multi-course receptions.',
  },
  {
    name: 'Mayfair Venue',
    area: 'Chadwell Heath, Romford',
    region: 'East London',
    highlight: 'Contemporary Suite & AV',
    blurb: 'A modern East London banqueting space with integrated lighting and audio, well suited to Bengali, Pakistani, and Indian Walima receptions.',
  },
  {
    name: 'The Royal Regency',
    area: 'Manor Park, East London',
    region: 'East London',
    highlight: 'Historic Chandelier Hall',
    blurb: 'An iconic East London landmark with sweeping ceilings and timeless grandeur, favoured for large family weddings and cultural celebrations.',
  },
  {
    name: 'Palm Tree',
    area: 'East London',
    region: 'East London',
    highlight: 'Flexible Event Space',
    blurb: 'A popular East London venue offering flexible layouts for Mehndi nights, Gaye Holud gatherings, Nikah lunches, and family receptions.',
  },
  {
    name: 'Oasis',
    area: 'East London',
    region: 'East London',
    highlight: 'Community & Family Celebrations',
    blurb: 'A welcoming East London venue suited to intimate Nikah ceremonies, Aqiqahs, Mehndis, and traditional family dining.',
  },
  {
    name: 'Meridian Grand',
    area: 'Edmonton, North London',
    region: 'North London',
    highlight: 'Minutes From Our N18 Kitchen',
    blurb: 'Opulent North London banqueting suites just minutes from our Edmonton production kitchen — ensuring dishes arrive hot, fresh, and right on schedule.',
  },
  {
    name: 'Ariana Banqueting Hall',
    area: 'North London',
    region: 'North London',
    highlight: 'Refined North London Suite',
    blurb: 'An elegant chandelier-lit hall popular for Pakistani, Indian, and multicultural Nikah and Walima celebrations.',
  },
  {
    name: 'Osterley Park & House',
    area: 'Isleworth, West London',
    region: 'West London',
    highlight: 'Georgian Estate & Marquees',
    blurb: 'A stately National Trust Georgian house and parkland setting, ideal for luxury dry-hire weddings and summer marquee banquets.',
  },
  {
    name: 'Syon Park',
    area: 'Brentford, West London',
    region: 'West London',
    highlight: 'Great Conservatory & Gardens',
    blurb: 'One of West London\'s most prestigious historic estates, providing a dramatic glasshouse and garden backdrop for bespoke Asian weddings.',
  },
  {
    name: 'Essex Country Estates & Dry-Hire Halls',
    area: 'Chigwell, Brentwood, Chelmsford & Romford',
    region: 'Essex & Kent',
    highlight: 'Mobile Finishing Kitchens',
    blurb: 'Full catering, crockery, glassware, and uniformed waiting staff delivered smoothly to country houses, golf clubs, and marquees across Essex.',
  },
  {
    name: 'Kent Manor Houses & Marquee Venues',
    area: 'Dartford, Gravesend, Sevenoaks & Maidstone',
    region: 'Essex & Kent',
    highlight: 'Complete Regional Service',
    blurb: 'End-to-end Halal banquets, welcome drinks, and floral stage decoration brought directly to Kent dry-hire estates and wedding barns.',
  },
];
