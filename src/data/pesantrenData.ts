export interface SlideItem {
  id: string;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  activityTime: string;
  featurePill: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface CurriclumPillar {
  id: string;
  title: string;
  category: string;
  lead: string;
  description: string;
  targets: string[];
  subjects: string[];
}

export interface ScheduleItem {
  time: string;
  activity: string;
  description: string;
  category: 'ibadah' | 'akademik' | 'kemandirian' | 'istirahat';
}

export interface FeeItem {
  name: string;
  amount: number;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'tahfizh' | 'akademik' | 'asrama' | 'ekskul' | 'outbound';
  categoryLabel: string;
  image: string;
  caption: string;
  date: string;
}

export const PESANTREN_PROFILE = {
  name: "ISKA Qur'anic Boarding School",
  shortName: "IQBS Sukoharjo",
  arabicName: "معهد إسكا لتحفيظ القرآن الكريم",
  tagline: "Menjawab Tantangan Zaman dengan Al-Qur'an dan Teknologi",
  motto: "Bersama Al-Qur'an Menuju Masa Depan Mulia",
  wisdomQuote: "Didiklah anak-anakmu dengan ilmu, karena mereka akan hidup dengan ilmu, dan mereka akan mati dalam keadaan berilmu.",
  quoteSource: "HR. Ibnu Majah",
  subQuote: "Ilmu yang baik adalah investasi sepanjang hayat — Ilmu, Adab, dan Akhlaq",
  address: "Kompleks PPTQ ISKA, Mayang, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
  whatsappNumber: "081646991496",
  whatsappFormatted: "0816-4699-1496",
  instagram: "@iiqbs_sukoharjo",
  academicYear: "2027/2028",
  registrationPeriod: "1 Agustus 2026 - Kuota Terpenuhi",
  registrationFee: 100000,
  totalEnrollmentFee: 5450000,
  monthlyFee: 950000,
};

export const HERO_SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    image: '/src/assets/images/iqbs_hero_halaqah_1790514256559.jpg',
    badge: 'Tahfizh & Tahsin Bersanad',
    title: "Pendidikan Al-Qur'an Terstruktur & Bersanad",
    subtitle: "Membimbing santri menghafal 30 Juz secara mutqin dengan talaqqi tajwid bersanad Tuhfatul Athfal & Al-Jazariyah bersama asatidz berkompeten.",
    activityTime: "04.30 - 06.30 WIB & 18.30 - 20.00 WIB",
    featurePill: "Halaqah Intensif Masjid Raya ISKA",
  },
  {
    id: 'slide-2',
    image: '/src/assets/images/iqbs_campus_exterior_1790514275417.jpg',
    badge: 'Lingkungan Nyaman & Asri',
    title: "Kampus Hijau yang Kondusif untuk Penuntut Ilmu",
    subtitle: "Suasana belajar yang asri dan tenang di Sukoharjo, didesain khusus agar santri betah, fokus mendalami ilmu agama dan teknologi modern.",
    activityTime: "24 Jam Lingkungan Terintegrasi",
    featurePill: "Kompleks PPTQ ISKA Mayang",
  },
  {
    id: 'slide-3',
    image: '/src/assets/images/iqbs_santri_sports_silat_1790514290812.jpg',
    badge: 'Karakter & Olahraga Sunnah',
    title: "Membina Fisik Kuat, Tangguh & Berakhlak Karimah",
    subtitle: "Pembinaan fisik berimbang lewat bela diri pencak silat, memanah, renang, dan olahraga tim untuk membangun mental pemimpin muslim sejati.",
    activityTime: "16.00 - 17.15 WIB (Sore Hari)",
    featurePill: "Ekstrakurikuler & Olahraga Sunnah",
  },
  {
    id: 'slide-4',
    image: '/src/assets/images/iqbs_dining_community_1790514308673.jpg',
    badge: 'Pembinaan Adab & Kemandirian',
    title: "Adab Islami & Kehangatan Ukhuwah di Asrama",
    subtitle: "Membiasakan adab makan, kedisiplinan hidup mandiri, serta pengawasan intensif 24 jam oleh musyrif kamar yang berdedikasi.",
    activityTime: "Tiga Kali Sehari Bersama",
    featurePill: "Ruang Makan & Pendopo Asrama",
  },
  {
    id: 'slide-5',
    image: '/src/assets/images/iqbs_outbound_adventure_1790514322514.jpg',
    badge: 'Outbound & Tadabbur Alam',
    title: "Rihlah Ilmiah & Penguatan Jiwa Mandiri Santri",
    subtitle: "Kegiatan berkala outbound dan outing class di alam terbuka seperti Umbul Pelem Klaten, mempererat tali ukhuwah dan kesegaran rohani santri.",
    activityTime: "Kegiatan Semesteran Santri",
    featurePill: "Tadabbur Alam & Outing Class",
  },
];

