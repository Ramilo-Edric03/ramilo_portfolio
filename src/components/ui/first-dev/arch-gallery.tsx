'use client';

import { useState, useRef, type CSSProperties, type UIEvent } from 'react';

// ---------------------------------------------------------------------------
// Props & Types
// ---------------------------------------------------------------------------
export type GalleryItem = {
  image: { src: string; alt?: string };
  title?: string;
};

export type ArchGalleryProps = {
  items?: GalleryItem[];
  cardWidth?: number;
  cardHeight?: number;
  cornerRadius?: number;
  className?: string;
};

// ---------------------------------------------------------------------------
// Curated Architectural Defaults (Ready for User Customization)
// ---------------------------------------------------------------------------
const DEFAULT_ITEMS: GalleryItem[] = [
  {
    image: {
      src: 'https://ik.imagekit.io/fxzzjqc0u/archGallery/fun%20run.png',
      alt: 'Chowking Fun Run',
    },
    title: 'Fun Run',
  },
  {
    image: {
      src: 'https://ik.imagekit.io/fxzzjqc0u/archGallery/foods.png',
      alt: 'Exploring diverse culinary dishes and street foods',
    },
    title: 'Exploring Diverse Cuisines',
  },
  {
    image: {
      src: 'https://ik.imagekit.io/fxzzjqc0u/archGallery/IMG_6346.JPG?updatedAt=1790517114395',
      alt: 'Late night competitive valorant session',
    },
    title: 'VLR',
  },
  {
    image: {
      src: 'https://ik.imagekit.io/fxzzjqc0u/archGallery/IMG_0335.JPG?updatedAt=1790517225549',
      alt: 'AWS Community Day Philippines keynotes and workshops',
    },
    title: 'AWS Community Day Philippines',
  },
  {
    image: {
      src: 'https://ik.imagekit.io/fxzzjqc0u/archGallery/IMG_0391.JPG?updatedAt=1790517114420',
      alt: 'Competing in Hack4Gov CALABARZON cybersecurity CTF challenge',
    },
    title: 'Hack4Gov CTF',
  },
  {
    image: {
      src: 'https://ik.imagekit.io/fxzzjqc0u/archGallery/original%202025-02-26%20090214.867.jpg?updatedAt=1790517114355',
      alt: 'Gym strength training and consistency',
    },
    title: 'Gym Sessions'
  },
  {
    image: {
      src: 'https://ik.imagekit.io/fxzzjqc0u/archGallery/cpm35%202026-05-04%201807510A4A0850A7F9.JPG',
      alt: 'Special moments and memories with my partner',
    },
    title: 'My Bebi',
  },
];

const ROTATE_STEP = 5.5;
const Y_STEP = 16;
const OVERLAP = 0.56;
const HOVER_SCALE = 1.08;
const HOVER_LIFT = 20;

