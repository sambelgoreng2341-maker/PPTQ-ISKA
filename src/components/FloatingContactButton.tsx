import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { PESANTREN_PROFILE } from '../data/pesantrenData';

export const FloatingContactButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const waLink = `https://wa.me/62${PESANTREN_PROFILE.whatsappNumber.slice(1)}?text=Assalamu'alaikum%20Warahmatullahi%20Wabarakatuh,%20saya%20ingin%20bertanya%20mengenai%20Penerimaan%20Santri%20Baru%20(PSB)%20IQBS%20Sukoharjo`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 no-print">
      {/* Tooltip helper on hover/click */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-stone-900 text-stone-100 px-3.5 py-2 rounded-xl text-xs shadow-xl border border-stone-800 animate-in fade-in slide-in-from-right-4 duration-300">
          <span>Tanya Panitia PSB ({PESANTREN_PROFILE.whatsappFormatted})</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white p-0.5"
            aria-label="Tutup pesan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        title="Hubungi Panitia PSB via WhatsApp"
        aria-label="Hubungi WhatsApp"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-105 transition-transform" />
      </a>
    </div>
  );
};
