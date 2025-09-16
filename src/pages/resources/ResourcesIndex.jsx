import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, Users, Calendar, ListChecks, Star, CheckSquare, FileText, Divide, Scaling, 
  Split, PieChart, Users2,ClipboardList
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import FaqAccordion from '@/components/FaqAccordion';

const ResourcesIndex = () => {
  const tools = [
     {
      title: 'Quote Builder',
      description: 'Select your package and menu items to build a custom quote.',
      link: '/resources/quote-builder',
      icon: ClipboardList,
    },
    {
      title: 'Budget Calculator',
      description: 'Estimate costs with guest counts, VAT, and service charges.',
      link: '/resources/budget-calculator',
      icon: Calculator,
    },
    {
      title: 'Seating Planner',
      description: 'Organize your guests by assigning them to tables effortlessly.',
      link: '/resources/seating-planner',
      icon: Users,
    },
    {
      title: 'Timeline Generator',
      description: 'Create a downloadable event run-sheet for your calendar.',
      link: '/resources/timeline-ics',
      icon: Calendar,
    },
    {
      title: 'RSVP & Dietary Tracker',
      description: 'Manage guest responses and dietary needs in one place.',
      link: '/resources/rsvp-dietary-tracker',
      icon: ListChecks,
    },
    {
      title: 'Vendor Scorecard',
      description: 'Compare and rate potential vendors to find the perfect fit.',
      link: '/resources/vendor-scorecard',
      icon: Star,
    },
    {
      title: 'Wedding Planning Checklist',
      description: 'Stay organised with a simple checklist for all your tasks.',
      link: '/resources/wedding-checklist',
      icon: CheckSquare,
    },
    {
      title: 'Invitation Text Generator',
      description: 'Generate professional invitation wording in seconds.',
      link: '/resources/invitation-generator',
      icon: FileText,
    },
    {
      title: 'Per-Guest Cost Calculator',
      description: 'Quickly see how much your wedding costs per person.',
      link: '/resources/per-guest-calculator',
      icon: Divide,
    },
    {
      title: 'Wedding Budget Splitter',
      description: 'See how to split costs fairly between families.',
      link: '/resources/budget-splitter',
      icon: Split,
    },
    {
      title: 'Seating Style Visualiser',
      description: 'Compare table layouts for your reception.',
      link: '/resources/seating-visualiser',
      icon: PieChart,
    },
    {
      title: 'Guest Count Estimator',
      description: 'Estimate costs based on your guest list size.',
      link: '/resources/guest-estimator',
      icon: Users2,
    },
    {
      title: 'Wedding Day Timeline Templates',
      description: 'Download ready-made PDF schedules for your big day.',
      link: '/resources/timeline-templates',
      icon: Scaling,
    },
  ];

  const faqItems = [
    {
      question: 'Are these wedding planning tools really free?',
      answer: 'Yes, completely free! There are no hidden costs or sign-ups required. We created these to help couples plan their special day with less stress.',
    },
    {
      question: 'Is my information saved anywhere?',
      answer: 'No, your privacy is our priority. All calculations and data you enter are processed directly in your browser. Nothing is saved on our servers, so your information disappears when you close the page.',
    },
    {
      question: 'Can I use these tools for any type of wedding?',
      answer: 'Absolutely! While we specialize in Asian weddings, these tools are designed to be versatile and helpful for planning any type of wedding or large event.',
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Free Wedding Planning Tools | Salwah Events</title>
        <meta name="description" content="Free, easy-to-use wedding planning tools including a budget calculator, seating planner, and timeline generator. No sign-up required." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="bg-black">
        <PageHeader
          title="Free Wedding"
          gradientText="Planning Tools"
          subtitle="Plan your big day with ease. These free tools help you stay organised and in control."
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/a740f7b96d8188d86855006704c200c7.png"
        />

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Asian weddings are full of love, colour, and unforgettable moments — but with big guest lists, dietary needs, and busy schedules, planning can feel overwhelming. Explore the tools below, use them freely, and share with family or friends.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={tool.link} className="block p-8 rounded-xl bg-[#2A2E39] border border-gold/10 h-full hover-lift transition-all duration-300 group">
                    <div className="flex items-center justify-center w-16 h-16 bg-gold/10 rounded-lg mb-6 border border-gold/20 group-hover:bg-gold transition-colors duration-300">
                      <tool.icon className="w-8 h-8 text-gold group-hover:text-black" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-3">{tool.title}</h3>
                    <p className="text-gray-300 font-sans">{tool.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Frequently Asked <span className="text-gold">Questions</span>
              </h2>
            </div>
            <FaqAccordion items={faqItems} />
          </div>
        </section>
      </div>
    </>
  );
};

export default ResourcesIndex;