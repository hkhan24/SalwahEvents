import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-t border-gold/20 p-4 shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Cookie className="text-gold h-8 w-8 flex-shrink-0" />
              <p className="text-gray-200 text-sm">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. Read our{' '}
                <Link to="/cookie-notice" className="underline hover:text-gold transition-colors">
                  Cookie Notice
                </Link>.
              </p>
            </div>
            <div className="flex-shrink-0 flex gap-2">
              <Button onClick={handleAccept} className="bg-gold hover:bg-gold-dark text-black px-4 py-2 text-sm">
                Accept
              </Button>
              <Button onClick={handleDecline} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black px-4 py-2 text-sm">
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;