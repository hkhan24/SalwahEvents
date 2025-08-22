
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <>
      <Helmet>
        <title>Our Menu | Salwah Events & Catering UK</title>
        <meta name="description" content="Explore our delicious Halal catering menu, featuring a wide range of starters, main courses, biryanis, and desserts for your Asian wedding or event in the UK." />
      </Helmet>

      <section className="relative pt-32 pb-20 hero-pattern">
        <div className="absolute inset-0 bg-black/60"></div>
        <img  class="absolute inset-0 w-full h-full object-cover" alt="A delicious spread of various Indian dishes on a well-decorated table." src="https://images.unsplash.com/photo-1606491048834-73c1706b8655?w=800" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white text-shadow">
              Flavours That <span className="gradient-text">Inspire</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-sans text-shadow">
              A symphony of authentic Halal dishes crafted for your perfect event.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/31ffcb31d93611d5f7d0a4d4f8570c0c.png"
              alt="Salwah Events & Catering Menu detailing starters, mains, rice & biryani, and desserts"
              className="w-full h-auto rounded-lg shadow-2xl shadow-gold/20"
            />
          </motion.div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Ready to <span className="text-gold">Taste the Difference?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sans">
              Contact us to discuss a bespoke menu for your upcoming wedding or event. We cater to all dietary requirements.
            </p>
            <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-4 text-lg">
              <Link to="/contact">
                Create Your Menu
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Menu;
