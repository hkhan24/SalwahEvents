import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Packages', path: '/packages' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const whatsappLink = "https://wa.me/447359337887";
  const whatsappIconUrl = "https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/36e2ed24eddfbda7233e784e264f8406.png";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-salwah-black/95 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/f54574eda42cd927bb0ad7646c135adb.png" 
                  alt="Salwah Events & Catering Logo" 
                  className="h-10 md:h-14 w-auto"
                />
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-sans font-medium transition-colors duration-300 hover:text-salwah-gold ${
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                      ? 'text-salwah-gold'
                      : 'text-salwah-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="md:hidden flex items-center gap-3">
               <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chat on WhatsApp" 
                className="bg-salwah-gold rounded-full w-11 h-11 flex items-center justify-center"
              >
                <img src={whatsappIconUrl} alt="WhatsApp" className="h-11 w-11" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-salwah-gold rounded-xl w-11 h-11 flex items-center justify-center"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={24} className="text-salwah-black"/> : <Menu size={24} className="text-salwah-black"/>}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-salwah-black/95 backdrop-blur-md border-t border-salwah-gold/20"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block font-sans font-medium text-lg transition-colors duration-300 hover:text-salwah-gold ${
                      location.pathname === item.path ? 'text-salwah-gold' : 'text-salwah-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;