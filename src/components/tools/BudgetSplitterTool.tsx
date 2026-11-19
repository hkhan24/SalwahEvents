import { useMemo, useState } from 'react';

const gbp = (v: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(v);

export default function BudgetSplitterTool() {
  const [totalBudget, setTotalBudget] = useState(20000);
  const [splitPercentage, setSplitPercentage] = useState(50);

  const amounts = useMemo(() => {
    const sideA = totalBudget * (splitPercentage / 100);
    return { sideA, sideB: totalBudget - sideA };
  }, [totalBudget, splitPercentage]);

  return (
    <div className="rounded-2xl border border-salwah-gold/25 bg-[#12151e] p-6 sm:p-8 space-y-8">
      <div className="max-w-sm mx-auto text-center">
        <label htmlFor="bs-total" className="block text-sm font-semibold uppercase tracking-wider text-salwah-gold mb-2">
          Total Wedding Budget (£)
        </label>
        <input
          id="bs-total"
          type="number"
          min={0}
          value={totalBudget}
          onChange={(e) => setTotalBudget(Number(e.target.value))}
          className="w-full rounded-xl border border-salwah-gold/30 bg-black/60 px-4 py-3 text-2xl font-bold text-center text-white"
        />
      </div>

      <div>
        <div className="flex justify-between text-base sm:text-lg font-bold mb-2">
          <span>Family A: {splitPercentage}%</span>
          <span>Family B: {100 - splitPercentage}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={splitPercentage}
          onChange={(e) => setSplitPercentage(Number(e.target.value))}
          className="w-full h-3 rounded-lg accent-[#f6df91] cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        <div className="rounded-xl border border-salwah-gold/25 bg-black/50 p-6">
          <p className="font-serif text-xl text-gray-200 mb-1">Family A Contributes</p>
          <p className="font-serif text-4xl font-bold text-salwah-gold">{gbp(amounts.sideA)}</p>
        </div>
        <div className="rounded-xl border border-salwah-gold/25 bg-black/50 p-6">
          <p className="font-serif text-xl text-gray-200 mb-1">Family B Contributes</p>
          <p className="font-serif text-4xl font-bold text-salwah-gold">{gbp(amounts.sideB)}</p>
        </div>
      </div>
    </div>
  );
}
