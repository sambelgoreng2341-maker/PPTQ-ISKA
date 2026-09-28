export interface RegistrationData {
  registrationNumber: string;
  registeredAt: string;
  academicYear: string;
  status: 'TERVERIFIKASI' | 'MENUNGGU_PEMBAYARAN' | 'JADWAL_TES_DITETAPKAN';
  
  // Data Santri
  fullName: string;
  nickname: string;
  gender: 'Laki-laki';
  nisn: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  previousSchool: string;
  currentJuzMemorized: number;
  tshirtSize: 'S' | 'M' | 'L' | 'XL';

  // Data Wali
  fatherName: string;
  motherName: string;
  parentPhone: string;
  parentEmail?: string;
  fatherOccupation: string;
  monthlyIncome: string;
  address: string;
  city: string;
  postalCode?: string;

  // Documents status
  raportUploaded: boolean;
  kkUploaded: boolean;
  birthCertUploaded: boolean;
  photoUploaded: boolean;

  // Payment
  registrationFee: number;
  paymentMethod: 'BSI' | 'BCA' | 'TUNAI';
  paymentReference?: string;
  testScheduleDate?: string;
}
