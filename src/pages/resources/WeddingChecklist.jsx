import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import { generatePdfWithHeaderFooter } from '@/lib/pdfUtils';

const initialTasks = [
  { id: 1, text: 'Book Venue', done: false },
  { id: 2, text: 'Finalise Catering Menu', done: false },
  { id: 3, text: 'Hire Photographer & Videographer', done: false },
  { id: 4, text: 'Decide on Décor & Florals', done: false },
  { id: 5, text: 'Purchase Wedding Outfits', done: false },
  { id: 6, text: 'Book DJ / Entertainment', done: false },
  { id: 7, text: 'Send Out Invitations', done: false },
  { id: 8, text: 'Arrange Guest Transport', done: false },
  { id: 9, text: 'Order Wedding Cake', done: false },
  { id: 10, text: 'Finalise Guest List', done: false },
  { id: 11, text: 'Create Seating Plan', done: false },
  { id: 12, text: 'Arrange Wedding Favors', done: false },
];

const WeddingChecklist = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const progress = useMemo(() => {
    const doneTasks = tasks.filter(task => task.done).length;
    return tasks.length > 0 ? (doneTasks / tasks.length) * 100 : 0;
  }, [tasks]);

  const downloadPDF = () => {
    const doc = generatePdfWithHeaderFooter("Wedding Planning Checklist", (doc) => {
      doc.setFontSize(12);
      tasks.forEach((task, index) => {
        const y = 40 + (index * 10);
        doc.rect(14, y - 4, 5, 5); // Checkbox
        if (task.done) {
          doc.text('X', 16, y);
        }
        doc.text(task.text, 22, y);
      });
    });

    doc.save("wedding_checklist.pdf");
    toast({ title: "PDF Downloaded!", description: "Your checklist is ready." });
  };

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Resources', link: '/resources' },
    { name: 'Wedding Planning Checklist' },
  ];

  return (
    <>
      <Helmet>
        <title>Asian Wedding Checklist (Free PDF) | Salwah Events</title>
        <meta name="description" content="Stay organised with our free interactive wedding planning checklist. Track your progress and download a PDF version for offline use." />
      </Helmet>
      <div className="bg-black">
        <PageHeader title="Wedding Planning" gradientText="Checklist" subtitle="Stay organised with a simple checklist covering everything from venue to décor." />
        
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
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-white">Progress</span>
                <span className="text-lg font-bold text-gold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <motion.div
                  className="bg-gold h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center p-4 bg-black/30 rounded-lg cursor-pointer hover:bg-black/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    readOnly
                    className="w-6 h-6 mr-4 accent-gold cursor-pointer"
                  />
                  <span className={`text-lg ${task.done ? 'line-through text-gray-500' : 'text-white'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
            
            <Button onClick={downloadPDF} className="w-full mt-8 text-lg py-6">
              <Download size={20} className="mr-2" /> Download Checklist PDF
            </Button>
          </motion.div>

          <div className="mt-16 bg-[#2A2E39] p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Tick off tasks as you complete them to update your progress.</li>
              <li>Track your overall progress with the visual progress bar.</li>
              <li>Use the checklist online or download a PDF version to print and use offline.</li>
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

export default WeddingChecklist;