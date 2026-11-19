import blogIndianMenu from '@/assets/images/blog-indian-menu.png';
import blogNikahChecklist from '@/assets/images/blog-nikah-checklist.png';
import blogEastLondonVenues from '@/assets/images/blog-east-london-venues.png';

export interface BlogPostMeta {
  slug: string;
  href: string;
  title: string;
  description: string;
  publishedDate: string;
  publishedIso: string;
  tags: string[];
  readTime: string;
  image: ImageMetadata;
  imageAlt: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'top-5-menu-ideas-for-an-indian-wedding-in-london',
    href: '/blog/top-5-menu-ideas-for-an-indian-wedding-in-london',
    title: 'Top 5 Menu Ideas for an Indian Wedding in London',
    description:
      'From classic slow-cooked curries and live chaat stations to regional thalis and Indo-Western fusion, discover Halal wedding menu ideas that delight guests across London.',
    publishedDate: 'August 29, 2025',
    publishedIso: '2025-08-29',
    tags: ['Catering', 'Indian Wedding'],
    readTime: '5 min read',
    image: blogIndianMenu,
    imageAlt: 'A spread of authentic Halal Indian wedding dishes prepared in London.',
  },
  {
    slug: 'how-to-plan-a-pakistani-nikah-ceremony-a-checklist',
    href: '/blog/how-to-plan-a-pakistani-nikah-ceremony-a-checklist',
    title: 'How to Plan a Pakistani Nikah Ceremony – A Complete Checklist',
    description:
      'A step-by-step guide to planning a meaningful Pakistani Nikah ceremony in London, covering legal formalities, Mehar, HMC Halal catering, floral backdrops, and day-of timelines.',
    publishedDate: 'August 29, 2025',
    publishedIso: '2025-08-29',
    tags: ['Planning', 'Pakistani Wedding'],
    readTime: '6 min read',
    image: blogNikahChecklist,
    imageAlt: 'Couple celebrating a traditional Pakistani Nikah ceremony in London.',
  },
  {
    slug: 'best-wedding-venues-in-east-london-for-asian-weddings',
    href: '/blog/best-wedding-venues-in-east-london-for-asian-weddings',
    title: 'Best Wedding Venues in East London for Asian Weddings',
    description:
      'Explore top East London & Essex-border Asian wedding venues including The City Pavilion, The Willows, Mayfair Venue, and Meridian Grand, plus catering & capacity tips.',
    publishedDate: 'August 29, 2025',
    publishedIso: '2025-08-29',
    tags: ['Venues', 'East London'],
    readTime: '5 min read',
    image: blogEastLondonVenues,
    imageAlt: 'East London Asian wedding ballroom dressed with floral centrepieces and lighting.',
  },
];
