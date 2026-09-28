import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Award, Shield, Calendar } from 'lucide-react';
import { PESANTREN_PROFILE } from '../data/pesantrenData';

export const QuickStatStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (stripRef.current) {
      observer.observe(stripRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Calendar,
      label: "Tahun Pelajaran",
      value: PESANTREN_PROFILE.academicYear,
      desc: "Pendaftaran: 1 Agustus 2026 - kuota terpenuhi",
    },
    {
      icon: BookOpen,
      label: "Program Al-Qur'an",
      value: "Tahfizh & Sanad",
      desc: "Target Mutqin 30 Juz & Sanad Tajwid",
    },
    {
      icon: Award,
      label: "Pendidikan Formal",
      value: "SMP/MTs Resmi",
      desc: "Ijazah resmi diakui Kementerian Negara",
    },
    {
      icon: Shield,
      label: "Sistem Pengasuhan",
      value: "24 Jam Terpadu",
      desc: "Didampingi Musyrif kamar & Asatidz kompeten",
    },
  ];

  return (
    <div 
      ref={stripRef}
      className="bg-emerald-900 border-b border-emerald-950 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y-0 md:divide-x divide-emerald-800/60">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                style={{
                  transitionDelay: `${idx * 140}ms`,
                }}
                className={`flex items-start gap-3.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-[0.96]'
                } ${idx > 0 ? 'md:pl-6' : ''}`}
              >
                <div className="p-2.5 rounded-lg bg-emerald-800/80 text-amber-300 shrink-0 border border-emerald-700/60 shadow-sm">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-emerald-300 font-medium">
                    {item.label}
                  </span>
                  <span className="block text-base sm:text-lg font-bold text-white font-display">
                    {item.value}
                  </span>
                  <span className="block text-xs text-emerald-200/80 line-clamp-1 mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
