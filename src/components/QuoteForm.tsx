import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Loader2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { SITE } from '@/data/site';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export interface PrefillQuoteDetail {
  guestCount?: string;
  servicesNeeded?: string;
  message?: string;
  label?: string;
}

export interface QuoteFormProps {
  variant?: 'compact' | 'full';
  sourcePage?: string;
  defaultService?: string;
  heading?: string;
  subheading?: string;
  notesLabel?: string;
  notesPlaceholder?: string;
  submitLabel?: string;
  hideWhatsAppFooter?: boolean;
}

const SERVICE_OPTIONS = [
  'Wedding Catering',
  'Stage Decoration',
  'Catering & Stage',
  'Full Event Planning',
];

function normalizeServiceOption(input?: string): string {
  if (!input) return 'Catering & Stage';
  if (SERVICE_OPTIONS.includes(input)) return input;
  const lower = input.toLowerCase();
  if (lower.includes('both') || (lower.includes('catering') && lower.includes('stage'))) {
    return 'Catering & Stage';
  }
  if (lower.includes('stage') || lower.includes('decor')) return 'Stage Decoration';
  if (lower.includes('event') || lower.includes('plan') || lower.includes('manage')) {
    return 'Full Event Planning';
  }
  return 'Wedding Catering';
}

const EVENT_TYPES = [
  'Wedding Reception',
  'Walima',
  'Nikah',
  'Mehndi / Gaye Holud',
  'Baraat',
  'Aqiqah',
  'Corporate / Charity Event',
  'Private Party',
];

const GUEST_RANGES = [
  '50–100 guests',
  '100–200 guests',
  '200–350 guests',
  '350–500 guests',
  '500–750 guests',
  '750–1,000+ guests',
];

