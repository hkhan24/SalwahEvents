import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight, Star, Utensils, Brush, Leaf, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate('/contact');
  };

  const serviceHighlights = [
    {
      icon: Utensils,
      title: 'Asian Wedding Catering',
      description: 'Exquisite, authentic cuisine that delights every guest at weddings in London and surrounding areas.',
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/cb5abf17eedbf0d9fece27ffcbedadcd.jpg'
    },
    {
      icon: Brush,
      title: 'Elegant Stage Decor',
      description: 'Stunning and sophisticated wedding stage decoration that creates a focal point for your special day.',
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/abdd16a67a6fd8df8f6a432440668003.jpg'
    },
    {
      icon: Leaf,
      title: 'Full Event Management',
      description: 'Comprehensive, stress-free event and Asian wedding catering from start to finish.',
      image: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/8a11126c18d6edbdf098d595b7ca33ba.jpg'
    }
  ];

  const testimonials = [
    {
      name: 'Aisha & Omar Khan',
      event: 'Wedding Reception',
      text: 'Salwah Events turned our wedding into a fairytale. The food was divine, the decor was breathtaking, and the team was incredibly professional. Everything was perfect, Alhumdulillah!',
      rating: 5
    },
    {
      name: 'Dr. Fatima Ahmed',
      event: 'Charity Gala',
      text: 'Their attention to detail is second to none. They managed our entire event flawlessly, allowing us to focus on our guests. Highly recommended for any large-scale event.',
      rating: 5
    },
    {
      name: 'The Rahman Family',
      event: 'Aqiqah Celebration',
      text: 'A truly premium and Halal service. The dessert stall was a massive hit with both kids and adults! We couldn’t have asked for a more reliable and friendly team.',
      rating: 5
    }
  ];

   const venuePartners = [
    'Palm Tree', 'Oasis', 'City Pavillion', 'The Willows', 'Ariana', 'Mayfair', 'Meridian Grand', 'Royal Regency'
  ];

  return (
    <>
      <Helmet>
        <title>Asian Wedding Catering & Event Services in London & Surrounding Areas | Salwah Events</title>
        <meta name="description" content="Salwah Events offers premium Asian wedding catering, stage decoration, and full event management across London and surrounding areas. Luxury service, tailored packages." />
      </Helmet>
      
      <div className="pt-0">
        <section className="relative w-full min-h-screen md:h-[85vh] flex" id="home">
          <div className="absolute inset-0 bg-salwah-black">
            <img
              src="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/dcbbd62b6b07809f64fd4eb07b8dd8a1.jpg"
              alt="An elegant couple in traditional South Asian wedding attire, smiling warmly at their wedding in the UK."
              className="w-full h-full object-cover object-[50%_25%] md:object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-salwah-black/80 via-salwah-black/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-24 md:justify-center md:pb-0 md:pt-0">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif font-semibold tracking-tight text-salwah-white leading-tight"
                style={{ 
                  fontSize: 'clamp(28px, 5vw, 54px)', 
                  lineHeight: 1.15,
                  textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                <span className="text-salwah-gold">Your Dream Event Partner</span><br /> in London & Surrounding Areas
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-6 mx-auto text-salwah-white/90 max-w-[42ch]"
                style={{ 
                  fontSize: 'clamp(14px, 2.4vw, 18px)',
                  textShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)'
                }}
              >
                Premium Asian, Indian, Pakistani, and Bangladeshi wedding catering and event planning for your wedding, private party, or corporate event.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
              >
                <Button onClick={handleGetQuote} size="lg" className="group w-full sm:w-auto">
                  Get Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button asChild variant="outline" size="lg" className="group w-full sm:w-auto">
                  <Link to="/packages">View Packages</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <main className="relative z-10 bg-salwah-black">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                  Crafting <span className="text-salwah-gold">Memories</span>, Perfectly
                </h2>
                <p className="text-lg text-gray-300 font-sans leading-relaxed">
                  At Salwah Events & Catering, we specialise in creating beautiful, bespoke events with a commitment to Halal excellence. As your trusted partner, we blend creativity with meticulous planning for Asian, Indian, Pakistani, and Bangladeshi weddings. Whether it’s an intimate gathering or a grand celebration in London and surrounding areas, we ensure every detail is handled with care.
                </p>
              </motion.div>
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
                  Our <span className="text-salwah-gold">Signature Services</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {serviceHighlights.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-lg hover-lift group"
                  >
                    <img  className="w-full h-80 object-cover" alt={service.title} src={service.image} />
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                      <div className="w-16 h-16 bg-salwah-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-salwah-gold">
                          <service.icon className="text-salwah-gold" size={32} />
                        </div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-2 text-center">{service.title}</h3>
                      <p className="text-gray-200 font-sans text-center">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg" className="text-base">
                  <Link to="/services">
                    Explore All Services
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <p className="text-sm font-semibold text-salwah-gold tracking-widest uppercase mb-2">Our Partners</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                  Our <span className="text-salwah-gold">Venue Partners</span>
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6"
              >
                {venuePartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-center space-x-3 px-6 py-3 rounded-lg venue-badge"
                  >
                    <Building2 className="text-salwah-gold" size={22} />
                    <span className="text-white font-semibold font-sans text-lg">{partner}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-gray-900/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                  Trusted by <span className="text-salwah-gold">Our Clients</span>
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={5000}
                    emulateTouch={true}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="px-4 md:px-10 pb-10">
                      <div className="glass-effect p-8 rounded-lg text-left">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="text-salwah-gold fill-salwah-gold" size={20} />
                          ))}
                        </div>
                        <p className="text-gray-200 font-sans mb-6 italic text-lg">"{testimonial.text}"</p>
                        <div>
                          <p className="text-white font-semibold text-xl">{testimonial.name}</p>
                          <p className="text-salwah-gold text-md">{testimonial.event}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-r from-salwah-gold/20 to-salwah-gold/10" id="footer-cta">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                  Plan Your Event With <span className="text-salwah-gold">Us</span>
                </h2>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto font-sans">
                  Ready to discuss your vision? Contact our team today for a complimentary consultation and let us bring your dream event to life.
                </p>
                <Button onClick={handleGetQuote} size="lg" className="text-base group">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;