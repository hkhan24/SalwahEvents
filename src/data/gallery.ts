import weddingTable from '@/assets/images/gallery-wedding-table.jpg';
import stageFloral from '@/assets/images/gallery-stage-floral.jpg';
import cateringPlatters from '@/assets/images/gallery-catering-platters.png';
import dessertDisplay from '@/assets/images/gallery-dessert-display.png';
import ceremonyCouple from '@/assets/images/gallery-ceremony-couple.jpg';
import mandapStage from '@/assets/images/gallery-mandap-stage.jpg';
import homeServiceCatering from '@/assets/images/home-service-catering.jpg';
import headerAsianCatering from '@/assets/images/header-asian-catering.png';
import menuBiryani from '@/assets/images/menu-biryani.png';
import menuStarters from '@/assets/images/menu-starters.png';
import menuMains from '@/assets/images/menu-mains.png';
import menuDesserts from '@/assets/images/menu-desserts.png';

export type GalleryCategory = 'all' | 'weddings' | 'stages' | 'catering' | 'desserts';

export interface GalleryPhoto {
  id: number;
  image: ImageMetadata;
  category: Exclude<GalleryCategory, 'all'>;
  title: string;
  alt: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    image: weddingTable,
    category: 'weddings',
    title: 'Candlelit Reception Tablescape',
    alt: 'Elegant Asian wedding reception table with glowing candles, gold accents, and floral centrepieces in London.',
  },
  {
    id: 2,
    image: stageFloral,
    category: 'stages',
    title: 'Crimson & Gold Floral Wedding Stage',
    alt: 'Bespoke red and ivory wedding stage decoration in London featuring rich drapery and lush floral canopy.',
  },
  {
    id: 3,
    image: cateringPlatters,
    category: 'catering',
    title: 'Handcrafted Mocktails, Borhani & Karak Chai',
    alt: 'Freshly poured karak chai, spiced borhani, and fruit mocktails served for a Halal Asian wedding in London.',
  },
  {
    id: 4,
    image: dessertDisplay,
    category: 'desserts',
    title: 'Artisan Mithai & Dessert Display',
    alt: 'Luxury wedding dessert display featuring traditional South Asian sweets, baklava, and warm desserts.',
  },
  {
    id: 5,
    image: ceremonyCouple,
    category: 'weddings',
    title: 'South Asian Wedding Celebration',
    alt: 'Bride and groom in traditional South Asian wedding attire celebrating inside a candlelit London ballroom.',
  },
  {
    id: 6,
    image: mandapStage,
    category: 'stages',
    title: 'Ivory & Gold Grand Walima Stage',
    alt: 'Bespoke ivory floral wedding stage backdrop with baroque gold sofa and crystal chandeliers in London.',
  },
  {
    id: 7,
    image: menuBiryani,
    category: 'catering',
    title: 'Traditional Dum Kacchi Biryani',
    alt: 'Fragrant saffron Lamb Kacchi Biryani served fresh in a copper deg for Bengali and Pakistani weddings in London.',
  },
  {
    id: 8,
    image: headerAsianCatering,
    category: 'weddings',
    title: 'Grand Candlelit Banquet Service',
    alt: 'Uniformed Halal catering staff serving piping-hot copper bowls of biryani and curry to wedding guests inside a grand London ballroom.',
  },
  {
    id: 9,
    image: menuStarters,
    category: 'catering',
    title: 'Chargrilled Tandoori Starters',
    alt: 'Freshly grilled Halal chicken tikka, seekh kebabs, and crispy samosas for London wedding catering.',
  },
  {
    id: 10,
    image: homeServiceCatering,
    category: 'catering',
    title: 'Full-Service Banquet Plating',
    alt: 'Professional culinary team preparing plated and buffet Halal Asian wedding dining across London, Essex, and Kent.',
  },
  {
    id: 11,
    image: menuMains,
    category: 'catering',
    title: 'Signature Slow-Cooked Curries & Naan',
    alt: 'Authentic lamb rogan josh, butter chicken, and beef bhuna served in copper handis with fresh garlic naan.',
  },
  {
    id: 12,
    image: menuDesserts,
    category: 'desserts',
    title: 'Rasmalai, Gulab Jamun & Gajar Halwa',
    alt: 'Plated South Asian wedding desserts featuring saffron pistachio rasmalai, warm gulab jamun, and gajar halwa.',
  },
];