export default function QuoteForm({
  variant = 'compact',
  sourcePage = 'Website',
  defaultService = 'Catering & Stage',
  heading = 'Check Date & Request a Quote',
  subheading = 'Packages from £25pp · HMC-certified Halal · Same-day reply by phone or WhatsApp.',
  notesLabel,
  notesPlaceholder = 'e.g. Lamb Kacchi Biryani, Beef Kala Bhuna, floral Walima stage, venue name...',
  submitLabel = 'Check Availability & Get Quote',
  hideWhatsAppFooter = false,
}: QuoteFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('200–350 guests');
  const [servicesNeeded, setServicesNeeded] = useState(normalizeServiceOption(defaultService));
  const [eventType, setEventType] = useState('Wedding Reception');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [prefillBadge, setPrefillBadge] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<PrefillQuoteDetail>;
      const detail = custom.detail;
      if (!detail) return;
      if (detail.guestCount && GUEST_RANGES.includes(detail.guestCount)) {
        setGuestCount(detail.guestCount);
      }
      if (detail.servicesNeeded) {
        setServicesNeeded(normalizeServiceOption(detail.servicesNeeded));
      }
      if (detail.message) {
        setMessage(detail.message);
      }
      setPrefillBadge(detail.label || 'Selection loaded — add your name & number to check date availability');
      setStatus('idle');
    };
    window.addEventListener('salwah:prefill-quote', handler);
    return () => window.removeEventListener('salwah:prefill-quote', handler);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;

    setStatus('submitting');
    setErrorMsg('');

    const payload = new FormData();
    payload.append('access_key', SITE.web3formsAccessKey);
    payload.append('from_name', 'Salwah Events Website');
    payload.append('subject', `New ${servicesNeeded} Enquiry from ${name} (${guestCount})`);
    payload.append('name', name);
    payload.append('phone', phone);
    if (email) payload.append('email', email);
    payload.append('eventDate', eventDate || 'Flexible / TBC');
    payload.append('guestCount', guestCount);
    payload.append('servicesNeeded', servicesNeeded);
    if (variant === 'full') {
      payload.append('eventType', eventType);
      if (location) payload.append('location', location);
    }
    if (message) payload.append('message', message);
    payload.append('sourcePage', sourcePage);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to submit your enquiry right now.');
      }

      // Fire Google Ads Quote / Contact Form Conversion (Conversion 1)
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: SITE.tracking.formSubmitSendTo,
        });
      }
      if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'salwah_quote_submit',
          source_page: sourcePage,
          service_needed: servicesNeeded,
          guest_count: guestCount,
        });
      }

      setStatus('success');
      setName('');
      setPhone('');
      setEmail('');
      setEventDate('');
      setLocation('');
      setMessage('');
      setPrefillBadge('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please call or WhatsApp 07359 337887 directly.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div
        className="glass-quote-card rounded-2xl p-6 sm:p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-salwah-gold/15 border border-salwah-gold/50 text-salwah-gold">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          Thank You — Your Quote Request Is Received!
        </h3>
        <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto mb-6">
          Our team will contact you shortly to discuss your menu consultation, package pricing, and
          availability. Need an instant answer?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-whatsapp inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
          >
            Message Us on WhatsApp
          </a>
          <a
            href={SITE.phoneHref}
            className="btn-luxury-outline inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
          >
            Call {SITE.phoneDisplay}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 text-xs text-gray-400 underline hover:text-salwah-gold cursor-pointer"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="glass-quote-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-salwah-gold to-transparent"
        aria-hidden="true"
      />

      <div className="mb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-salwah-gold/35 bg-salwah-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-salwah-gold mb-3">
          <Clock className="h-3.5 w-3.5" />
          Same-Day Reply • Complimentary Consultation
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">{heading}</h2>
        <p className="mt-1.5 text-sm text-gray-300">{subheading}</p>
      </div>

      {prefillBadge && (
        <div className="mb-4 rounded-xl border border-salwah-gold/45 bg-salwah-gold/12 px-3.5 py-2.5 text-xs font-medium text-salwah-gold flex items-center gap-2">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span>{prefillBadge}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="botcheck"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`qf-name-${variant}`} className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-1.5">
              Full Name *
            </label>
            <input
              id={`qf-name-${variant}`}
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aisha Khan"
              className="w-full rounded-lg border border-salwah-gold/25 bg-black/75 px-3.5 py-3 text-sm text-white placeholder:text-gray-500 focus:border-salwah-gold focus:outline-none focus:ring-1 focus:ring-salwah-gold"
            />
          </div>

          <div>
            <label htmlFor={`qf-phone-${variant}`} className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-1.5">
              Phone / WhatsApp *
            </label>
            <input
              id={`qf-phone-${variant}`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XXX XXXXXX"
              className="w-full rounded-lg border border-salwah-gold/25 bg-black/75 px-3.5 py-3 text-sm text-white placeholder:text-gray-500 focus:border-salwah-gold focus:outline-none focus:ring-1 focus:ring-salwah-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`qf-date-${variant}`} className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-1.5">
              Event Date
            </label>
            <input
              id={`qf-date-${variant}`}
              name="eventDate"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full rounded-lg border border-salwah-gold/25 bg-black/75 px-3.5 py-3 text-sm text-white focus:border-salwah-gold focus:outline-none focus:ring-1 focus:ring-salwah-gold [color-scheme:dark]"
            />
          </div>

          <div>
            <label htmlFor={`qf-guests-${variant}`} className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-1.5">
              Estimated Guest Count *
            </label>
            <select
              id={`qf-guests-${variant}`}
              name="guestCount"
              required
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full rounded-lg border border-salwah-gold/25 bg-black/75 px-3.5 py-3 text-sm text-white focus:border-salwah-gold focus:outline-none focus:ring-1 focus:ring-salwah-gold"
            >
              {GUEST_RANGES.map((range) => (
                <option key={range} value={range} className="bg-[#11131a]">
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <span className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-2">
            Services Needed *
          </span>
          <div className="grid grid-cols-2 gap-2">
            {SERVICE_OPTIONS.map((option) => {
              const selected = servicesNeeded === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setServicesNeeded(option)}
                  aria-pressed={selected}
                  className={`flex items-center justify-center text-center min-h-[46px] rounded-lg border px-3 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                    selected
                      ? 'border-salwah-gold bg-salwah-gold/18 text-salwah-gold shadow-sm shadow-salwah-gold/15'
                      : 'border-white/15 bg-black/50 text-gray-200 hover:border-salwah-gold/45 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {variant === 'full' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="qf-email" className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-1.5">
                  Email Address *
                </label>
                <input
                  id="qf-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-salwah-gold/25 bg-black/75 px-3.5 py-3 text-sm text-white placeholder:text-gray-500 focus:border-salwah-gold focus:outline-none focus:ring-1 focus:ring-salwah-gold"
                />
              </div>

              <div>
                <label htmlFor="qf-location" className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-1.5">
                  Venue / Area / Postcode
                </label>
                <input
                  id="qf-location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. City Pavilion, Ilford, Essex"
                  className="w-full rounded-lg border border-salwah-gold/25 bg-black/75 px-3.5 py-3 text-sm text-white placeholder:text-gray-500 focus:border-salwah-gold focus:outline-none focus:ring-1 focus:ring-salwah-gold"
                />
              </div>
            </div>

            <div>
              <label htmlFor="qf-event-type" className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-1.5">
                Event Type
              </label>
              <select
                id="qf-event-type"
                name="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full rounded-lg border border-salwah-gold/25 bg-black/75 px-3.5 py-3 text-sm text-white focus:border-salwah-gold focus:outline-none focus:ring-1 focus:ring-salwah-gold"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#11131a]">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label htmlFor={`qf-msg-${variant}`} className="block text-xs font-medium uppercase tracking-wider text-salwah-gold mb-1.5">
            {notesLabel ?? (variant === 'full' ? 'Event, Venue & Menu Notes' : 'Venue, Menu or Stage Notes (Optional)')}
          </label>
          <textarea
            id={`qf-msg-${variant}`}
            name="message"
            rows={variant === 'full' ? 4 : 3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={notesPlaceholder}
            className="w-full rounded-lg border border-salwah-gold/25 bg-black/75 px-3.5 py-2.5 text-sm text-white placeholder:text-gray-400 focus:border-salwah-gold focus:outline-none focus:ring-1 focus:ring-salwah-gold resize-none"
          />
        </div>

        {status === 'error' && (
          <p className="rounded-lg border border-red-500/40 bg-red-950/50 px-3.5 py-2.5 text-xs text-red-200" role="alert">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-luxury-gold w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm sm:text-base font-bold whitespace-nowrap disabled:opacity-60 cursor-pointer"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending Your Request...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 shrink-0" />
              {submitLabel}
            </>
          )}
        </button>

        <div className={`flex flex-col sm:flex-row items-center ${hideWhatsAppFooter ? 'justify-center' : 'justify-between'} gap-2 pt-1 text-xs text-gray-300/80`}>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-salwah-gold shrink-0" />
            <span>HMC-certified Halal &middot; Zero obligation</span>
          </p>
          {!hideWhatsAppFooter && (
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-salwah-gold font-semibold hover:text-salwah-gold-light hover:underline transition"
            >
              <span>Or WhatsApp {SITE.phoneDisplay} &rarr;</span>
            </a>
          )}
        </div>
      </form>
    </div>
  );
}
