import { useState } from 'react';
import { Download } from 'lucide-react';
import { generatePdfWithHeaderFooter } from '@/lib/pdfUtils';

const TEMPLATES = [
  {
    title: 'Nikah & Walima (Same Day)',
    description: 'Ideal run-sheet when your Nikah ceremony and Walima banquet take place on the same day.',
    events: [
      { time: '2:00 PM', activity: 'Guest Arrival & Welcome Mocktails' },
      { time: '3:00 PM', activity: 'Nikah Ceremony & Dua' },
      { time: '4:00 PM', activity: 'Couple & Family Portraits + Karak Chai' },
      { time: '5:00 PM', activity: 'Walima Couple Entrance' },
      { time: '5:30 PM', activity: '100% HMC Halal Dinner Service' },
      { time: '7:00 PM', activity: 'Speeches, Cake Cutting & Dessert Table' },
      { time: '8:00 PM', activity: 'Rukhsati (Send-Off)' },
    ],
  },
  {
    title: 'Multi-Day Asian Wedding',
    description: 'Three-day schedule covering Mehndi / Gaye Holud, Nikah, and Grand Walima.',
    events: [
      { time: 'Day 1 — Mehndi', activity: '6:30 PM Guest Arrival, Chaat Station & Henna' },
      { time: 'Day 1 — Dinner', activity: '8:00 PM Grills, Biryani & Traditional Mithai' },
      { time: 'Day 2 — Nikah', activity: '2:00 PM Arrival, 3:00 PM Nikah Ceremony' },
      { time: 'Day 2 — Tea', activity: '4:15 PM Refreshments, Pink Chai & Portraits' },
      { time: 'Day 3 — Walima', activity: '6:00 PM Arrival & Mocktail Reception' },
      { time: 'Day 3 — Banquet', activity: '7:15 PM Grand Entrance & 3-Course Halal Feast' },
      { time: 'Day 3 — Finale', activity: '9:30 PM Cake Cutting & Rukhsati' },
    ],
  },
  {
    title: 'Grand Evening Reception',
    description: 'Clean evening schedule for a standalone wedding reception or Walima celebration.',
    events: [
      { time: '6:00 PM', activity: 'Guest Arrival & Mocktail / Chai Reception' },
      { time: '7:00 PM', activity: 'Couple Grand Entrance' },
      { time: '7:15 PM', activity: 'Halal Dinner Banquet Opens' },
      { time: '8:30 PM', activity: 'Family Speeches & Blessings' },
      { time: '9:00 PM', activity: 'Cake Cutting & Dessert / Karak Chai Station' },
      { time: '10:30 PM', activity: 'Farewells & Event Concludes' },
    ],
  },
];

export default function TimelineTemplatesTool() {
  const [notice, setNotice] = useState('');

  const downloadPdf = (title: string, events: { time: string; activity: string }[]) => {
    const doc = generatePdfWithHeaderFooter(title, (pdf) => {
      let y = 42;
      events.forEach((ev) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.text(ev.time, 14, y);
        pdf.setFont('helvetica', 'normal');
        pdf.text(ev.activity, 55, y);
        y += 10;
        if (y > 275) {
          pdf.addPage();
          y = 24;
        }
      });
    });

    doc.save(`${title.replace(/[^a-z0-9]+/gi, '_')}.pdf`);
    setNotice(`Downloaded "${title}" PDF template.`);
  };

  return (
    <div className="space-y-6">
      {TEMPLATES.map((tpl) => (
        <div key={tpl.title} className="rounded-2xl border border-salwah-gold/25 bg-[#12151e] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-salwah-gold">{tpl.title}</h2>
              <p className="text-sm text-gray-300 mt-1">{tpl.description}</p>
            </div>
            <button
              type="button"
              onClick={() => downloadPdf(tpl.title, tpl.events)}
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-salwah-gold px-5 py-3 text-sm font-bold text-black hover:bg-salwah-gold-light transition cursor-pointer"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </div>
          <ul className="mt-5 space-y-2.5 text-sm">
            {tpl.events.map((ev) => (
              <li key={`${ev.time}-${ev.activity}`} className="flex flex-col sm:flex-row sm:gap-4">
                <span className="font-semibold text-salwah-gold sm:w-40 shrink-0">{ev.time}</span>
                <span className="text-gray-200">{ev.activity}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {notice && <p className="text-center text-sm text-salwah-gold">{notice}</p>}
    </div>
  );
}
