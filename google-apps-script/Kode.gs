/**
 * ==============================================================================
 * SISTEM PSB ONLINE - ISKA QUR'ANIC BOARDING SCHOOL (IQBS) SUKOHARJO
 * BACKEND GOOGLE APPS SCRIPT (Kode.gs)
 * ==============================================================================
 * Skrip ini menangani:
 * 1. setupSheet()  -> Membuat dan memformat otomatis sheet database santri baru.
 * 2. doPost(e)     -> Menerima kiriman pendaftaran dari website IQBS (PSB Online).
 * 3. doGet(e)      -> Mengecek status pendaftaran berdasarkan No. Registrasi / No. WA.
 * ==============================================================================
 */

// Konfigurasi Nama Sheet & Parameter Utama
const CONFIG = {
  SHEET_NAME: "Data_Pendaftaran_PSB",
  HEADER_BG_COLOR: "#0A5C36", // Hijau Zamrud Khas IQBS
  HEADER_TEXT_COLOR: "#FFFFFF",
  ACADEMIC_YEAR: "2027/2028",
  DEFAULT_TEST_SCHEDULE: "Sabtu, 15 Agustus 2026 (Pukul 08.00 WIB)"
};

/**
 * FUNGSI 1: Setup Otomatis Header dan Desain Google Spreadsheet
 * Jalankan fungsi ini SEKALI di editor Apps Script (Pilih 'setupSheet' lalu klik 'Run').
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  // Buat sheet baru jika belum ada
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  // Daftar Judul Kolom (Sesuai seluruh isi formulir PSB IQBS)
  const headers = [
    "Timestamp",
    "No. Registrasi",
    "Status Pendaftaran",
    "Nama Lengkap Santri",
    "Nama Panggilan",
    "Jenis Kelamin",
    "NISN",
    "NIK Santri",
    "Tempat Lahir",
    "Tanggal Lahir",
    "Asal Sekolah (SD/MI)",
    "Hafalan Al-Qur'an (Juz)",
    "Ukuran Seragam",
    "Nama Ayah / Wali",
    "Nama Ibu Kandung",
    "No. WhatsApp Wali",
    "Pekerjaan Ayah/Wali",
    "Penghasilan Wali",
    "Alamat Lengkap",
    "Kota / Kabupaten",
    "Biaya Pendaftaran",
    "Metode Pembayaran",
    "Jadwal Tes Seleksi",
    "Catatan Panitia"
  ];

  // Bersihkan baris pertama lama lalu masukkan header baru
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Styling Baris Header (Warna Hijau IQBS, Bold, Rata Tengah, Font Rapi)
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setBackground(CONFIG.HEADER_BG_COLOR)
    .setFontColor(CONFIG.HEADER_TEXT_COLOR)
    .setFontWeight("bold")
    .setFontFamily("Plus Jakarta Sans")
    .setFontSize(10)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(true);

  // Kunci (Freeze) baris pertama agar judul tetap terlihat saat scroll ke bawah
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 38);

  // Atur format angka/teks khusus untuk kolom NISN, NIK, No. WA (agar angka 0 di depan tidak hilang)
  sheet.getRange("G:H").setNumberFormat("@"); // NISN & NIK teks murni
  sheet.getRange("P:P").setNumberFormat("@"); // No WA teks murni
  sheet.getRange("U:U").setNumberFormat("Rp#,##0"); // Format Rupiah untuk Biaya

  // Auto-resize lebar setiap kolom agar pas dan rapi
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
    // Beri batas minimal lebar kolom agar nyaman dibaca
    if (sheet.getColumnWidth(i) < 130) {
      sheet.setColumnWidth(i, 140);
    }
  }

  Logger.log("✅ Berhasil! Sheet '" + CONFIG.SHEET_NAME + "' telah siap digunakan untuk PSB IQBS.");
}

/**
 * FUNGSI 2: Menerima Kiriman Data Pendaftaran dari Website (POST)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Kunci selama 10 detik agar data tidak bertabrakan saat banyak pendaftar bersamaan
  lock.tryLock(10000);

  try {
    let payload = {};

    // Dukung kiriman format JSON maupun Form-Urlencoded
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter;
      }
    } else {
      payload = e.parameter || {};
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    }

    // Generate No. Registrasi jika belum disertakan dari web
    const timestamp = new Date();
    const formattedTimestamp = Utilities.formatDate(timestamp, "GMT+7", "yyyy-MM-dd HH:mm:ss");
    
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const regNumber = payload.registrationNumber || ("IQBS-2027-" + randomCode);
    const status = payload.status || "TERVERIFIKASI";
    const testDate = payload.testScheduleDate || CONFIG.DEFAULT_TEST_SCHEDULE;

    // Susun baris baru
    const newRow = [
      formattedTimestamp,
      regNumber,
      status,
      payload.fullName || "-",
      payload.nickname || "-",
      payload.gender || "Laki-laki",
      "'" + (payload.nisn || "-"),
      "'" + (payload.nik || "-"),
      payload.birthPlace || "-",
      payload.birthDate || "-",
      payload.previousSchool || "-",
      payload.currentJuzMemorized !== undefined ? payload.currentJuzMemorized : "-",
      payload.tshirtSize || "-",
      payload.fatherName || "-",
      payload.motherName || "-",
      "'" + (payload.parentPhone || "-"),
      payload.fatherOccupation || "-",
      payload.monthlyIncome || "-",
      payload.address || "-",
      payload.city || "-",
      payload.registrationFee || 100000,
      payload.paymentMethod || "BSI",
      testDate,
      payload.notes || "Pendaftaran via Web Resmi IQBS"
    ];

    // Tulis ke baris paling akhir
    sheet.appendRow(newRow);

    // Styling baris baru (rata tengah untuk tanggal, no reg, status)
    const lastRowIndex = sheet.getLastRow();
    sheet.getRange(lastRowIndex, 1).setHorizontalAlignment("center");
    sheet.getRange(lastRowIndex, 2).setHorizontalAlignment("center").setFontWeight("bold");
    sheet.getRange(lastRowIndex, 3).setHorizontalAlignment("center").setBackground("#E6F4EA").setFontColor("#137333").setFontWeight("bold");
    sheet.getRange(lastRowIndex, 6).setHorizontalAlignment("center");
    sheet.getRange(lastRowIndex, 12).setHorizontalAlignment("center");
    sheet.getRange(lastRowIndex, 13).setHorizontalAlignment("center");
    sheet.getRange(lastRowIndex, 22).setHorizontalAlignment("center");

    const result = {
      success: true,
      message: "Pendaftaran berhasil disimpan ke Database IQBS",
      data: {
        registrationNumber: regNumber,
        status: status,
        fullName: payload.fullName,
        registeredAt: formattedTimestamp,
        testScheduleDate: testDate
      }
    };

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    const errorResponse = {
      success: false,
      message: "Terjadi kesalahan saat menyimpan: " + error.toString()
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * FUNGSI 3: Cek Status Pendaftaran dari Website (GET)
 * Mengizinkan pencarian via No Registrasi atau Nomor WhatsApp Wali
 * Contoh akses: https://script.google.com/.../exec?action=check&query=IQBS-2027-1496
 */
