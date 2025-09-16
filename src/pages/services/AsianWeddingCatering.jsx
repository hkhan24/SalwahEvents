import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Check, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import FaqAccordion from '@/components/FaqAccordion';
import { Button } from '@/components/ui/button';

const AsianWeddingCatering = () => {
  const faqItems = [
    {
      question: 'Is all your catering 100% Halal?',
      answer: 'Yes, absolutely. We are a dedicated Halal caterer. All our meat is sourced from HMC-certified suppliers, and our kitchens adhere to strict Halal standards to ensure peace of mind for you and your guests.'
    },
    {
      question: 'Can you cater for dietary requirements like vegetarian, vegan, or gluten-free?',
      answer: 'Of course. We are experienced in catering for a wide range of dietary needs. We can create dedicated vegetarian/vegan stations or prepare special plated meals for guests with allergies. Please discuss your requirements with us during your consultation.'
    },
    {
      question: 'Do you provide catering services outside of London?',
      answer: 'While we are based in London, we frequently provide Asian wedding catering services to surrounding areas and across the UK. Please contact us with your venue details to discuss logistics and availability.'
    },
    {
      question: 'What is included in your catering packages?',
      answer: 'Our packages are comprehensive. They typically include the food, professional waiting staff, full crockery, cutlery, and glassware. Our Gold and Platinum packages offer additional extras like welcome drinks and dessert stalls. Visit our <Link to="/packages" class="text-gold underline">Packages page</Link> for a full breakdown.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asian Wedding Catering London | Halal, Indian, Pakistani & Bangladeshi</title>
        <meta name="description" content="Expert Asian wedding catering in London. We provide premium Halal catering for Indian, Pakistani, and Bangladeshi weddings, offering bespoke menus and exceptional service." />
      </Helmet>
      <div className="bg-black text-gray-300">
        <PageHeader 
          title="Asian Wedding" 
          gradientText="Catering London" 
          subtitle="An unforgettable culinary journey for your special day."
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/de7d95c7d9e58f5fbd303403b3601104.png"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-invert prose-lg mx-auto prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-gold prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-gold-light prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2">
            <p className="lead">
              At Salwah Events, we believe that food is the heart of every celebration. Our passion is creating exquisite culinary experiences that honour the rich traditions of Asian weddings. As specialists in <strong>halal wedding catering in London</strong>, we provide authentic and innovative menus for Indian, Pakistani, and Bangladeshi weddings, ensuring every dish is as memorable as the day itself.
            </p>

            <h2>The Essence of Halal Catering in London</h2>
            <p>
              For us, <strong>Halal is not just a label; it's a commitment to quality, purity, and ethical sourcing</strong>. We understand its deep importance to you and your families. That's why we exclusively use HMC-certified suppliers for all our meat and poultry. Our kitchens operate under the strictest Halal procedures, giving you complete confidence that the food served is 100% permissible and prepared with the utmost respect.
            </p>

            <h2>A Celebration of South Asian Cuisines</h2>
            <p>
              Our culinary expertise spans the diverse and vibrant flavours of South Asia. We work closely with you to craft a bespoke menu that reflects your heritage and delights your guests.
            </p>
            
            <h3>Indian Wedding Catering</h3>
            <p>
              From the rich, creamy kormas of the North to the fragrant biryanis of Hyderabad, our chefs masterfully recreate the classic dishes of India. We offer a vast selection of vegetarian and non-vegetarian options, including live chaat stations, succulent tandoori grills, and delicate desserts.
            </p>
            
            <h3>Pakistani Wedding Catering</h3>
            <p>
              Experience the robust and aromatic flavours of Pakistan. Our popular dishes include slow-cooked Nihari, flavourful Karahi gosht, and our signature Haleem. We ensure our <strong>Pakistani catering in London</strong> is authentic, hearty, and presented with elegance.
            </p>
            
            <h3>Bangladeshi Wedding Catering</h3>
            <p>
              Celebrate with the unique tastes of Bangladesh. Our menus feature classics like Bhuna Khichuri, fish curries made with mustard and coconut, and sweet treats like Mishti Doi. We are proud to be one of the premier providers of <strong>Bangladeshi catering in London</strong>.
            </p>
            <img  class="w-full rounded-lg my-8" alt="A lavish buffet spread of Pakistani halal wedding catering in London by Salwah Events." src="https://images.unsplash.com/photo-1694158144736-09d32cf80913" />

            <h2>Buffet vs. Plated: Choosing Your Service Style</h2>
            <p>
              We offer flexible service styles to suit your event's atmosphere. <strong>A grand buffet</strong> encourages mingling and offers guests a wide variety of choices. For a more formal affair, our <strong>plated service</strong> provides an elegant, restaurant-style experience, with each course served directly to your guests' tables. Our <Link to="/services/event-management-planning">event planning</Link> team can help you decide which style best fits your vision.
            </p>

            <h2>Dietary Requirements and Customisation</h2>
            <p>
              We believe every guest should enjoy a delicious meal. We are highly experienced in catering for all dietary needs, including <strong>vegetarian, vegan, gluten-free, and specific allergies</strong>. We can create separate, dedicated food stations or prepare individual meals to ensure everyone is catered for safely and thoughtfully. Your perfect menu is just a conversation away—explore our options on the <Link to="/menu">Menu page</Link>.
            </p>
          </article>

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
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">Ready to Discuss Your Dream Menu?</h3>
            <p className="text-gray-300 mb-6">
              Contact us today for a no-obligation consultation. Let's talk about your vision and how our Asian wedding catering service in London can make your celebration truly exceptional.
            </p>
            <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-3">
              <Link to="/contact">
                Book Your Consultation
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsianWeddingCatering;