import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brush, Check, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import FaqAccordion from '@/components/FaqAccordion';
import { Button } from '@/components/ui/button';

const WeddingStageDecoration = () => {
  const faqItems = [
    {
      question: 'Can you create a custom stage design for us?',
      answer: 'Absolutely! All our wedding stage decorations are bespoke. We work with you to understand your theme, colour palette, and vision to create a unique design that is exclusively yours. We do not use standard, pre-packaged designs.'
    },
    {
      question: 'What elements are included in your stage decoration service?',
      answer: 'Our service is comprehensive. It includes the main stage backdrop, elegant seating for the couple (sweetheart table/sofa), floral arrangements (fresh or high-quality artificial), ambient lighting, and flooring/carpeting for the stage area. We can also provide matching decor for the walkway and guest tables.'
    },
    {
      question: 'Do you provide decor for traditional ceremonies like a Mandap or Nikkah?',
      answer: 'Yes, we are experts in creating beautiful and culturally appropriate setups for all types of religious ceremonies. We can design and construct stunning Mandaps for Hindu weddings and elegant, sophisticated backdrops for Nikkah ceremonies.'
    },
    {
      question: 'How much does wedding stage decoration in London cost?',
      answer: 'The cost varies depending on the complexity of the design, the size of the stage, and the materials used (e.g., fresh vs. artificial flowers). We offer transparent pricing and can create a proposal that fits your budget. Our <Link to="/packages" class="text-gold underline">Platinum Package</Link> includes luxury stage decoration.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Wedding Stage Decoration London | Asian Wedding Decor</title>
        <meta name="description" content="Bespoke wedding stage decoration in London. We specialise in stunning Asian wedding decor, including backdrops, florals, lighting, and Mandap/Nikkah setups." />
      </Helmet>
      <div className="bg-black text-gray-300">
        <PageHeader 
          title="Wedding Stage" 
          gradientText="Decoration London" 
          subtitle="Creating breathtaking backdrops for your most cherished moments."
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/c5610ca536325414186b4ed4be553481.png"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-invert prose-lg mx-auto prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-gold prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-gold-light prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2">
            <p className="lead">
              The wedding stage is the heart of your reception, the focal point where all eyes will be fixed as you celebrate your union. At Salwah Events, we specialise in creating spectacular <strong>wedding stage decoration in London</strong>, transforming any space into a scene from a fairytale. Our expertise in <strong>Asian wedding decor</strong> ensures a result that is both breathtakingly beautiful and culturally resonant.
            </p>

            <h2>Bespoke Backdrops and Floral Designs</h2>
            <p>
              We believe your stage should be as unique as your love story. Our design process begins with you. We collaborate to create a concept that reflects your personal style, whether it's a <strong>lush floral wall, a modern geometric backdrop, or a traditional, opulent design</strong> with rich drapery. We use a combination of high-quality silks, fresh flowers, and custom-built structures to bring your vision to life.
            </p>
            <img  class="w-full rounded-lg my-8" alt="A stunning floral wedding stage decoration in London with elegant lighting and a sweetheart table." src="https://images.unsplash.com/photo-1650526499962-bdfc9454f11e" />

            <h2>Lighting: Setting the Mood</h2>
            <p>
              Lighting is crucial in creating the right atmosphere. Our team uses a variety of techniques, including <strong>uplighting, spotlights, and fairy lights</strong>, to add depth, warmth, and drama to your stage. We can match the lighting to your colour scheme and adjust it throughout the evening to transition from a bright, celebratory feel during dinner to a romantic, ambient glow for the later part of the reception.
            </p>

            <h2>Sweetheart Tables and Elegant Seating</h2>
            <p>
              Your seating on the stage should be a throne fit for royalty. We provide a wide selection of luxurious sofas, ornate chairs, and beautifully styled sweetheart tables. We adorn them with flowers, candles, and fine fabrics to ensure the couple's seating area is a stunning centrepiece.
            </p>

            <h2>Mandap and Nikkah Ceremony Setups</h2>
            <p>
              We have deep respect and understanding for the religious significance of wedding ceremonies. We design and construct exquisite <strong>Mandaps for Hindu and Sikh weddings</strong>, ensuring every element is traditionally correct and beautifully executed. For <strong>Nikkah ceremonies</strong>, we create elegant and serene backdrops that provide a dignified and beautiful setting for the signing of the marriage contract. Our <Link to="/services/event-management-planning">planners</Link> work with you to ensure every detail is perfect.
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
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">Ready to Design Your Dream Stage?</h3>
            <p className="text-gray-300 mb-6">
              Your perfect backdrop awaits. Contact us to discuss your ideas for wedding stage decoration in London and let our creative team design something truly magical for you.
            </p>
            <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-3">
              <Link to="/contact">
                Get a Decor Quote
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeddingStageDecoration;