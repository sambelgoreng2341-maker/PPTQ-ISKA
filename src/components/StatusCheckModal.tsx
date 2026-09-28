import React, { useState } from 'react';
import { X, Search, UserCheck, AlertCircle, CheckCircle, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { RegistrationData } from '../types/registration';
import { RegistrationSlip } from './RegistrationSlip';
import { queryRegistrationFromSheets } from '../services/googleSheetsService';

interface StatusCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const StatusCheckModal: React.FC<StatusCheckModalProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [foundRecord, setFoundRecord] = useState<RegistrationData | null>(null);
  const [searched, setSearched] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    setIsSearching(true);
    const existingRaw = localStorage.getItem('iqbs_registrations');
    const existingList: RegistrationData[] = existingRaw ? JSON.parse(existingRaw) : [];

    const keyClean = searchKey.trim().toLowerCase().replace(/[\s-]/g, '');

    let found = existingList.find((item) => {
      const regMatch = item.registrationNumber.toLowerCase().replace(/[\s-]/g, '').includes(keyClean);
      const phoneMatch = item.parentPhone.replace(/[\s-]/g, '').includes(keyClean);
      const nameMatch = item.fullName.toLowerCase().includes(keyClean);
      return regMatch || phoneMatch || nameMatch;
    });

    // Jika tidak ditemukan di cache lokal, cari langsung ke Google Sheets API
    if (!found) {
      try {
        const fromSheets = await queryRegistrationFromSheets(searchKey.trim());
        if (fromSheets) {
          found = fromSheets;
          // Simpan ke cache lokal agar pencarian berikutnya instan
          const updated = [fromSheets, ...existingList];
          localStorage.setItem('iqbs_registrations', JSON.stringify(updated));
        }
      } catch (err) {
        console.warn('Gagal cek status online:', err);
      }
    }

    setFoundRecord(found || null);
    setSearched(true);
    setShowSlip(false);
    setIsSearching(false);
  };

  const handleLoadDemo = () => {
    const demo: RegistrationData = {
      registrationNumber: 'IQBS-2027-1496',
      registeredAt: '27 September 2026',
      academicYear: '2027/2028',
      status: 'TERVERIFIKASI',
      fullName: 'Muhammad Hafizh Al-Anshori',
      nickname: 'Hafizh',
      gender: 'Laki-laki',
      nisn: '0129847120',
      nik: '3311091205140001',
      birthPlace: 'Sukoharjo',
      birthDate: '2014-06-18',
      previousSchool: 'SDIT Al-Anis Kartasura',
      currentJuzMemorized: 2,
      tshirtSize: 'M',
      fatherName: 'H. Bambang Sulistyo',
      motherName: 'Hj. Siti Rahmawati',
      parentPhone: '081234567890',
      parentEmail: 'bambang.iqbs@example.com',
      fatherOccupation: 'Wiraswasta Mandiri',
      monthlyIncome: 'Rp 6.000.000 - Rp 10.000.000',
      address: 'Jl. Ahmad Yani No. 45, Mayang',
      city: 'Sukoharjo',
      raportUploaded: true,
      kkUploaded: true,
      birthCertUploaded: true,
      photoUploaded: true,
      registrationFee: 100000,
      paymentMethod: 'BSI',
      testScheduleDate: 'Sabtu, 15 Agustus 2026 (Pukul 08.00 WIB)',
    };
    setFoundRecord(demo);
    setSearched(true);
    setShowSlip(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold font-display text-white">
              Cek Status Pendaftaran Santri
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {showSlip && foundRecord ? (
            <div>
              <button
                onClick={() => setShowSlip(false)}
                className="mb-4 text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Kembali ke Hasil Pencarian
              </button>
              <RegistrationSlip data={foundRecord} onClose={onClose} />
            </div>
          ) : (
            <div>
              <p className="text-xs text-stone-600 mb-4">
                Masukkan <strong>Nomor Registrasi Santri</strong> (contoh: <code>IQBS-2027-xxxx</code>) atau <strong>Nomor WhatsApp</strong> yang digunakan saat mendaftar.
              </p>

              {/* Search input form */}
              <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Nomor Registrasi atau Nomor WhatsApp..."
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-5 py-3 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-75 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mencari...</span>
                    </>
                  ) : (
                    <span>Cari Data</span>
                  )}
                </button>
              </form>

              {/* Search Results */}
              {searched && (
                <div className="mt-4">
                  {foundRecord ? (
                    <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                      <div className="flex items-center justify-between pb-3 border-b border-emerald-200 mb-3">
                        <div>
                          <span className="text-[11px] uppercase font-bold text-emerald-800 block">
                            Data Ditemukan
                          </span>
                          <span className="text-base font-bold text-stone-900 font-display">
                            {foundRecord.fullName}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-700 text-white">
                          {foundRecord.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 mb-4">
                        <div>
                          <span className="text-stone-500 block">No. Registrasi:</span>
                          <span className="font-mono font-bold text-stone-900">{foundRecord.registrationNumber}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Asal Sekolah:</span>
                          <span className="font-medium text-stone-900">{foundRecord.previousSchool}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Nama Wali:</span>
                          <span className="font-medium text-stone-900">{foundRecord.fatherName}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Rencana Jadwal Tes:</span>
                          <span className="font-medium text-emerald-900">{foundRecord.testScheduleDate}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowSlip(true)}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Buka / Cetak Ulang Slip Pendaftaran</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 bg-stone-50 border border-stone-200 rounded-2xl text-center">
                      <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                      <h4 className="text-sm font-bold text-stone-900">
                        Data Pendaftaran Tidak Ditemukan
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                        Pastikan nomor registrasi atau nomor WhatsApp yang Anda masukkan sudah benar. Anda juga dapat mendaftar santri baru sekarang.
                      </p>
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenRegister();
                          }}
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Daftar Santri Baru Sekarang
                        </button>
                        <button
                          onClick={handleLoadDemo}
                          className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Lihat Contoh Data Terdaftar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sample hint if not searched yet */}
              {!searched && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between text-xs text-stone-600">
                  <span>Ingin melihat tampilan kartu registrasi santri IQBS?</span>
                  <button
                    onClick={handleLoadDemo}
                    className="text-emerald-800 font-semibold hover:underline cursor-pointer"
                  >
                    Muat Contoh Santri →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
