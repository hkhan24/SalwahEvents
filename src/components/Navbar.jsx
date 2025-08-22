
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/f54574eda42cd927bb0ad7646c135adb.png" 
              alt="Salwah Events & Catering Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex items-center justify-center flex-grow">
             <a href="tel:07359337887" className="flex items-center space-x-2 text-gold hover:text-white transition-colors duration-300 group">
                <Phone className="w-5 h-5 text-gold group-hover:animate-pulse" />
                <span className="font-serif font-bold text-lg tracking-wider">07359 337 887</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-sans font-medium transition-colors duration-300 hover:text-gold ${
                  location.pathname === item.path ? 'text-gold' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-gold/20"
          >
            <div className="px-4 py-6 space-y-4">
               <a href="tel:07359337887" className="flex items-center space-x-2 text-gold hover:text-white transition-colors duration-300 group mb-4">
                <Phone className="w-5 h-5 text-gold" />
                <span className="font-serif font-bold text-lg tracking-wider">07359 337 887</span>
              </a>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block font-sans font-medium text-lg transition-colors duration-300 hover:text-gold ${
                    location.pathname === item.path ? 'text-gold' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
