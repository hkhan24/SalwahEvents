import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

const BudgetSplitter = () => {
  const [totalBudget, setTotalBudget] = useState(20000);
  const [splitPercentage, setSplitPercentage] = useState(50);

  const amounts = useMemo(() => {
    const sideAAmount = totalBudget * (splitPercentage / 100);
    const sideBAmount = totalBudget * (1 - (splitPercentage / 100));
    return { sideA: sideAAmount, sideB: sideBAmount };
  }, [totalBudget, splitPercentage]);

  const formatCurrency = (value) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Resources', link: '/resources' },
    { name: 'Wedding Budget Splitter' },
  ];

  return (
    <>
      <Helmet>
        <title>Wedding Budget Split Calculator | Salwah Events</title>
        <meta name="description" content="Our free wedding budget splitter helps you and your families easily calculate contributions based on any percentage split. Plan your finances fairly." />
      </Helmet>
      <div className="bg-black">
        <PageHeader title="Wedding Budget" gradientText="Splitter" subtitle="See how to split costs fairly between families." />
        
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
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-300 mb-2 text-center">Total Budget (£)</label>
              <input 
                type="number" 
                value={totalBudget} 
                onChange={e => setTotalBudget(Number(e.target.value))} 
                className="w-full max-w-sm mx-auto bg-black/50 border border-gold/30 rounded-md px-3 py-4 text-white text-2xl text-center" 
              />
            </div>

            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-300 mb-2 text-center">Split Percentage</label>
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-white">Side A: {splitPercentage}%</span>
                <span className="text-white">Side B: {100 - splitPercentage}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={splitPercentage} 
                onChange={e => setSplitPercentage(Number(e.target.value))} 
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div className="bg-black/30 p-8 rounded-lg border border-gold/20">
                <h3 className="text-2xl font-serif text-white mb-2">Side A Pays</h3>
                <p className="text-4xl font-bold text-gold">{formatCurrency(amounts.sideA)}</p>
              </div>
              <div className="bg-black/30 p-8 rounded-lg border border-gold/20">
                <h3 className="text-2xl font-serif text-white mb-2">Side B Pays</h3>
                <p className="text-4xl font-bold text-gold">{formatCurrency(amounts.sideB)}</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-16 bg-[#2A2E39] p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Enter the total wedding budget.</li>
              <li>Use the slider to adjust the percentage split between the two contributing parties.</li>
              <li>View the exact contribution amounts for each side, updated instantly.</li>
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

export default BudgetSplitter;