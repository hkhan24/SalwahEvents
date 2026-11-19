import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { PrefillQuoteDetail } from '@/components/QuoteForm';

export interface ShowcaseSlide {
  id: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
  serviceTarget: string;
  ctaLabel: string;
  href: string;
}

export default function WeddingExperienceShowcase({ slides }: { slides: ShowcaseSlide[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = slides[activeIdx] ?? slides[0];

  const handleEnquireLook = () => {
    const detail: PrefillQuoteDetail = {
      servicesNeeded: current.serviceTarget,
      message: `Interested in: ${current.title}. Please share menus, availability & pricing.`,
      label: `Added "${current.tabLabel}" to your enquiry — tell us your date below!`,
    };
    window.dispatchEvent(new CustomEvent('salwah:prefill-quote', { detail }));
    const el = document.getElementById('quote-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="space-y-8">
      {/* Editorial Pill Tabs */}
      <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Wedding Experience Showcase">
        {slides.map((slide, idx) => {
          const active = idx === activeIdx;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveIdx(idx)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                active
                  ? 'bg-salwah-gold text-black shadow-lg shadow-salwah-gold/25'
                  : 'border border-salwah-gold/30 bg-[#10121a] text-gray-200 hover:border-salwah-gold hover:text-salwah-gold'
              }`}
            >
              {slide.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Active Editorial Panel */}
      <div className="editorial-frame rounded-3xl overflow-hidden bg-[#0e1017] grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] bg-black overflow-hidden">
          <img
            key={current.id}
            src={current.imageSrc}
            alt={current.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0e1017]/60" />
          <span className="absolute bottom-4 left-4 rounded-full border border-salwah-gold/45 bg-black/75 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-salwah-gold">
            {current.eyebrow}
          </span>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              {current.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {current.description}
            </p>
            <ul className="space-y-2.5 pt-2">
              {current.highlights.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-100">
                  <Check className="h-4 w-4 text-salwah-gold mt-0.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleEnquireLook}
              className="btn-luxury-gold inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold cursor-pointer"
            >
              {current.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={current.href}
              className="inline-flex items-center justify-center rounded-xl border border-salwah-gold/40 px-4 py-3.5 text-sm font-semibold text-salwah-gold hover:bg-salwah-gold hover:text-black transition"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
