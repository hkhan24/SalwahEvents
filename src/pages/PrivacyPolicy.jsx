import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Salwah Events & Catering</title>
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
              <span className="gradient-text">Privacy Policy</span>
            </h1>

            <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-4 font-sans">
              <p>Last updated: August 20, 2025</p>
              
              <h2 className="text-2xl text-gold font-serif">1. Introduction</h2>
              <p>Welcome to Salwah Events & Catering. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

              <h2 className="text-2xl text-gold font-serif">2. Information We Collect</h2>
              <p>We may collect personal information such as your name, email address, phone number, event details, and location when you fill out our contact form or otherwise communicate with us.</p>
              <p>We also collect non-personal information, such as browser type, operating system, and website usage data through cookies and analytics tools to improve our services.</p>

              <h2 className="text-2xl text-gold font-serif">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries and provide you with quotes and proposals.</li>
                <li>Plan and deliver our event catering and management services.</li>
                <li>Improve our website and customer service.</li>
                <li>Communicate with you about your event or our services.</li>
              </ul>

              <h2 className="text-2xl text-gold font-serif">4. Disclosure of Your Information</h2>
              <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

              <h2 className="text-2xl text-gold font-serif">5. Data Security</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

              <h2 className="text-2xl text-gold font-serif">6. Your Rights</h2>
              <p>You have the right to request access to, correction of, or deletion of your personal data. Please contact us to make such a request.</p>

              <h2 className="text-2xl text-gold font-serif">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at info@salwahevents.com.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;