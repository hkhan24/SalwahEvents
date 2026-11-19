import { useState } from 'react';
import { Check, Download } from 'lucide-react';
import { PACKAGES } from '@/data/packages';
import { QUOTE_BUILDER_MENU } from '@/data/quoteMenu';
import { SITE } from '@/data/site';
import { generatePdfWithHeaderFooter } from '@/lib/pdfUtils';

type MenuBucket = keyof typeof QUOTE_BUILDER_MENU;

export default function QuoteBuilderTool() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<Record<MenuBucket, string[]>>({
    starters: [],
    mains: [],
    riceAndBiryani: [],
    desserts: [],
  });
  const [notice, setNotice] = useState('');

  const toggleItem = (bucket: MenuBucket, item: string) => {
    setSelectedMenu((prev) => {
      const exists = prev[bucket].includes(item);
      return {
        ...prev,
        [bucket]: exists ? prev[bucket].filter((i) => i !== item) : [...prev[bucket], item],
      };
    });
  };

  const downloadPDF = () => {
    if (!selectedPackage) {
      setNotice('Please select a package first.');
      return;
    }

    const doc = generatePdfWithHeaderFooter('Your Custom Quote Selection', (pdf) => {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Selected Package', 14, 42);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text(selectedPackage, 14, 50);

      let y = 62;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Selected Halal Menu Items', 14, y);
      y += 8;

      (Object.entries(selectedMenu) as [MenuBucket, string[]][]).forEach(([cat, items]) => {
        if (items.length > 0) {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          const label = cat.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
          pdf.text(label, 14, y);
          y += 7;
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          items.forEach((item) => {
            pdf.text(`- ${item}`, 18, y);
            y += 5;
            if (y > 270) {
              pdf.addPage();
              y = 24;
            }
          });
          y += 4;
        }
      });

      pdf.setFontSize(10);
      pdf.setTextColor(110);
      pdf.text(
        `Email this PDF to ${SITE.email} or WhatsApp ${SITE.phoneDisplay} for an exact quote.`,
        14,
        Math.min(y + 8, 275)
      );
    });

    doc.save('salwah_events_quote_selection.pdf');
    setNotice('PDF downloaded! Email it to info@salwahevents.com or WhatsApp it to us.');
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-salwah-gold mb-5">
          Step 1: Select Your Base Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => {
            const active = selectedPackage === `${pkg.name} (${pkg.price} ${pkg.unit})`;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() =>
                  setSelectedPackage(active ? null : `${pkg.name} (${pkg.price} ${pkg.unit})`)
                }
                className={`text-left rounded-2xl p-6 border-2 transition cursor-pointer ${
                  active
                    ? 'border-salwah-gold bg-salwah-gold/10'
                    : 'border-white/15 bg-[#12151e] hover:border-salwah-gold/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-xl font-bold text-white">{pkg.name}</h3>
                  <span className="font-serif text-lg font-bold text-salwah-gold">{pkg.price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 mb-4">{pkg.unit}</p>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  {pkg.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-salwah-gold mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-salwah-gold mb-5">
          Step 2: Choose Your Preferred Halal Dishes (Optional)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.entries(QUOTE_BUILDER_MENU) as [MenuBucket, readonly string[]][]).map(([bucket, items]) => (
            <div key={bucket} className="rounded-2xl border border-salwah-gold/20 bg-[#12151e] p-5">
              <h3 className="font-serif text-lg font-bold text-white capitalize mb-4">
                {bucket.replace(/([A-Z])/g, ' $1')}
              </h3>
              <div className="space-y-2.5">
                {items.map((item) => {
                  const checked = selectedMenu[bucket].includes(item);
                  return (
                    <label key={item} className="flex items-start gap-2.5 cursor-pointer text-sm text-gray-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleItem(bucket, item)}
                        className="mt-1 h-4 w-4 accent-[#f6df91]"
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-salwah-gold/30 bg-[#12151e] p-6 sm:p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-salwah-gold mb-2">
          Step 3: Download Your Custom Selection PDF
        </h2>
        <p className="text-sm text-gray-300 mb-6">
          Download your menu sheet and attach it to your enquiry or WhatsApp it to {SITE.phoneDisplay}.
        </p>
        <button
          type="button"
          onClick={downloadPDF}
          disabled={!selectedPackage}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-salwah-gold px-7 py-4 text-base font-bold text-black hover:bg-salwah-gold-light transition disabled:opacity-40 cursor-pointer"
        >
          <Download className="h-5 w-5" />
          Download Quote Selection PDF
        </button>
        {notice && <p className="mt-4 text-sm text-salwah-gold">{notice}</p>}
      </div>
    </div>
  );
}
