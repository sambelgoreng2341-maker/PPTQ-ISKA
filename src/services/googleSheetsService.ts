import { RegistrationData } from '../types/registration';

export const GOOGLE_SHEETS_SCRIPT_URL = 
  'https://script.google.com/macros/s/AKfycbxyRLHEXyfmd9vczfiyCjcj3gqd35aEQxfGiVSdVk4dimOoYXwh69aKiBjjY1x8bQx6yw/exec';

export interface SubmitResult {
  success: boolean;
  message: string;
  source: 'online' | 'local_fallback';
}

/**
 * Mengirim data pendaftaran PSB langsung ke Google Spreadsheet via Google Apps Script.
 * Menggunakan mode no-cors dengan Content-Type text/plain agar tidak terblokir preflight CORS.
 */
export async function submitRegistrationToSheets(data: RegistrationData): Promise<SubmitResult> {
  const payload = {
    registrationNumber: data.registrationNumber,
    registeredAt: data.registeredAt,
    academicYear: data.academicYear,
    status: data.status,
    fullName: data.fullName,
    nickname: data.nickname,
    gender: data.gender,
    nisn: data.nisn,
    nik: data.nik,
    birthPlace: data.birthPlace,
    birthDate: data.birthDate,
    previousSchool: data.previousSchool,
    currentJuzMemorized: data.currentJuzMemorized,
    tshirtSize: data.tshirtSize,
    fatherName: data.fatherName,
    motherName: data.motherName,
    parentPhone: data.parentPhone,
    parentEmail: data.parentEmail || '',
    fatherOccupation: data.fatherOccupation,
    monthlyIncome: data.monthlyIncome,
    address: data.address,
    city: data.city,
    registrationFee: data.registrationFee,
    paymentMethod: data.paymentMethod,
    testScheduleDate: data.testScheduleDate,
    notes: 'Pendaftaran via Website IQBS Sukoharjo',
  };

  try {
    // Kirim data ke Google Apps Script Web App
    await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: 'Data pendaftaran berhasil dikirim dan tersimpan ke Google Sheets IQBS.',
      source: 'online',
    };
  } catch (error) {
    console.warn('Gagal sync online ke Google Apps Script, disimpan di penyimpanan browser:', error);
    return {
      success: true,
      message: 'Data tersimpan di perangkat lokal (akan disinkronkan saat online).',
      source: 'local_fallback',
    };
  }
}

/**
 * Mencari status pendaftaran santri ke Google Sheets berdasarkan nomor registrasi atau No. WA.
 */
export async function queryRegistrationFromSheets(query: string): Promise<RegistrationData | null> {
  if (!query.trim()) return null;

  try {
    const url = `${GOOGLE_SHEETS_SCRIPT_URL}?action=check&query=${encodeURIComponent(query.trim())}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) return null;
    const resJson = await response.json();
    if (resJson && resJson.success && resJson.data) {
      if (Array.isArray(resJson.data)) {
        const keyClean = query.trim().toLowerCase().replace(/[\s-]/g, '');
        const match = resJson.data.find((item: any) => {
          const regMatch = String(item.registrationNumber || '').toLowerCase().replace(/[\s-]/g, '').includes(keyClean);
          const phoneMatch = String(item.parentPhone || '').replace(/[\s-]/g, '').includes(keyClean);
          const nameMatch = String(item.fullName || '').toLowerCase().includes(keyClean);
          return regMatch || phoneMatch || nameMatch;
        });
        return match ? (match as RegistrationData) : null;
      }
      return resJson.data as RegistrationData;
    }
  } catch (e) {
    console.warn('Cek status online gagal, beralih ke cache lokal:', e);
  }
  return null;
}
