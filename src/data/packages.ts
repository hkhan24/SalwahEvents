export interface WeddingPackage {
  id: 'silver' | 'gold' | 'platinum';
  name: string;
  price: string;
  unit: string;
  tagline: string;
  summary: string;
  popular?: boolean;
  features: string[];
}

export const PACKAGES: WeddingPackage[] = [
  {
    id: 'silver',
    name: 'Silver Package',
    price: '£30',
    unit: 'per person',
    tagline: 'Ideal for elegant Nikah ceremonies, Mehndis, and intimate receptions.',
    summary:
      'Exceptional value 100% HMC Certified Halal wedding catering in London, Essex & Kent without compromising on flavour or presentation.',
    features: [
      '2 Starters (Choice of Grills & Savouries)',
      '3 Main Courses (Chicken, Lamb & Vegetarian)',
      'Fragrant Pilau Rice & Fresh Naan Bread',
      'Crisp Salad & House Chutneys',
      '1 Traditional Dessert',
      'Full Crockery & Cutlery',
      'Uniformed Professional Waiting Staff',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Package',
    price: '£45',
    unit: 'per person',
    tagline: 'Our most popular choice for grand Asian wedding receptions & Walimas.',
    summary:
      'A complete luxury Halal dining experience with welcome mocktails, premium grilled starters, full glassware, and dedicated floor supervision.',
    popular: true,
    features: [
      '3 Starters (Including Chargrilled Kebabs & Tikka)',
      '4 Main Courses (Premium Bengali, Pakistani & Indian Selection)',
      'Choice of Biryani, Pilau Rice & Fresh Breads',
      'Full Salad Display, Raita & Chutneys',
      '2 Luxury Desserts (e.g., Gulab Jamun, Roshmalai or Milk Cake)',
      'Gourmet Welcome Mocktails & Soft Drinks',
      'Full Fine Crockery, Cutlery & Glassware',
      'Experienced Waiting Staff & On-Site Event Supervisor',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum Package',
    price: 'From £17,500',
    unit: 'all-inclusive (200 guests)',
    tagline: 'The complete turn-key luxury wedding catering, stage decor & management experience.',
    summary:
      'Everything handled under one roof — Gold-tier gourmet Halal catering, bespoke wedding stage decoration, ambient venue lighting, and full event management.',
    features: [
      'Full Gold Catering Menu for 200 Guests (Scalable up to 1,000+)',
      'Bespoke Luxury Wedding Stage Decoration & Floral Backdrop',
      'Full Venue Ambient Lighting, Walkway & Setup',
      'Table Centrepieces, Charger Plates & Luxury Linen',
      'Interactive Dessert, Karak Chai or Paan Stall',
      'Gourmet Welcome Mocktail Reception',
      'Dedicated Lead Event Manager & On-the-Day Coordination',
    ],
  },
];

export interface ComparisonRow {
  feature: string;
  silver: string | boolean;
  gold: string | boolean;
  platinum: string | boolean;
}

export const PACKAGE_COMPARISON: ComparisonRow[] = [
  { feature: 'Starting Price', silver: '£30 / person', gold: '£45 / person', platinum: 'From £17,500' },
  { feature: '100% HMC Certified Halal', silver: true, gold: true, platinum: true },
  { feature: 'Guest Capacity', silver: '50–1,000+', gold: '50–1,000+', platinum: '200–1,000+' },
  { feature: 'Starters', silver: '2 Choices', gold: '3 (Incl. Grills)', platinum: '4 (Premium)' },
  { feature: 'Main Courses', silver: '3 Dishes', gold: '4 (Premium)', platinum: '4 (Gourmet)' },
  { feature: 'Desserts', silver: '1 Dessert', gold: '2 Desserts', platinum: '2 + Live Dessert / Chai Stall' },
  { feature: 'Welcome Mocktails', silver: false, gold: true, platinum: true },
  { feature: 'Crockery, Cutlery & Staff', silver: true, gold: true, platinum: true },
  { feature: 'Bespoke Wedding Stage Decoration', silver: false, gold: false, platinum: true },
  { feature: 'Full Event Management & Manager', silver: false, gold: false, platinum: true },
];