export const KENAPA_IQBS = [
  {
    number: "01",
    title: "Pendidikan Al-Qur'an",
    shortDesc: "Program tahfizh dan pembelajaran Al-Qur'an yang terstruktur dengan bimbingan asatidz yang kompeten dan bersanad resmi.",
    points: [
      "Metode tahfizh teruji mutqin 30 Juz",
      "Tahsin Al-Qur'an bersanad (Tuhfatul Athfal & Jazariyah)",
      "Bimbingan asatidz hafizh kompeten",
    ],
  },
  {
    number: "02",
    title: "Mulazamah System",
    shortDesc: "Menggunakan sistem pendidikan mulazamah terstruktur yang menyatukan kurikulum pendidikan pesantren dan kurikulum Negara.",
    points: [
      "Pendidikan formal setara SMP/MTs",
      "Ijazah resmi diakui Kementerian",
      "Kajian kitab kuning & dasar-dasar syariah",
    ],
  },
  {
    number: "03",
    title: "Pembinaan Akhlak & Adab",
    shortDesc: "Membiasakan adab, disiplin, tanggung jawab, dan kemandirian dalam sendi kehidupan sehari-hari santri.",
    points: [
      "Pengasuhan 24 jam bersama musyrif",
      "Penerapan adab tholabul 'ilmi",
      "Pembiasaan sholat berjamaah & qiyamul lail",
    ],
  },
  {
    number: "04",
    title: "Lingkungan Nyaman & Asri",
    shortDesc: "Suasana belajar dan tempat yang mendukung penuh tumbuhnya kecintaan kepada ilmu, ibadah, dan teknologi terkini.",
    points: [
      "Asrama tertata rapi dan bersih",
      "Masjid Raya & sarana olahraga luas",
      "Lokasi tenang bebas polusi perkotaan",
    ],
  },
];

