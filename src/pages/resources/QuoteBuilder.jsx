import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import { generatePdfWithHeaderFooter } from '@/lib/pdfUtils';

const packagesData = [
  {
    name: 'Silver Package',
    features: [
      '3 Main Courses (Chicken, Lamb, Veg)', '2 Starters', 'Pilau Rice & Naan Bread',
      'Salad & Chutneys', '1 Dessert', 'Crockery & Cutlery', 'Professional Waiting Staff'
    ]
  },
  {
    name: 'Gold Package',
    features: [
      '4 Main Courses (Premium Selection)', '3 Starters (incl. Grills)', 'Choice of Rice & Breads',
      'Full Salad Bar & Dips', '2 Desserts', 'Welcome Drinks', 'Full Crockery, Cutlery & Glassware',
      'Experienced Waiting Staff & Supervisor'
    ]
  },
  {
    name: 'Platinum Package',
    features: [
      'Everything in Gold Package for 200 guests', 'Full Event Management', 'Luxury Wedding Stage Decoration UK',
      'Venue Lighting & Setup', 'Dessert or Paan Stall', 'Centrepieces for all tables', 'Dedicated Event Manager'
    ]
  }
];

const menuData = {
  starters: ['Chicken Tikka', 'Chicken Malai Tikka', 'Chicken 65', 'Chicken Dynamix', 'Lamb Kebab', 'Chapli Kebab', 'Vegetable Samosa', 'Papri Chat', 'Chilli Paneer', 'Fish Masala', 'Chicken Drumsticks', 'Tandoori Wings'],
  mains: ['Lamb Bhuna', 'Beef Bhuna', 'Beef Rezala', 'Beef Kala Bhuna', 'Chicken Roast', 'Chicken Korai', 'Chicken Tikka Jalfraizi', 'Chicken Curry (on the bone)', 'Chicken Butter Makhni'],
  riceAndBiryani: ['Lamb Biryani', 'Lamb Pilou', 'Lamb Kachchi Biryani', 'Chicken Pilou', 'Chicken Biryani', 'Pilou Rice', 'White Rice', 'Naan'],
  desserts: ['Kalajam and Ice Cream', 'Gulabjamun and Ice Cream', 'Gajar Halwa and Ice Cream', 'Baklava and Ice Cream', 'Firni', 'Strawberry Cheesecake', 'Milk Cake'],
};


const QuoteBuilder = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState({
    starters: [],
    mains: [],
    riceAndBiryani: [],
    desserts: [],
  });

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg.name === selectedPackage?.name ? null : pkg);
  };

  const handleMenuItemSelect = (category, item) => {
    setSelectedMenuItems(prev => {
      const categoryItems = prev[category];
      const isSelected = categoryItems.includes(item);
      const newItems = isSelected ? categoryItems.filter(i => i !== item) : [...categoryItems, item];
      return { ...prev, [category]: newItems };
    });
  };

  const downloadPDF = () => {
    if (!selectedPackage) {
      toast({ title: 'Please select a package', description: 'You must choose a package before downloading the quote.', variant: 'destructive' });
      return;
    }

    const doc = generatePdfWithHeaderFooter('Your Custom Quote Selection', (doc) => {
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Selected Package', 14, 40);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(12);
      doc.text(selectedPackage.name, 14, 48);

      let y = 60;
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Selected Menu Items', 14, y);
      y += 8;

      Object.entries(selectedMenuItems).forEach(([category, items]) => {
        if (items.length > 0) {
          doc.setFontSize(12);
          doc.setFont(undefined, 'bold');
          doc.text(category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), 14, y);
          y += 7;
          doc.setFontSize(10);
          doc.setFont(undefined, 'normal');
          items.forEach(item => {
            doc.text(`- ${item}`, 18, y);
            y += 5;
            if (y > 270) {
              doc.addPage();
              y = 20;
            }
          });
          y += 5;
        }
      });

      y = Math.max(y, 60); // Ensure content starts below package
      doc.setFontSize(11);
      doc.setTextColor(150);
      doc.text("Please email this PDF with your enquiry to us at info@salwahevents.com for an accurate quote.", 14, y + 10);
    });

    doc.save("salwah_events_quote_selection.pdf");
    toast({ title: "PDF Downloaded!", description: "Your quote selection is ready." });
  };


  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Resources', link: '/resources' },
    { name: 'Quote Builder' },
  ];

  return (
    <>
      <Helmet>
        <title>Build Your Quote | Salwah Events & Catering</title>
        <meta name="description" content="Build your custom wedding package and menu quote. Select your preferences and download a PDF to send to our team." />
      </Helmet>
      <div className="bg-black">
        <PageHeader title="Build Your" gradientText="Quote" subtitle="Select your package and menu to start planning." />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          
          {/* Step 1: Packages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-gold mb-6">Step 1: Select Your Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packagesData.map(pkg => (
                <div key={pkg.name} onClick={() => handlePackageSelect(pkg)} className={`cursor-pointer p-8 rounded-xl border-4 transition-all duration-300 ${selectedPackage?.name === pkg.name ? 'border-gold scale-105 bg-[#2A2E39]' : 'border-gray-700 bg-[#2A2E39]/50'}`}>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">{pkg.name}</h3>
                  <ul className="space-y-2">
                    {pkg.features.slice(0, 4).map(f => <li key={f} className="flex items-start"><Check className="text-gold w-4 h-4 mr-2 mt-1 shrink-0" /><span className="text-sm text-gray-300">{f}</span></li>)}
                     {pkg.features.length > 4 && <li className="text-sm text-gray-400">...and more</li>}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 2: Menu Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-gold mb-6">Step 2: Choose Your Menu Items (Optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(menuData).map(([category, items]) => (
                <div key={category} className="bg-[#2A2E39] p-6 rounded-xl">
                  <h3 className="text-xl font-serif font-bold text-white mb-4 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h3>
                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item} onClick={() => handleMenuItemSelect(category, item)} className="flex items-center cursor-pointer group">
                        <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 ${selectedMenuItems[category].includes(item) ? 'bg-gold border-gold' : 'border-gray-500 group-hover:border-gold'}`}>
                          {selectedMenuItems[category].includes(item) && <Check className="w-3 h-3 text-black" />}
                        </div>
                        <span className="text-gray-300 group-hover:text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Step 3: Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
             <h2 className="text-3xl font-serif font-bold text-gold mb-6">Step 3: Download Your Selection</h2>
             <p className="text-gray-300 max-w-2xl mx-auto mb-6">Download your selections as a PDF. You can then email this file to us when you send your enquiry.</p>
            <Button onClick={downloadPDF} disabled={!selectedPackage} className="text-lg py-6 px-10 disabled:opacity-50 disabled:cursor-not-allowed">
              <Download size={20} className="mr-2" /> Download Quote Selection PDF
            </Button>
          </motion.div>


          <div className="mt-16 bg-[#2A2E39] p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>First, select one of the three packages to form the base of your quote.</li>
              <li>Next, browse the menu categories and click on any items you'd like to include.</li>
              <li>Once you're happy with your choices, click the "Download Quote Selection PDF" button.</li>
              <li>Finally, visit our <Link to="/contact" className="text-gold underline">Contact Page</Link> and email the downloaded PDF to us along with your enquiry.</li>
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

export default QuoteBuilder;