import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { generatePdfWithHeaderFooter } from '@/lib/pdfUtils';

const INITIAL_TASKS = [
  { id: 1, text: 'Confirm Date & Book Wedding Venue', done: false },
  { id: 2, text: 'Book 100% HMC Halal Catering & Menu Consultation', done: false },
  { id: 3, text: 'Book Nikah Officiant / Imam & Civil Notice', done: false },
  { id: 4, text: 'Design Wedding Stage Decor, Lighting & Florals', done: false },
  { id: 5, text: 'Hire Photographer & Videographer', done: false },
  { id: 6, text: 'Select Bridal & Groom Wedding Outfits', done: false },
  { id: 7, text: 'Confirm Sound, Nasheed / Entertainment & Host', done: false },
  { id: 8, text: 'Design & Send Wedding Invitations', done: false },
  { id: 9, text: 'Finalise Guest List & Dietary Notes', done: false },
  { id: 10, text: 'Create Table Seating Plan', done: false },
  { id: 11, text: 'Order Wedding Cake & Mithai Favours', done: false },
  { id: 12, text: 'Share Final Run-Sheet With All Suppliers', done: false },
];

export default function WeddingChecklistTool() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [notice, setNotice] = useState('');

  const progress = useMemo(() => {
    const done = tasks.filter((t) => t.done).length;
    return Math.round((done / tasks.length) * 100);
  }, [tasks]);

  const downloadPDF = () => {
    const doc = generatePdfWithHeaderFooter('Asian Wedding Planning Checklist', (pdf) => {
      pdf.setFontSize(12);
      tasks.forEach((task, idx) => {
        const y = 42 + idx * 11;
        pdf.rect(14, y - 4, 5, 5);
        if (task.done) pdf.text('X', 15.5, y);
        pdf.text(task.text, 23, y);
      });
    });
    doc.save('salwah_wedding_checklist.pdf');
    setNotice('Checklist PDF downloaded!');
  };

  return (
    <div className="rounded-2xl border border-salwah-gold/25 bg-[#12151e] p-6 sm:p-8 space-y-6">
      <div>
        <div className="flex justify-between text-sm font-bold mb-2">
          <span className="text-white">Overall Progress</span>
          <span className="text-salwah-gold">{progress}% Complete</span>
        </div>
        <div className="h-3.5 w-full rounded-full bg-black/70 overflow-hidden border border-white/10">
          <div className="h-full bg-salwah-gold transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/50 p-4 cursor-pointer hover:border-salwah-gold/40 transition"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() =>
                setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)))
              }
              className="h-5 w-5 accent-[#f6df91]"
            />
            <span className={task.done ? 'line-through text-gray-500' : 'text-white'}>{task.text}</span>
          </label>
        ))}
      </div>

      <button type="button" onClick={downloadPDF} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-salwah-gold py-4 text-base font-bold text-black hover:bg-salwah-gold-light transition cursor-pointer">
        <Download className="h-5 w-5" /> Download Checklist PDF
      </button>
      {notice && <p className="text-center text-sm text-salwah-gold">{notice}</p>}
    </div>
  );
}
