import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Tag, Calendar, Building, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS, FASILITAS, GalleryPhoto } from '../data/pesantrenData';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tahfizh' | 'akademik' | 'asrama' | 'ekskul' | 'outbound'>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = GALLERY_ITEMS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const handleOpenLightbox = (photo: GalleryPhoto) => {
    setLightboxPhoto(photo);
  };

  const handleNextPhoto = () => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section id="galeri" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-2">
              Dokumentasi & Sarana
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900 tracking-tight [text-wrap:balance]">
              Galeri Kegiatan & Fasilitas Santri
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md mt-3 md:mt-0">
            Merekam dinamika kehidupan islami, kesungguhan menuntut ilmu, dan kebersamaan santri di lingkungan kampus IQBS Sukoharjo.
          </p>
        </div>

        {/* Filter buttons (Interactive filter controls, allowed by design guidelines) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl max-w-fit mb-8 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Semua Foto
          </button>
          <button
            onClick={() => setActiveCategory('tahfizh')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'tahfizh'
                ? 'bg-white text-emerald-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tahfizh & Ibadah
          </button>
          <button
            onClick={() => setActiveCategory('asrama')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'asrama'
                ? 'bg-white text-emerald-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Asrama & Kampus
          </button>
          <button
            onClick={() => setActiveCategory('ekskul')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'ekskul'
                ? 'bg-white text-emerald-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Ekstrakurikuler
          </button>
          <button
            onClick={() => setActiveCategory('outbound')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'outbound'
                ? 'bg-white text-emerald-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Outbound & Rihlah
          </button>
        </div>

        {/* Photo Grid with Zoom Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(photo)}
              className={`group relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-200 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Photo Card Overlay Details */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-300">
                    {photo.categoryLabel}
                  </span>
                  <div className="p-2 rounded-lg bg-stone-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity text-stone-200">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2">
                    {photo.caption}
                  </p>
                  <div className="mt-2 text-[11px] text-stone-400 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{photo.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities Grid from Brochure */}
        <div className="pt-12 border-t border-stone-200">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-1">
              Sarana Penunjang Lengkap
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Fasilitas Pesantren IQBS
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              Mendukung kenyamanan santri selama bermukim, belajar, dan beribadah 24 jam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FASILITAS.map((fasilitas, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-600/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <h4 className="font-bold text-stone-900 font-display text-base">
                    {fasilitas.name}
                  </h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {fasilitas.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col">
            
            {/* Lightbox Top Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-800 text-stone-300">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-semibold">{lightboxPhoto.categoryLabel}</span>
                <span>·</span>
                <span>{lightboxPhoto.date}</span>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="p-1.5 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg transition-colors"
                aria-label="Tutup foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Preview */}
            <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
              <img
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[65vh] object-contain"
              />

              {/* Prev / Next buttons */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors border border-stone-700"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-colors border border-stone-700"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Caption & Details */}
            <div className="p-6 bg-stone-900 border-t border-stone-800">
              <h3 className="text-xl font-bold font-display text-white mb-1">
                {lightboxPhoto.title}
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {lightboxPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
