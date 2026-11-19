import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, Coins, Scale, Calculator, Info } from 'lucide-react';

type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'AED' | 'BDT' | 'INR' | 'PKR';
type WeightUnit = 'gram' | 'oz' | 'tola' | 'bori' | 'masha' | 'ratti';

const CURRENCIES: { code: CurrencyCode; label: string; locale: string }[] = [
  { code: 'GBP', label: 'GBP (£)', locale: 'en-GB' },
  { code: 'USD', label: 'USD ($)', locale: 'en-US' },
  { code: 'EUR', label: 'EUR (€)', locale: 'de-DE' },
  { code: 'AED', label: 'AED (د.إ)', locale: 'en-AE' },
  { code: 'BDT', label: 'BDT (৳)', locale: 'en-BD' },
  { code: 'INR', label: 'INR (₹)', locale: 'en-IN' },
  { code: 'PKR', label: 'PKR (Rs)', locale: 'en-PK' },
];

const WEIGHT_UNITS: { value: WeightUnit; label: string; gramsPerUnit: number }[] = [
  { value: 'gram', label: 'Grams (g)', gramsPerUnit: 1 },
  { value: 'oz', label: 'Troy Ounces (oz t)', gramsPerUnit: 31.1034768 },
  { value: 'tola', label: 'Tola', gramsPerUnit: 11.6638038 },
  // Matches the live Salwah Events calculator convention (1 Tola = 16 Bori (BD) / Ana = 12 Masha = 96 Ratti)
  { value: 'bori', label: 'Bori (BD)', gramsPerUnit: 11.6638038 / 16 },
  { value: 'masha', label: 'Masha', gramsPerUnit: 11.6638038 / 12 },
  { value: 'ratti', label: 'Ratti', gramsPerUnit: 11.6638038 / 96 },
];

const KARAT_PRESETS = [24, 22, 21, 18, 14] as const;

const GRAMS_PER_OZ = 31.1034768;
const GRAMS_PER_TOLA = 11.6638038;
const GRAMS_PER_BORI = GRAMS_PER_TOLA / 16;
const GRAMS_PER_MASHA = GRAMS_PER_TOLA / 12;
const GRAMS_PER_RATTI = GRAMS_PER_TOLA / 96;

// Graceful fallback estimates used only if live API requests fail/timeout
const FALLBACK_USD_PER_OZ = 2650;
const FALLBACK_FX: Record<CurrencyCode, number> = {
  GBP: 0.79,
  USD: 1,
  EUR: 0.92,
  AED: 3.67,
  BDT: 119.5,
  INR: 84.5,
  PKR: 278.0,
};

function formatCurrency(amount: number, currency: CurrencyCode): string {
  const meta = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];
  try {
    return new Intl.NumberFormat(meta.locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number.isFinite(amount) ? amount : 0);
  } catch {
    return `${currency} ${(Number.isFinite(amount) ? amount : 0).toFixed(2)}`;
  }
}

interface ZakatPanelProps {
  idPrefix: string;
  totalGrams: number;
  karat: number;
  valueInCurrency: number;
  currency: CurrencyCode;
  nisabGrams: 87.48 | 85;
  onNisabChange: (val: 87.48 | 85) => void;
  zakatRate: number;
  onZakatRateChange: (val: number) => void;
}

