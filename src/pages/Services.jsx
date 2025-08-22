import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Utensils, Brush, Leaf, Check, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Utensils,
      title: 'Asian Wedding Catering',
      description: 'Our specialty is providing exquisite, 100% Halal catering for Asian weddings and events of all sizes. We craft bespoke menus for event catering in the UK, blending traditional flavours with contemporary presentation to delight every guest in London and surrounding areas.',
      benefits: ['Authentic, high-quality Halal ingredients', 'Customisable menus for all tastes', 'Professional, uniformed service staff'],
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/35fc2105da96c77f56d106b19747fbfe.jpg'
    },
    {
      icon: Brush,
      title: 'Wedding Stage Decoration & Venue Setup',
      description: 'Transform any venue into a breathtaking space with our creative wedding stage decoration UK services. From grand, floral-draped stages to sophisticated, minimalist designs, we create the perfect backdrop for your special moments.',
      benefits: ['Bespoke designs tailored to your theme', 'High-quality props, lighting, and furniture', 'Full installation and takedown service'],
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/20cc7804638dadea2b3d073423fdac01.jpg'
    },
    {
      icon: Users,
      title: 'Asian Wedding Planner',
      description: 'As your dedicated Asian wedding planner, we guide you through every step of the journey. We handle logistics, vendor management, and timelines, ensuring a beautiful and culturally rich celebration that honours your traditions.',
      benefits: ['Culturally-aware planning and advice', 'Access to top-tier Asian wedding vendors', 'Stress-free management from start to finish'],
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/bcffc99a84e4f225f63eff1ada3a5936.jpg'
    },
    {
      icon: Leaf,
      title: 'Full Event Management',
      description: 'For a completely stress-free experience, entrust your entire event to us. Our full management service covers every detail, from concept and vendor coordination to on-the-day execution, ensuring a seamless and memorable occasion with our UK wedding packages.',
      benefits: ['End-to-end planning and coordination', 'Access to our network of trusted vendors', 'A dedicated event manager for your peace of mind'],
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/d465a5a95ce1a116ecd4521709f16870.jpg'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Wedding & Event Services | Catering, Stages & Decoration UK</title>
        <meta name="description" content="Discover Salwah’s Asian wedding catering, event catering, stage decoration, and full event management. Premium services for every occasion in London and surrounding areas." />
      </Helmet>

      <div className="pt-20 bg-black">
        <section className="py-16 bg-gray-900/50 hero-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center p-8 md:p-12 rounded-xl glass-effect border border-gold/30"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white text-shadow">
                Our Premium <span className="gradient-text">Event Services</span>
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-sans text-shadow">
                End-to-end solutions for a flawless and unforgettable event in the UK.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center border border-gold">
                        <service.icon className="text-gold" size={32} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-gray-300 font-sans leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="text-gold w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-200">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-6 py-3">
                      <Link to="/contact">
                        Enquire Now
                        <ArrowRight className="ml-2" size={18} />
                      </Link>
                    </Button>
                  </div>
                  <div className={`relative rounded-lg overflow-hidden hover-lift ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <img  class="w-full h-96 object-cover" alt={service.title} src={service.image} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
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

export default Services;