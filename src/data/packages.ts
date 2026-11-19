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
    price: '£25',
    unit: 'per person',
    tagline: 'Generous, crowd-pleasing Halal dining for Nikahs, Mehndis, Aqiqahs, and intimate receptions.',
    summary:
      'Everything you need for an abundant three-course Asian feast — with crockery, cutlery, and uniformed waiting staff included.',
    features: [
      '3 Starters',
      'Fresh Salad & House Chutneys',
      '4 Main Courses (Chicken, Lamb, Vegetable & Daal)',
      'Pilau Rice & Plain Rice or Fresh Naan',
      '1 Traditional Dessert',
      'Full Crockery & Cutlery',
      'Professional Waiting Staff',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Package',
    price: '£40',
    unit: 'per person',
    tagline: 'Our most popular choice for full-scale wedding receptions and Walimas.',
    summary:
      'A complete banquet experience with welcome drinks, canapés, four starters including fish, premium mains, glassware, and a dedicated floor supervisor.',
    popular: true,
    features: [
      'Welcome Drinks & Canapés on Arrival',
      '4 Starters (Chicken, Lamb, Fish & Vegetable)',
      'Fresh Salad & House Chutneys',
      '4 Main Courses (Premium Selection: Chicken, Lamb, Prawn & Daal or Vegetable)',
      'Choice of Biryani or Rice & Fresh Breads',
      '2 Desserts',
      'Full Crockery, Cutlery & Glassware',
      'Experienced Waiting Staff & Floor Supervisor',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum Package',
    price: 'From £17,500',
    unit: 'all-inclusive (200 guests)',
    tagline: 'Complete wedding catering, bespoke stage decoration, and full event management under one roof.',
    summary:
      'Hand over the logistics and enjoy your celebration — our flagship package brings together Gold-tier catering, luxury stage styling, lighting, and a dedicated event manager.',
    features: [
      'Everything in the Gold Package for 200 Guests (Scalable to 1,000+)',
      'Full Event Management',
      'Luxury Bespoke Wedding Stage Decoration',
      'Venue Lighting & Full Room Setup',
      'Live Dessert or Paan Stall',
      'Centrepieces for Every Guest Table',
      'Dedicated Lead Event Manager',
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
  { feature: 'Price Per Person', silver: '£25 / person', gold: '£40 / person', platinum: 'From £17,500 (200 guests)' },
  { feature: 'HMC-Certified Halal Meat & Poultry', silver: true, gold: true, platinum: true },
  { feature: 'Starters', silver: '3 Starters', gold: '4 (Incl. Fish)', platinum: '4 (Premium Selection)' },
  { feature: 'Main Courses', silver: '4 Mains', gold: '4 (Premium)', platinum: '4 (Signature)' },
  { feature: 'Desserts', silver: '1 Dessert', gold: '2 Desserts', platinum: '2 + Dessert or Paan Stall' },
  { feature: 'Welcome Drinks', silver: false, gold: true, platinum: true },
  { feature: 'Canapés on Arrival', silver: false, gold: true, platinum: true },
  { feature: 'Crockery, Cutlery & Staff', silver: true, gold: true, platinum: true },
  { feature: 'Glassware & Floor Supervisor', silver: false, gold: true, platinum: true },
  { feature: 'Bespoke Stage Decoration & Lighting', silver: false, gold: false, platinum: true },
  { feature: 'Full Event Management & Dedicated Manager', silver: false, gold: false, platinum: true },
];