function ZakatPanel({
  idPrefix,
  totalGrams,
  karat,
  valueInCurrency,
  currency,
  nisabGrams,
  onNisabChange,
  zakatRate,
  onZakatRateChange,
}: ZakatPanelProps) {
  const pureGoldGrams = totalGrams * (karat / 24);
  const aboveNisab = pureGoldGrams >= nisabGrams;
  const zakatDue = aboveNisab ? valueInCurrency * (Math.max(0, zakatRate) / 100) : 0;

  return (
    <div className="mt-5 rounded-xl border border-salwah-gold/30 bg-black/50 p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-serif text-lg font-bold text-salwah-gold">Zakat Calculation</h4>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
            aboveNisab
              ? 'bg-salwah-gold/20 text-salwah-gold border border-salwah-gold/40'
              : 'bg-white/10 text-gray-300 border border-white/10'
          }`}
        >
          {aboveNisab ? 'Above Nisab' : 'Below Nisab'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
            Nisab Threshold
          </span>
          <div className="flex gap-3">
            {([87.48, 85] as const).map((threshold) => (
              <label
                key={threshold}
                htmlFor={`${idPrefix}-nisab-${threshold}`}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition ${
                  nisabGrams === threshold
                    ? 'border-salwah-gold bg-salwah-gold/15 text-salwah-gold font-semibold'
                    : 'border-white/15 bg-black/40 text-gray-300 hover:border-white/30'
                }`}
              >
                <input
                  id={`${idPrefix}-nisab-${threshold}`}
                  type="radio"
                  name={`${idPrefix}-nisab`}
                  checked={nisabGrams === threshold}
                  onChange={() => onNisabChange(threshold)}
                  className="accent-[#f6df91]"
                />
                <span>{threshold} g</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-zakat-rate`}
            className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
          >
            Zakat Rate (%)
          </label>
          <input
            id={`${idPrefix}-zakat-rate`}
            type="number"
            step="0.1"
            min={0}
            max={100}
            value={zakatRate}
            onChange={(e) => onZakatRateChange(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-lg border border-salwah-gold/25 bg-black/60 px-3 py-2 text-sm text-white"
          />
        </div>
      </div>

      <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <span className="text-gray-300">Pure Gold Weight (24k equiv.):</span>
          <span className="font-mono font-semibold text-white">{pureGoldGrams.toFixed(3)} g</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-gray-300">Above Nisab ({nisabGrams}g)?</span>
          <span className={`font-semibold ${aboveNisab ? 'text-salwah-gold' : 'text-gray-400'}`}>
            {aboveNisab ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex justify-between items-baseline gap-2 pt-2 border-t border-salwah-gold/20">
          <span className="text-gray-200 font-semibold">Estimated Zakat Due:</span>
          <span className="font-serif text-xl font-bold text-salwah-gold">
            {formatCurrency(zakatDue, currency)}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-400 flex items-start gap-1.5">
        <Info className="h-3.5 w-3.5 text-salwah-gold shrink-0 mt-0.5" />
        <span>Zakat calculation is for guidance only; consult a qualified scholar.</span>
      </p>
    </div>
  );
}

export default function GoldCalculatorTool() {
  const [currency, setCurrency] = useState<CurrencyCode>('GBP');
  const [karat, setKarat] = useState<number>(24);
  const [usdPerOz, setUsdPerOz] = useState<number>(FALLBACK_USD_PER_OZ);
  const [fxRates, setFxRates] = useState<Record<CurrencyCode, number>>(FALLBACK_FX);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [toast, setToast] = useState<string>('');

  // Budget calculator state
  const [budget, setBudget] = useState<number>(1000);
  const [showBudgetZakat, setShowBudgetZakat] = useState<boolean>(false);

  // Holdings calculator state
  const [holdingsAmount, setHoldingsAmount] = useState<number>(1);
  const [holdingsUnit, setHoldingsUnit] = useState<WeightUnit>('tola');
  const [showHoldingsZakat, setShowHoldingsZakat] = useState<boolean>(false);

  // Synced Zakat settings across both panels
  const [nisabGrams, setNisabGrams] = useState<87.48 | 85>(87.48);
  const [zakatRate, setZakatRate] = useState<number>(2.5);

  const fetchLiveRates = useCallback(async (showFeedback = false) => {
    setLoading(true);
    try {
      const [goldRes, fxRes] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU', { cache: 'no-store' }),
        fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', {
          cache: 'no-store',
        }),
      ]);

      if (!goldRes.ok || !fxRes.ok) {
        throw new Error('Market feed temporarily unavailable');
      }

      const goldData = (await goldRes.json()) as { price?: number };
      const fxData = (await fxRes.json()) as { usd?: Record<string, number> };

      if (typeof goldData.price === 'number' && goldData.price > 0) {
        setUsdPerOz(goldData.price);
      }

      if (fxData.usd) {
        setFxRates({
          GBP: fxData.usd.gbp ?? FALLBACK_FX.GBP,
          USD: 1,
          EUR: fxData.usd.eur ?? FALLBACK_FX.EUR,
          AED: fxData.usd.aed ?? FALLBACK_FX.AED,
          BDT: fxData.usd.bdt ?? FALLBACK_FX.BDT,
          INR: fxData.usd.inr ?? FALLBACK_FX.INR,
          PKR: fxData.usd.pkr ?? FALLBACK_FX.PKR,
        });
      }

      setIsLive(true);
      setLastUpdated(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      if (showFeedback) {
        setToast('Prices Updated: Live gold and currency rates fetched.');
      }
    } catch {
      setIsLive(false);
      if (showFeedback) {
        setToast('Could not reach live feed — showing reference estimates.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchLiveRates(false);
  }, [fetchLiveRates]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 4000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const prices = useMemo(() => {
    const fx = fxRates[currency] ?? 1;
    const perGram24k = (usdPerOz / GRAMS_PER_OZ) * fx;
    const purityFactor = karat / 24;
    const perGramK = perGram24k * purityFactor;
    const perOzK = perGramK * GRAMS_PER_OZ;
    const perTolaK = perGramK * GRAMS_PER_TOLA;
    const perBoriK = perTolaK / 16;
    const perMashaK = perTolaK / 12;
    const perRattiK = perTolaK / 96;
    return {
      perGram24k,
      perGramK,
      perOzK,
      perTolaK,
      perBoriK,
      perMashaK,
      perRattiK,
    };
  }, [usdPerOz, fxRates, currency, karat]);

  const budgetBuy = useMemo(() => {
    const safeBudget = Math.max(0, Number(budget) || 0);
    const grams = prices.perGramK > 0 ? safeBudget / prices.perGramK : 0;
    const oz = grams / GRAMS_PER_OZ;
    const tola = grams / GRAMS_PER_TOLA;
    const bori = tola * 16;
    return { grams, oz, tola, bori };
  }, [budget, prices.perGramK]);

  const holdingsCalc = useMemo(() => {
    const safeAmount = Math.max(0, Number(holdingsAmount) || 0);
    const unitMeta = WEIGHT_UNITS.find((u) => u.value === holdingsUnit) ?? WEIGHT_UNITS[2];
    const grams = safeAmount * unitMeta.gramsPerUnit;
    const oz = grams / GRAMS_PER_OZ;
    const tola = grams / GRAMS_PER_TOLA;
    const bori = grams / GRAMS_PER_BORI;
    const masha = grams / GRAMS_PER_MASHA;
    const ratti = grams / GRAMS_PER_RATTI;
    const marketValue = grams * prices.perGramK;
    return { grams, oz, tola, bori, masha, ratti, marketValue };
  }, [holdingsAmount, holdingsUnit, prices.perGramK]);

  const purityPct = ((karat / 24) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Top Currency & Live Status Bar */}
      <div className="rounded-2xl border border-salwah-gold/30 bg-[#12151e] p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="gold-currency" className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Currency
          </label>
          <select
            id="gold-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="rounded-xl border border-salwah-gold/35 bg-black/70 px-4 py-2.5 text-sm font-semibold text-white focus:border-salwah-gold focus:outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-400">
            <span className="inline-flex items-center gap-1.5 text-gray-300">
              <span
                className={`h-2 w-2 rounded-full ${
                  isLive ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              {isLive
                ? 'Live from USD spot • Converted with daily FX'
                : loading
                  ? 'Fetching live gold & FX rates...'
                  : 'Reference estimate • Click Refresh to retry'}
            </span>
            {lastUpdated && <span className="block sm:inline sm:ml-2">Last updated: {lastUpdated}</span>}
          </div>
        </div>

        <button
          type="button"
          onClick={() => void fetchLiveRates(true)}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-salwah-gold/50 bg-salwah-gold/10 px-4 py-2.5 text-sm font-bold text-salwah-gold hover:bg-salwah-gold hover:text-black transition disabled:opacity-50 cursor-pointer shrink-0"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Refreshing...' : 'Refresh Rates'}
        </button>
      </div>

      {toast && (
        <div
          role="status"
          className="rounded-xl border border-salwah-gold/40 bg-salwah-gold/10 px-4 py-3 text-sm font-medium text-salwah-gold text-center"
        >
          {toast}
        </div>
      )}

      {/* Section 1: Current Gold Price */}
      <section className="rounded-2xl border border-salwah-gold/20 bg-[#12151e] p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-salwah-gold flex items-center gap-2.5">
              <Coins className="h-6 w-6 shrink-0" />
              Current Gold Price
            </h2>
            <p className="text-sm text-gray-400 mt-1">Read-only prices for selected currency ({currency}).</p>
          </div>
          <span className="text-xs font-mono text-gray-400">
            Spot XAU: {formatCurrency(usdPerOz, 'USD')} / oz t
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {[
            { id: 'gram-24k', label: 'Per Gram @24k', value: prices.perGram24k, highlight: true },
            { id: 'gram-k', label: `Per Gram @${karat}k`, value: prices.perGramK },
            { id: 'oz-k', label: `Per Troy Ounce @${karat}k`, value: prices.perOzK },
            { id: 'tola-k', label: `Per Tola @${karat}k`, value: prices.perTolaK },
            { id: 'bori-k', label: `Per Bori (BD) @${karat}k`, value: prices.perBoriK },
            { id: 'masha-k', label: `Per Masha @${karat}k`, value: prices.perMashaK },
            { id: 'ratti-k', label: `Per Ratti @${karat}k`, value: prices.perRattiK },
          ].map((card) => (
            <div
              key={card.id}
              className={`rounded-xl border p-4 ${
                card.highlight
                  ? 'border-salwah-gold/50 bg-salwah-gold/10'
                  : 'border-white/10 bg-black/45'
              }`}
            >
              <p className="text-xs font-medium text-gray-400">{card.label}</p>
              <p className="mt-1.5 font-serif text-xl sm:text-2xl font-bold text-salwah-gold">
                {formatCurrency(card.value, currency)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Purity / Karat */}
      <section className="rounded-2xl border border-salwah-gold/20 bg-[#12151e] p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Purity / Karat</h2>
            <p className="text-sm text-gray-400">Adjusts purity for all calculations below.</p>
          </div>
          <div className="rounded-xl border border-salwah-gold/40 bg-salwah-gold/10 px-4 py-2 text-base font-bold text-salwah-gold">
            Karat: {karat}k ({purityPct}% pure)
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="range"
            min={14}
            max={24}
            step={1}
            value={karat}
            onChange={(e) => setKarat(Number(e.target.value))}
            aria-label="Gold purity in karats"
            className="w-full accent-[#f6df91] cursor-pointer"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {KARAT_PRESETS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKarat(k)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold border transition cursor-pointer ${
                    karat === k
                      ? 'border-salwah-gold bg-salwah-gold text-black'
                      : 'border-white/15 bg-black/50 text-gray-300 hover:border-salwah-gold/50 hover:text-salwah-gold'
                  }`}
                >
                  {k}k
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-400">South Asian bridal jewellery is commonly 22k (91.7%) or 21k (87.5%)</span>
          </div>
        </div>
      </section>

      {/* Sections 3 & 4: Two Interactive Calculators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Section 3: What Can My Budget Buy? */}
        <section className="rounded-2xl border border-salwah-gold/25 bg-[#12151e] p-6 sm:p-7 space-y-5">
          <h2 className="font-serif text-2xl font-bold text-salwah-gold flex items-center gap-2.5">
            <Calculator className="h-5 w-5 shrink-0" />
            What Can My Budget Buy?
          </h2>

          <div className="space-y-3">
            <label htmlFor="gold-budget" className="block text-xs uppercase tracking-wider text-gray-400">
              Budget Amount ({currency})
            </label>
            <input
              id="gold-budget"
              type="number"
              min={0}
              step={100}
              value={budget}
              onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-salwah-gold/30 bg-black/60 px-4 py-3 text-lg font-semibold text-white"
            />
            <input
              type="range"
              min={0}
              max={100000}
              step={100}
              value={Math.min(100000, budget)}
              onChange={(e) => setBudget(Number(e.target.value))}
              aria-label="Budget amount slider"
              className="w-full accent-[#f6df91] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatCurrency(0, currency)}</span>
              <span>{formatCurrency(50000, currency)}</span>
              <span>{formatCurrency(100000, currency)}</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/45 p-4 space-y-2.5 text-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-salwah-gold mb-2">
              You can buy approx. ({karat}k)
            </p>
            <div className="flex justify-between">
              <span className="text-gray-300">Grams:</span>
              <span className="font-mono font-semibold text-white">{budgetBuy.grams.toFixed(3)} g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Troy Ounces:</span>
              <span className="font-mono font-semibold text-white">{budgetBuy.oz.toFixed(3)} oz t</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Tola:</span>
              <span className="font-mono font-semibold text-white">{budgetBuy.tola.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Bori (BD):</span>
              <span className="font-mono font-semibold text-white">{budgetBuy.bori.toFixed(3)}</span>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-1">
            <input
              id="zakat-budget"
              type="checkbox"
              checked={showBudgetZakat}
              onChange={(e) => setShowBudgetZakat(e.target.checked)}
              className="h-5 w-5 accent-[#f6df91] cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-200">Show Zakat Implications</span>
          </label>

          {showBudgetZakat && (
            <ZakatPanel
              idPrefix="budget"
              totalGrams={budgetBuy.grams}
              karat={karat}
              valueInCurrency={Math.max(0, Number(budget) || 0)}
              currency={currency}
              nisabGrams={nisabGrams}
              onNisabChange={setNisabGrams}
              zakatRate={zakatRate}
              onZakatRateChange={setZakatRate}
            />
          )}
        </section>

        {/* Section 4: Value of Your Current Gold */}
        <section className="rounded-2xl border border-salwah-gold/25 bg-[#12151e] p-6 sm:p-7 space-y-5">
          <h2 className="font-serif text-2xl font-bold text-salwah-gold flex items-center gap-2.5">
            <Scale className="h-5 w-5 shrink-0" />
            Value of Your Current Gold
          </h2>

          <div className="space-y-2">
            <label htmlFor="gold-holdings" className="block text-xs uppercase tracking-wider text-gray-400">
              Your Holdings
            </label>
            <div className="grid grid-cols-12 gap-3">
              <input
                id="gold-holdings"
                type="number"
                min={0}
                step="any"
                value={holdingsAmount}
                onChange={(e) => setHoldingsAmount(Math.max(0, Number(e.target.value) || 0))}
                className="col-span-7 rounded-xl border border-salwah-gold/30 bg-black/60 px-4 py-3 text-lg font-semibold text-white text-right"
              />
              <select
                aria-label="Gold weight unit"
                value={holdingsUnit}
                onChange={(e) => setHoldingsUnit(e.target.value as WeightUnit)}
                className="col-span-5 rounded-xl border border-salwah-gold/30 bg-black/70 px-3 py-3 text-sm font-semibold text-white"
              >
                {WEIGHT_UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-salwah-gold/40 bg-salwah-gold/10 p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Estimated Market Value ({karat}k)
            </p>
            <p className="mt-1.5 font-serif text-3xl sm:text-4xl font-bold text-salwah-gold">
              {formatCurrency(holdingsCalc.marketValue, currency)}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/45 p-4 space-y-2 text-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Equivalent to:</p>
            <div className="flex justify-between">
              <span className="text-gray-300">Grams:</span>
              <span className="font-mono font-semibold text-white">{holdingsCalc.grams.toFixed(3)} g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Troy Ounces:</span>
              <span className="font-mono font-semibold text-white">{holdingsCalc.oz.toFixed(3)} oz t</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Tola:</span>
              <span className="font-mono font-semibold text-white">{holdingsCalc.tola.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Bori (BD):</span>
              <span className="font-mono font-semibold text-white">{holdingsCalc.bori.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Masha:</span>
              <span className="font-mono font-semibold text-white">{holdingsCalc.masha.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Ratti:</span>
              <span className="font-mono font-semibold text-white">{holdingsCalc.ratti.toFixed(3)}</span>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer pt-1">
            <input
              id="zakat-holdings"
              type="checkbox"
              checked={showHoldingsZakat}
              onChange={(e) => setShowHoldingsZakat(e.target.checked)}
              className="h-5 w-5 accent-[#f6df91] cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-200">Show Zakat Implications</span>
          </label>

          {showHoldingsZakat && (
            <ZakatPanel
              idPrefix="holdings"
              totalGrams={holdingsCalc.grams}
              karat={karat}
              valueInCurrency={holdingsCalc.marketValue}
              currency={currency}
              nisabGrams={nisabGrams}
              onNisabChange={setNisabGrams}
              zakatRate={zakatRate}
              onZakatRateChange={setZakatRate}
            />
          )}
        </section>
      </div>
    </div>
  );
}
