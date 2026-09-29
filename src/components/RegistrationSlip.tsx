import React from 'react';
import { Printer, Download, CheckCircle, ExternalLink, Calendar, MapPin, Phone } from 'lucide-react';
import { RegistrationData } from '../types/registration';
import { PESANTREN_PROFILE } from '../data/pesantrenData';

interface RegistrationSlipProps {
  data: RegistrationData;
  onClose: () => void;
}

export const RegistrationSlip: React.FC<RegistrationSlipProps> = ({ data, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const waText = encodeURIComponent(
    `Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\nSaya telah mendaftar online di IQBS Sukoharjo:\n` +
    `• No. Registrasi: ${data.registrationNumber}\n` +
    `• Nama Santri: ${data.fullName}\n` +
    `• Asal Sekolah: ${data.previousSchool}\n` +
    `• Nama Wali: ${data.fatherName}\n` +
    `• No. WA: ${data.parentPhone}\n\n` +
    `Mohon konfirmasi dan informasi jadwal tes seleksi santri baru TP ${data.academicYear}. Terima kasih.`
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border border-stone-200 shadow-xl">
      {/* Action bar for printing */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 no-print">
        <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Pendaftaran Berhasil Disimpan</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Slip (PDF)</span>
          </button>
        </div>
      </div>

      {/* Slip Body (Designed for print and screen) */}
      <div id="print-area" className="p-4 sm:p-6 bg-stone-50 rounded-2xl border border-stone-200 text-stone-800">
        
        {/* Kop Surat IQBS */}
        <div className="flex items-center justify-between border-b-2 border-emerald-900 pb-4 mb-4">
          <div className="flex items-center gap-3.5">
            <img
              src="/favicon.svg"
              alt="Logo Resmi IQBS Sukoharjo"
              className="w-14 h-14 object-contain shrink-0"
            />
            <div>
              <span className="text-2xl font-bold font-trajan text-[#0a5c36] tracking-wider block leading-none">
                IQBS
              </span>
              <h2 className="text-xs sm:text-sm font-semibold font-ondine text-[#0a5c36] uppercase tracking-wider mt-1 leading-tight">
                ISKA QUR'ANIC
              </h2>
              <span className="text-[11px] sm:text-xs font-semibold font-ondine text-[#0a5c36] uppercase tracking-wider block leading-tight">
                BOARDING SCHOOL
              </span>
              <p className="text-[11px] text-stone-600 mt-1">
                Kompleks PPTQ ISKA, Mayang, Gatak, Sukoharjo, Jawa Tengah
              </p>
              <p className="text-[10px] text-stone-500 font-mono">
                Kontak Panitia: {PESANTREN_PROFILE.whatsappFormatted} · Instagram: {PESANTREN_PROFILE.instagram}
              </p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Tahun Pelajaran</span>
            <span className="text-sm font-bold text-emerald-900 font-mono">{data.academicYear}</span>
          </div>
        </div>

        {/* Title of Slip */}
        <div className="text-center my-3">
          <h3 className="text-sm sm:text-base font-bold font-display text-stone-900 uppercase tracking-wider underline">
            BUKTI PENDAFTARAN SANTRI BARU (PSB ONLINE)
          </h3>
          <span className="text-xs text-stone-500">
            Simpan bukti ini sebagai kartu tanda peserta tes seleksi masuk
          </span>
        </div>

        {/* Registration Number Highlight */}
        <div className="my-4 p-3 bg-emerald-900 text-white rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 block">
              Nomor Registrasi Santri
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300 tracking-wider">
              {data.registrationNumber}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 block">
              Status Pendaftaran
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-700 text-emerald-100">
              {data.status}
            </span>
          </div>
        </div>

        {/* Data Calon Santri */}
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b border-stone-200">
            <div>
              <span className="text-stone-500 text-[11px] block">Nama Lengkap Santri</span>
              <span className="font-bold text-stone-900">{data.fullName}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Nama Panggilan</span>
              <span className="font-semibold text-stone-800">{data.nickname || '-'}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">NISN / NIK</span>
              <span className="font-mono text-stone-800">{data.nisn} / {data.nik}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Tempat, Tanggal Lahir</span>
              <span className="text-stone-800">{data.birthPlace}, {data.birthDate}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Asal Sekolah SD/MI</span>
              <span className="font-semibold text-stone-800">{data.previousSchool}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">Hafalan Qur'an Saat Ini</span>
              <span className="text-emerald-800 font-semibold">{data.currentJuzMemorized} Juz</span>
            </div>
          </div>

          {/* Data Orang Tua / Wali */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b border-stone-200">
            <div>
              <span className="text-stone-500 text-[11px] block">Nama Orang Tua (Ayah / Ibu)</span>
              <span className="font-semibold text-stone-900">{data.fatherName} / {data.motherName}</span>
            </div>
            <div>
              <span className="text-stone-500 text-[11px] block">No. WhatsApp Wali Santri</span>
              <span className="font-mono font-semibold text-stone-900">{data.parentPhone}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-stone-500 text-[11px] block">Alamat Domisili</span>
              <span className="text-stone-800">{data.address}, {data.city}</span>
            </div>
          </div>

          {/* Biaya Registrasi & Jadwal Seleksi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-stone-600 block text-[11px]">Metode Pembayaran:</span>
              <span className="font-bold text-stone-900 text-sm">
                {data.paymentMethod === 'BSI' ? 'Transfer Bank BSI' : 'Bayar Tunai di Kampus'} (Rp 100.000,-)
              </span>
              <span className="block text-[10px] text-stone-600 font-mono mt-0.5">
                {data.paymentMethod === 'BSI'
                  ? 'BSI 6318520840 a.n. ABDURROHMAN RUSYDAN HALIM'
                  : 'Dibayarkan saat tes seleksi di Kampus Mayang Sukoharjo'}
              </span>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-stone-600 block text-[11px]">Rencana Tanggal Tes:</span>
              <span className="font-bold text-emerald-900 text-sm">{data.testScheduleDate || 'Dikonfirmasi Panitia'}</span>
              <span className="block text-[10px] text-stone-500">Materi: Tahsin, Al-Qur'an, Wawancara</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
          <span>Terdaftar pada: {data.registeredAt}</span>
          <span className="font-semibold text-emerald-900">Panitia PSB IQBS Sukoharjo</span>
        </div>
      </div>

      {/* Action buttons (WhatsApp confirmation) */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 no-print">
        <a
          href={`https://wa.me/62${PESANTREN_PROFILE.whatsappNumber.slice(1)}?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Kirim Bukti ke WhatsApp Panitia</span>
        </a>

        <button
          onClick={onClose}
          className="px-5 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
        >
          Selesai / Tutup
        </button>
      </div>
    </div>
  );
};
