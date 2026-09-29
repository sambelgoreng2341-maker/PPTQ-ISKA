import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/pesantrenData';

interface HeroSlideshowProps {
  onOpenRegister?: () => void;
}

// Kecepatan Slide Show yang Tenang & Elegan: 10.500 ms (10,5 detik per slide)
const SLIDE_DURATION = 10500;

export const HeroSlideshow: React.FC<HeroSlideshowProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Touch gesture refs for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const slideCount = HERO_SLIDES.length;

  const handleNext = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount);
      setIsExiting(false);
      setProgress(0);
    }, 450);
  }, [slideCount]);

  const handlePrev = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
      setIsExiting(false);
      setProgress(0);
    }, 450);
  }, [slideCount]);

  const handleSelectSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsExiting(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsExiting(false);
      setProgress(0);
    }, 450);
  };

  // Continuous auto-slide timer (10.5s delay with graceful text exit before transition)
  useEffect(() => {
    const intervalStep = 50; // 50ms interval
    const stepIncrement = (intervalStep / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev + stepIncrement;
        // Tulisan mulai menghilang dengan tenang & halus sekitar 850ms sebelum slide berganti
        if (nextVal >= 91 && nextVal < 100) {
          setIsExiting(true);
        }
        if (nextVal >= 100) {
          setCurrentIndex((curr) => (curr + 1) % slideCount);
          setIsExiting(false);
          return 0;
        }
        return nextVal;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [slideCount]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section 
      className="relative w-full bg-stone-950 overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Aktivitas Harian Santri IQBS Sukoharjo"
    >
      {/* 
        Vertical height: min-h-[130vh] sm:min-h-[132vh]
        Memberikan ruang visual yang megah, luas, dan memanjang ke bawah
      */}
      <div className="relative w-full min-h-[130vh] sm:min-h-[132vh] flex flex-col justify-between pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-14">
        
        {/* 
          Kecepatan Transisi Fade (Memudar Lembut & Tenang): 1.800 ms
          Gambar lama perlahan menghilang (fade-out), gambar baru muncul perlahan (fade-in)
        */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
                isActive
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                style={{ objectPosition: slide.objectPosition || 'center' }}
                className="w-full h-full object-cover"
              />
              {/* Subtle cinematic gradient overlays for high typography contrast and pristine photo clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/35 to-transparent" />
            </div>
          );
        })}

        {/* 
          Left and Right Circular Translucent Arrow Buttons
          Centered vertically for intuitive user control
        */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-900/40 hover:bg-stone-900/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl group cursor-pointer"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-900/40 hover:bg-stone-900/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl group cursor-pointer"
          aria-label="Slide selanjutnya"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 
          Main Editorial Stage:
          - Posisi naik di mobile (-translate-y-8 sm:translate-y-0) dan padding samping lega (px-12 sm:px-12)
            agar teks tidak menabrak tombol panah geser kiri-kanan
          - Teks masuk dari samping lembut dengan durasi lambat & elegan (animate-hero-*)
          - Jeda 1 detik berurutan antar baris teks
          - Teks menghilang dengan halus & elegan sebelum slide berganti (animate-hero-exit)
          - Center-aligned on mobile, left-aligned on sm+
        */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-12 sm:px-12 lg:px-16 my-auto -translate-y-8 sm:translate-y-0 py-8 sm:py-24">
          <div 
            className={`max-w-4xl text-center sm:text-left mx-auto sm:mx-0 flex flex-col items-center sm:items-start ${
              isExiting ? 'animate-hero-exit' : ''
            }`}
            key={currentIndex}
          >
            
            {/* Step 1: Subtle Sub-headline like "World Class Facility" */}
            <div className="animate-hero-badge mb-2 sm:mb-3 w-full">
              <span className="text-emerald-300 font-medium text-base sm:text-xl md:text-2xl font-display italic tracking-wide drop-shadow-sm block text-center sm:text-left">
                {currentSlide.badge}
              </span>
            </div>

            {/* Step 2: Main Luxury Serif Headline */}
            <h1 className="animate-hero-title text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white tracking-tight leading-[1.15] sm:leading-[1.1] mb-3 sm:mb-6 [text-wrap:balance] drop-shadow-lg text-center sm:text-left">
              {currentSlide.title}
            </h1>

            {/* Step 3: Subtitle / Description */}
            <p className="animate-hero-desc text-stone-200 text-xs sm:text-base md:text-lg font-normal leading-relaxed mb-5 sm:mb-8 max-w-2xl text-stone-200/90 drop-shadow-sm text-center sm:text-left mx-auto sm:mx-0">
              {currentSlide.subtitle}
            </p>

            {/* Step 4: Golden "Selengkapnya" Button */}
            <div className="animate-hero-actions pt-1 sm:pt-2 w-full flex justify-center sm:justify-start">
              <a
                href="#tentang"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm sm:text-base rounded-lg shadow-xl shadow-amber-400/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                Selengkapnya
              </a>
            </div>

          </div>
        </div>

        {/* 
          Bottom Bar:
          - Left: Prayer Schedule Pill (sukoharjo & waktu sholat)
          - Center: Scroll Down Indicator
          - Right: Minimalist, slender indicator progress bars
        */}
        <div className="relative z-20 w-full pt-6 px-6 sm:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Prayer Schedule / Waktu Sholat Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-emerald-950/85 hover:bg-emerald-900/90 border border-emerald-700/70 backdrop-blur-md shadow-2xl text-xs text-white transition-all">
              <span className="text-base leading-none">🕌</span>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300 text-xs">
                  <span>Subuh 04:18 WIB</span>
                  <span className="text-emerald-500 font-normal">·</span>
                  <span className="text-stone-300 font-normal">Sukoharjo</span>
                </div>
                <span className="text-[10px] text-stone-300/80">
                  Jadwal Ibadah Santri PPTQ ISKA
                </span>
              </div>
            </div>

            {/* Center: Subtle Scroll Indicator */}
            <a
              href="#tentang"
              className="hidden lg:flex flex-col items-center text-[11px] text-stone-300/80 hover:text-white transition-colors group cursor-pointer"
            >
              <span className="text-[10px] tracking-widest uppercase mb-1.5 text-stone-300 group-hover:text-amber-300">Scroll</span>
              <div className="w-5 h-8 rounded-full border border-white/40 flex justify-center pt-1.5 group-hover:border-amber-400 transition-colors">
                <span className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
              </div>
            </a>

            {/* Minimalist, slender indicator bars */}
            <div className="flex items-center gap-2 self-center sm:self-auto">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSlide(i)}
                  className="py-3 px-1 group cursor-pointer focus:outline-none"
                  aria-label={`Lihat slide ${i + 1}`}
                >
                  <div
                    className={`h-[3px] rounded-full transition-all duration-500 overflow-hidden ${
                      i === currentIndex ? 'w-12 sm:w-16 bg-stone-700/80' : 'w-5 sm:w-7 bg-stone-700/40 group-hover:bg-stone-500/70'
                    }`}
                  >
                    {i === currentIndex && (
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-75 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
