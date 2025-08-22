import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const CookieNotice = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Notice - Salwah Events & Catering</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="bg-black text-white pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
              <span className="gradient-text">Cookie Notice</span>
            </h1>

            <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-4 font-sans">
              <p>Last updated: August 20, 2025</p>

              <h2 className="text-2xl text-gold font-serif">1. What are cookies?</h2>
              <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>

              <h2 className="text-2xl text-gold font-serif">2. How we use cookies</h2>
              <p>We use cookies for the following purposes:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off in our systems.</li>
                <li><strong>Performance and Analytics Cookies:</strong> We use Google Analytics to collect information about how visitors use our website. This helps us improve the way our website works. These cookies collect information in an anonymous form.</li>
                <li><strong>Functionality Cookies:</strong> These cookies are used to remember choices you make (such as your cookie consent preference).</li>
              </ul>
              
              <h2 className="text-2xl text-gold font-serif">3. Managing Cookies</h2>
              <p>You can manage your cookie preferences through the consent banner on our site. Most web browsers also allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">www.allaboutcookies.org</a>.</p>
              
              <h2 className="text-2xl text-gold font-serif">4. Changes to this notice</h2>
              <p>We may update this Cookie Notice from time to time. We encourage you to review this page periodically for any changes.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CookieNotice;