import React, { useState } from 'react';
import { BookOpen, GraduationCap, Building2, Clock, Check, ChevronRight, Award } from 'lucide-react';
import { CURRICULUM_PILLARS, DAILY_ROUTINE, EKSTRAKURIKULER } from '../data/pesantrenData';

export const CurriculumSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'quran' | 'formal' | 'mulazamah'>('quran');
  const [scheduleFilter, setScheduleFilter] = useState<'semua' | 'ibadah' | 'akademik' | 'kemandirian'>('semua');

  const selectedPillar = CURRICULUM_PILLARS.find((p) => p.id === activePillar) || CURRICULUM_PILLARS[0];

  const filteredSchedule = DAILY_ROUTINE.filter((item) => {
    if (scheduleFilter === 'semua') return true;
    return item.category === scheduleFilter;
  });

  return (
    <section id="kurikulum" className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-2">
            Struktur Pendidikan Terpadu
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900 tracking-tight [text-wrap:balance]">
            Kurikulum Sinergi Pesantren & Formal
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Memadukan kekuatan hafalan Al-Qur'an bersanad, wawasan kitab mulazamah turats, dan keunggulan sains dalam kurikulum formal berijazah negara.
          </p>
        </div>

        {/* 3 Pillar Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActivePillar('quran')}
            className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer ${
              activePillar === 'quran'
                ? 'bg-emerald-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activePillar === 'quran' ? 'text-amber-400' : 'text-emerald-700'}`} />
            <span>1. Al-Qur'an & Tahfizh Sanad</span>
          </button>

          <button
            onClick={() => setActivePillar('formal')}
            className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer ${
              activePillar === 'formal'
                ? 'bg-emerald-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activePillar === 'formal' ? 'text-amber-400' : 'text-emerald-700'}`} />
            <span>2. Formal SMP/MTs (Ijazah Negara)</span>
          </button>

          <button
            onClick={() => setActivePillar('mulazamah')}
            className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer ${
              activePillar === 'mulazamah'
                ? 'bg-emerald-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <Building2 className={`w-4 h-4 ${activePillar === 'mulazamah' ? 'text-amber-400' : 'text-emerald-700'}`} />
            <span>3. Sistem Mulazamah & Adab</span>
          </button>
        </div>

        {/* Selected Pillar Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                {selectedPillar.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mb-3">
                {selectedPillar.title}
              </h3>
              <p className="text-stone-700 font-medium text-base mb-4 text-emerald-950/80">
                "{selectedPillar.lead}"
              </p>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                {selectedPillar.description}
              </p>

              {/* Target Capaian */}
              <div className="mb-6">
                <span className="text-xs uppercase font-bold text-stone-500 tracking-wider block mb-3">
                  Target Capaian Kompetensi:
                </span>
                <div className="space-y-2">
                  {selectedPillar.targets.map((target, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-stone-800">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mata Pelajaran / Modul Materi */}
            <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-bold uppercase tracking-wider text-stone-800">
                    Mata Pelajaran & Kajian Terkait
                  </span>
                </div>
                <div className="space-y-2">
                  {selectedPillar.subjects.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm font-medium text-stone-800 flex items-center justify-between"
                    >
                      <span>{sub}</span>
                      <span className="text-emerald-700 text-xs font-semibold">Tersertifikasi</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500">
                <span>Diampu oleh asatidz alumni Timur Tengah & perguruan tinggi negeri terkemuka.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 24-Hour Daily Schedule Timeline */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-1">
                Aktivitas Harian Santri
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                Jadwal Rutinitas Santri 24 Jam
              </h3>
            </div>

            {/* Schedule filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-200 rounded-xl mt-4 sm:mt-0 text-xs">
              <button
                onClick={() => setScheduleFilter('semua')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  scheduleFilter === 'semua' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setScheduleFilter('ibadah')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  scheduleFilter === 'ibadah' ? 'bg-white text-emerald-900 shadow-sm font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Ibadah
              </button>
              <button
                onClick={() => setScheduleFilter('akademik')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  scheduleFilter === 'akademik' ? 'bg-white text-emerald-900 shadow-sm font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                KBM & Tahfizh
              </button>
              <button
                onClick={() => setScheduleFilter('kemandirian')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  scheduleFilter === 'kemandirian' ? 'bg-white text-emerald-900 shadow-sm font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Kemandirian
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSchedule.map((sched, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-800 mb-2">
                      <span className="font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {sched.time} WIB
                      </span>
                      <span className="capitalize text-[11px] px-2 py-0.5 rounded bg-stone-200/70 text-stone-700">
                        {sched.category}
                      </span>
                    </div>
                    <h4 className="text-base font-bold font-display text-stone-900 mb-1">
                      {sched.activity}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {sched.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ekstrakurikuler Grid (Directly from Brochure) */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-1">
              Keseimbangan Raga & Keterampilan
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              8 Pilihan Ekstrakurikuler Santri
            </h3>
            <p className="text-stone-600 text-sm mt-2">
              Sesuai sunnah dan kebutuhan masa kini untuk membentuk santri berbadan sehat, tangkas, dan percaya diri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EKSTRAKURIKULER.map((ekskul, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-emerald-600/40 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    <h4 className="font-display font-bold text-stone-900 text-base">
                      {ekskul.name}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {ekskul.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
