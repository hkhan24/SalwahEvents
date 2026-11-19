import menuStarters from '@/assets/images/menu-starters.png';
import menuMains from '@/assets/images/menu-mains.png';
import menuVegetables from '@/assets/images/menu-vegetables.jpg';
import menuDaal from '@/assets/images/menu-daal.jpg';
import menuBiryani from '@/assets/images/menu-biryani.png';
import menuDesserts from '@/assets/images/menu-desserts.png';
import galleryCatering from '@/assets/images/gallery-catering-platters.png';

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  image: ImageMetadata;
  imageAlt: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'starters',
    title: 'Starters & Grills',
    subtitle: 'Chargrilled tandoori favourites, crispy street-food chaat, and spiced kebabs.',
    items: [
      'Chicken Tikka',
      'Chicken Malai Tikka',
      'Chicken 65',
      'Chicken Dynamix',
      'Lamb Seekh Kebab',
      'Peshawari Chapli Kebab',
      'Vegetable Samosa',
      'Papri Chaat',
      'Chilli Paneer',
      'Fish Masala',
      'Spiced Chicken Drumsticks',
      'Tandoori Chicken Wings',
    ],
    image: menuStarters,
    imageAlt: 'HMC Halal starters and tandoori grills prepared for Asian weddings in London.',
  },
  {
    id: 'mains',
    title: 'Signature Main Courses',
    subtitle: 'Slow-cooked traditional Bengali, Pakistani, and Indian wedding curries & roasts.',
    items: [
      'Lamb Bhuna',
      'Beef Bhuna',
      'Beef Rezala',
      'Chittagong Beef Kala Bhuna',
      'Traditional Bengali Chicken Roast',
      'Chicken Karahi',
      'Lamb Karahi Gosht',
      'Chicken Tikka Jalfrezi',
      'Chicken Curry (On the Bone)',
      'Chicken Butter Makhni',
      'King Prawn Jalfrezi',
      'Prawn Saag',
      'Slow-Cooked Lamb Nihari',
      'Mixed Vegetable with Prawn',
    ],
    image: menuMains,
    imageAlt: 'Authentic Halal main course curries and roasts for London wedding catering.',
  },
  {
    id: 'rice-biryani',
    title: 'Rice, Pilau & Biryani',
    subtitle: 'Fragrant aged basmati cooked on dum with saffron, caramelised onions, and whole spices.',
    items: [
      'Dhakai Lamb Kacchi Biryani',
      'Traditional Lamb Biryani',
      'Lamb Pilau',
      'Chicken Biryani',
      'Chicken Pilau',
      'Fragrant Basmati Pilau Rice',
      'Steamed White Rice',
      'Fresh Tandoori Naan & Garlic Naan',
    ],
    image: menuBiryani,
    imageAlt: 'Traditional Lamb Kacchi Biryani and fragrant pilau rice by Salwah Events.',
  },
  {
    id: 'vegetables-borthas',
    title: 'Vegetable Dishes & Bengali Borthas',
    subtitle: 'Vibrant vegetarian specialities and authentic Bangladeshi borthas for every table.',
    items: [
      'Mixed Seasonal Vegetables',
      'Saag Aloo',
      'Saag Paneer',
      'Paneer Butter Makhni',
      'Aloo Baingan',
      'Bhindi Dupiaza',
      'Vegetable Manchurian',
      'Traditional Bengali Borthas (Aloo, Begun & Shutki on request)',
    ],
    image: menuVegetables,
    imageAlt: 'Vegetarian Indian and Bangladeshi dishes prepared fresh for Halal weddings.',
  },
  {
    id: 'daal',
    title: 'Daal Dishes',
    subtitle: 'Slow-simmered lentils tempered with garlic, cumin, and ghee.',
    items: [
      'Tarka Daal',
      'Chana Daal Masala',
      'Daal Fry',
      'Creamy Makhni Daal',
      'Punjabi Chana Masala',
      'Mung Daal Masala',
    ],
    image: menuDaal,
    imageAlt: 'Rich slow-cooked daal dishes served alongside pilau and tandoori naan.',
  },
  {
    id: 'desserts',
    title: 'Desserts & Mithai',
    subtitle: 'Warm South Asian desserts paired with luxury ice cream, plus contemporary sweet tables.',
    items: [
      'Roshmalai',
      'Traditional Mishti Doi',
      'Kalajam & Vanilla Ice Cream',
      'Warm Gulab Jamun & Ice Cream',
      'Gajar Halwa & Ice Cream',
      'Pistachio Baklava & Ice Cream',
      'Chilled Saffron Firni',
      'Zarda Sweet Rice',
      'Strawberry Cheesecake',
      'Artisan Milk Cake',
    ],
    image: menuDesserts,
    imageAlt: 'Traditional South Asian wedding desserts including Gulab Jamun, Roshmalai, and Gajar Halwa.',
  },
  {
    id: 'mocktails-chai',
    title: 'Mocktails, Borhani & Chai',
    subtitle: 'Handcrafted fruit mocktails, spiced Bengali borhani, freshly brewed karak chai, and artisan coffee.',
    items: [
      'Traditional Bengali Spiced Borhani',
      'Mango & Passionfruit Lassi',
      'Fresh Mint & Lime Cooler Mocktail',
      'Strawberry & Rose Fizz Mocktail',
      'Lychee & Elderflower Cooler',
      'Freshly Brewed Cardamom Karak Chai',
      'Kashmiri Pink Chai Station',
      'Artisan Filter Coffee & Herbal Teas',
    ],
    image: galleryCatering,
    imageAlt: 'Handcrafted wedding mocktails, spiced borhani, and traditional chai stations.',
  },
];
