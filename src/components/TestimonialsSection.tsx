import React from 'react';
import { Quote, Award, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/pesantrenData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-2">
            Bukti Nyata Pembinaan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight [text-wrap:balance]">
            Kisah & Pengalaman Bersama IQBS
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Mendengar langsung dari santri berprestasi, orang tua, dan pembimbing di pesantren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-stone-200 hover:border-emerald-600/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-emerald-700/20 mb-3" />
                <p className="text-stone-700 text-sm leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="font-bold text-stone-900 font-display text-base block">
                  {item.name}
                </span>
                <span className="text-xs text-stone-500 block mb-1">
                  {item.role}
                </span>
                <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Banner: Mutqin 30 Juz & Sanad */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 font-bold text-2xl shadow-md">
              30
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Program Unggulan: Target Mutqin 30 Juz & Pengambilan Sanad
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200">
                Diberikan bimbingan talaqqi tajwid bersanad (Matan Jazariyah & Tuhfatul Athfal) hingga siap tasmi' akbar 30 Juz sekali duduk.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-amber-300 bg-emerald-900/60 px-4 py-2 rounded-xl border border-emerald-700">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Ijazah Sanad Resmi</span>
          </div>
        </div>

      </div>
    </section>
  );
};
