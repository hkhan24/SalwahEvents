import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import FaqAccordion from '@/components/FaqAccordion';
import { Button } from '@/components/ui/button';

const VenuesLocations = () => {
  const venues = {
    "East London": [
      { name: "The City Pavilion", area: "Romford", blurb: "A spectacular venue known for its grand scale, perfect for lavish celebrations. We are a preferred caterer here." },
      { name: "The Willows", area: "Hainault", blurb: "A versatile and elegant space with beautiful grounds, ideal for both large receptions and intimate ceremonies." },
      { name: "Mayfair Venue", area: "Chadwell Heath", blurb: "Modern, chic, and equipped with state-of-the-art lighting, perfect for a glamorous wedding." }
    ],
    "North London": [
      { name: "Ariana Banqueting Hall", area: "North London", blurb: "Exudes sophistication and elegance, a favourite for traditional Pakistani and Afghani weddings." },
      { name: "Meridian Grand", area: "North London", blurb: "A luxurious and opulent venue that promises a truly grand experience for you and your guests." },
      { name: "The Royal Regency", area: "Manor Park", blurb: "A landmark venue with a rich history of hosting beautiful Asian weddings." }
    ],
    "West London": [
      { name: "Osterley Park and House", area: "Isleworth", blurb: "A stunning National Trust property offering a historic and picturesque backdrop for your wedding." },
      { name: "Syon Park", area: "Brentford", blurb: "A breathtaking venue with a magnificent Great Conservatory, perfect for a fairytale wedding." }
    ],
    "Other Key Venues": [
      { name: "Palm Tree", area: "East London", blurb: "A well-known and trusted venue in the heart of the community, great for vibrant celebrations." },
      { name: "Oasis", area: "East London", blurb: "A contemporary and stylish venue offering a flexible space for your wedding day." }
    ]
  };

  const faqItems = [
    {
      question: 'Are you an approved caterer at these venues?',
      answer: 'Yes, Salwah Events is proud to be an approved and trusted caterer at many of London\'s top wedding venues, including several listed here. This ensures a seamless collaboration between our team and the venue staff.'
    },
    {
      question: 'Can you help us book one of these venues?',
      answer: 'As part of our <Link to="/services/event-management-planning" class="text-gold underline">full event management service</Link>, we can certainly assist with venue scouting, negotiation, and booking. We can help you find the perfect location that fits your guest count, budget, and style.'
    },
    {
      question: 'Do these venues have facilities for religious ceremonies?',
      answer: 'Many of these venues are experienced in hosting Asian weddings and have provisions for religious ceremonies like the Nikah or Mandap setups. We can confirm the specific facilities available at each location.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asian Wedding Venues London | Salwah Events Partners</title>
        <meta name="description" content="Explore our partner venues for Asian weddings in London. We are approved caterers at top locations like The City Pavilion, The Willows, and more." />
      </Helmet>
      <div className="bg-black text-gray-300">
        <PageHeader 
          title="Partner Venues" 
          gradientText="& Locations" 
          subtitle="Discover the perfect setting for your unforgettable London wedding."
          imageUrl="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-invert prose-lg mx-auto prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-gold prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-gold-light">
            <p className="lead">
              Choosing the right venue is one of the most significant decisions in your wedding planning journey. The perfect location sets the tone for your entire celebration. At Salwah Events, we have built strong relationships with some of the most prestigious and accommodating <strong>Asian wedding venues in London</strong>. As approved caterers at many of these locations, we ensure a seamless and integrated experience for your special day.
            </p>
            <p>
              Below is a selection of our trusted partner venues, known for their exceptional service, beautiful spaces, and experience in hosting magnificent Indian, Pakistani, and Bangladeshi weddings.
            </p>
          </article>

          <div className="space-y-12 mt-12">
            {Object.entries(venues).map(([region, list]) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-serif font-bold text-gold mb-6 border-b-2 border-gold/30 pb-2">{region}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {list.map(venue => (
                    <div key={venue.name} className="bg-[#2A2E39] p-6 rounded-xl">
                      <h3 className="text-xl font-serif font-semibold text-white">{venue.name}</h3>
                      <p className="text-sm text-gold mb-2 flex items-center"><MapPin className="w-4 h-4 mr-2" />{venue.area}</p>
                      <p className="text-gray-300">{venue.blurb}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white text-center mb-8">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <FaqAccordion items={faqItems} />
            </div>
          </motion.div>

          <div className="bg-[#2A2E39] p-8 rounded-xl my-12 text-center">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">Found a Venue You Love?</h3>
            <p className="text-gray-300 mb-6">
              Let's talk about how our award-winning <Link to="/services/asian-wedding-catering" className="text-gold underline">catering</Link> and <Link to="/services/wedding-stage-decoration" className="text-gold underline">decor</Link> services can transform one of these incredible spaces for your wedding day.
            </p>
            <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-3">
              <Link to="/contact">
                Enquire About a Venue
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenuesLocations;