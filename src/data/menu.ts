import menuStarters from '@/assets/images/menu-starters.png';
import menuMains from '@/assets/images/menu-mains.png';
import menuVegetables from '@/assets/images/menu-vegetables.jpg';
import menuDaal from '@/assets/images/menu-daal.jpg';
import menuBiryani from '@/assets/images/menu-biryani.png';
import menuDesserts from '@/assets/images/menu-desserts.png';

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
    title: 'Starters',
    subtitle: 'Charcoal-grilled tikka, freshly ground kebabs, crispy samosas, and tangy street-style chaat to open the feast.',
    items: [
      'Chicken Tikka',
      'Chicken Malai Tikka',
      'Chicken 65',
      'Chicken Dynamix',
      'Lamb Kebab',
      'Chapli Kebab',
      'Vegetable Samosa',
      'Papri Chaat',
      'Chilli Paneer',
      'Fish Masala',
      'Chicken Drumsticks',
      'Tandoori Wings',
    ],
    image: menuStarters,
    imageAlt: 'Halal wedding starters including chargrilled chicken tikka, seekh kebabs, and crispy samosas.',
  },
  {
    id: 'mains',
    title: 'Mains',
    subtitle: 'Slow-cooked Bengali, Pakistani, and Indian wedding classics — rich with toasted whole spices and HMC-certified cuts.',
    items: [
      'Lamb Bhuna',
      'Beef Bhuna',
      'Beef Rezala',
      'Beef Kala Bhuna',
      'Chicken Roast',
      'Chicken Karahi',
      'Chicken Tikka Jalfrezi',
      'Chicken Curry (On the Bone)',
      'Chicken Butter Makhni',
      'King Prawn Jalfrezi',
      'Prawn Saag',
      'Mixed Vegetable with Prawn',
    ],
    image: menuMains,
    imageAlt: 'Authentic Halal main course curries and traditional wedding roasts served in copper handis.',
  },
  {
    id: 'vegetables',
    title: 'Vegetable Dishes',
    subtitle: 'Vibrant, freshly spiced vegetarian specialities prepared with care so every table has generous meat-free choices.',
    items: [
      'Mixed Vegetables',
      'Saag Aloo',
      'Saag Paneer',
      'Paneer Butter Makhni',
      'Aloo Baingan',
      'Bhindi Dupiaza',
      'Vegetable Manchurian',
    ],
    image: menuVegetables,
    imageAlt: 'Vegetarian Indian and Bangladeshi dishes prepared fresh for London weddings.',
  },
  {
    id: 'daal',
    title: 'Daal Dishes',
    subtitle: 'Comforting, slow-simmered lentils finished with fragrant garlic, toasted cumin, and rich ghee.',
    items: [
      'Tarka Daal',
      'Chana Daal Masala',
      'Daal Fry',
      'Makhni Daal',
      'Chana Masala',
      'Mung Daal Masala',
    ],
    image: menuDaal,
    imageAlt: 'Slow-simmered tarka daal and creamy makhni daal served alongside rice and fresh naan.',
  },
  {
    id: 'rice-biryani',
    title: 'Rice & Biryani',
    subtitle: 'Long-grain aged basmati slow-sealed on dum with saffron, caramelised onions, and tender meat, paired with warm naan.',
    items: [
      'Lamb Kacchi Biryani',
      'Lamb Biryani',
      'Lamb Pilau',
      'Chicken Biryani',
      'Chicken Pilau',
      'Pilau Rice',
      'White Rice',
      'Fresh Naan',
    ],
    image: menuBiryani,
    imageAlt: 'Steaming saffron Lamb Kacchi Biryani served in a hammered copper deg.',
  },
  {
    id: 'desserts',
    title: 'Desserts',
    subtitle: 'Warm traditional South Asian sweets paired with creamy ice cream alongside chilled classics and celebration cakes.',
    items: [
      'Kalajam & Ice Cream',
      'Gulab Jamun & Ice Cream',
      'Gajar Halwa & Ice Cream',
      'Baklava & Ice Cream',
      'Firni',
      'Strawberry Cheesecake',
      'Milk Cake',
    ],
    image: menuDesserts,
    imageAlt: 'South Asian wedding desserts featuring warm gulab jamun, gajar halwa, and ice cream.',
  },
];
