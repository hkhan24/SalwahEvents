import { useMemo, useState } from 'react';

const gbp = (v: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(v);

export default function PerGuestCalculatorTool() {
  const [totalBudget, setTotalBudget] = useState(15000);
  const [guestCount, setGuestCount] = useState(250);

  const perGuest = useMemo(() => (guestCount > 0 ? totalBudget / guestCount : 0), [totalBudget, guestCount]);

  return (
    <div className="rounded-2xl border border-salwah-gold/25 bg-[#12151e] p-6 sm:p-8 text-center space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pg-budget" className="block text-sm font-semibold uppercase tracking-wider text-salwah-gold mb-2">
            Total Wedding Budget (£)
          </label>
          <input
            id="pg-budget"
            type="number"
            min={0}
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            className="w-full rounded-xl border border-salwah-gold/30 bg-black/60 px-4 py-3 text-2xl font-bold text-center text-white"
          />
        </div>
        <div>
          <label htmlFor="pg-guests" className="block text-sm font-semibold uppercase tracking-wider text-salwah-gold mb-2">
            Number of Guests
          </label>
          <input
            id="pg-guests"
            type="number"
            min={1}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full rounded-xl border border-salwah-gold/30 bg-black/60 px-4 py-3 text-2xl font-bold text-center text-white"
          />
        </div>
      </div>

      <div className="rounded-xl border border-salwah-gold/30 bg-black/50 p-8">
        <p className="font-serif text-xl text-gray-200 mb-2">Estimated Cost Per Guest</p>
        <p className="font-serif text-5xl sm:text-6xl font-bold text-salwah-gold">{gbp(perGuest)}</p>
      </div>
    </div>
  );
}
