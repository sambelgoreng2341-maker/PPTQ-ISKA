import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Mail, ChevronDown, ChevronUp, MessageCircle, ExternalLink } from 'lucide-react';
import { PESANTREN_PROFILE, FAQ_ITEMS } from '../data/pesantrenData';

export const ContactAndLocation: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const waLink = `https://wa.me/62${PESANTREN_PROFILE.whatsappNumber.slice(1)}?text=Assalamu'alaikum%20Warahmatullahi%20Wabarakatuh,%20saya%20ingin%20konsultasi%20penerimaan%20santri%20baru%20IQBS%20Sukoharjo`;

  return (
    <section id="kontak" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 block mb-2">
            Konsultasi & Informasi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900 tracking-tight [text-wrap:balance]">
            Lokasi Kampus & Tanya Jawab (FAQ)
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg">
            Kami siap menyambut silaturahmi Bapak/Ibu wali santri untuk berkunjung langsung maupun berkonsultasi via daring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Kolom Kiri: Info Kontak & Lokasi Pesantren */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
              <h3 className="text-xl font-bold font-display text-stone-900 mb-6">
                Kantor Sekretariat & Kompleks Pesantren
              </h3>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 shrink-0 border border-emerald-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block mb-0.5">Alamat Lengkap</span>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {PESANTREN_PROFILE.address}
                    </p>
                    <span className="text-xs text-stone-400 mt-1 block">
                      (Akses mudah dari arah Surakarta, Kartasura, dan Klaten)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 shrink-0 border border-emerald-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block mb-0.5">Telepon & WhatsApp PSB</span>
                    <p className="font-mono font-bold text-stone-900 text-sm sm:text-base">
                      {PESANTREN_PROFILE.whatsappFormatted}
                    </p>
                    <span className="text-xs text-stone-500">
                      Layanan konsultasi Senin - Ahad (07.30 - 20.00 WIB)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 shrink-0 border border-emerald-100">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block mb-0.5">Media Sosial Resmi</span>
                    <a
                      href="https://instagram.com/iiqbs_sukoharjo"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-emerald-700 hover:underline text-sm inline-flex items-center gap-1"
                    >
                      <span>{PESANTREN_PROFILE.instagram}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-xs text-stone-500 block">
                      Update harian kegiatan santri dan dokumentasi pesantren
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="mt-8 pt-6 border-t border-stone-100">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Chat WhatsApp dengan Panitia Penerimaan</span>
                </a>
              </div>
            </div>

            {/* Google Maps / Directions Card */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 border border-emerald-900 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                    Panduan Rute Kunjungan
                  </span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('PPTQ ISKA Mayang Gatak Sukoharjo')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-300 hover:text-white flex items-center gap-1"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
                Kompleks PPTQ ISKA terletak strategis di Mayang, Gatak, Sukoharjo. Hanya 15 menit dari Stasiun Gawok / Kartasura, suasana lingkungan sangat tenang, asri dan kondusif untuk para penghafal Al-Qur'an.
              </p>
              <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800/80 text-xs text-stone-200 flex items-center justify-between">
                <span>Jam Buka Kunjungan:</span>
                <span className="font-semibold text-white">08.00 - 16.30 WIB</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: FAQ Accordion */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold font-display text-stone-900 mb-2">
              Pertanyaan yang Sering Diajukan
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Jawaban seputar pendaftaran, kurikulum, dan kehidupan santri di IQBS Sukoharjo.
            </p>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-stone-50 hover:bg-stone-100/80 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-xs sm:text-sm text-stone-900 font-display">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-800 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
              <span>Punya pertanyaan lain yang belum terjawab?</span>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-800 font-bold hover:underline"
              >
                Tanya Panitia →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
