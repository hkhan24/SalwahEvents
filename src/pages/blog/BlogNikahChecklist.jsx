import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, CheckSquare, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';

const BlogNikahChecklist = () => {
  return (
    <>
      <Helmet>
        <title>How to Plan a Pakistani Nikah Ceremony – A Checklist | Salwah Events</title>
        <meta name="description" content="Your complete checklist for planning a beautiful Pakistani Nikah ceremony in London. From legal steps to decor, our guide covers everything you need to know." />
      </Helmet>
      <div className="bg-black text-gray-300">
        <PageHeader 
          title="Pakistani Nikah" 
          gradientText="Planning Checklist" 
          subtitle="A Step-by-Step Guide to a Beautiful and Meaningful Ceremony"
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/a02febce7837107e129066516a9cc30c.png"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-invert prose-lg mx-auto prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-gold prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-gold-light prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2">
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Published on August 29, 2025</span>
              <span className="mx-2">|</span>
              <CheckSquare className="w-4 h-4 mr-2" />
              <span>Planning, Pakistani Wedding</span>
            </div>

            <p className="lead">
              The Nikah is the heart of a Muslim wedding, a beautiful ceremony that unites two individuals in the sacred bond of marriage. Planning a Pakistani Nikah ceremony involves a blend of religious customs, legal requirements, and personal touches. As expert <Link to="/services/event-management-planning">Asian wedding planners in London</Link>, we've created this comprehensive checklist to guide you through the process.
            </p>

            <h2>Phase 1: The Foundations (3-6 Months Before)</h2>
            <ul>
              <li><strong>Set a Date:</strong> Consult with both families to choose a suitable date for the Nikah.</li>
              <li><strong>Book the Imam:</strong> Find and book a qualified Imam or officiant who can legally conduct the ceremony in the UK.</li>
              <li><strong>Finalise the Guest List:</strong> Decide on the size of the gathering. A Nikah can be an intimate affair or a larger event.</li>
              <li><strong>Book the Venue:</strong> Choose a location. This could be a mosque, a community hall, or a home. Check our guide to <Link to="/services/venues-locations">London wedding venues</Link> for ideas.</li>
              <li><strong>Legal Formalities:</strong> Give notice of your marriage at your local register office. This is a legal requirement in the UK and must be done at least 29 days before the ceremony.</li>
            </ul>
            <img  class="w-full rounded-lg my-8" alt="A Pakistani couple signing their Nikah papers in a beautifully decorated room." src="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/a02febce7837107e129066516a9cc30c.png" />

            <h2>Phase 2: The Details (1-3 Months Before)</h2>
            <ul>
              <li><strong>The Mehr:</strong> The bride and groom, with their families, should agree on the Mehr (the obligatory wedding gift from the groom to the bride).</li>
              <li><strong>Outfits & Rings:</strong> Purchase your Nikah outfits and wedding rings.</li>
              <li>
                <strong>Book Key Vendors:</strong>
                <ul className="list-disc pl-6 mt-2">
                  <li><strong>Caterer:</strong> Plan your menu. Whether it's light refreshments or a full meal, ensure you have delicious <Link to="/services/asian-wedding-catering">halal catering</Link>.</li>
                  <li><strong>Photographer/Videographer:</strong> Book professionals to capture the special moments.</li>
                  <li><strong>Decorator:</strong> Decide on the <Link to="/services/wedding-stage-decoration">stage decoration</Link>, floral arrangements, and overall theme.</li>
                </ul>
              </li>
              <li><strong>Invitations:</strong> Send out your invitations to guests.</li>
            </ul>

            <h2>Phase 3: The Final Touches (The Week Of)</h2>
            <ul>
              <li><strong>Confirm with Vendors:</strong> Reconfirm timings and arrangements with your Imam, venue, caterer, and other vendors.</li>
              <li><strong>Prepare Nikah Documents:</strong> Ensure you have all necessary documents, including civil marriage certificates and identification for the witnesses.</li>
              <li><strong>Assign Roles:</strong> Confirm the two male witnesses (or one male and two female witnesses) for the Nikah contract.</li>
              <li><strong>Prepare the Nikah Pen & Ring Platter:</strong> Arrange a decorative platter for the rings and a special pen for signing the contract.</li>
              <li><strong>Pack an Emergency Kit:</strong> Include items like safety pins, tissues, and a small sewing kit.</li>
            </ul>
            
            <h2>On the Day of the Nikah</h2>
            <ul>
                <li>The groom and his family arrive.</li>
                <li>The Imam begins the ceremony with a sermon (khutbah).</li>
                <li>The Imam asks for the consent of the bride (through her Wali or directly).</li>
                <li>The Imam asks for the consent of the groom.</li>
                <li>The "Ijab" (offer) and "Qubul" (acceptance) are formally declared three times.</li>
                <li>The Nikah-nama (marriage contract) is signed by the bride, groom, and witnesses.</li>
                <li>The Imam makes a final prayer (Dua) for the couple.</li>
                <li>Congratulations (Mubarak) and distribution of sweets!</li>
            </ul>

            <div className="bg-[#2A2E39] p-8 rounded-xl my-12 text-center not-prose">
              <h3 className="text-2xl font-serif font-bold text-gold mb-4">Let Us Handle the Details</h3>
              <p className="text-gray-300 mb-6">
                Planning a Nikah should be a joyous experience. Our full event management service ensures every detail is handled with care and respect for tradition, leaving you free to cherish every moment.
              </p>
              <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-3">
                <Link to="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogNikahChecklist;