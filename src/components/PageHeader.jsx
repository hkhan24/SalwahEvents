import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, gradientText, imageUrl }) => {
  const backgroundStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <motion.section
      className="relative pt-48 pb-24 overflow-hidden bg-black bg-cover bg-center"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 
            className="text-4xl md:text-6xl font-serif font-bold text-white"
            style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            {title} <span className="text-salwah-gold">{gradientText}</span>
          </h1>
          <p 
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-sans"
            style={{ textShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)' }}
          >
            {subtitle}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PageHeader;