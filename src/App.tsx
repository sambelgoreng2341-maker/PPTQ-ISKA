import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlideshow } from './components/HeroSlideshow';
import { QuickStatStrip } from './components/QuickStatStrip';
import { KenapaIQBSSection } from './components/KenapaIQBSSection';
import { CurriculumSection } from './components/CurriculumSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FeeAndRequirementsSection } from './components/FeeAndRequirementsSection';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { FloatingContactButton } from './components/FloatingContactButton';
import { RegistrationModal } from './components/RegistrationModal';
import { StatusCheckModal } from './components/StatusCheckModal';
import { RegistrationData } from './types/registration';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCheckStatusOpen, setIsCheckStatusOpen] = useState(false);
  const [recentRegistration, setRecentRegistration] = useState<RegistrationData | null>(null);

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
    setIsCheckStatusOpen(false);
  };

  const handleOpenCheckStatus = () => {
    setIsCheckStatusOpen(true);
    setIsRegisterOpen(false);
  };

  const handleSuccessRegister = (data: RegistrationData) => {
    setRecentRegistration(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-800 selection:text-white">
      {/* Navbar with 3-Zone contract */}
      <Navbar
        onOpenRegister={handleOpenRegister}
        onOpenCheckStatus={handleOpenCheckStatus}
      />

      <main className="flex-grow">
        {/* Dynamic Big Photo Slideshow Hero */}
        <HeroSlideshow onOpenRegister={handleOpenRegister} />

        {/* Quick Highlights Strip */}
        <QuickStatStrip />

        {/* Kenapa Memilih IQBS & Visi Misi */}
        <KenapaIQBSSection onOpenRegister={handleOpenRegister} />

        {/* Informasi Kurikulum 3 Pilar, 24-Hour Schedule & Ekstrakurikuler */}
        <CurriculumSection />

        {/* Galeri Kegiatan Santri (dengan Lightbox) & Fasilitas Pesantren */}
        <GallerySection />

        {/* Testimoni Santri Berprestasi & Wali */}
        <TestimonialsSection />

        {/* Biaya Transparan Rp 5.450.000 & Syarat Pendaftaran */}
        <FeeAndRequirementsSection onOpenRegister={handleOpenRegister} />

        {/* Lokasi Kampus Sukoharjo, Kontak & FAQ */}
        <ContactAndLocation />
      </main>

      {/* Editorial Footer */}
      <Footer
        onOpenRegister={handleOpenRegister}
        onOpenCheckStatus={handleOpenCheckStatus}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingContactButton />

      {/* Online Registration Multi-step Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccessRegister={handleSuccessRegister}
      />

      {/* Status Check Modal */}
      <StatusCheckModal
        isOpen={isCheckStatusOpen}
        onClose={() => setIsCheckStatusOpen(false)}
        onOpenRegister={handleOpenRegister}
      />
    </div>
  );
}
