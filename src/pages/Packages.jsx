import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';

const Packages = () => {
  const packages = [
    {
      name: 'Silver Package',
      price: '£30',
      per: '/person',
      description: 'Ideal for elegant, intimate gatherings.',
      seoBlurb: 'Our Silver package offers fantastic value for affordable Asian wedding catering in London without compromising on quality.',
      features: [
        '3 Main Courses (Chicken, Lamb, Veg)',
        '2 Starters',
        'Pilau Rice & Naan Bread',
        'Salad & Chutneys',
        '1 Dessert',
        'Crockery & Cutlery',
        'Professional Waiting Staff'
      ],
      popular: false,
      theme: 'silver'
    },
    {
      name: 'Gold Package',
      price: '£45',
      per: '/person',
      description: 'Our most popular choice for a complete experience.',
      seoBlurb: 'The Gold package is our most popular choice, providing a comprehensive halal catering solution for a memorable London wedding.',
      features: [
        '4 Main Courses (Premium Selection)',
        '3 Starters (incl. Grills)',
        'Choice of Rice & Breads',
        'Full Salad Bar & Dips',
        '2 Desserts',
        'Welcome Drinks',
        'Full Crockery, Cutlery & Glassware',
        'Experienced Waiting Staff & Supervisor'
      ],
      popular: true,
      theme: 'gold'
    },
    {
      name: 'Platinum Package',
      price: 'From £17,500',
      per: 'total',
      description: 'The ultimate all-inclusive luxury package.',
      seoBlurb: 'For the ultimate luxury, our Platinum package includes full event management and wedding stage decoration in London.',
      features: [
        'Everything in Gold Package for 200 guests',
        'Full Event Management',
        'Luxury Wedding Stage Decoration UK',
        'Venue Lighting & Setup',
        'Dessert or Paan Stall',
        'Centrepieces for all tables',
        'Dedicated Event Manager'
      ],
      popular: false,
      theme: 'platinum'
    }
  ];
  
  const comparisonFeatures = [
    { feature: 'Price Per Person', silver: '£30', gold: '£45', platinum: 'Custom' },
    { feature: 'Main Courses', silver: '3', gold: '4 (Premium)', platinum: '4 (Gourmet)' },
    { feature: 'Starters', silver: '2', gold: '3 (incl. Grills)', platinum: '4 (Premium)' },
    { feature: 'Desserts', silver: '1', gold: '2', platinum: '2 + Dessert Stall' },
    { feature: 'Welcome Drinks', silver: false, gold: true, platinum: true },
    { feature: 'Stage Decoration', silver: false, gold: false, platinum: true },
    { feature: 'Full Event Management', silver: false, gold: false, platinum: true },
    { feature: 'Dedicated Manager', silver: false, gold: false, platinum: true }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <>
      <Helmet>
        <title>Asian Wedding Catering Packages London | Salwah Events</title>
        <meta name="description" content="Choose from affordable Asian wedding catering packages in London: Silver (£30/person), Gold (£45/person), and Platinum (from £17,500). Perfect for weddings and events." />
      </Helmet>

      <div className="bg-black">
        <PageHeader 
          title="Our Wedding" 
          gradientText="Packages" 
          subtitle="Transparent pricing for exceptional value and event catering in London." 
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/5dc2c9a586eae72f01132696f8920a76.png"
        />

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  whileHover={{ y: -15, scale: 1.05, transition: { type: 'spring', stiffness: 200, damping: 15 } }}
                  className={`relative rounded-xl p-8 flex flex-col h-full border-2 package-card-${pkg.theme} ${
                    pkg.popular ? 'transform lg:scale-105 border-gold shadow-2xl shadow-gold/20' : 'border-gray-700'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gold text-black px-4 py-2 rounded-full font-semibold text-sm flex items-center space-x-1">
                        <Star size={16} />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">{pkg.name}</h3>
                    <div className={`text-4xl font-serif font-bold mb-1 ${pkg.theme === 'gold' ? 'text-gold' : 'text-white'}`}>
                      {pkg.price}
                      {pkg.per !== 'total' && <span className="text-lg text-gray-300 font-sans">{pkg.per}</span>}
                    </div>
                    <p className="text-gray-300 font-sans">{pkg.description}</p>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="text-gold mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-200 font-sans text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-400 italic text-center mb-6 flex-grow-0">{pkg.seoBlurb}</p>

                  <Button asChild
                    className={`w-full mt-auto ${
                      pkg.popular
                        ? 'bg-gold hover:bg-gold-dark text-black'
                        : 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-black'
                    } font-semibold py-3`}
                  >
                    <Link to="/contact">Enquire Now</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Package <span className="text-gold">Comparison</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sans">
                Find the perfect fit for your Asian wedding catering in London at a glance.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="overflow-x-auto glass-effect rounded-xl p-4"
            >
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="p-4 text-lg font-serif font-semibold text-white">Feature</th>
                    <th className="p-4 text-lg font-serif font-semibold text-white text-center">Silver</th>
                    <th className="p-4 text-lg font-serif font-semibold text-gold text-center">Gold</th>
                    <th className="p-4 text-lg font-serif font-semibold text-white text-center">Platinum</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="p-4 font-sans font-medium text-gray-200">{item.feature}</td>
                      <td className="p-4 font-sans text-gray-300 text-center">{item.silver === true ? <Check className="text-green-500 mx-auto" /> : item.silver === false ? <span className="text-red-500">✕</span> : item.silver}</td>
                      <td className="p-4 font-sans font-bold text-gold text-center">{item.gold === true ? <Check className="text-green-400 mx-auto" /> : item.gold === false ? <span className="text-red-500">✕</span> : item.gold}</td>
                      <td className="p-4 font-sans text-gray-300 text-center">{item.platinum === true ? <Check className="text-green-500 mx-auto" /> : item.platinum === false ? <span className="text-red-500">✕</span> : item.platinum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Ready for a <span className="text-gold">Custom Proposal?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sans">
                Every event is unique. Contact us for a detailed proposal tailored to your specific needs and vision.
              </p>
              <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-4 text-lg">
                <Link to="/contact">
                  Request Proposal
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Packages;