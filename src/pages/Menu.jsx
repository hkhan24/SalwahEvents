import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Utensils, Wheat, Check, Drumstick, Salad, Bean } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const menuData = {
  starters: {
    icon: Drumstick,
    title: 'Starters',
    items: ['Chicken Tikka', 'Chicken Malai Tikka', 'Chicken 65', 'Chicken Dynamix', 'Lamb Kebab', 'Chapli Kebab', 'Vegetable Samosa', 'Papri Chat', 'Chilli Paneer', 'Fish Masala', 'Chicken Drumsticks', 'Tandoori Wings'],
    image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/8fcc079fcdc06e195f57ed8b7416be46.png'
  },
  mains: {
    icon: Utensils,
    title: 'Mains',
    items: [
      'Lamb Bhuna', 'Beef Bhuna', 'Beef Rezala', 'Beef Kala Bhuna', 'Chicken Roast', 'Chicken Korai', 'Chicken Tikka Jalfraizi', 'Chicken Curry (on the bone)', 'Chicken Butter Makhni',
      'King prawn Jalfry', 'Prawn Saag', 'Vegetable with Prawn'
    ],
    image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/cdd260f688924f430c417f527d347ee9.png'
  },
  vegetableDishes: {
    icon: Salad,
    title: 'Vegetable Dishes',
    items: [
      'Mixed Vegetables', 'Saag Aloo', 'Saag Paneer', 'Paneer Butter Makhni', 'Aloo Baingan', 'Bhindi Dupiaza',
      'Vegetable Manchurian'
    ],
    image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/42f5fa8e57e62af30d2c5e428dae7d46.jpg'
  },
  daalDishes: {
    icon: Bean,
    title: 'Daal Dishes',
    items: ['Tarka Daal', 'Chana Daal Masala', 'Daal Fry', 'Makhni Daal', 'Chana Masala', 'Mung Daal Masala'],
    image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/8d5925a2b28b6a8e62dcc3f840eff577.jpg'
  },
  riceAndBiryani: {
    icon: Wheat,
    title: 'Rice & Biryani',
    items: ['Lamb Biryani', 'Lamb Pilou', 'Lamb Kachchi Biryani', 'Chicken Pilou', 'Chicken Biryani', 'Pilou Rice', 'White Rice', 'Naan'],
    image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/e3ff0f0350fd44cfd1d98e7610e5c7a2.png'
  },
  desserts: {
    icon: Drumstick,
    title: 'Desserts',
    items: ['Kalajam and Ice Cream', 'Gulabjamun and Ice Cream', 'Gajar Halwa and Ice Cream', 'Baklava and Ice Cream', 'Firni', 'Strawberry Cheesecake', 'Milk Cake'],
    image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/616c5b74c679d345de5c5ed3a0eb7d50.png'
  }
};


const Menu = () => {
  const menuCategories = [
    menuData.starters,
    menuData.mains,
    menuData.vegetableDishes,
    menuData.daalDishes,
    menuData.riceAndBiryani,
    menuData.desserts
  ];

  return (
    <>
      <Helmet>
        <title>Asian Wedding Catering Menus London | Salwah Events</title>
        <meta name="description" content="Explore our delicious Halal catering menu, featuring a wide range of starters, main courses, biryanis, and desserts for your Asian wedding or event in London." />
      </Helmet>

      <div className="bg-black">
        <PageHeader 
          title="Flavours That" 
          gradientText="Inspire" 
          subtitle="A symphony of authentic Halal dishes crafted for your perfect event." 
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/f76d60ce17765b616aea2ed128d40e10.png"
        />

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Our <span className="text-gold">Luxury Menu</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
                At Salwah Events, we pride ourselves on offering an exquisite halal catering menu that celebrates the rich culinary traditions of Indian, Pakistani, and Bangladeshi cuisines. Our chefs in London use only the finest ingredients to create dishes that are both authentic and innovative, ensuring a memorable dining experience for your wedding or event.
              </p>
            </motion.div>
            
            <div className="space-y-20">
              {menuCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                  className={`group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center package-card-platinum rounded-2xl p-8 shadow-xl border-2 border-gold/20 ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center border border-gold transition-transform group-hover:scale-110">
                        <category.icon className="text-gold" size={32} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                        {category.title}
                      </h2>
                    </div>
                    <ul className="space-y-3 columns-1 sm:columns-2">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="text-gold w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-200">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`relative rounded-xl overflow-hidden ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <img
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={`${category.title} from our halal catering menu for Asian weddings in London.`}
                      src={category.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Menu;