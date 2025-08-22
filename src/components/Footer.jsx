
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const TrustpilotIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const Footer = ({ companyNumber }) => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Asian Wedding Catering',
    'Vegetarian Wedding Catering',
    'Event Catering UK',
    'Asian Wedding Planner',
    'Wedding Stage Decoration',
    'Full Event Management'
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61577041720144', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/salwah.events/', label: 'Instagram' },
    { icon: TrustpilotIcon, href: 'https://uk.trustpilot.com/review/salwahevents.com', label: 'Trustpilot' },
  ];

  return (
    <footer className="bg-black border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Link to="/">
              <img 
                src="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/f54574eda42cd927bb0ad7646c135adb.png" 
                alt="Salwah Events & Catering Logo" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-300 font-sans text-sm leading-relaxed">
              Your trusted partner for premium Asian wedding catering and event services in London and surrounding areas. Companies House No: {companyNumber}.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <span className="text-xl font-serif font-semibold text-gold">Quick Links</span>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-gold transition-colors duration-300 font-sans text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="text-xl font-serif font-semibold text-gold">Our Services</span>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-300 font-sans text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <span className="text-xl font-serif font-semibold text-gold">Contact Us</span>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-gold mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300 font-sans text-sm">
                  Number 19 Unit 7 Landmark, Commercial Road, Edmonton, London, N18 1UB
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gold flex-shrink-0" size={18} />
                <span className="text-gray-300 font-sans text-sm">07359 337887</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-gold flex-shrink-0" size={18} />
                <span className="text-gray-300 font-sans text-sm">info@salwahevents.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <span className="text-gray-400 font-sans text-sm">
              © {new Date().getFullYear()} Salwah Events & Catering. All rights reserved.
            </span>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-gold transition-colors font-sans text-sm">
                Privacy Policy
              </Link>
              <Link to="/cookie-notice" className="text-gray-400 hover:text-gold transition-colors font-sans text-sm">
                Cookie Notice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
