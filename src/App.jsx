import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ScrollToTop from '@/components/ScrollToTop';
import AppRoutes from '@/AppRoutes';

function App() {
  const GA4_ID = 'G-XXXXXXXXXX';
  const COMPANY_NUMBER = '16503532';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Salwah Events & Catering",
    "image": "https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/f54574eda42cd927bb0ad7646c135adb.png",
    "@id": "https://www.salwahevents.com",
    "url": "https://www.salwahevents.com",
    "telephone": "+447359337887",
    "priceRange": "££-£££",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Number 19 Unit 7 Landmark, Commercial Road",
      "addressLocality": "London",
      "postalCode": "N18 1UB",
      "addressRegion": "London",
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.6118,
      "longitude": -0.0528
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "19:00"
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
    <div className="min-h-screen bg-salwah-black text-salwah-white">
      <Helmet>
        <title>Salwah Events & Catering</title>
        <meta name="description" content="Premium wedding event planning and catering services in London." />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      
      <GoogleAnalytics measurementId={GA4_ID} />
      <ScrollToTop />
      <Navbar />
      
      <main className="pt-0">
        <AppRoutes />
      </main>
      
      <Footer companyNumber={COMPANY_NUMBER} />
      <CookieConsentBanner />
      <Toaster />
    </div>
  );
}

export default App;