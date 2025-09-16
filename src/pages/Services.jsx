import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Utensils, Brush, Leaf, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';

const Services = () => {
  const serviceCards = [
    {
      icon: Utensils,
      title: 'Asian Wedding Catering',
      description: 'Exquisite, 100% Halal catering blending traditional flavours with contemporary presentation.',
      link: '/services/asian-wedding-catering',
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/35fc2105da96c77f56d106b19747fbfe.jpg'
    },
    {
      icon: Brush,
      title: 'Wedding Stage Decoration',
      description: 'Transform any venue with our creative and breathtaking wedding stage decoration services.',
      link: '/services/wedding-stage-decoration',
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/20cc7804638dadea2b3d073423fdac01.jpg'
    },
    {
      icon: Leaf,
      title: 'Event Management & Planning',
      description: 'From concept to execution, our full event management ensures a seamless, stress-free occasion.',
      link: '/services/event-management-planning',
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/d465a5a95ce1a116ecd4521709f16870.jpg'
    },
    {
      icon: Building2,
      title: 'Venues & Locations',
      description: 'Discover our network of trusted partner venues across London, perfect for any Asian wedding.',
      link: '/services/venues-locations',
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/bcffc99a84e4f225f63eff1ada3a5936.jpg'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asian Wedding Services London | Catering, Decor & Planning</title>
        <meta name="description" content="Discover Salwah’s premium services for Asian weddings in London: halal catering (Indian, Pakistani, Bangladeshi), stage decoration, and full event management." />
      </Helmet>

      <div className="bg-black">
        <PageHeader 
          title="Our Premium" 
          gradientText="Event Services" 
          subtitle="End-to-end solutions for a flawless and unforgettable event in London." 
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/84cd0827e4eb0d28d82671e090ba306e.png"
        />
        
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                At Salwah Events, we offer a comprehensive suite of services to bring your dream wedding to life. Specialising in authentic halal catering for Indian, Pakistani, and Bangladeshi weddings in London, we ensure every detail is perfect. Explore our core services below to see how we can make your celebration unforgettable.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceCards.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={service.link} className="block group">
                    <div className="bg-[#2A2E39] rounded-2xl shadow-xl border border-gold/20 hover-lift overflow-hidden flex flex-col h-full">
                      <div className="p-8 flex-grow">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center border border-gold transition-transform group-hover:scale-110 flex-shrink-0">
                            <service.icon className="text-gold" size={32} />
                          </div>
                          <h2 className="text-2xl font-serif font-bold text-white">
                            {service.title}
                          </h2>
                        </div>
                        <p className="text-gray-200 font-sans leading-relaxed mb-6">{service.description}</p>
                        <div className="flex items-center text-gold font-semibold transition-opacity duration-300">
                          Learn More <ArrowRight className="ml-2 w-5 h-5" />
                        </div>
                      </div>
                      <div className="w-full h-48 overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
                <h3 className="text-xl font-serif font-bold text-gold mb-4">Explore Our Services</h3>
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {serviceCards.map(service => (
                        <li key={service.link}>
                            <Link to={service.link} className="text-gray-300 hover:text-gold transition-colors">{service.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;