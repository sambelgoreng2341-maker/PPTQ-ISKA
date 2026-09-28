import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, UserCheck, GraduationCap, ChevronDown } from 'lucide-react';
import { PESANTREN_PROFILE } from '../data/pesantrenData';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenCheckStatus: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onOpenCheckStatus }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'BERANDA +', href: '#', active: true },
    { name: 'TENTANG +', href: '#tentang', active: false },
    { name: 'KEUNGGULAN +', href: '#keunggulan', active: false },
    { name: 'KURIKULUM +', href: '#kurikulum', active: false },
    { name: 'FASILITAS +', href: '#galeri', active: false },
    { name: 'BIAYA +', href: '#biaya', active: false },
    { name: 'KONTAK +', href: '#kontak', active: false },
  ];

  return (
    <>
      {/* 
        Fixed Navbar transparently overlaid directly onto the slideshow image 
        Smoothly adds a dark backdrop-blur when scrolled down
      */}
      <header
        className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 text-stone-100 shadow-xl py-3'
            : 'bg-gradient-to-b from-stone-950/85 via-stone-950/40 to-transparent text-white border-b border-white/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Zone 1: Brand title & Official Emblem */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <img
                src="/favicon.svg"
                alt="Logo Resmi IQBS"
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-trajan text-white tracking-wider leading-none drop-shadow-sm group-hover:text-amber-300 transition-colors">
                  IQBS
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold font-ondine text-white tracking-wider uppercase drop-shadow-sm mt-1 leading-tight">
                  ISKA QUR'ANIC
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold font-ondine text-white tracking-wider uppercase drop-shadow-sm leading-tight">
                  BOARDING SCHOOL
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Styled with + like the Al Azhar IIBS reference screenshot) */}
            <nav className="hidden xl:flex items-center gap-6 text-xs font-bold tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-200 py-1.5 px-1 relative hover:text-amber-300 drop-shadow-sm ${
                    link.active
                      ? 'text-amber-400 font-extrabold'
                      : 'text-stone-200/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions & Language Flags like reference screenshot */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {/* Language badges from reference screenshot */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/50 backdrop-blur-sm border border-white/15 text-xs text-stone-200">
                <span title="Bahasa Indonesia" className="cursor-pointer hover:opacity-80">🇮🇩</span>
                <span className="text-stone-500">|</span>
                <span title="English" className="cursor-pointer hover:opacity-80 opacity-70">🇬🇧</span>
              </div>

              <button
                onClick={onOpenCheckStatus}
                className="px-3 py-1.5 text-xs font-semibold text-stone-200 hover:text-white bg-stone-900/60 hover:bg-stone-800/80 border border-white/20 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm"
                title="Cek status pendaftaran calon santri"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cek Status</span>
              </button>

              <button
                onClick={onOpenRegister}
                className="px-3.5 py-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all whitespace-nowrap shadow-md hover:scale-[1.02] flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Daftar PSB</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={onOpenRegister}
                className="px-3 py-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-md sm:hidden whitespace-nowrap shadow-sm"
              >
                Daftar PSB
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-200 hover:text-white bg-stone-900/60 backdrop-blur-sm rounded-lg border border-white/20"
                aria-label="Buka menu navigasi"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-16 sm:top-20 z-40 bg-stone-950/95 backdrop-blur-xl border-b border-stone-800 shadow-2xl px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-stone-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-stone-800/80 transition-colors ${
                  link.active ? 'text-amber-400' : 'hover:text-emerald-400'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCheckStatus();
                }}
                className="w-full py-2.5 text-sm font-semibold text-stone-200 border border-stone-700 rounded-lg flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Cek Status Pendaftaran</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-2.5 text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Daftar Santri Baru (Online)</span>
              </button>
              <a
                href={`https://wa.me/62${PESANTREN_PROFILE.whatsappNumber.slice(1)}?text=Assalamu'alaikum%20Admin%20IQBS%20Sukoharjo,%20saya%20ingin%20bertanya%20informasi%20pendaftaran`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 text-xs text-center text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Konsultasi WhatsApp ({PESANTREN_PROFILE.whatsappFormatted})</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
