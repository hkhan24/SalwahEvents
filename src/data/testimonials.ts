export interface Testimonial {
  name: string;
  event: string;
  location: string;
  text: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Aisha & Omar Khan',
    event: 'Wedding Reception (450 Guests)',
    location: 'East London',
    text: 'Salwah Events turned our wedding into a fairytale. The kacchi biryani and grilled starters were divine, the stage decor was breathtaking, and the team was incredibly professional. Everything was seamless from start to finish, Alhamdulillah!',
    rating: 5,
  },
  {
    name: 'Dr. Fatima Ahmed',
    event: 'Charity Gala Dinner',
    location: 'North London',
    text: 'Their attention to detail is second to none. They managed our entire event and catering flawlessly, allowing us to focus on our guests. Highly recommended for any large-scale Halal event in London.',
    rating: 5,
  },
  {
    name: 'The Rahman Family',
    event: 'Walima & Aqiqah Celebration',
    location: 'Romford, Essex',
    text: 'A truly premium and 100% HMC Halal service. Guests are still talking about the beef kala bhuna, borhani, and the dessert & karak chai station! Reliable, courteous waiting staff and zero stress on the day.',
    rating: 5,
  },
  {
    name: 'Zainab & Tariq Siddiqui',
    event: 'Pakistani Nikah & Walima',
    location: 'Ilford & Kent',
    text: 'From our menu consultation right through to rukhsati, Salwah Events exceeded every expectation. The Nikah floral backdrop was elegant and serene, and the lamb karahi and chapli kebabs arrived piping hot to every table.',
    rating: 5,
  },
];
