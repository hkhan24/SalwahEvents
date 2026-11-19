import { useMemo, useState } from 'react';

export default function SeatingVisualiserTool() {
  const [guestCount, setGuestCount] = useState(200);
  const [tableType, setTableType] = useState<'round' | 'long'>('round');

  const layout = useMemo(() => {
    const safeGuests = Math.max(0, Math.min(1200, guestCount));
    const perTable = tableType === 'round' ? 10 : 20;
    const tables = Math.ceil(safeGuests / perTable);
    return { tables, perTable };
  }, [guestCount, tableType]);

  return (
    <div className="rounded-2xl border border-salwah-gold/25 bg-[#12151e] p-6 sm:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sv-guests" className="block text-xs font-semibold uppercase tracking-wider text-salwah-gold mb-1.5">
            Estimated Guest Count
          </label>
          <input
            id="sv-guests"
            type="number"
            min={10}
            max={1200}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full rounded-lg border border-salwah-gold/30 bg-black/60 px-3.5 py-2.5 text-white"
          />
        </div>
        <div>
          <label htmlFor="sv-style" className="block text-xs font-semibold uppercase tracking-wider text-salwah-gold mb-1.5">
            Banquet Table Style
          </label>
          <select
            id="sv-style"
            value={tableType}
            onChange={(e) => setTableType(e.target.value as 'round' | 'long')}
            className="w-full rounded-lg border border-salwah-gold/30 bg-black/60 px-3.5 py-2.5 text-white"
          >
            <option value="round" className="bg-[#12151e]">Round Tables (10 per table)</option>
            <option value="long" className="bg-[#12151e]">Long Banquet Tables (20 per table)</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-salwah-gold/20 bg-black/50 p-6 min-h-[280px]">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white text-center mb-6">
          Approx. <span className="text-salwah-gold">{layout.tables}</span> {tableType} table
          {layout.tables === 1 ? '' : 's'} ({layout.perTable} guests per table)
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: Math.min(layout.tables, 120) }).map((_, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center border-2 border-salwah-gold bg-salwah-gold/20 text-salwah-gold font-bold text-xs ${
                tableType === 'round' ? 'h-16 w-16 rounded-full' : 'h-12 w-32 rounded-lg'
              }`}
            >
              T{idx + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
