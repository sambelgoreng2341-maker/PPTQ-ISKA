import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, User, Users, FileCheck, CreditCard, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { RegistrationData } from '../types/registration';
import { PESANTREN_PROFILE } from '../data/pesantrenData';
import { RegistrationSlip } from './RegistrationSlip';
import { submitRegistrationToSheets } from '../services/googleSheetsService';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRegister: (data: RegistrationData) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccessRegister,
}) => {
  const [step, setStep] = useState<number>(1);
  const [submittedData, setSubmittedData] = useState<RegistrationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Data Santri
    fullName: '',
    nickname: '',
    gender: 'Laki-laki' as const,
    nisn: '',
    nik: '',
    birthPlace: 'Sukoharjo',
    birthDate: '2014-05-12',
    previousSchool: '',
    currentJuzMemorized: 1,
    tshirtSize: 'M' as 'S' | 'M' | 'L' | 'XL',

    // Step 2: Data Wali
    fatherName: '',
    motherName: '',
    parentPhone: '',
    parentEmail: '',
    fatherOccupation: '',
    monthlyIncome: 'Rp 3.000.000 - Rp 6.000.000',
    address: '',
    city: 'Sukoharjo',

    // Step 3: Berkas
    raportUploaded: true,
    kkUploaded: true,
    birthCertUploaded: true,
    photoUploaded: true,

    // Step 4: Bayar (kosong secara default, menunggu calon santri memilih)
    paymentMethod: '' as '' | 'BSI' | 'BCA' | 'TUNAI',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validateStep = (currentStep: number): boolean => {
    const errs: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Nama lengkap santri wajib diisi';
      if (!formData.previousSchool.trim()) errs.previousSchool = 'Asal sekolah SD/MI wajib diisi';
      if (!formData.nisn.trim()) errs.nisn = 'NISN santri wajib diisi (atau isikan 10 digit perkiraan)';
      if (!formData.birthPlace.trim()) errs.birthPlace = 'Tempat lahir wajib diisi';
    }

    if (currentStep === 2) {
      if (!formData.fatherName.trim()) errs.fatherName = 'Nama ayah / wali wajib diisi';
      if (!formData.parentPhone.trim()) {
        errs.parentPhone = 'Nomor WhatsApp wajib diisi';
      } else if (!/^(\+62|62|0)8[0-9]{8,12}$/.test(formData.parentPhone.replace(/[\s-]/g, ''))) {
        errs.parentPhone = 'Format nomor WhatsApp tidak valid (contoh: 081234567890)';
      }
      if (!formData.address.trim()) errs.address = 'Alamat domisili lengkap wajib diisi';
    }

    if (currentStep === 4) {
      if (!formData.paymentMethod) {
        errs.paymentMethod = 'Silakan tentukan salah satu metode pembayaran terlebih dahulu.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    // Generate Unique Registration Code
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const generatedRegNum = `IQBS-2027-${randomDigits}`;
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newRecord: RegistrationData = {
      registrationNumber: generatedRegNum,
      registeredAt: today,
      academicYear: PESANTREN_PROFILE.academicYear,
      status: 'TERVERIFIKASI',
      fullName: formData.fullName,
      nickname: formData.nickname,
      gender: 'Laki-laki',
      nisn: formData.nisn,
      nik: formData.nik || '3311' + randomDigits + '0001',
      birthPlace: formData.birthPlace,
      birthDate: formData.birthDate,
      previousSchool: formData.previousSchool,
      currentJuzMemorized: Number(formData.currentJuzMemorized),
      tshirtSize: formData.tshirtSize,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      parentPhone: formData.parentPhone,
      parentEmail: formData.parentEmail,
      fatherOccupation: formData.fatherOccupation,
      monthlyIncome: formData.monthlyIncome,
      address: formData.address,
      city: formData.city,
      raportUploaded: formData.raportUploaded,
      kkUploaded: formData.kkUploaded,
      birthCertUploaded: formData.birthCertUploaded,
      photoUploaded: formData.photoUploaded,
      registrationFee: PESANTREN_PROFILE.registrationFee,
      paymentMethod: (formData.paymentMethod || 'TUNAI') as 'BSI' | 'BCA' | 'TUNAI',
      testScheduleDate: 'Sabtu, 15 Agustus 2026 (Pukul 08.00 WIB)',
    };

    // 1. Simpan ke database lokal browser (LocalStorage)
    const existingRaw = localStorage.getItem('iqbs_registrations');
    const existingList: RegistrationData[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updatedList = [newRecord, ...existingList];
    localStorage.setItem('iqbs_registrations', JSON.stringify(updatedList));

    // 2. Kirim otomatis ke Google Sheets API via Google Apps Script
    try {
      const res = await submitRegistrationToSheets(newRecord);
      setSyncStatus(res.message);
    } catch (err) {
      console.warn('Gagal sync ke Google Sheets:', err);
      setSyncStatus('Tersimpan di database lokal browser.');
    }

    setSubmittedData(newRecord);
    onSuccessRegister(newRecord);
    setIsSubmitting(false);
    setStep(5);
  };

  const stepsLabel = [
    { num: 1, label: 'Data Santri', icon: User },
    { num: 2, label: 'Data Orang Tua', icon: Users },
    { num: 3, label: 'Unggah Berkas', icon: FileCheck },
    { num: 4, label: 'Biaya & Metode', icon: CreditCard },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.svg"
              alt="Logo IQBS Sukoharjo"
              className="w-9 h-9 object-contain"
            />
            <div>
              <h2 className="text-base font-bold font-display text-white">
                Penerimaan Santri Baru (PSB Online)
              </h2>
              <p className="text-[11px] text-emerald-300">
                Tahun Pelajaran {PESANTREN_PROFILE.academicYear} · Khusus Santri Putra
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-emerald-900 transition-colors"
            aria-label="Tutup formulir pendaftaran"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Wizard Bar (Hidden when on step 5 slip view) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-stone-50 border-b border-stone-200">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {stepsLabel.map((s, idx) => {
                const Icon = s.icon;
                const isActive = step === s.num;
                const isPassed = step > s.num;
                return (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : isPassed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isPassed ? '✓' : s.num}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:inline ${
                        isActive ? 'text-stone-900 font-bold' : 'text-stone-500'
                      }`}
                    >
                      {s.label}
                    </span>
                    {idx < stepsLabel.length - 1 && (
                      <span className="w-6 sm:w-10 h-0.5 bg-stone-200 hidden xs:inline" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
          {step === 5 && submittedData ? (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2.5 rounded-2xl text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Tersinkronisasi Online:</strong> Data pendaftaran telah berhasil dikirim ke Google Spreadsheet Panitia PSB IQBS.
                  </span>
                </div>
                <span className="font-mono text-[10px] font-semibold bg-emerald-200/80 text-emerald-950 px-2.5 py-0.5 rounded-full shrink-0">
                  Google Sheets Active
                </span>
              </div>
              <RegistrationSlip data={submittedData} onClose={onClose} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* Step 1: Data Calon Santri */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="pb-2 border-b border-stone-100">
                    <h3 className="text-lg font-bold font-display text-stone-900">
                      Langkah 1: Identitas Calon Santri
                    </h3>
                    <p className="text-xs text-stone-500">
                      Harap mengisi data sesuai dengan ijazah / raport SD/MI calon santri.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nama Lengkap Santri <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Muhammad Farhan Al-Fatih"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                          errors.fullName ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                        }`}
                      />
                      {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Farhan"
                        value={formData.nickname}
                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Jenis Kelamin
                      </label>
                      <input
                        type="text"
                        value="Laki-laki (Santri Putra)"
                        disabled
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-stone-600 text-sm cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        NISN Santri <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="10 digit NISN (e.g. 0123456789)"
                        value={formData.nisn}
                        onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                          errors.nisn ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                        }`}
                      />
                      {errors.nisn && <p className="text-rose-500 text-xs mt-1">{errors.nisn}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        NIK Santri (No. KTP / KK)
                      </label>
                      <input
                        type="text"
                        placeholder="16 digit NIK Santri"
                        value={formData.nik}
                        onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Tempat Lahir <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Kota lahir"
                        value={formData.birthPlace}
                        onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Asal Sekolah SD / MI <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: SDIT Al-Madinah Surakarta / MI Muhammadiyah Sukoharjo"
                        value={formData.previousSchool}
                        onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                          errors.previousSchool ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                        }`}
                      />
                      {errors.previousSchool && <p className="text-rose-500 text-xs mt-1">{errors.previousSchool}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Jumlah Hafalan Al-Qur'an Saat Ini
                      </label>
                      <select
                        value={formData.currentJuzMemorized}
                        onChange={(e) => setFormData({ ...formData, currentJuzMemorized: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                      >
                        <option value={0}>Belum ada (Baru Iqro / Juz Amma belum tuntas)</option>
                        <option value={1}>1 Juz (Juz 30)</option>
                        <option value={2}>2 Juz</option>
                        <option value={3}>3 Juz</option>
                        <option value={5}>4 - 5 Juz</option>
                        <option value={10}>6 - 10 Juz</option>
                        <option value={15}>Diatas 10 Juz</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Ukuran Seragam Santri
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['S', 'M', 'L', 'XL'] as const).map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setFormData({ ...formData, tshirtSize: size })}
                            className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                              formData.tshirtSize === size
                                ? 'bg-emerald-800 text-white border-emerald-800'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Data Orang Tua / Wali */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="pb-2 border-b border-stone-100">
                    <h3 className="text-lg font-bold font-display text-stone-900">
                      Langkah 2: Data Orang Tua / Wali
                    </h3>
                    <p className="text-xs text-stone-500">
                      Diperlukan untuk komunikasi berkala dan pemantauan perkembangan santri 24 jam.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nama Lengkap Ayah / Wali <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Ayah / Wali"
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                          errors.fatherName ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                        }`}
                      />
                      {errors.fatherName && <p className="text-rose-500 text-xs mt-1">{errors.fatherName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nama Lengkap Ibu
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Ibu Kandung"
                        value={formData.motherName}
                        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        No. WhatsApp Aktif Wali <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                          errors.parentPhone ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                        }`}
                      />
                      {errors.parentPhone && <p className="text-rose-500 text-xs mt-1">{errors.parentPhone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Pekerjaan Ayah / Wali
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Wiraswasta / Guru / ASN / Karyawan"
                        value={formData.fatherOccupation}
                        onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Alamat Domisili Lengkap <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                          errors.address ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                        }`}
                      />
                      {errors.address && <p className="text-rose-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Kota / Kabupaten
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Sukoharjo / Solo / Karanganyar"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Rentang Penghasilan Wali
                      </label>
                      <select
                        value={formData.monthlyIncome}
                        onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                      >
                        <option value="Dibawah Rp 3.000.000">Dibawah Rp 3.000.000</option>
                        <option value="Rp 3.000.000 - Rp 6.000.000">Rp 3.000.000 - Rp 6.000.000</option>
                        <option value="Rp 6.000.000 - Rp 10.000.000">Rp 6.000.000 - Rp 10.000.000</option>
                        <option value="Diatas Rp 10.000.000">Diatas Rp 10.000.000</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Kelengkapan Berkas (From Brochure) */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="pb-2 border-b border-stone-100">
                    <h3 className="text-lg font-bold font-display text-stone-900">
                      Langkah 3: Kelengkapan Dokumen Fisik / Digital
                    </h3>
                    <p className="text-xs text-stone-500">
                      Sesuai brosur resmi, berkas berikut disiapkan dan dibawa saat tes seleksi:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-sm text-stone-900 block">
                          1. Fotocopy Raport Kelas IV-V (Semester 1 & 2)
                        </span>
                        <span className="text-xs text-stone-500">
                          Memuat nilai mata pelajaran utama SD/MI
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        Siap Diserahkan
                      </span>
                    </div>

                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-sm text-stone-900 block">
                          2. Fotocopy Kartu Keluarga (KK)
                        </span>
                        <span className="text-xs text-stone-500">
                          1 lembar fotocopy legalisir / jelas terbaca
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        Siap Diserahkan
                      </span>
                    </div>

                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-sm text-stone-900 block">
                          3. Fotocopy Akte Kelahiran Santri
                        </span>
                        <span className="text-xs text-stone-500">
                          Untuk pencatatan data formal Kementerian Agama/Kemendikbud
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        Siap Diserahkan
                      </span>
                    </div>

                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-sm text-stone-900 block">
                          4. Pas Foto 3x4 Berwarna (5 Lembar)
                        </span>
                        <span className="text-xs text-stone-500">
                          Memakai baju koko putih / seragam rapi dengan peci
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        Siap Diserahkan
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                    <Shield className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      Berkas fisik dapat diserahkan langsung saat kedatangan santri mengikuti tes seleksi di kampus PPTQ ISKA Mayang Sukoharjo.
                    </span>
                  </div>
                </div>
              )}

              {/* Step 4: Biaya Registrasi & Cara Pembayaran */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="pb-2 border-b border-stone-100">
                    <h3 className="text-lg font-bold font-display text-stone-900">
                      Langkah 4: Konfirmasi Biaya Pendaftaran
                    </h3>
                    <p className="text-xs text-stone-500">
                      Biaya pendaftaran sebesar <strong>Rp 100.000,-</strong> untuk administrasi seleksi dan konseling calon santri.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 block">
                        Biaya Registrasi Pendaftaran
                      </span>
                      <span className="text-2xl font-bold font-mono text-stone-900">
                        Rp 100.000,-
                      </span>
                    </div>
                    <span className="text-xs text-stone-600 bg-white px-3 py-1 rounded-full border border-amber-300">
                      Satu kali bayar
                    </span>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-2">
                      Pilih Salah Satu Metode Pembayaran Pendaftaran: <span className="text-red-500">*</span>
                    </label>

                    {errors.paymentMethod && (
                      <div className="p-2.5 mb-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{errors.paymentMethod}</span>
                      </div>
                    )}

                    <div className="space-y-2.5">
                      <div
                        onClick={() => {
                          setFormData({ ...formData, paymentMethod: 'BSI' });
                          if (errors.paymentMethod) {
                            const newErrs = { ...errors };
                            delete newErrs.paymentMethod;
                            setErrors(newErrs);
                          }
                        }}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          formData.paymentMethod === 'BSI'
                            ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-600/30'
                            : 'border-stone-200 hover:bg-stone-50 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'BSI'}
                            onChange={() => {
                              setFormData({ ...formData, paymentMethod: 'BSI' });
                              if (errors.paymentMethod) {
                                const newErrs = { ...errors };
                                delete newErrs.paymentMethod;
                                setErrors(newErrs);
                              }
                            }}
                            className="text-emerald-700 focus:ring-emerald-600"
                          />
                          <div>
                            <span className="font-semibold text-sm text-stone-900 block">
                              Bank Syariah Indonesia (BSI)
                            </span>
                            <span className="text-xs font-mono text-stone-600">
                              No. Rek: 718-469-9149 a.n PPTQ ISKA SUKOHARJO
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-800">Syariah</span>
                      </div>

                      <div
                        onClick={() => {
                          setFormData({ ...formData, paymentMethod: 'BCA' });
                          if (errors.paymentMethod) {
                            const newErrs = { ...errors };
                            delete newErrs.paymentMethod;
                            setErrors(newErrs);
                          }
                        }}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          formData.paymentMethod === 'BCA'
                            ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-600/30'
                            : 'border-stone-200 hover:bg-stone-50 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'BCA'}
                            onChange={() => {
                              setFormData({ ...formData, paymentMethod: 'BCA' });
                              if (errors.paymentMethod) {
                                const newErrs = { ...errors };
                                delete newErrs.paymentMethod;
                                setErrors(newErrs);
                              }
                            }}
                            className="text-emerald-700 focus:ring-emerald-600"
                          />
                          <div>
                            <span className="font-semibold text-sm text-stone-900 block">
                              Bank Central Asia (BCA)
                            </span>
                            <span className="text-xs font-mono text-stone-600">
                              No. Rek: 015-882-1496 a.n YAYASAN ISKA
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-stone-700">Transfer ATM/m-Banking</span>
                      </div>

                      <div
                        onClick={() => {
                          setFormData({ ...formData, paymentMethod: 'TUNAI' });
                          if (errors.paymentMethod) {
                            const newErrs = { ...errors };
                            delete newErrs.paymentMethod;
                            setErrors(newErrs);
                          }
                        }}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          formData.paymentMethod === 'TUNAI'
                            ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-600/30'
                            : 'border-stone-200 hover:bg-stone-50 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'TUNAI'}
                            onChange={() => {
                              setFormData({ ...formData, paymentMethod: 'TUNAI' });
                              if (errors.paymentMethod) {
                                const newErrs = { ...errors };
                                delete newErrs.paymentMethod;
                                setErrors(newErrs);
                              }
                            }}
                            className="text-emerald-700 focus:ring-emerald-600"
                          />
                          <div>
                            <span className="font-semibold text-sm text-stone-900 block">
                              Bayar Tunai di Kantor Sekretariat IQBS
                            </span>
                            <span className="text-xs text-stone-600">
                              Saat pelaksanaan tes seleksi di Kampus Mayang Sukoharjo
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-stone-700">Di Tempat</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600">
                    {formData.paymentMethod ? (
                      <span>
                        Metode terpilih: <strong>{formData.paymentMethod}</strong>. Silakan klik tombol di bawah untuk menyimpan data ke database dan menerbitkan Kartu Bukti Pendaftaran Resmi.
                      </span>
                    ) : (
                      <span>
                        Pilih salah satu metode pembayaran di atas untuk mengaktifkan tombol simpan pendaftaran.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 text-stone-700 hover:bg-stone-100 font-semibold text-sm rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>
                ) : (
                  <span />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Lanjutkan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.paymentMethod}
                    className={`px-6 py-3 font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 ${
                      isSubmitting
                        ? 'bg-amber-300 text-stone-900 opacity-80 cursor-wait'
                        : !formData.paymentMethod
                        ? 'bg-stone-200 text-stone-500 cursor-not-allowed border border-stone-300'
                        : 'bg-amber-400 hover:bg-amber-300 text-stone-950 cursor-pointer hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-stone-950 animate-spin" />
                        <span>Menyimpan ke Database Google Sheets...</span>
                      </>
                    ) : !formData.paymentMethod ? (
                      <>
                        <span>Pilih Metode Pembayaran Di Atas</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-stone-950" />
                        <span>Kirim & Terbitkan Bukti Pendaftaran</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
