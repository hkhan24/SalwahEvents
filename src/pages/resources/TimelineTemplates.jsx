import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FilePlus as FilePdf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import { generatePdfWithHeaderFooter } from '@/lib/pdfUtils';

const TimelineTemplates = () => {
  const { toast } = useToast();

  const generatePdf = (title, events) => {
    const doc = generatePdfWithHeaderFooter(title, (doc) => {
      let y = 40;
      events.forEach(event => {
        doc.setFont(undefined, 'bold');
        doc.text(event.time, 14, y);
        doc.setFont(undefined, 'normal');
        doc.text(event.activity, 45, y);
        y += 10;
        if (y > 280) { // Add new page if content overflows
          doc.addPage();
          y = 20;
        }
      });
    });

    doc.save(`${title.replace(/ /g, '_')}.pdf`);
    toast({ title: "PDF Downloaded!", description: "Your timeline template is ready." });
  };

  const templates = [
    {
      title: 'Nikah & Walima (Same Day)',
      description: 'A schedule for when the Nikah ceremony and Walima reception happen on the same day.',
      events: [
        { time: '2:00 PM', activity: 'Guest Arrival & Welcome Drinks' },
        { time: '3:00 PM', activity: 'Nikah Ceremony' },
        { time: '4:00 PM', activity: 'Photos & Mingle' },
        { time: '5:00 PM', activity: 'Walima Reception Begins' },
        { time: '5:30 PM', activity: 'Dinner Service' },
        { time: '7:00 PM', activity: 'Speeches & Cake Cutting' },
        { time: '8:00 PM', activity: 'Rukhsati (Send-off)' },
      ]
    },
    {
      title: 'Multi-Day Wedding',
      description: 'A template covering separate days for Mehndi, Nikah, and Walima events.',
      events: [
        { time: 'Day 1: Mehndi', activity: '' },
        { time: '7:00 PM', activity: 'Guest Arrival' },
        { time: '8:00 PM', activity: 'Music, Dance & Henna' },
        { time: '9:00 PM', activity: 'Dinner' },
        { time: 'Day 2: Nikah', activity: '' },
        { time: '2:00 PM', activity: 'Guest Arrival' },
        { time: '3:00 PM', activity: 'Nikah Ceremony' },
        { time: '4:00 PM', activity: 'Light Refreshments & Photos' },
        { time: 'Day 3: Walima', activity: '' },
        { time: '6:00 PM', activity: 'Guest Arrival for Reception' },
        { time: '7:00 PM', activity: 'Grand Entrance & Dinner' },
        { time: '9:00 PM', activity: 'Rukhsati' },
      ]
    },
    {
      title: 'Reception-Only Event',
      description: 'A straightforward timeline for a standalone wedding reception party.',
      events: [
        { time: '6:00 PM', activity: 'Guest Arrival & Cocktail Hour' },
        { time: '7:00 PM', activity: 'Couple\'s Grand Entrance' },
        { time: '7:15 PM', activity: 'Dinner Buffet Opens' },
        { time: '8:30 PM', activity: 'Speeches & Toasts' },
        { time: '9:00 PM', activity: 'Cake Cutting & First Dance' },
        { time: '9:30 PM', activity: 'Open Dance Floor' },
        { time: '11:00 PM', activity: 'Event Concludes' },
      ]
    },
  ];

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Resources', link: '/resources' },
    { name: 'Wedding Day Timeline Templates' },
  ];

  return (
    <>
      <Helmet>
        <title>Wedding Day Timeline Templates PDF | Salwah Events</title>
        <meta name="description" content="Download free, ready-made wedding day timeline templates in PDF format for various Asian wedding styles, including same-day and multi-day events." />
      </Helmet>
      <div className="bg-black">
        <PageHeader title="Wedding Day" gradientText="Timeline Templates" subtitle="Download ready-made schedules for your big day." />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {templates.map((template, index) => (
              <div key={index} className="bg-[#2A2E39] p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-2">
                    <FilePdf className="w-8 h-8 text-gold" />
                    <h3 className="text-2xl font-serif font-bold text-white">{template.title}</h3>
                  </div>
                  <p className="text-gray-300">{template.description}</p>
                </div>
                <Button onClick={() => generatePdf(template.title, template.events)} className="w-full md:w-auto text-lg py-3 px-6 shrink-0">
                  <Download size={20} className="mr-2" /> Download PDF
                </Button>
              </div>
            ))}
          </motion.div>

          <div className="mt-16 bg-[#2A2E39] p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Find the template that most closely matches your wedding events.</li>
              <li>Click the "Download PDF" button to save the template to your device.</li>
              <li>Use the PDF as a starting point and adjust the times to fit your specific plans.</li>
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

export default TimelineTemplates;