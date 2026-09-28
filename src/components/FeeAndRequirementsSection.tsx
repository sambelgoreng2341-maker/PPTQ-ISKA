import React from 'react';
import { CheckSquare, FileText, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { RINCIAN_BIAYA, SYARAT_PENDAFTARAN, PESANTREN_PROFILE } from '../data/pesantrenData';

interface FeeAndRequirementsSectionProps {
  onOpenRegister: () => void;
}

export const FeeAndRequirementsSection: React.FC<FeeAndRequirementsSectionProps> = ({ onOpenRegister }) => {
  const baseTotal = PESANTREN_PROFILE.totalEnrollmentFee; // 5,450,000

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="biaya" className="py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-2">
            Transparansi & Prosedur Masuk
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900 tracking-tight [text-wrap:balance]">
            Biaya Masuk & Syarat Pendaftaran
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg">
            Penerimaan Santri Baru Tahun Pelajaran {PESANTREN_PROFILE.academicYear}. Seluruh komponen pembiayaan disampaikan secara terbuka dan amanah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Rincian Biaya Daftar Ulang (From Brochure) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                  Rincian Pembiayaan Daftar Ulang
                </span>
                <h3 className="text-2xl font-bold font-display text-stone-900">
                  Total Biaya Masuk: {formatRupiah(baseTotal)}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-500 block">Biaya Registrasi</span>
                <span className="text-sm font-bold text-stone-900">{formatRupiah(PESANTREN_PROFILE.registrationFee)}</span>
              </div>
            </div>

            {/* List Item Biaya dengan tabular numerals */}
            <div className="divide-y divide-stone-100 mb-6">
              {RINCIAN_BIAYA.map((item, idx) => (
                <div key={idx} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-semibold text-sm text-stone-900 block">
                      {item.name}
                    </span>
                    <span className="text-xs text-stone-500">
                      {item.description}
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-sm text-stone-800 tabular-nums shrink-0">
                    {formatRupiah(item.amount)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Kalkulasi */}
            <div className="p-4 bg-emerald-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-300 block">
                  Total Biaya Masuk
                </span>
                <span className="text-xs text-emerald-200">
                  (Termasuk SPP/Syahriah bulan pertama Rp 950.000)
                </span>
              </div>
              <span className="text-2xl font-bold font-mono tabular-nums text-amber-300">
                {formatRupiah(baseTotal)}
              </span>
            </div>

            <div className="mt-4 text-xs text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Biaya seragam sudah mencakup 4 stel seragam lengkap sesuai standar madrasah.</span>
            </div>
          </div>

          {/* Kolom Kanan: Syarat Pendaftaran & CTA (From Brochure) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Syarat Pendaftaran Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <h3 className="text-xl font-bold font-display text-stone-900">
                  Syarat & Ketentuan Pendaftaran
                </h3>
              </div>
              <p className="text-xs text-stone-500 mb-6">
                Harap melengkapi berkas fisik maupun unggahan digital berikut:
              </p>

              <div className="space-y-3 mb-8">
                {SYARAT_PENDAFTARAN.map((syarat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{syarat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenRegister}
                className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg hover:scale-[1.01]"
              >
                <span>Mulai Pendaftaran Santri Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 text-center">
                <span className="text-xs text-stone-500">
                  Periode Pendaftaran: <strong>{PESANTREN_PROFILE.registrationPeriod}</strong>
                </span>
              </div>
            </div>

            {/* Quick Trust / Info Box */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 leading-relaxed">
                  <strong className="block text-stone-900 font-semibold mb-1">
                    Catatan Penting Calon Santri:
                  </strong>
                  Kouta penerimaan santri dibatasi demi menjaga rasio ideal pembimbingan musyrif dan asatidz halaqah Al-Qur'an. Pendaftaran ditutup otomatis jika kuota telah terpenuhi.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
