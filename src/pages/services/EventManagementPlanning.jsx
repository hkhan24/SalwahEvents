import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import FaqAccordion from '@/components/FaqAccordion';
import { Button } from '@/components/ui/button';

const EventManagementPlanning = () => {
  const faqItems = [
    {
      question: 'What does your full wedding planning service include?',
      answer: 'Our full wedding planning service is an all-encompassing package. It covers everything from initial concept design, budget management, and venue sourcing to vendor coordination, timeline creation, and on-the-day management. Our goal is to handle every detail, so you can enjoy a stress-free engagement and wedding day.'
    },
    {
      question: 'I have already booked some vendors. Can you still help?',
      answer: 'Absolutely! We offer partial planning services and can step in at any stage of your planning process. We will happily work with your chosen vendors and manage the remaining aspects to ensure everything comes together seamlessly.'
    },
    {
      question: 'Why should I hire an Asian wedding planner in London?',
      answer: 'An experienced Asian wedding planner understands the cultural nuances, traditions, and complexities of multi-day events. We have a network of trusted vendors who specialize in Asian weddings, from caterers to decor artists, ensuring every element is authentic and respectful of your heritage.'
    },
    {
      question: 'How do you handle the budget?',
      answer: 'We work with you to establish a realistic budget from the outset. We provide detailed breakdowns, track all expenses, and offer cost-saving suggestions without compromising on quality. Our transparent approach ensures there are no surprises.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asian Wedding Planner London | Full Wedding Planning Services</title>
        <meta name="description" content="Salwah Events offers expert Asian wedding planner services in London. Our full wedding planning covers everything from timelines and logistics to vendor coordination for a stress-free day." />
      </Helmet>
      <div className="bg-black text-gray-300">
        <PageHeader 
          title="Event Management" 
          gradientText="& Planning" 
          subtitle="Seamless execution for a stress-free and unforgettable celebration."
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/b38ad26335e08d36ac563e557ecc72f4.png"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-invert prose-lg mx-auto prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-gold prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-gold-light prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2">
            <p className="lead">
              Planning an Asian wedding is a joyous but complex undertaking, often involving multiple events, large guest lists, and a deep respect for tradition. As a premier <strong>Asian wedding planner in London</strong>, Salwah Events provides comprehensive event management and planning services designed to lift the weight off your shoulders, allowing you to fully immerse yourself in the celebration.
            </p>

            <h2>Our Approach to Full Wedding Planning</h2>
            <p>
              Our philosophy is simple: your wedding should be a reflection of your love story, not a source of stress. Our <strong>full wedding planning London</strong> service is a collaborative partnership. We begin by listening to your vision, understanding your priorities, and getting to know your personal style. From there, we handle every logistical detail, ensuring a flawless execution that feels effortless.
            </p>
            <img  class="w-full rounded-lg my-8" alt="An Asian wedding planner from Salwah Events coordinating with vendors at a London venue." src="https://images.unsplash.com/photo-1682509190874-d57a00656cd9" />

            <h3>Detailed Timeline Creation</h3>
            <p>
              A successful event runs on a meticulous timeline. We create a master schedule covering everything from vendor booking deadlines in the months leading up to the wedding, to a <strong>minute-by-minute run-sheet for the day itself</strong>. This ensures that every element, from the arrival of the <Link to="/services/asian-wedding-catering">catering</Link> team to the final farewell, is perfectly synchronised.
            </p>

            <h3>Vendor Sourcing and Coordination</h3>
            <p>
              Leveraging our extensive network of trusted professionals in London, we connect you with the best vendors to fit your style and budget. This includes:
            </p>
            <ul>
              <li>Photographers & Videographers</li>
              <li>DJs & Live Entertainment</li>
              <li>Makeup Artists & Hair Stylists</li>
              <li>Luxury Car Hire</li>
              <li>And, of course, the perfect <Link to="/services/wedding-stage-decoration">stage decor</Link> and <Link to="/services/venues-locations">venue</Link>.</li>
            </ul>
            <p>
              We manage all contracts, negotiations, and communications, saving you countless hours and ensuring you receive the best possible service and value.
            </p>

            <h3>On-the-Day Management</h3>
            <p>
              On your wedding day, our team is the first to arrive and the last to leave. We act as the <strong>central point of contact for all vendors</strong>, manage the schedule, troubleshoot any unforeseen issues, and ensure that you and your families can relax and be present in every moment. From cueing the music for your entrance to ensuring guests are comfortable, we are your behind-the-scenes directors, making sure the entire event unfolds beautifully.
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
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">Ready for a Flawless Celebration?</h3>
            <p className="text-gray-300 mb-6">
              Let us take the stress out of planning. Contact our team of expert Asian wedding planners in London to discuss how we can bring your vision to life.
            </p>
            <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-3">
              <Link to="/contact">
                Book a Free Consultation
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventManagementPlanning;