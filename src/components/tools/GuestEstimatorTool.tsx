import { useMemo, useState } from 'react';

export default function GuestEstimatorTool() {
  const [guestCount, setGuestCount] = useState(200);

  const estimates = useMemo(() => {
    const cateringMin = guestCount * 25;
    const cateringMax = guestCount * 40;
    const decorMin = guestCount * 15;
    const decorMax = guestCount * 35;
    return {
      catering: `£${cateringMin.toLocaleString()} – £${cateringMax.toLocaleString()}`,
      decor: `£${decorMin.toLocaleString()} – £${decorMax.toLocaleString()}`,
      total: `£${(cateringMin + decorMin).toLocaleString()} – £${(cateringMax + decorMax).toLocaleString()}`,
    };
  }, [guestCount]);

  return (
    <div className="rounded-2xl border border-salwah-gold/25 bg-[#12151e] p-6 sm:p-8 space-y-8">
      <div className="text-center">
        <label htmlFor="ge-range" className="block text-sm font-semibold uppercase tracking-wider text-gray-300">
          Estimated Guest Count (50 – 1,000)
        </label>
        <p className="font-serif text-5xl font-bold text-salwah-gold my-3">{guestCount} guests</p>
        <input
          id="ge-range"
          type="range"
          min={50}
          max={1000}
          step={10}
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          className="w-full h-3 accent-[#f6df91] cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
        <div className="rounded-xl border border-white/15 bg-black/50 p-6">
          <p className="font-serif text-lg text-gray-200 mb-2">Halal Catering Range</p>
          <p className="text-2xl font-bold text-salwah-gold">{estimates.catering}</p>
          <p className="text-xs text-gray-400 mt-1">Based on £25–£40 per person (Silver to Gold)</p>
        </div>
        <div className="rounded-xl border border-white/15 bg-black/50 p-6">
          <p className="font-serif text-lg text-gray-200 mb-2">Stage &amp; Venue Decor</p>
          <p className="text-2xl font-bold text-salwah-gold">{estimates.decor}</p>
          <p className="text-xs text-gray-400 mt-1">Indicative styling budget</p>
        </div>
        <div className="rounded-xl border border-salwah-gold bg-salwah-gold/10 p-6">
          <p className="font-serif text-lg text-white mb-2">Combined Guide Range</p>
          <p className="text-2xl font-bold text-salwah-gold">{estimates.total}</p>
          <p className="text-xs text-gray-300 mt-1">Catering + Decor estimate</p>
        </div>
      </div>
    </div>
  );
}
