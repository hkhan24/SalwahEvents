import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import { formatGBP, makeId, type DocumentSection } from '@/lib/invoiceUtils';
import {
  exportQuotationToJSON,
  exportQuotationToPDF,
  initialQuotationState,
  parseQuotationJSON,
  type QuotationState,
} from '@/lib/quotationUtils';

const DRAFT_KEY = 'quotationDraft';

export default function QuotationGeneratorIsland() {
  const [quotation, setQuotation] = useState<QuotationState>(initialQuotationState);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        setQuotation(parseQuotationJSON(saved));
      }
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(quotation));
      } catch {}
    }, 3000);
    return () => clearTimeout(t);
  }, [quotation, mounted]);

  const calculatedTotals = useMemo(() => {
    const subtotal = quotation.sections.reduce((acc, s) => {
      const st =
        s.mode === 'itemised'
          ? s.items.reduce((ia, item) => ia + (Number(item.price) || 0), 0)
          : Number(s.subtotal) || 0;
      return acc + st;
    }, 0);
    const discount = quotation.totals.discountEnabled ? Number(quotation.totals.discount) || 0 : 0;
    const afterDiscount = subtotal - discount;
    const vatAmount = quotation.totals.vatEnabled
      ? afterDiscount * ((Number(quotation.totals.vatRate) || 0) / 100)
      : 0;
    const grandTotal = afterDiscount + vatAmount;
    const guests = Number(quotation.meta.guestCount) || 1;
    const costPerHead = grandTotal > 0 && guests > 0 ? grandTotal / guests : 0;
    return { subtotal, discount, vatAmount, grandTotal, costPerHead };
  }, [quotation]);

  const updateMeta = (key: keyof QuotationState['meta'], value: string) =>
    setQuotation((prev) => ({ ...prev, meta: { ...prev.meta, [key]: value } }));

  const updateSection = (id: string, patch: Partial<DocumentSection>) =>
    setQuotation((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));

  const moveSection = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= quotation.sections.length) return;
    setQuotation((prev) => {
      const next = [...prev.sections];
      const [moved] = next.splice(idx, 1);
      next.splice(target, 0, moved);
      return { ...prev, sections: next };
    });
  };

  const addSection = () =>
    setQuotation((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: makeId(),
          title: 'New Section',
          mode: 'itemised',
          items: [{ id: makeId(), name: '', notes: '', price: '' }],
          subtotal: '',
          isCollapsed: false,
        },
      ],
    }));

  const saveDraft = () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(quotation));
      setStatus('Draft saved locally.');
    } catch {
      setStatus('Could not save draft.');
    }
  };

  const duplicate = () => {
    const nextNo = initialQuotationState().meta.quotationNo;
    setQuotation((prev) => ({ ...prev, meta: { ...prev.meta, quotationNo: nextNo } }));
    setStatus(`Duplicated with Quotation No: ${nextNo}`);
  };

  const reset = () => {
    if (!window.confirm('Clear the entire quotation form? This cannot be undone.')) return;
    setQuotation(initialQuotationState());
    localStorage.removeItem(DRAFT_KEY);
    setStatus('Quotation reset.');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        setQuotation(parseQuotationJSON(String(ev.target?.result || '')));
        setStatus('Quotation JSON imported.');
      } catch {
        setStatus('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportPDF = () => {
    const ok = exportQuotationToPDF(quotation, calculatedTotals);
    setStatus(ok ? `Downloaded Quotation_${quotation.meta.quotationNo}.pdf` : 'PDF export failed.');
  };

  return (
    <div className="min-h-screen bg-salwah-black text-white">
      <div className="sticky top-0 z-30 border-b border-salwah-gold/25 bg-[#0e1017]/95 backdrop-blur px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-xs font-semibold text-salwah-gold hover:underline">
              &larr; Admin
            </a>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Salwah Events — <span className="text-salwah-gold">Quotation Generator</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {status && <span className="text-xs text-salwah-gold mr-2">{status}</span>}
            <button type="button" onClick={saveDraft} className="inline-flex items-center gap-1.5 rounded-lg border border-salwah-gold/40 px-3 py-1.5 text-xs font-semibold text-salwah-gold hover:bg-salwah-gold hover:text-black transition cursor-pointer">
              <Save className="h-3.5 w-3.5" /> Save Draft
            </button>
            <button type="button" onClick={duplicate} className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:border-salwah-gold hover:text-salwah-gold transition cursor-pointer">
              <Copy className="h-3.5 w-3.5" /> Duplicate
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-salwah-gold/30 bg-[#12151e] p-6">
            <h2 className="font-serif text-2xl font-bold text-salwah-gold mb-5">Client Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {(
                [
                  ['clientName', 'Client Name', 'text'],
                  ['venue', 'Venue', 'text'],
                  ['eventType', 'Event Type', 'text'],
                  ['eventDate', 'Event Date', 'date'],
                  ['time', 'Event Time', 'text'],
                  ['guestCount', 'No. of Guests', 'number'],
                  ['contactNumber', 'Contact Number', 'text'],
                  ['quotationNo', 'Quotation No.', 'text'],
                  ['issueDate', 'Issue Date', 'date'],
                ] as const
              ).map(([key, label, type]) => (
                <div key={key}>
                  <label className="block text-xs text-gray-400 mb-1">{label}</label>
                  <input
                    type={type}
                    value={quotation.meta[key]}
                    onChange={(e) => updateMeta(key, e.target.value)}
                    className="w-full rounded-lg border border-salwah-gold/25 bg-black/60 px-3 py-2 text-white [color-scheme:dark]"
                  />
                </div>
              ))}
            </div>
          </div>

          {quotation.sections.map((section, idx) => {
            const sectionTotal =
              section.mode === 'itemised'
                ? section.items.reduce((a, i) => a + (Number(i.price) || 0), 0)
                : Number(section.subtotal) || 0;

            return (
              <div key={section.id} className="rounded-2xl border border-salwah-gold/25 bg-[#12151e]">
                <div className="p-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <div className="flex flex-col">
                      <button type="button" onClick={() => moveSection(idx, -1)} disabled={idx === 0} className="text-gray-400 hover:text-salwah-gold disabled:opacity-25 cursor-pointer" aria-label="Move section up">
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => moveSection(idx, 1)} disabled={idx === quotation.sections.length - 1} className="text-gray-400 hover:text-salwah-gold disabled:opacity-25 cursor-pointer" aria-label="Move section down">
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <input
                      value={section.title}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      className="bg-transparent font-serif text-xl font-bold text-salwah-gold focus:outline-none w-full"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" checked={section.mode === 'itemised'} onChange={() => updateSection(section.id, { mode: 'itemised' })} className="accent-[#f6df91]" />
                      Itemised
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" checked={section.mode === 'subtotal'} onChange={() => updateSection(section.id, { mode: 'subtotal' })} className="accent-[#f6df91]" />
                      Subtotal
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete section "${section.title}"?`)) {
                          setQuotation((prev) => ({ ...prev, sections: prev.sections.filter((s) => s.id !== section.id) }));
                        }
                      }}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                      aria-label="Delete section"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => updateSection(section.id, { isCollapsed: !section.isCollapsed })} className="text-gray-300 cursor-pointer" aria-label="Toggle collapse">
                      <ChevronDown className={`h-4 w-4 transition ${section.isCollapsed ? '' : 'rotate-180'}`} />
                    </button>
                  </div>
                </div>

                {!section.isCollapsed && (
                  <div className="p-4 space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                        <input
                          placeholder="Item Name"
                          value={item.name}
                          onChange={(e) =>
                            updateSection(section.id, {
                              items: section.items.map((i) => (i.id === item.id ? { ...i, name: e.target.value } : i)),
                            })
                          }
                          className="col-span-5 rounded-md border border-salwah-gold/25 bg-black/60 px-2.5 py-2 text-sm text-white"
                        />
                        <input
                          placeholder="Notes"
                          value={item.notes}
                          onChange={(e) =>
                            updateSection(section.id, {
                              items: section.items.map((i) => (i.id === item.id ? { ...i, notes: e.target.value } : i)),
                            })
                          }
                          className="col-span-4 rounded-md border border-salwah-gold/25 bg-black/60 px-2.5 py-2 text-sm text-white"
                        />
                        <input
                          type="number"
                          placeholder="0.00"
                          value={item.price}
                          onChange={(e) =>
                            updateSection(section.id, {
                              items: section.items.map((i) => (i.id === item.id ? { ...i, price: e.target.value } : i)),
                            })
                          }
                          className="col-span-2 rounded-md border border-salwah-gold/25 bg-black/60 px-2.5 py-2 text-sm text-right text-white"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateSection(section.id, { items: section.items.filter((i) => i.id !== item.id) })
                          }
                          className="col-span-1 flex justify-center text-red-400 hover:text-red-300 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateSection(section.id, {
                            items: [...section.items, { id: makeId(), name: '', notes: '', price: '' }],
                          })
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-salwah-gold/40 px-3 py-1.5 text-xs font-semibold text-salwah-gold hover:bg-salwah-gold/10 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Item
                      </button>

                      {section.mode === 'subtotal' && (
                        <div className="flex items-center gap-2 text-xs">
                          <label>Section Subtotal (£):</label>
                          <input
                            type="number"
                            value={section.subtotal}
                            onChange={(e) => updateSection(section.id, { subtotal: e.target.value })}
                            className="w-28 rounded border border-salwah-gold/30 bg-black/60 px-2.5 py-1.5 text-right text-white"
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/10 text-right text-sm font-bold text-white">
                      Section Total: <span className="text-salwah-gold">{formatGBP(sectionTotal)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={addSection}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-salwah-gold/50 py-3 text-sm font-bold text-salwah-gold hover:bg-salwah-gold hover:text-black transition cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Section
          </button>
        </div>

        <div className="rounded-2xl border border-salwah-gold/30 bg-[#12151e] p-6 lg:sticky lg:top-20 space-y-4 text-sm">
          <h2 className="font-serif text-2xl font-bold text-salwah-gold">Totals &amp; Export</h2>

          <div className="flex justify-between"><span className="text-gray-300">Subtotal</span><span>{formatGBP(calculatedTotals.subtotal)}</span></div>

          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={quotation.totals.discountEnabled}
                onChange={(e) => setQuotation((p) => ({ ...p, totals: { ...p.totals, discountEnabled: e.target.checked } }))}
                className="accent-[#f6df91]"
              />
              <span>Discount</span>
            </label>
            {quotation.totals.discountEnabled && (
              <input
                type="number"
                placeholder="0.00"
                value={quotation.totals.discount}
                onChange={(e) => setQuotation((p) => ({ ...p, totals: { ...p.totals, discount: e.target.value } }))}
                className="w-28 rounded border border-salwah-gold/30 bg-black/60 px-2 py-1 text-right text-white"
              />
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={quotation.totals.vatEnabled}
                onChange={(e) => setQuotation((p) => ({ ...p, totals: { ...p.totals, vatEnabled: e.target.checked } }))}
                className="accent-[#f6df91]"
              />
              <span>VAT (%)</span>
            </label>
            {quotation.totals.vatEnabled && (
              <input
                type="number"
                value={quotation.totals.vatRate}
                onChange={(e) => setQuotation((p) => ({ ...p, totals: { ...p.totals, vatRate: e.target.value } }))}
                className="w-20 rounded border border-salwah-gold/30 bg-black/60 px-2 py-1 text-right text-white"
              />
            )}
          </div>
          {quotation.totals.vatEnabled && (
            <div className="flex justify-between text-gray-300"><span>VAT Amount</span><span>{formatGBP(calculatedTotals.vatAmount)}</span></div>
          )}

          <div className="flex justify-between font-bold text-xl text-salwah-gold pt-2 border-t border-salwah-gold/25">
            <span>Total Cost</span>
            <span>{formatGBP(calculatedTotals.grandTotal)}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={quotation.totals.showCostPerHead}
                onChange={(e) => setQuotation((p) => ({ ...p, totals: { ...p.totals, showCostPerHead: e.target.checked } }))}
                className="accent-[#f6df91]"
              />
              <span>Show Cost Per Head</span>
            </label>
            {quotation.totals.showCostPerHead && <strong className="text-salwah-gold">{formatGBP(calculatedTotals.costPerHead)}</strong>}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <input type="file" id="quo-import" accept=".json" onChange={handleImport} className="hidden" />
            <label htmlFor="quo-import" className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 py-2.5 text-xs font-semibold text-gray-200 hover:border-salwah-gold hover:text-salwah-gold cursor-pointer">
              <Upload className="h-4 w-4" /> Import JSON
            </label>
            <button type="button" onClick={() => exportQuotationToJSON(quotation)} className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 py-2.5 text-xs font-semibold text-gray-200 hover:border-salwah-gold hover:text-salwah-gold cursor-pointer">
              <Download className="h-4 w-4" /> Export JSON
            </button>
            <button type="button" onClick={handleExportPDF} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-salwah-gold py-3 text-sm font-bold text-black hover:bg-salwah-gold-light cursor-pointer">
              <FileText className="h-4 w-4" /> Download Quotation PDF
            </button>
            <button type="button" onClick={reset} className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-950/40 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-900/50 cursor-pointer">
              <RefreshCw className="h-4 w-4" /> Reset Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
