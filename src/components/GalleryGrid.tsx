import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryCategory } from '@/data/gallery';

export interface OptimizedGalleryItem {
  id: number;
  src: string;
  thumbSrc: string;
  width: number;
  height: number;
  category: Exclude<GalleryCategory, 'all'>;
  title: string;
  alt: string;
}

const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'stages', label: 'Stage Decor' },
  { id: 'catering', label: 'Halal Catering' },
  { id: 'desserts', label: 'Desserts' },
];

export default function GalleryGrid({ items }: { items: OptimizedGalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIdx(index);
  const closeLightbox = () => setLightboxIdx(null);
  const stepLightbox = (delta: number) => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + delta + filtered.length) % filtered.length);
  };

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setLightboxIdx(null);
              }}
              aria-pressed={active}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition cursor-pointer ${
                active
                  ? 'bg-salwah-gold text-black shadow-md shadow-salwah-gold/20'
                  : 'border border-salwah-gold/30 bg-[#11131b] text-gray-200 hover:border-salwah-gold hover:text-salwah-gold'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((photo, idx) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => openLightbox(idx)}
            className="group relative overflow-hidden rounded-2xl border border-salwah-gold/20 bg-[#11131a] text-left aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-salwah-gold cursor-pointer"
          >
            <img
              src={photo.thumbSrc}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-salwah-gold">
                {photo.category}
              </span>
              <span className="font-serif text-lg font-bold text-white mt-0.5">
                {photo.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightboxIdx].title}
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image preview"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-salwah-gold text-black hover:bg-salwah-gold-light cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].alt}
              className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain border border-salwah-gold/30"
            />

            <div className="mt-4 flex items-center justify-between w-full max-w-2xl gap-4">
              <button
                type="button"
                onClick={() => stepLightbox(-1)}
                aria-label="Previous photo"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-salwah-gold/40 bg-black/80 text-salwah-gold hover:bg-salwah-gold hover:text-black transition cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-center">
                <p className="font-serif text-lg font-bold text-white">
                  {filtered[lightboxIdx].title}
                </p>
                <p className="text-xs text-gray-400">{filtered[lightboxIdx].alt}</p>
              </div>
              <button
                type="button"
                onClick={() => stepLightbox(1)}
                aria-label="Next photo"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-salwah-gold/40 bg-black/80 text-salwah-gold hover:bg-salwah-gold hover:text-black transition cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
