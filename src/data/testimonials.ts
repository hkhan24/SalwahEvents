export interface Testimonial {
  name: string;
  event: string;
  text: string;
  rating: number;
}

// Verified client reviews directly from salwahevents.com
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Aisha & Omar Khan',
    event: 'Wedding Reception',
    text: 'Salwah Events turned our wedding into a fairytale. The food was divine, the decor was breathtaking, and the team were incredibly professional. Everything was perfect, Alhamdulillah.',
    rating: 5,
  },
  {
    name: 'The Rahman Family',
    event: 'Aqiqah Celebration',
    text: 'A truly premium Halal service. The dessert stall was a massive hit with both children and adults — we could not have asked for a more reliable and friendly team.',
    rating: 5,
  },
  {
    name: 'Dr. Fatima Ahmed',
    event: 'Charity Gala',
    text: 'Their attention to detail is second to none. They managed our entire event flawlessly, allowing us to focus on our guests. Highly recommended for any large-scale event.',
    rating: 5,
  },
];
