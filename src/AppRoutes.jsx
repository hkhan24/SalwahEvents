import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home.jsx';
import About from '@/pages/About.jsx';
import Menu from '@/pages/Menu.jsx';
import Packages from '@/pages/Packages.jsx';
import Services from '@/pages/Services.jsx';
import Gallery from '@/pages/Gallery.jsx';
import Contact from '@/pages/Contact.jsx';
import PrivacyPolicy from '@/pages/PrivacyPolicy.jsx';
import CookieNotice from '@/pages/CookieNotice.jsx';
import Admin from '@/pages/Admin.jsx';
import InvoiceGenerator from '@/pages/admin/InvoiceGenerator.jsx';
import QuotationGenerator from '@/pages/admin/QuotationGenerator.jsx';

import AsianWeddingCatering from '@/pages/services/AsianWeddingCatering';
import WeddingStageDecoration from '@/pages/services/WeddingStageDecoration';
import EventManagementPlanning from '@/pages/services/EventManagementPlanning';
import VenuesLocations from '@/pages/services/VenuesLocations';

import BlogIndex from '@/pages/blog/BlogIndex';
import BlogMenuIdeas from '@/pages/blog/BlogMenuIdeas';
import BlogNikahChecklist from '@/pages/blog/BlogNikahChecklist';
import BlogEastLondonVenues from '@/pages/blog/BlogEastLondonVenues';

import ResourcesIndex from '@/pages/resources/ResourcesIndex';
import BudgetCalculator from '@/pages/resources/BudgetCalculator';
import BudgetSplitter from '@/pages/resources/BudgetSplitter';
import GuestEstimator from '@/pages/resources/GuestEstimator';
import InvitationGenerator from '@/pages/resources/InvitationGenerator';
import PerGuestCalculator from '@/pages/resources/PerGuestCalculator';
import QuoteBuilder from '@/pages/resources/QuoteBuilder';
import RsvpTracker from '@/pages/resources/RsvpTracker';
import SeatingPlanner from '@/pages/resources/SeatingPlanner';
import SeatingVisualiser from '@/pages/resources/SeatingVisualiser';
import TimelineGenerator from '@/pages/resources/TimelineGenerator';
import TimelineTemplates from '@/pages/resources/TimelineTemplates';
import VendorScorecard from '@/pages/resources/VendorScorecard';
import WeddingChecklist from '@/pages/resources/WeddingChecklist';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/cookie-notice" element={<CookieNotice />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/invoices" element={<InvoiceGenerator />} />
      <Route path="/admin/quotations" element={<QuotationGenerator />} />
      
      <Route path="/services/asian-wedding-catering" element={<AsianWeddingCatering />} />
      <Route path="/services/wedding-stage-decoration" element={<WeddingStageDecoration />} />
      <Route path="/services/event-management-planning" element={<EventManagementPlanning />} />
      <Route path="/services/venues-locations" element={<VenuesLocations />} />

      <Route path="/blog/top-5-menu-ideas-for-an-indian-wedding-in-london" element={<BlogMenuIdeas />} />
      <Route path="/blog/how-to-plan-a-pakistani-nikah-ceremony-a-checklist" element={<BlogNikahChecklist />} />
      <Route path="/blog/best-wedding-venues-in-east-london-for-asian-weddings" element={<BlogEastLondonVenues />} />

      <Route path="/resources" element={<ResourcesIndex />} />
      <Route path="/resources/budget-calculator" element={<BudgetCalculator />} />
      <Route path="/resources/budget-splitter" element={<BudgetSplitter />} />
      <Route path="/resources/guest-estimator" element={<GuestEstimator />} />
      <Route path="/resources/invitation-generator" element={<InvitationGenerator />} />
      <Route path="/resources/per-guest-calculator" element={<PerGuestCalculator />} />
      <Route path="/resources/quote-builder" element={<QuoteBuilder />} />
      <Route path="/resources/rsvp-dietary-tracker" element={<RsvpTracker />} />
      <Route path="/resources/seating-planner" element={<SeatingPlanner />} />
      <Route path="/resources/seating-visualiser" element={<SeatingVisualiser />} />
      <Route path="/resources/timeline-ics" element={<TimelineGenerator />} />
      <Route path="/resources/timeline-templates" element={<TimelineTemplates />} />
      <Route path="/resources/vendor-scorecard" element={<VendorScorecard />} />
      <Route path="/resources/wedding-checklist" element={<WeddingChecklist />} />
    </Routes>
  );
};

export default AppRoutes;