export const PROGRAM_UNGGULAN: ProgramItem[] = [
  {
    id: 'tahfizh',
    title: "Tahfizh & Tahsin Al-Qur'an",
    description: "Program tahfizh dengan metode terstruktur dan Tahsin Al-Qur'an bersanad sampai mutqin.",
    iconName: 'BookOpen',
    details: [
      "Target mutqin hafalan Al-Qur'an 30 Juz",
      "Tahsin bersanad Matan Tuhfatul Athfal & Jazariyah",
      "Halaqah intensif ba'da Subuh dan ba'da Maghrib",
      "Muroja'ah mandiri dan simak akbar tiap semester",
    ],
  },
  {
    id: 'formal',
    title: "Pendidikan Formal",
    description: "Menyelenggarakan pendidikan formal setara SMP/MTs dengan ijazah resmi negara.",
    iconName: 'GraduationCap',
    details: [
      "Kurikulum nasional terpadu dengan sains modern",
      "Lulusan memperoleh ijazah resmi negara",
      "Bimbingan olimpiade sains & matematika",
      "Pemanfaatan IT dan komputer untuk belajar",
    ],
  },
  {
    id: 'mulazamah',
    title: "Mulazamah System",
    description: "Pembelajaran menggunakan sistem mulazamah terstruktur dengan kitab para ulama salaf.",
    iconName: 'Building',
    details: [
      "Materi aqidah, fiqih ibadah, hadits, dan tajwid",
      "Sistem talaqqi langsung dengan ustadz pengampu",
      "Pemahaman teks arab gundul secara bertahap",
      "Evaluasi pemahaman konsep secara berkala",
    ],
  },
  {
    id: 'bahasa',
    title: "Bahasa Arab & Inggris",
    description: "Pembelajaran komunikasi dengan bahasa aktif dan pasif melalui lingkungan dwibahasa.",
    iconName: 'Languages',
    details: [
      "Pembiasaan muhadatsah harian dan vocabulary",
      "Pidato (muhadharah) 3 bahasa bergantian",
      "English & Arabic daily conversation zones",
      "Kajian gramatika nahwu-sharaf praktis",
    ],
  },
  {
    id: 'pengawasan',
    title: "Pengawasan Santri 24 Jam",
    description: "Pemantauan dan pembinaan santri selama 24 jam penuh oleh musyrif kamar.",
    iconName: 'ShieldCheck',
    details: [
      "1 musyrif mendampingi kelompok santri terfokus",
      "Monitoring ibadah harian dan kesehatan santri",
      "Komunikasi rutin perkembangan santri kepada orang tua",
      "Konseling bimbingan adab dan kepribadian",
    ],
  },
  {
    id: 'karakter',
    title: "Karakter & Kemandirian",
    description: "Membentuk karakter muslim sejati, mandiri, disiplin dan berjiwa enterpreneur.",
    iconName: 'Sparkles',
    details: [
      "Kemandirian mengurus perlengkapan dan kamar sendiri",
      "Pendidikan kepemimpinan dan enterpreneurship",
      "Kedisiplinan waktu belajar, istirahat, dan beribadah",
      "Bakti sosial dan kecintaan terhadap sesama",
    ],
  },
];

export const CURRICULUM_PILLARS: CurriclumPillar[] = [
  {
    id: 'quran',
    category: 'Pilar 1',
    title: "Kurikulum Al-Qur'an & Tahfizh",
    lead: "Pondasi utama pembentukan jiwa qur'ani yang mutqin dan beradab.",
    description: "Dirancang berjenjang dari pembenahan makhraj & sifat huruf (Tahsin), pengambilan sanad matan tajwid, setoran ziyadah harian, hingga muroja'ah berkala.",
    targets: [
      "Hafalan Al-Qur'an target 30 Juz Mutqin",
      "Pengambilan Sanad Matan Tuhfatul Athfal & Al-Jazariyah",
      "Paham waqaf, ibtida', dan adab penghafal Al-Qur'an",
      "Siap menjadi imam sholat dan da'i muda",
    ],
    subjects: [
      "Tahsin Al-Qur'an Bersanad",
      "Ziyadah Hafalan Baru Al-Qur'an",
      "Muroja'ah (Tikror Harian, Mingguan, Bulanan)",
      "Matan Tuhfatul Athfal",
      "Matan Al-Jazariyah",
      "Tafsir Ayat-ayat Pilihan",
    ],
  },
  {
    id: 'formal',
    category: 'Pilar 2',
    title: "Kurikulum Pendidikan Formal (SMP/MTs)",
    lead: "Pendidikan akademis nasional dengan ijazah resmi negara untuk jenjang lanjutan.",
    description: "Memadukan standar kurikulum nasional dengan wawasan sains, teknologi, dan literasi modern agar santri siap bersaing di era digital.",
    targets: [
      "Memiliki Ijazah Resmi SMP/MTs yang diakui Negara",
      "Kompetensi sains, matematika, dan literasi bahasa unggul",
      "Kemampuan mengoperasikan teknologi komputer untuk hal positif",
      "Dapat melanjutkan ke SMA/MA unggulan manapun",
    ],
    subjects: [
      "Matematika",
      "Ilmu Pengetahuan Alam (Fisika & Biologi)",
      "Bahasa Indonesia",
      "Bahasa Inggris Terpadu",
      "Ilmu Pengetahuan Sosial (IPS)",
      "Pendidikan Pancasila & Kewarganegaraan",
      "Teknologi Informasi & Komputer (TIK)",
    ],
  },
  {
    id: 'mulazamah',
    category: 'Pilar 3',
    title: "Kurikulum Mulazamah & Kepesantrenan",
    lead: "Warisan keilmuan ulama ahlussunnah wal jama'ah untuk pemahaman agama yang mendalam.",
    description: "Pendekatan talaqqi dan kajian kitab-kitab dasar aqidah, akhlaq, fiqih ibadah, serta pembiasaan bahasa arab lisan dan tulisan.",
    targets: [
      "Memahami dasar-dasar aqidah shahihah bebas syubhat",
      "Menguasai tata cara ibadah sesuai sunnah Rasulullah SAW",
      "Memiliki adab dan etika tholabul 'ilmi yang mulia",
      "Mampu berkomunikasi aktif bahasa Arab sehari-hari",
    ],
    subjects: [
      "Kitab Aqidah & Tauhid Dasar",
      "Fiqih Ibadah Praktis (Thaharah, Sholat, Puasa, Zakat)",
      "Hadits Arba'in An-Nawawiyyah",
      "Adab & Akhlaq Islami (Ta'lim Muta'allim & Taisirul Khalaq)",
      "Bahasa Arab (Muhadatsah, Nahwu, Sharaf)",
      "Sirah Nabawiyyah & Tarikh Islam",
    ],
  },
];