export function ArchGallery({
  items = DEFAULT_ITEMS,
  cardWidth = 190,
  cardHeight = 260,
  cornerRadius = 0,
  className = '',
}: ArchGalleryProps) {
  const deck = items.length ? items : DEFAULT_ITEMS;
  const total = deck.length;
  const mid = (total - 1) / 2;

  // Desktop Hover State
  const [hovered, setHovered] = useState<number | null>(null);

  // Mobile Touch Navigation State
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const stageWidth =
    cardWidth + Math.abs(mid) * 2 * cardWidth * OVERLAP + cardWidth * 0.2;
  const stageHeight = cardHeight + Math.abs(mid) * Y_STEP + 48;

  const desktopActiveItem = hovered !== null ? deck[hovered] : null;
  const mobileActiveItem = deck[mobileActiveIndex] || deck[0];

  // Mobile snap scroll sync
  const handleMobileScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardEl = el.firstElementChild as HTMLElement | null;
    if (!cardEl) return;
    const cardWidthWithGap = cardEl.offsetWidth + 12; // 12px gap
    const index = Math.round(el.scrollLeft / cardWidthWithGap);
    const clamped = Math.max(0, Math.min(total - 1, index));
    if (clamped !== mobileActiveIndex) {
      setMobileActiveIndex(clamped);
    }
  };

  const scrollToMobileIndex = (targetIndex: number) => {
    if (!mobileScrollRef.current) return;
    const clamped = Math.max(0, Math.min(total - 1, targetIndex));
    const targetChild = mobileScrollRef.current.children[
      clamped
    ] as HTMLElement | null;
    if (targetChild) {
      targetChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setMobileActiveIndex(clamped);
    }
  };

  return (
    <div
      className={['w-full flex flex-col items-center justify-center', className]
        .filter(Boolean)
        .join(' ')}
      role='region'
      aria-label='Community and life photographic archive'
    >
      {/* =================================================================== */}
      {/* 1. MOBILE EXPERIENCE (< md): Touch-Native Snap Swiper Carousel     */}
      {/* =================================================================== */}
      <div className='flex md:hidden flex-col items-center w-full space-y-3.5 px-2'>
        {/* Mobile Telemetry Header */}
        <div className='w-full border border-white/10 bg-zinc-950 p-2.5 flex items-center justify-between text-xs font-mono rounded-none'>
          <div className='flex items-center gap-2 truncate'>
            <span className='w-1.5 h-1.5 bg-white inline-block shrink-0 animate-pulse' />
            <span className='text-zinc-500 uppercase tracking-wider shrink-0'>
              [{String(mobileActiveIndex + 1).padStart(2, '0')}/
              {String(total).padStart(2, '0')}]
            </span>
            <span className='text-white font-medium truncate text-xs'>
              {mobileActiveItem.title}
            </span>
          </div>
        </div>

        {/* Mobile Scroll Snap Card Track */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className='w-full flex overflow-x-auto snap-x snap-mandatory gap-3 py-1 px-4 scroll-smooth [&::-webkit-scrollbar]:hidden'
        >
          {deck.map((entry, index) => {
            const isActive = mobileActiveIndex === index;
            return (
              <div
                key={`mobile-${entry.image.src}-${index}`}
                onClick={() => scrollToMobileIndex(index)}
                className={`snap-center shrink-0 w-[72vw] max-w-[270px] h-[330px] relative border transition-all duration-300 rounded-none overflow-hidden bg-zinc-950 select-none cursor-pointer ${
                  isActive
                    ? 'border-white/50 shadow-[0_12px_32px_rgba(0,0,0,0.9)] scale-[1.01]'
                    : 'border-white/10 opacity-75 scale-[0.98]'
                }`}
                role='group'
                aria-label={entry.title || `Archive item ${index + 1}`}
              >
                <img
                  src={entry.image.src}
                  alt={entry.image.alt || entry.title || ''}
                  draggable={false}
                  className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
                    isActive
                      ? 'filter-none'
                      : 'grayscale-[35%] contrast-[1.05] brightness-90'
                  }`}
                  loading='lazy'
                  decoding='async'
                />

                {/* Blueprint Gradient Vignette */}
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/15' />

                {/* Top Blueprint Stamps */}
                <div className='absolute top-2 left-2 right-2 flex items-center justify-between text-xs font-mono text-zinc-300 pointer-events-none'>
                  <span className='bg-black/85 px-1.5 py-0.5 border border-white/10'>
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom Context Badge */}
                <div className='absolute bottom-3 left-3 right-3 text-left pointer-events-none space-y-1'>
                  {entry.title && (
                    <div className='font-sans font-bold text-sm text-white tracking-tight leading-snug line-clamp-2'>
                      {entry.title}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Pager Controls & Track */}
        <div className='flex items-center justify-between w-full max-w-[270px] pt-1'>
          <button
            type='button'
            onClick={() => scrollToMobileIndex(mobileActiveIndex - 1)}
            disabled={mobileActiveIndex === 0}
            className='px-3 py-1.5 border border-white/15 bg-zinc-950 text-xs font-mono uppercase text-zinc-300 disabled:opacity-25 disabled:pointer-events-none hover:border-white/40 active:bg-white active:text-black transition-colors rounded-none'
            aria-label='Previous photo'
          >
            ← PREV
          </button>

          <div className='flex items-center gap-1.5'>
            {deck.map((_, i) => (
              <button
                key={`dot-${i}`}
                type='button'
                onClick={() => scrollToMobileIndex(i)}
                className={`h-1.5 transition-all rounded-none ${
                  mobileActiveIndex === i
                    ? 'w-5 bg-white'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to photo ${i + 1}`}
              />
            ))}
          </div>

          <button
            type='button'
            onClick={() => scrollToMobileIndex(mobileActiveIndex + 1)}
            disabled={mobileActiveIndex === total - 1}
            className='px-3 py-1.5 border border-white/15 bg-zinc-950 text-xs font-mono uppercase text-zinc-300 disabled:opacity-25 disabled:pointer-events-none hover:border-white/40 active:bg-white active:text-black transition-colors rounded-none'
            aria-label='Next photo'
          >
            NEXT →
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. DESKTOP EXPERIENCE (>= md): 3D Fan-Out Blueprint Stage           */}
      {/* =================================================================== */}
      <div className='hidden md:flex flex-col items-center justify-center w-full py-2'>
        <div className='w-full max-w-full overflow-hidden flex items-center justify-center py-4 px-4'>
          <div
            className='relative transform-gpu md:scale-[0.90] lg:scale-100 origin-center transition-transform duration-300'
            style={{ width: stageWidth, height: stageHeight }}
          >
            {deck.map((entry, index) => {
              const offset = index - mid;
              const rotate = offset * ROTATE_STEP;
              const translateY = Math.abs(offset) * Y_STEP;
              const translateX = offset * cardWidth * OVERLAP;
              const baseZ = total - Math.abs(offset);
              const isHovered = hovered === index;

              const cardStyle: CSSProperties = {
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: cardWidth,
                height: cardHeight,
                marginLeft: -cardWidth / 2,
                marginTop: -cardHeight / 2,
                borderRadius: cornerRadius,
                overflow: 'hidden',
                transformOrigin: 'center bottom',
                transform: isHovered
                  ? `translate(${translateX}px, ${
                      translateY - HOVER_LIFT
                    }px) rotate(0deg) scale(${HOVER_SCALE})`
                  : `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(1)`,
                zIndex: isHovered ? total + 10 : baseZ,
                transition:
                  'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), z-index 0ms, border-color 200ms ease, box-shadow 280ms ease',
                boxShadow: isHovered
                  ? '0 24px 48px -12px rgba(0,0,0,0.9), 0 0 24px rgba(255,255,255,0.08)'
                  : '0 12px 28px -6px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                backgroundColor: '#09090b',
                border: isHovered
                  ? '1px solid rgba(255, 255, 255, 0.45)'
                  : '1px solid rgba(255, 255, 255, 0.12)',
              };

              return (
                <div
                  key={`desktop-${entry.image.src}-${index}`}
                  style={cardStyle}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  aria-label={
                    entry.title
                      ? `${entry.title}`
                      : entry.image.alt || `Archive item ${index + 1}`
                  }
                  className='group outline-none focus-visible:ring-1 focus-visible:ring-white select-none'
                >
                  <img
                    src={entry.image.src}
                    alt={entry.image.alt || entry.title || ''}
                    draggable={false}
                    className={`pointer-events-none absolute inset-0 h-full w-full select-none object-cover transition-all duration-300 ${
                      isHovered
                        ? 'filter-none scale-105'
                        : 'grayscale-[25%] contrast-[1.05] brightness-90'
                    }`}
                    loading='lazy'
                    decoding='async'
                  />

                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10' />

                  {/* Top Blueprint Stamp Header */}
                  <div className='absolute top-2 left-2 right-2 flex items-center justify-between text-xs font-mono tracking-wider text-zinc-300 pointer-events-none'>
                    <span className='bg-black/80 px-1.5 py-0.5 border border-white/10'>
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Bottom Context Badge */}
                  <div className='absolute bottom-2 left-2 right-2 text-left pointer-events-none space-y-0.5'>
                    {entry.title && (
                      <div className='font-sans font-bold text-xs text-white tracking-tight line-clamp-2 leading-tight'>
                        {entry.title}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Technical HUD Telemetry Strip */}
        <div className='mt-2 sm:mt-4 flex items-center justify-center px-4 max-w-xl w-full'>
          <div className='border border-white/10 bg-zinc-950/80 px-4 py-2 font-mono text-xs text-zinc-400 flex items-center justify-between gap-4 w-full rounded-none'>
            <div className='flex items-center gap-2 truncate'>
              <span className='text-zinc-500 uppercase tracking-wider text-xs shrink-0'>
                {desktopActiveItem
                  ? `[LOG ${String((hovered ?? 0) + 1).padStart(2, '0')}/${String(
                      total
                    ).padStart(2, '0')}]`
                  : `[ARCHIVE // ${total} ENTRIES]`}
              </span>
              <span className='text-white font-medium truncate text-xs'>
                {desktopActiveItem
                  ? `${desktopActiveItem.title}`
                  : 'Hover or focus an entry.'}
              </span>
            </div>
            <span className='text-xs text-zinc-500 shrink-0 hidden sm:inline-block uppercase tracking-wider'>
              {'COMMUNITY & LIFE'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
