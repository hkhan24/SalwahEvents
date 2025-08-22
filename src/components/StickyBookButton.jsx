import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';

const StickyBookButton = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link to="/contact">
        <button className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-semibold rounded-full shadow-lg hover:bg-gold-dark transition-all duration-300 transform hover:scale-105">
          <CalendarCheck size={20} />
          Enquire Now
        </button>
      </Link>
    </motion.div>
  );
};

export default StickyBookButton;