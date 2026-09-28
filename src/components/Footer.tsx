import React from 'react';
import { ArrowUp, Phone, Instagram, MapPin, Heart } from 'lucide-react';
import { PESANTREN_PROFILE } from '../data/pesantrenData';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenCheckStatus: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister, onOpenCheckStatus }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Kolom 1: Profil Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-4">
              <img
                src="/favicon.svg"
                alt="Logo Resmi IQBS"
                className="w-12 h-12 object-contain filter drop-shadow-md"
              />
              <div>
                <span className="text-2xl font-bold font-trajan text-white tracking-wider block leading-none">
                  IQBS
                </span>
                <span className="text-xs font-semibold font-ondine text-white tracking-wider uppercase block mt-1.5 leading-tight">
                  ISKA QUR'ANIC
                </span>
                <span className="text-[11px] font-semibold font-ondine text-white tracking-wider uppercase block leading-tight">
                  BOARDING SCHOOL
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm mb-6">
              Pondok pesantren tahfizh Al-Qur'an terpadu dengan sistem mulazamah dan kurikulum pendidikan formal setara SMP/MTs berijazah resmi negara. Membentuk santri berilmu, beradab, dan tangkas menghadapi zaman.
            </p>

            <div className="text-xs text-stone-400 italic font-display border-l-2 border-emerald-600 pl-3 py-1">
              "{PESANTREN_PROFILE.subQuote}"
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 font-display">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#tentang" className="hover:text-emerald-400 transition-colors">
                  Tentang & Visi Misi
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-emerald-400 transition-colors">
                  Kenapa Memilih IQBS
                </a>
              </li>
              <li>
                <a href="#kurikulum" className="hover:text-emerald-400 transition-colors">
                  Kurikulum & Rutinitas 24 Jam
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-emerald-400 transition-colors">
                  Galeri & Fasilitas Asrama
                </a>
              </li>
              <li>
                <a href="#biaya" className="hover:text-emerald-400 transition-colors">
                  Rincian Biaya & Syarat
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-emerald-400 transition-colors">
                  Lokasi Kampus & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Santri Baru */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 font-display">
              Penerimaan Santri Baru (PSB)
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Pendaftaran santri baru Tahun Pelajaran {PESANTREN_PROFILE.academicYear} dibuka mulai 1 Agustus 2026 hingga kuota terpenuhi.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Daftar Santri Baru (Online)
              </button>
              <button
                onClick={onOpenCheckStatus}
                className="w-full py-2.5 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cek Status Pendaftaran Calon Santri
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-800 text-[11px] text-stone-500 flex items-center justify-between">
              <span>WhatsApp: {PESANTREN_PROFILE.whatsappFormatted}</span>
              <span>IG: {PESANTREN_PROFILE.instagram}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} ISKA Qur'anic Boarding School (IQBS Sukoharjo). Hak cipta dilindungi.
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Kompleks PPTQ ISKA Mayang Gatak Sukoharjo</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Ke Atas</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
