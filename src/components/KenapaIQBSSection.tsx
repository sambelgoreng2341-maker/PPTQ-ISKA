import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Quote, BookOpen, GraduationCap, Building2, Languages, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { KENAPA_IQBS, PROGRAM_UNGGULAN, PESANTREN_PROFILE } from '../data/pesantrenData';

interface KenapaIQBSSectionProps {
  onOpenRegister: () => void;
}

export const KenapaIQBSSection: React.FC<KenapaIQBSSectionProps> = () => {
  // Intersection observers for first-time scroll appearance of each column block
  const [isAboutRevealed, setIsAboutRevealed] = useState(false);
  const [isKeunggulanRevealed, setIsKeunggulanRevealed] = useState(false);
  const [isProgramRevealed, setIsProgramRevealed] = useState(false);

  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const keunggulanRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === aboutSectionRef.current) setIsAboutRevealed(true);
          if (entry.target === keunggulanRef.current) setIsKeunggulanRevealed(true);
          if (entry.target === programRef.current) setIsProgramRevealed(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.12 });

    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
    if (keunggulanRef.current) observer.observe(keunggulanRef.current);
    if (programRef.current) observer.observe(programRef.current);

    return () => observer.disconnect();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return BookOpen;
      case 'GraduationCap': return GraduationCap;
      case 'Building': return Building2;
      case 'Languages': return Languages;
      case 'ShieldCheck': return ShieldCheck;
      case 'Sparkles': return Sparkles;
      default: return BookOpen;
    }
  };

  return (
    <section id="tentang" className="py-20 bg-stone-50 border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header / About Lockup (Columns emerge on first scroll) */}
        <div 
          ref={aboutSectionRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20"
        >
          {/* Left Column: Tentang Kami & Visi Misi */}
          <div 
            className={`lg:col-span-7 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              isAboutRevealed
                ? 'opacity-100 translate-y-0 filter-none'
                : 'opacity-0 translate-y-14 blur-[2px]'
            }`}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-3">
              <span>Tentang Kami</span>
              <span aria-hidden="true">·</span>
              <span>PPTQ ISKA Mayang</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900 tracking-tight leading-tight [text-wrap:balance]">
              Mendidik Generasi Qur'ani, Mandiri, dan Menguasai Teknologi
            </h2>
            <p className="mt-5 text-stone-600 text-base sm:text-lg leading-relaxed">
              <strong>ISKA Qur'anic Boarding School (IQBS) Sukoharjo</strong> hadir menjawab tantangan zaman dengan memadukan kekayaan tradisi tahfizh & mulazamah pesantren bersama kurikulum formal pendidikan nasional berstandar negara. Kami berkomitmen mencetak santri beradab mulia, berilmu mendalam, serta siap menghadapi peradaban modern.
            </p>

            {/* Visi Card */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600" />
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 block mb-1">
                Visi Lembaga
              </span>
              <p className="text-lg font-display text-stone-900 italic font-semibold leading-snug">
                "{PESANTREN_PROFILE.name}: Terwujudnya Penyelenggaraan Pendidikan Paripurna untuk Terciptanya Citra Rahmatan Lil'alamin."
              </p>
              
              {/* Misi items */}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-500 block mb-2">
                  Misi Utama:
                </span>
                <ul className="space-y-2 text-sm text-stone-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Mencetak kader hafidz 30 juz yang mutqin dan berakhlakul karimah.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Menyelenggarakan pendidikan formal unggul berwawasan sains & teknologi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Membiasakan komunikasi aktif bahasa Arab dan bahasa Inggris.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Campus Exterior Photo + Hadits Box + Target (Emerge sequentially) */}
          <div 
            style={{ transitionDelay: '180ms' }}
            className={`lg:col-span-5 flex flex-col gap-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              isAboutRevealed
                ? 'opacity-100 translate-y-0 filter-none'
                : 'opacity-0 translate-y-16 blur-[2px]'
            }`}
          >
            
            {/* Scroll-Revealed Image Below Hero ("seolah dia baru muncul") */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-300/80 group bg-stone-950">
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                <img
                  src="/images/iqbs_campus_exterior_1790514275417.jpg"
                  alt="Kompleks Kampus PPTQ ISKA Sukoharjo"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 mb-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Kompleks Kampus PPTQ ISKA</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold font-display text-white leading-snug drop-shadow-sm">
                  Lingkungan Hijau, Asri & Kondusif
                </h4>
                <p className="text-xs text-stone-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Mayang, Gatak, Sukoharjo, Jawa Tengah</span>
                </p>
              </div>
            </div>

            {/* Hadits & Wisdom Quote Box */}
            <div className="bg-emerald-950 text-white p-7 sm:p-8 rounded-2xl border border-emerald-900 shadow-md relative">
              <Quote className="w-10 h-10 text-emerald-500/30 absolute top-6 right-6" />
              <p className="font-display italic text-lg sm:text-xl text-emerald-100 leading-relaxed relative z-10">
                "{PESANTREN_PROFILE.wisdomQuote}"
              </p>
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-emerald-800/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  {PESANTREN_PROFILE.quoteSource}
                </span>
                <span className="text-xs text-emerald-300/80">
                  Hikmah Pendidikan Islam
                </span>
              </div>
            </div>

            {/* Target Capaian Santri */}
            <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 font-bold text-sm">
                  ★
                </div>
                <h3 className="font-display font-bold text-stone-900 text-lg">
                  Target Capaian Santri
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed mb-4">
                Dididik menjadi santri yang dekat dengan Al-Qur'an, memiliki hafalan mutqin, berakhlak mulia, siap memimpin dan siap beradaptasi di era modern.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-stone-800">
                <span className="bg-white px-2.5 py-1 rounded border border-amber-200">Mutqin 30 Juz</span>
                <span className="bg-white px-2.5 py-1 rounded border border-amber-200">Sanad Matan Tajwid</span>
                <span className="bg-white px-2.5 py-1 rounded border border-amber-200">Ijazah Resmi SMP/MTs</span>
                <span className="bg-white px-2.5 py-1 rounded border border-amber-200">Bahasa Arab & Inggris</span>
              </div>
            </div>

          </div>
        </div>

        {/* Section: Kenapa Memilih IQBS Sukoharjo? (Columns emerge on first scroll) */}
        <div id="keunggulan" ref={keunggulanRef} className="mt-8 pt-12 border-t border-stone-200">
          <div 
            className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-800 ease-out ${
              isKeunggulanRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-2">
              Keunggulan Lembaga
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
              Kenapa Memilih IQBS Sukoharjo?
            </h3>
            <p className="text-stone-600 mt-3 text-sm sm:text-base">
              Empat fondasi utama yang menjadikan proses pendidikan di IQBS unggul, terukur, dan bermakna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KENAPA_IQBS.map((item, idx) => (
              <div
                key={item.number}
                style={{
                  transitionDelay: `${idx * 130}ms`,
                }}
                className={`bg-white p-6 rounded-2xl border border-stone-200/90 hover:border-emerald-600/50 hover:shadow-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between transform ${
                  isKeunggulanRevealed
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-[0.96]'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 font-display font-bold text-xl flex items-center justify-center mb-4 border border-emerald-100">
                    {item.number}
                  </div>
                  <h4 className="text-xl font-bold font-display text-stone-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {item.shortDesc}
                  </p>
                </div>
                <div className="space-y-1.5 pt-3 border-t border-stone-100">
                  {item.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: 6 Program Unggulan (Columns emerge on first scroll) */}
        <div ref={programRef} className="mt-20 pt-12 border-t border-stone-200">
          <div 
            className={`flex flex-col md:flex-row md:items-end justify-between mb-12 transition-all duration-800 ease-out ${
              isProgramRevealed
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-2">
                Pilar Pembelajaran
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
                Program Unggulan Pesantren
              </h3>
            </div>
            <p className="text-stone-600 text-sm max-w-md mt-2 md:mt-0">
              Disusun secara holistik untuk menyeimbangkan kecerdasan spiritual, intelektual, dan ketangguhan raga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAM_UNGGULAN.map((prog, idx) => {
              const Icon = getIcon(prog.iconName);
              return (
                <div
                  key={prog.id}
                  style={{
                    transitionDelay: `${idx * 110}ms`,
                  }}
                  className={`bg-white p-6 rounded-2xl border border-stone-200/90 hover:border-emerald-600/40 hover:shadow-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                    isProgramRevealed
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-12 scale-[0.96]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-stone-900 mb-2">
                    {prog.title}
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-700 pt-3 border-t border-stone-100">
                    {prog.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
