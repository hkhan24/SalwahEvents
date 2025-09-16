import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

const SeatingVisualiser = () => {
  const [guestCount, setGuestCount] = useState(100);
  const [tableType, setTableType] = useState('round');

  const layout = useMemo(() => {
    if (guestCount <= 0) return { tables: 0, perTable: 0, arrangement: [] };
    
    if (tableType === 'round') {
      const perTable = 10;
      const numTables = Math.ceil(guestCount / perTable);
      return {
        tables: numTables,
        perTable: perTable,
        arrangement: Array.from({ length: numTables }),
      };
    } else { // long
      const perTable = 20;
      const numTables = Math.ceil(guestCount / perTable);
      return {
        tables: numTables,
        perTable: perTable,
        arrangement: Array.from({ length: numTables }),
      };
    }
  }, [guestCount, tableType]);

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Resources', link: '/resources' },
    { name: 'Seating Style Visualiser' },
  ];

  return (
    <>
      <Helmet>
        <title>Wedding Seating Style Visualiser | Salwah Events</title>
        <meta name="description" content="Free seating style visualiser to compare round vs. long table layouts for your wedding reception. Instantly see how many tables you'll need." />
      </Helmet>
      <div className="bg-black">
        <PageHeader title="Seating Style" gradientText="Visualiser" subtitle="Compare table layouts for your reception." />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#2A2E39] p-8 rounded-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-lg font-medium text-gray-300 mb-2">Number of Guests</label>
                <input 
                  type="number" 
                  value={guestCount} 
                  onChange={e => setGuestCount(Number(e.target.value))} 
                  className="w-full bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-white" 
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-300 mb-2">Table Type</label>
                <select 
                  value={tableType} 
                  onChange={e => setTableType(e.target.value)} 
                  className="w-full bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-white"
                >
                  <option value="round">Round Tables</option>
                  <option value="long">Long Tables</option>
                </select>
              </div>
            </div>

            <div className="bg-black/30 p-8 rounded-lg border border-gold/20 min-h-[400px]">
              <h3 className="text-2xl font-serif text-white mb-4 text-center">
                Approx. {layout.tables} {tableType} table{layout.tables !== 1 ? 's' : ''} ({layout.perTable} guests per table)
              </h3>
              <div className={`flex flex-wrap gap-6 justify-center items-center p-4`}>
                {layout.arrangement.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', delay: index * 0.05 }}
                    className={`relative flex items-center justify-center
                      ${tableType === 'round' ? 'w-24 h-24' : 'w-48 h-16'}`}
                  >
                    <div className={`absolute inset-0 bg-gold/80 ${tableType === 'round' ? 'rounded-full' : 'rounded-lg'}`}></div>
                    <div className="relative z-10 bg-gold border-2 border-gold-dark text-black font-bold px-3 py-1 rounded-md shadow-lg">
                      T{index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="mt-16 bg-[#2A2E39] p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Enter your estimated guest count.</li>
              <li>Choose between round or long table types from the dropdown.</li>
              <li>The visualiser will show a simplified diagram of the required table arrangement.</li>
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

export default SeatingVisualiser;