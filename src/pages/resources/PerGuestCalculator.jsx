import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

const PerGuestCalculator = () => {
  const [totalBudget, setTotalBudget] = useState(10000);
  const [guestCount, setGuestCount] = useState(100);

  const perGuestCost = useMemo(() => {
    if (guestCount > 0) {
      return totalBudget / guestCount;
    }
    return 0;
  }, [totalBudget, guestCount]);

  const formatCurrency = (value) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Resources', link: '/resources' },
    { name: 'Per-Guest Cost Calculator' },
  ];

  return (
    <>
      <Helmet>
        <title>Per Guest Wedding Cost Calculator UK | Salwah Events</title>
        <meta name="description" content="Use our free Per-Guest Wedding Cost Calculator to quickly understand how much your wedding will cost per person based on your total budget." />
      </Helmet>
      <div className="bg-black">
        <PageHeader title="Per-Guest Cost" gradientText="Calculator" subtitle="Quickly see how much your wedding costs per person." />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#2A2E39] p-8 rounded-xl text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-lg font-medium text-gray-300 mb-2">Total Budget (£)</label>
                <input 
                  type="number" 
                  value={totalBudget} 
                  onChange={e => setTotalBudget(Number(e.target.value))} 
                  className="w-full bg-black/50 border border-gold/30 rounded-md px-3 py-4 text-white text-2xl text-center" 
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-300 mb-2">Number of Guests</label>
                <input 
                  type="number" 
                  value={guestCount} 
                  onChange={e => setGuestCount(Number(e.target.value))} 
                  className="w-full bg-black/50 border border-gold/30 rounded-md px-3 py-4 text-white text-2xl text-center" 
                />
              </div>
            </div>

            <div className="bg-black/30 p-8 rounded-lg border border-gold/20">
              <h3 className="text-2xl font-serif text-white mb-2">Cost Per Guest</h3>
              <p className="text-6xl font-bold text-gold">{formatCurrency(perGuestCost)}</p>
            </div>
          </motion.div>

          <div className="mt-16 bg-[#2A2E39] p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Enter your total estimated wedding spend in the "Total Budget" field.</li>
              <li>Add your total number of guests in the "Number of Guests" field.</li>
              <li>View the instant per-head cost calculation in the summary box.</li>
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

export default PerGuestCalculator;