export const DAILY_ROUTINE: ScheduleItem[] = [
  {
    time: "03.30 - 04.30",
    activity: "Bangun Pagi & Qiyamul Lail",
    description: "Persiapan sholat malam berjamaah, witir, dan dzikir menjelang fajar.",
    category: 'ibadah',
  },
  {
    time: "04.30 - 05.15",
    activity: "Sholat Subuh Berjamaah & Dzikir Pagi",
    description: "Dilanjutkan membaca dzikir pagi ma'tsurat bersama asatidz di masjid.",
    category: 'ibadah',
  },
  {
    time: "05.15 - 06.30",
    activity: "Halaqah Tahfizh Subuh",
    description: "Setoran ziyadah hafalan baru atau penguatan hafalan kemarin secara talaqqi.",
    category: 'akademik',
  },
  {
    time: "06.30 - 07.15",
    activity: "Piket Kamar, Mandi & Sarapan Pagi",
    description: "Membiasakan kerapian asrama, mandi bersih, dan sarapan dengan adab Islami di ruang makan.",
    category: 'kemandirian',
  },
  {
    time: "07.15 - 11.45",
    activity: "KBM Kurikulum Formal (SMP/MTs)",
    description: "Pembelajaran sains, matematika, bahasa Indonesia, bahasa Inggris, dan TIK di kelas.",
    category: 'akademik',
  },
  {
    time: "11.45 - 12.30",
    activity: "Sholat Dzuhur Berjamaah & Makan Siang",
    description: "Istirahat sejenak dari KBM formal dan makan siang bersama.",
    category: 'ibadah',
  },
  {
    time: "12.30 - 13.30",
    activity: "KBM Sesi Kedua & Mulazamah",
    description: "Pendalaman materi mulazamah kitab dan bahasa Arab.",
    category: 'akademik',
  },
  {
    time: "13.30 - 15.00",
    activity: "Qoilulah (Istirahat Siang)",
    description: "Tidur siang sunnah untuk memulihkan kesegaran tubuh dan pikiran.",
    category: 'istirahat',
  },
  {
    time: "15.00 - 15.45",
    activity: "Sholat Ashar Berjamaah & Dzikir Sore",
    description: "Sholat Ashar dan bimbingan kultum ringkas dari musyrif.",
    category: 'ibadah',
  },
  {
    time: "15.45 - 17.15",
    activity: "Ekstrakurikuler, Bela Diri & Olahraga",
    description: "Latihan silat, memanah, futsal, renang, basket, dan kegiatan santai sore.",
    category: 'kemandirian',
  },
  {
    time: "17.15 - 17.45",
    activity: "Mandi Bersih & Persiapan ke Masjid",
    description: "Mengenakan pakaian rapi koko dan peci menuju masjid sebelum adzan Maghrib berkumandang.",
    category: 'kemandirian',
  },
  {
    time: "17.45 - 19.30",
    activity: "Sholat Maghrib, Halaqah Muroja'ah & Isya",
    description: "Muroja'ah hafalan Al-Qur'an berpasangan, tadarus, dan sholat Isya berjamaah.",
    category: 'ibadah',
  },
  {
    time: "19.30 - 20.30",
    activity: "Makan Malam & Muhadharah / Kajian Kitab",
    description: "Makan malam bersama dan latihan pidato 3 bahasa atau kajian adab santri.",
    category: 'akademik',
  },
  {
    time: "20.30 - 21.30",
    activity: "Belajar Mandiri & Persiapan Pelajaran Esok",
    description: "Mengulang pelajaran dan memastikan tugas sekolah terselesaikan.",
    category: 'akademik',
  },
  {
    time: "21.30 - 03.30",
    activity: "Doa Tidur & Istirahat Malam",
    description: "Pemberlakuan jam hening asrama dan istirahat malam santri.",
    category: 'istirahat',
  },
];

