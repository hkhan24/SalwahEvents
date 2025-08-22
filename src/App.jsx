
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home.jsx';
import Services from '@/pages/Services.jsx';
import Packages from '@/pages/Packages.jsx';
import Gallery from '@/pages/Gallery.jsx';
import About from '@/pages/About.jsx';
import Contact from '@/pages/Contact.jsx';
import Menu from '@/pages/Menu.jsx';
import PrivacyPolicy from '@/pages/PrivacyPolicy.jsx';
import CookieNotice from '@/pages/CookieNotice.jsx';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import StickyBookButton from '@/components/StickyBookButton';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  const GA4_ID = 'G-XXXXXXXXXX';
  const COMPANY_NUMBER = '16503532';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Salwah Events & Catering",
    "url": "https://www.salwahevents.com",
    "logo": "https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/f54574eda42cd927bb0ad7646c135adb.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-7359-337887",
      "contactType": "Customer Service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Number 19 Unit 7 Landmark, Commercial Road",
      "addressLocality": "Edmonton, London",
      "postalCode": "N18 1UB",
      "addressCountry": "UK"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61577041720144",
      "https://www.instagram.com/salwah.events/",
      "https://uk.trustpilot.com/review/salwahevents.com"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Event Management and Catering",
    "provider": {
      "@type": "Organization",
      "name": "Salwah Events & Catering"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "London and surrounding areas"
    },
    "description": "Premium Asian wedding catering, event management, and stage decoration services across London and surrounding areas."
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Salwah Events & Catering</title>
        <meta name="description" content="Premium event planning and catering services in the UK." />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      
      <GoogleAnalytics measurementId={GA4_ID} />
      <ScrollToTop />
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-notice" element={<CookieNotice />} />
        </Routes>
      </main>
      
      <Footer companyNumber={COMPANY_NUMBER} />
      <StickyBookButton />
      <CookieConsentBanner />
      <Toaster />
    </div>
  );
}

export default App;
