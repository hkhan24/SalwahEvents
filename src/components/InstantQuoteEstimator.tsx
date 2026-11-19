import { useMemo, useState } from 'react';
import { ArrowRight, Check, Sparkles, Users } from 'lucide-react';
import type { PrefillQuoteDetail } from '@/components/QuoteForm';

type PackageTierId = 'silver' | 'gold' | 'platinum';

const TIERS: {
  id: PackageTierId;
  name: string;
  badge?: string;
  rateLabel: string;
  perHead: number;
  baseMin?: number;
  highlights: string[];
}[] = [
  {
    id: 'silver',
    name: 'Silver Halal Catering',
    rateLabel: '£30 / guest',
    perHead: 30,
    highlights: [
      '2 Starters & 3 Main Courses (100% HMC Halal)',
      'Fragrant Pilau Rice, Fresh Naan & Chutneys',
      '1 Traditional Dessert, Crockery & Waiting Staff',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Signature Banquet',
    badge: 'Most Popular',
    rateLabel: '£45 / guest',
    perHead: 45,
    highlights: [
      '3 Starters (Chargrilled Kebabs) & 4 Premium Mains',
      'Dum Biryani & Pilau, 2 Desserts & Welcome Mocktails',
      'Full Glassware, Fine Crockery & Floor Supervisor',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum All-Inclusive',
    badge: 'Catering + Decor',
    rateLabel: 'From £17,500',
    perHead: 45,
    baseMin: 17500,
    highlights: [
      'Full Gold 100% HMC Halal Banquet + Live Chai/Dessert Station',
      'Bespoke Luxury Floral Stage, Uplighting & Table Centrepieces',
      'Dedicated Event Manager, Venue Walkthrough & Full Setup',
    ],
  },
];

const QUICK_GUESTS = [100, 200, 350, 500, 800];

function mapGuestRange(guests: number): string {
  if (guests <= 100) return '50–100 guests';
  if (guests <= 200) return '100–200 guests';
  if (guests <= 350) return '200–350 guests';
  if (guests <= 500) return '350–500 guests';
  if (guests <= 750) return '500–750 guests';
  return '750–1,000+ guests';
}

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(n);

export default function InstantQuoteEstimator() {
  const [guests, setGuests] = useState(250);
  const [tierId, setTierId] = useState<PackageTierId>('gold');
  const [addStageDecor, setAddStageDecor] = useState(true);
  const [addLiveStation, setAddLiveStation] = useState(false);

  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[1];

  const estimate = useMemo(() => {
    if (tierId === 'platinum') {
      const extraGuests = Math.max(0, guests - 200);
      const total = 17500 + extraGuests * 45;
      return {
        total,
        perGuest: Math.round(total / guests),
        includesStage: true,
        includesStation: true,
      };
    }

    const catering = guests * tier.perHead;
    const decor = addStageDecor ? 2500 : 0;
    const station = addLiveStation ? guests * 6 : 0;
    const total = catering + decor + station;
    return {
      total,
      perGuest: Math.round(total / guests),
      includesStage: addStageDecor,
      includesStation: addLiveStation,
    };
  }, [guests, tierId, tier.perHead, addStageDecor, addLiveStation]);

  const handleLockEstimate = () => {
    const extras: string[] = [];
    if (tierId !== 'platinum' && addStageDecor) extras.push('Bespoke Stage Decor');
    if (tierId !== 'platinum' && addLiveStation) extras.push('Live Chaat / Mocktail & Karak Chai Station');

    const detail: PrefillQuoteDetail = {
      guestCount: mapGuestRange(guests),
      servicesNeeded:
        tierId === 'platinum'
          ? 'Full Event Management'
          : addStageDecor
            ? 'Both Catering & Stage Decor'
            : 'Halal Wedding Catering',
      message: `Instant Estimate: ${tier.name} for ~${guests} guests${
        extras.length ? ` + ${extras.join(' & ')}` : ''
      } (Est. ${gbp(estimate.total)}). Please confirm availability & menu consultation slots.`,
      label: `Estimate ready (${gbp(estimate.total)} for ${guests} guests) — add your name & phone below!`,
    };

    window.dispatchEvent(new CustomEvent('salwah:prefill-quote', { detail }));
    const target = document.getElementById('quote-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="rounded-3xl border border-salwah-gold/30 bg-gradient-to-br from-[#171925] via-[#0e1017] to-[#08090d] p-6 sm:p-10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-salwah-gold mb-2 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive Wedding Estimator
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Price Your Celebration <span className="gold-gradient-text italic font-semibold">in Seconds</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-300">
              Slide your guest count and pick a package tier to preview transparent 100% HMC Halal wedding investment.
            </p>
          </div>

          {/* Guest Count Slider */}
          <div className="rounded-2xl border border-white/10 bg-black/45 p-5 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="estimator-guests" className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Users className="h-4 w-4 text-salwah-gold" />
                Estimated Guests
              </label>
              <span className="font-serif text-3xl font-bold text-salwah-gold">
                {guests.toLocaleString('en-GB')} <span className="text-sm font-sans font-normal text-gray-300">guests</span>
              </span>
            </div>

            <input
              id="estimator-guests"
              type="range"
              min={50}
              max={1000}
              step={25}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full accent-[#f6df91] cursor-pointer"
            />

            <div className="flex flex-wrap gap-2">
              {QUICK_GUESTS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setGuests(n)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold border transition cursor-pointer ${
                    guests === n
                      ? 'border-salwah-gold bg-salwah-gold text-black'
                      : 'border-white/15 bg-black/50 text-gray-300 hover:border-salwah-gold/50 hover:text-salwah-gold'
                  }`}
                >
                  {n} guests
                </button>
              ))}
            </div>
          </div>

          {/* Tier Selection */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-300">
              Choose Package Tier
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TIERS.map((item) => {
                const active = tierId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTierId(item.id)}
                    aria-pressed={active}
                    className={`relative rounded-xl border p-4 text-left transition cursor-pointer ${
                      active
                        ? 'border-salwah-gold bg-salwah-gold/15 shadow-lg shadow-salwah-gold/10'
                        : 'border-white/15 bg-black/45 hover:border-salwah-gold/45'
                    }`}
                  >
                    {item.badge && (
                      <span className="inline-block rounded-full bg-salwah-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black mb-2">
                        {item.badge}
                      </span>
                    )}
                    <p className="font-serif text-base font-bold text-white leading-snug">{item.name}</p>
                    <p className="mt-1 text-sm font-bold text-salwah-gold">{item.rateLabel}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-on Toggles */}
          {tierId !== 'platinum' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3 rounded-xl border border-white/15 bg-black/45 p-3.5 cursor-pointer hover:border-salwah-gold/45 transition">
                <input
                  type="checkbox"
                  checked={addStageDecor}
                  onChange={(e) => setAddStageDecor(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#f6df91]"
                />
                <span className="text-xs sm:text-sm text-gray-200">
                  <strong className="block text-white">Bespoke Floral Stage Decor</strong>
                  <span className="text-gray-400">Add custom backdrop &amp; lighting (+£2,500 guide)</span>
                </span>
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-white/15 bg-black/45 p-3.5 cursor-pointer hover:border-salwah-gold/45 transition">
                <input
                  type="checkbox"
                  checked={addLiveStation}
                  onChange={(e) => setAddLiveStation(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#f6df91]"
                />
                <span className="text-xs sm:text-sm text-gray-200">
                  <strong className="block text-white">Live Chaat, Mocktail &amp; Chai Bar</strong>
                  <span className="text-gray-400">Interactive reception welcome (+£6/guest)</span>
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Live Output Card */}
        <div className="lg:col-span-5 rounded-2xl border-2 border-salwah-gold/60 bg-gradient-to-b from-[#251d0a]/90 via-[#12100a] to-[#0a0b0f] p-6 sm:p-7 space-y-5 shadow-2xl">
          <div className="text-center pb-5 border-b border-salwah-gold/25">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-salwah-gold">
              Estimated Guide Investment
            </p>
            <p className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-white">
              {gbp(estimate.total)}
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-salwah-gold font-medium">
              Approx. {gbp(estimate.perGuest)} per guest &bull; {guests} guests &bull; 100% HMC Halal
            </p>
          </div>

          <ul className="space-y-2.5 text-sm text-gray-200">
            {tier.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-salwah-gold mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
            {tierId !== 'platinum' && estimate.includesStage && (
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-salwah-gold mt-0.5 shrink-0" />
                <span>Bespoke floral wedding stage, sweetheart sofa &amp; lighting</span>
              </li>
            )}
            {tierId !== 'platinum' && estimate.includesStation && (
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-salwah-gold mt-0.5 shrink-0" />
                <span>Live chaat counter, spiced borhani, mocktails &amp; karak chai</span>
              </li>
            )}
          </ul>

          <button
            type="button"
            onClick={handleLockEstimate}
            className="btn-luxury-gold w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold cursor-pointer"
          >
            Check Date &amp; Lock This Estimate
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-[11px] text-center text-gray-400">
            Instant guide price — tailored formally during your complimentary menu consultation.
          </p>
        </div>
      </div>
    </div>
  );
}