export const EKSTRAKURIKULER = [
  {
    name: "Pencak Silat & Beladiri",
    desc: "Membekali santri ketahanan fisik, teknik perlindungan diri, serta pembentukan mental ksatria yang rendah hati.",
  },
  {
    name: "Memanah & Berkuda",
    desc: "Melatih fokus konsentrasi, ketenangan emosional, dan melestarikan sunnah Rasulullah SAW.",
  },
  {
    name: "Renang",
    desc: "Olahraga sunnah untuk kebugaran jantung, stamina prima, dan kelincahan motorik santri.",
  },
  {
    name: "Futsal, Basket & Sepak Bola",
    desc: "Membangun sportivitas, kekompakan tim, dan kesehatan jasmani di lapangan pesantren.",
  },
  {
    name: "Muhadharah (Pidato 3 Bahasa)",
    desc: "Pelatihan public speaking dalam Bahasa Arab, Inggris, dan Indonesia untuk melatih keberanian berdakwah.",
  },
  {
    name: "Outbound & Outing Class",
    desc: "Pembelajaran luar kelas (outdoor) seperti di Umbul Pelem Klaten untuk tadabbur alam dan team building.",
  },
  {
    name: "Santri Enterpreneur",
    desc: "Pengenalan jiwa kewirausahaan islami melalui pengelolaan kantin santri dan kreasi karya bermanfaat.",
  },
  {
    name: "Klub Sains & Komputer",
    desc: "Eksplorasi matematika terapan, sains eksperimen sederhana, dan penguasaan aplikasi komputer.",
  },
];

export const FASILITAS = [
  {
    name: "Asrama Santri Nyaman",
    desc: "Kamar tidur tertata rapi dengan kasur, ranjang tingkat kokoh, lemari pribadi, serta sirkulasi udara bersih dan pencahayaan optimal.",
  },
  {
    name: "Masjid Raya ISKA",
    desc: "Pusat spiritual pesantren dengan arsitektur megah, karpet tebal, dan lingkungan yang hening untuk sholat berjamaah serta halaqah tahfizh.",
  },
  {
    name: "Pendopo Asrama",
    desc: "Ruang terbuka bernuansa tradisional Jawa yang teduh untuk kajian santri, diskusi kelompok, pertemuan wali santri, dan muhadharah.",
  },
  {
    name: "Perpustakaan Lengkap",
    desc: "Koleksi ratusan kitab turats, buku tafsir, hadits, literatur sains, ensiklopedia, dan referensi kurikulum nasional.",
  },
  {
    name: "Lapangan Olahraga",
    desc: "Fasilitas olahraga outdoor serbaguna untuk futsal, basket, bulutangkis, senam kesegaran jasmani, dan latihan beladiri.",
  },
  {
    name: "Ruang Makan Santri",
    desc: "Ruang makan berkapasitas besar dengan meja kursi tertata higienis, menyajikan menu bergizi 3 kali sehari yang disukai santri.",
  },
  {
    name: "Area Kegiatan Santri",
    desc: "Halaman hijau terbuka untuk apel pagi, parade kepanduan, senam bersama, dan berbagai pentas seni islami.",
  },
  {
    name: "Toserba & Kantin Santri",
    desc: "Kantin dan toko kebutuhan harian santri, alat tulis, seragam, dan camilan sehat tanpa perlu keluar dari lingkungan pesantren.",
  },
  {
    name: "Kamar Mandi Santri Bersih",
    desc: "Kamar mandi dan fasilitas sanitasi modern dengan pasokan air bersih melimpah, terawat dan higienis.",
  },
];

export const RINCIAN_BIAYA: FeeItem[] = [
  { name: "Kegiatan Santri", amount: 600000, description: "Kegiatan ekstrakurikuler, outbound semester, dan perlombaan tahunan." },
  { name: "Kesehatan Santri", amount: 250000, description: "Pemeriksaan medis rutin, obat-obatan UKS, dan penanganan darurat." },
  { name: "Investasi Sarana & Prasarana", amount: 1000000, description: "Pengembangan gedung asrama, masjid, dan sarana belajar santri." },
  { name: "Seragam Santri (4 Jenis)", amount: 1000000, description: "Seragam formal putih-biru, jubah putih koko, seragam olahraga & beladiri." },
  { name: "Sewa-sewa & Fasilitas Pendukung", amount: 1150000, description: "Fasilitas ranjang, kasur, lemari, dan perlengkapan asrama." },
  { name: "Buku Pembelajaran & Modul", amount: 500000, description: "Paket buku paket dinas, modul tahsin bersanad, dan diktat mulazamah." },
  { name: "Syahriah / Bulanan (Bulan Pertama)", amount: 950000, description: "Biaya makan 3x sehari, asrama, bimbingan tahfizh, dan pendidikan formal." },
];

export const SYARAT_PENDAFTARAN = [
  "Laki-laki (putra) lulusan SD/MI atau sederajat",
  "Mengisi formulir pendaftaran online secara lengkap",
  "Membayar biaya pendaftaran sebesar Rp 100.000,-",
  "Mengikuti tes seleksi (Tahsin/Hafalan Qur'an, Akademik, dan Wawancara Wali)",
  "Fotocopy Raport kelas IV-V (Semester 1 & 2)",
  "Fotocopy Kartu Keluarga (KK)",
  "Fotocopy Akte Kelahiran calon santri",
  "Pas foto 3x4 berwarna (latar belakang biru/merah) sebanyak 5 lembar",
];

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: "Halaqah Tahfizh Bersanad di Masjid",
    category: 'tahfizh',
    categoryLabel: "Tahfizh & Ibadah",
    image: '/src/assets/images/iqbs_hero_halaqah_1790514256559.jpg',
    caption: "Santri menyimak bacaan Al-Qur'an secara talaqqi bersama asatidz pengampu di serambi Masjid Raya ISKA.",
    date: "Aktivitas Harian",
  },
  {
    id: 'gal-2',
    title: "Gedung Kampus Hijau PPTQ ISKA",
    category: 'asrama',
    categoryLabel: "Fasilitas & Kampus",
    image: '/src/assets/images/iqbs_campus_exterior_1790514275417.jpg',
    caption: "Gedung representatif bernuansa hijau cerah dengan fasilitas modern di Kompleks Mayang, Gatak, Sukoharjo.",
    date: "Fasilitas Utama",
  },
  {
    id: 'gal-3',
    title: "Latihan Bela Diri & Olahraga Sunnah",
    category: 'ekskul',
    categoryLabel: "Ekstrakurikuler",
    image: '/src/assets/images/iqbs_santri_sports_silat_1790514290812.jpg',
    caption: "Pencak silat dan panahan melatih kedisiplinan fisik dan kesiapan mental santri di halaman utama.",
    date: "Selasa & Jumat",
  },
  {
    id: 'gal-4',
    title: "Kebersamaan Santri di Ruang Makan",
    category: 'asrama',
    categoryLabel: "Adab & Asrama",
    image: '/src/assets/images/iqbs_dining_community_1790514308673.jpg',
    caption: "Membiasakan adab makan islami, saling berbagi, dan doa bersama tiga kali sehari di ruang makan tertib.",
    date: "Aktivitas Harian",
  },
  {
    id: 'gal-5',
    title: "Outbound & Tadabbur Alam di Umbul Pelem",
    category: 'outbound',
    categoryLabel: "Outbound & Rihlah",
    image: '/src/assets/images/iqbs_outbound_adventure_1790514322514.jpg',
    caption: "Kegiatan outdoor rihlah santri di Umbul Pelem Klaten, mempererat ukhuwah dan menyegarkan semangat tholabul 'ilmi.",
    date: "Semester Ganjil",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Belajar di IQBS memberikan lingkungan yang sangat kondusif untuk menghafal Al-Qur'an. Metode talaqqi sanadnya membuat bacaan kami benar-benar terjaga kaidah tajwidnya.",
    name: "Akmal Javas Nararya",
    role: "Santri Berprestasi IQBS",
    badge: "Mutqin 30 Juz · Pemegang Sanad Tuhfatul Athfal",
  },
  {
    quote: "Sebagai orang tua, kami merasa tenang karena putra kami tidak hanya fokus menghafal Al-Qur'an, tapi juga mendapatkan pendidikan formal SMP dengan ijazah negara dan pengawasan 24 jam yang hangat.",
    name: "Drs. H. Hendra Wibawa",
    role: "Wali Santri Angkatan 2024",
    badge: "Wali Santri Asal Solo",
  },
  {
    quote: "Kurikulum mulazamah yang dipadukan dengan kurikulum formal nasional membekali santri pengetahuan syar'i sekaligus literasi sains dan teknologi yang relevan dengan zaman.",
    name: "Ust. Ahmad Fauzan, Lc.",
    role: "Kepala Bidang Tahfizh & Kurikulum",
    badge: "Dewan Asatidz IQBS Sukoharjo",
  },
];

export const FAQ_ITEMS = [
  {
    q: "Apakah pendaftaran hanya untuk calon santri laki-laki?",
    a: "Sesuai dengan ketentuan brosur resmi Penerimaan Santri Baru Tahun Pelajaran 2027/2028, IQBS Sukoharjo saat ini membuka kuota khusus santri putra (laki-laki) lulusan SD/MI atau sederajat.",
  },
  {
    q: "Bagaimana status ijazah formal di IQBS Sukoharjo?",
    a: "Pendidikan formal di IQBS setara SMP/MTs yang menyelenggarakan kurikulum resmi negara, sehingga para lulusan mendapatkan Ijazah Negara yang sah dan dapat melanjutkan ke jenjang SMA/SMK/MA negeri maupun swasta di seluruh Indonesia.",
  },
  {
    q: "Apa yang dimaksud dengan Program Tahsin Bersanad?",
    a: "Program Tahsin Bersanad adalah metode talaqqi di mana santri mempelajari makharijul huruf dan sifat-sifat huruf dari asatidz yang memiliki silsilah sanad tajwid sampai ke pengarang matan (seperti Matan Tuhfatul Athfal dan Matan Al-Jazariyah) hingga tersambung ke Rasulullah SAW.",
  },
  {
    q: "Berapa total biaya masuk dan apakah ada sistem cicilan?",
    a: "Total biaya daftar ulang adalah Rp 5.450.000,- (sudah termasuk SPP/syahriah bulan pertama Rp 950.000, seragam 4 stel, buku, fasilitas sewa ranjang/kasur, investasi sarana, kegiatan, dan kesehatan). Pembayaran dapat dikoordinasikan dengan bagian keuangan madrasah.",
  },
  {
    q: "Bagaimana proses seleksi santri baru?",
    a: "Setelah mendaftar online dan melunasi biaya pendaftaran Rp 100.000,-, calon santri akan dijadwalkan tes seleksi yang meliputi: Tes membaca Al-Qur'an & kemampuan tahfizh dasar, tes psikotes & potensi akademik, serta wawancara komitmen bersama orang tua / wali santri.",
  },
];
