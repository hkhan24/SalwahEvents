export interface ResourceTool {
  slug: string;
  href: string;
  title: string;
  shortDescription: string;
  category: 'Budgeting' | 'Guests & Seating' | 'Timelines & Checklists' | 'Planning';
}

export const RESOURCE_TOOLS: ResourceTool[] = [
  {
    slug: 'quote-builder',
    href: '/resources/quote-builder',
    title: 'Quote Builder',
    shortDescription: 'Select your package and Halal menu dishes to build and download a custom PDF quote sheet.',
    category: 'Planning',
  },
  {
    slug: 'budget-calculator',
    href: '/resources/budget-calculator',
    title: 'Budget Calculator',
    shortDescription: 'Estimate wedding costs with guest count, per-head catering, fixed costs, VAT, and PDF/CSV export.',
    category: 'Budgeting',
  },
  {
    slug: 'gold-calculator',
    href: '/resources/gold-calculator',
    title: 'Gold Calculator',
    shortDescription: 'Live gold prices in GBP, BDT, PKR, INR & AED, gram/tola/bori/masha/ratti conversions by karat, and Zakat estimations.',
    category: 'Budgeting',
  },
  {
    slug: 'seating-planner',
    href: '/resources/seating-planner',
    title: 'Seating Planner',
    shortDescription: 'Organise your guest list, create tables, assign seats, and export your table plan to CSV.',
    category: 'Guests & Seating',
  },
  {
    slug: 'timeline-ics',
    href: '/resources/timeline-ics',
    title: 'Timeline Generator (.ics)',
    shortDescription: 'Build a custom wedding day run-sheet and download an .ics calendar file for Apple, Google, or Outlook.',
    category: 'Timelines & Checklists',
  },
  {
    slug: 'rsvp-dietary-tracker',
    href: '/resources/rsvp-dietary-tracker',
    title: 'RSVP & Dietary Tracker',
    shortDescription: 'Track confirmed guests, pending RSVPs, allergies, and vegetarian/vegan needs in one place.',
    category: 'Guests & Seating',
  },
  {
    slug: 'vendor-scorecard',
    href: '/resources/vendor-scorecard',
    title: 'Vendor Scorecard',
    shortDescription: 'Compare and score wedding suppliers with weighted criteria for food, reliability, and price.',
    category: 'Planning',
  },
  {
    slug: 'wedding-checklist',
    href: '/resources/wedding-checklist',
    title: 'Wedding Planning Checklist',
    shortDescription: 'Track key Asian wedding milestones with a progress bar and printable PDF download.',
    category: 'Timelines & Checklists',
  },
  {
    slug: 'invitation-generator',
    href: '/resources/invitation-generator',
    title: 'Invitation Text Generator',
    shortDescription: 'Generate ready-to-use wording for Nikah, Mehndi, Walima, Engagement, and Reception invites.',
    category: 'Planning',
  },
  {
    slug: 'per-guest-calculator',
    href: '/resources/per-guest-calculator',
    title: 'Per-Guest Cost Calculator',
    shortDescription: 'Instantly calculate your total wedding cost per person from your overall budget.',
    category: 'Budgeting',
  },
  {
    slug: 'budget-splitter',
    href: '/resources/budget-splitter',
    title: 'Wedding Budget Splitter',
    shortDescription: 'Calculate fair percentage contributions between both families using an interactive slider.',
    category: 'Budgeting',
  },
  {
    slug: 'seating-visualiser',
    href: '/resources/seating-visualiser',
    title: 'Seating Style Visualiser',
    shortDescription: 'Compare round vs. long banquet table arrangements based on your guest count.',
    category: 'Guests & Seating',
  },
  {
    slug: 'guest-estimator',
    href: '/resources/guest-estimator',
    title: 'Guest Count Estimator',
    shortDescription: 'See how your guest list size (50–1,000+) impacts catering and decor budget ranges.',
    category: 'Budgeting',
  },
  {
    slug: 'timeline-templates',
    href: '/resources/timeline-templates',
    title: 'Wedding Day Timeline Templates',
    shortDescription: 'Download ready-made PDF run-sheets for same-day Nikah & Walima, multi-day weddings, and receptions.',
    category: 'Timelines & Checklists',
  },
];