function doGet(e) {
  try {
    const action = (e.parameter && e.parameter.action) || "check";
    const query = (e.parameter && e.parameter.query) ? e.parameter.query.toString().trim().toLowerCase() : "";

    if (action === "ping") {
      return ContentService.createTextOutput(JSON.stringify({ status: "OK", server: "IQBS Apps Script v1.0" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!query) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Parameter 'query' wajib diisi (No. Registrasi / No. WA Wali)"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Database belum disetup"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Belum ada data pendaftar"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Kolom 2: No Registrasi (index 1), Kolom 16: No WA (index 15), Kolom 4: Nama (index 3)
    const cleanQuery = query.replace(/[\s\-\']/g, "");
    let foundRecord = null;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const regNum = (row[1] || "").toString().toLowerCase().replace(/[\s\-]/g, "");
      const santriName = (row[3] || "").toString().toLowerCase();
      const parentPhone = (row[15] || "").toString().replace(/[\s\-\']/g, "");

      if (regNum.includes(cleanQuery) || parentPhone.includes(cleanQuery) || santriName.includes(query)) {
        foundRecord = {
          registeredAt: Utilities.formatDate(new Date(row[0]), "GMT+7", "dd MMMM yyyy HH:mm"),
          registrationNumber: row[1],
          status: row[2],
          fullName: row[3],
          nickname: row[4],
          gender: row[5],
          nisn: row[6],
          nik: row[7],
          birthPlace: row[8],
          birthDate: row[9],
          previousSchool: row[10],
          currentJuzMemorized: row[11],
          tshirtSize: row[12],
          fatherName: row[13],
          motherName: row[14],
          parentPhone: row[15],
          fatherOccupation: row[16],
          monthlyIncome: row[17],
          address: row[18],
          city: row[19],
          registrationFee: row[20],
          paymentMethod: row[21],
          testScheduleDate: row[22]
        };
        break;
      }
    }

    if (foundRecord) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: foundRecord
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Data pendaftar dengan kata kunci '" + query + "' tidak ditemukan."
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
