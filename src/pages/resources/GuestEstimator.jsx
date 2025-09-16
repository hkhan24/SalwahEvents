import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

const GuestEstimator = () => {
  const [guestCount, setGuestCount] = useState(150);

  const estimatedCosts = useMemo(() => {
    const cateringPerHeadMin = 30;
    const cateringPerHeadMax = 50;
    const decorPerHeadMin = 15;
    const decorPerHeadMax = 35;

    const cateringCost = guestCount * ((cateringPerHeadMin + cateringPerHeadMax) / 2);
    const decorCost = guestCount * ((decorPerHeadMin + decorPerHeadMax) / 2);
    const totalCost = cateringCost + decorCost;

    return {
      catering: `£${(guestCount * cateringPerHeadMin).toLocaleString()} - £${(guestCount * cateringPerHeadMax).toLocaleString()}`,
      decor: `£${(guestCount * decorPerHeadMin).toLocaleString()} - £${(guestCount * decorPerHeadMax).toLocaleString()}`,
      total: `£${(totalCost * 0.8).toLocaleString()} - £${(totalCost * 1.2).toLocaleString()}`,
    };
  }, [guestCount]);

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Resources', link: '/resources' },
    { name: 'Guest Count Estimator' },
  ];

  return (
    <>
      <Helmet>
        <title>Wedding Guest Cost Estimator | Salwah Events</title>
        <meta name="description" content="Use our free guest count estimator to see how your guest list size impacts the estimated costs for catering and décor at your wedding." />
      </Helmet>
      <div className="bg-black">
        <PageHeader title="Guest Count" gradientText="Estimator" subtitle="Estimate costs based on your guest list size." />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#2A2E39] p-8 rounded-xl"
          >
            <div className="mb-8 text-center">
              <label className="block text-lg font-medium text-gray-300 mb-2">Number of Guests</label>
              <p className="text-5xl font-bold text-gold mb-4">{guestCount}</p>
              <input 
                type="range" 
                min="50" 
                max="600" 
                step="10"
                value={guestCount} 
                onChange={e => setGuestCount(Number(e.target.value))} 
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-black/30 p-6 rounded-lg border border-gold/20">
                <h3 className="text-xl font-serif text-white mb-2">Catering Estimate</h3>
                <p className="text-2xl font-bold text-gold">{estimatedCosts.catering}</p>
              </div>
              <div className="bg-black/30 p-6 rounded-lg border border-gold/20">
                <h3 className="text-xl font-serif text-white mb-2">Décor Estimate</h3>
                <p className="text-2xl font-bold text-gold">{estimatedCosts.decor}</p>
              </div>
              <div className="bg-gold/10 p-6 rounded-lg border border-gold">
                <h3 className="text-xl font-serif text-white mb-2">Total Estimated Range</h3>
                <p className="text-2xl font-bold text-gold">{estimatedCosts.total}</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-16 bg-[#2A2E39] p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Use the slider to adjust your estimated guest count.</li>
              <li>The cost estimates for catering, décor, and the total range will update automatically.</li>
              <li>Compare how a smaller or larger guest list impacts your potential budget.</li>
              <li className="!text-sm !text-gray-400">Note: These figures are for estimation purposes only and are not a quote.</li>
            </ul>
            <Link to="/resources" className="inline-flex items-center mt-6 text-gold hover:text-white">
              <ArrowLeft size={18} className="mr-2" />
              Back to Resources
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestEstimator;