# 📱 Panduan Publish ke Google Play Store

Panduan lengkap untuk mempublikasikan Modern Calculator PWA ke Google Play Store.

## 🎯 Metode yang Akan Digunakan

Kita akan menggunakan **PWA Builder** untuk mengkonversi PWA menjadi APK yang siap di-upload ke Play Store.

---

## 📋 Persiapan Sebelum Mulai

### 1. **Akun Google Play Console**
- Biaya: **$25 USD** (satu kali, seumur hidup)
- Daftar di: https://play.google.com/console/signup
- Proses verifikasi: 1-2 hari

### 2. **Informasi Aplikasi yang Diperlukan**
Siapkan data berikut:

#### **Informasi Dasar**
- **Nama Aplikasi**: Modern Calculator
- **Deskripsi Singkat**: A beautiful, modern calculator with PWA support
- **Deskripsi Lengkap**: (lihat bagian bawah untuk template)
- **Kategori**: Tools / Utilities
- **Email Kontak**: awanmendung@example.com (ganti dengan email Anda)

#### **Assets Visual**
- ✅ **Icon**: Sudah ada di `static/icons/icon-512x512.png`
- 🔲 **Feature Graphic**: 1024x500 px (akan kita buat)
- 🔲 **Screenshots**: Minimal 2 screenshot (akan kita buat)

### 3. **Privacy Policy**
Google Play mengharuskan Privacy Policy. Template sudah disediakan di bawah.

---

## 🚀 Langkah-Langkah Membuat APK

### **Step 1: Generate APK dengan PWA Builder**

1. **Buka PWA Builder**
   - Website: https://www.pwabuilder.com/
   - Klik "Get Started"

2. **Input URL PWA Anda**
   ```
   https://awanmendung.pythonanywhere.com
   ```
   - Klik "Start" atau "Analyze"
   - PWA Builder akan menganalisis aplikasi Anda

3. **Review PWA Score**
   - Pastikan semua checklist hijau
   - Jika ada yang merah, perbaiki dulu (tapi PWA kita sudah bagus!)

4. **Generate Android Package**
   - Klik "Package For Stores"
   - Pilih **"Android"**
   - Klik "Generate Package" atau "Options"

5. **Konfigurasi Android Package**
   
   Isi form dengan data berikut:
   
   - **Package ID**: `com.awanmendung.calculator`
     (Format: com.namaanda.namaapp)
   
   - **App name**: `Modern Calculator`
   
   - **Launcher name**: `Calculator`
   
   - **App version**: `1.0.0`
   
   - **App version code**: `1`
   
   - **Host**: `awanmendung.pythonanywhere.com`
   
   - **Start URL**: `/`
   
   - **Theme color**: `#6366f1`
   
   - **Background color**: `#1a1a2e`
   
   - **Icon URL**: `https://awanmendung.pythonanywhere.com/static/icons/icon-512x512.png`
   
   - **Maskable icon**: (sama dengan Icon URL)
   
   - **Monochrome icon**: (kosongkan atau sama dengan Icon URL)
   
   - **Shortcuts**: (skip dulu)
   
   - **Display mode**: `standalone`
   
   - **Orientation**: `portrait`
   
   - **Signing key**: Pilih "New" untuk generate signing key baru

6. **Download APK**
   - Klik "Generate" atau "Download"
   - PWA Builder akan generate APK dan signing key
   - Download file `.zip` yang berisi:
     - `app-release-signed.apk` atau `.aab`
     - `signing-key.keystore`
     - `signing-key-info.txt`
   - **SIMPAN signing key dengan AMAN!** Anda perlu ini untuk update aplikasi nanti

7. **Extract dan Simpan**
   - Extract file `.zip`
   - Simpan `signing-key.keystore` dan `signing-key-info.txt` di tempat yang aman
   - File APK/AAB siap untuk di-upload ke Play Store

---

### **Step 2: Persiapkan Assets untuk Play Store**

#### **2.1 Feature Graphic (1024 x 500 px)**
File ini sudah saya generate, lihat: `playstore-assets/feature-graphic.png`

#### **2.2 Screenshots**
Ambil screenshot dari aplikasi yang berjalan di browser atau HP Android:
- Minimal 2 screenshot
- Ukuran: 1080 x 1920 px (portrait) atau 1920 x 1080 px (landscape)
- Format: PNG atau JPEG
- Simpan di folder `playstore-assets/screenshots/`

#### **2.3 Icon High-Res (512 x 512 px)**
Sudah tersedia di: `static/icons/icon-512x512.png`

---

### **Step 3: Upload ke Google Play Console**

1. **Login ke Play Console**
   - Buka: https://play.google.com/console/
   - Login dengan akun Google Anda
   - Bayar $25 jika belum (one-time fee)

2. **Create New App**
   - Klik "Create app"
   - Pilih "App" (bukan Game)
   - Default language: English (UK) atau Indonesian
   - App name: `Modern Calculator`
   - Centang semua deklarasi
   - Klik "Create app"

3. **Set Up App**
   
   **a. App Details**
   - Short description: (max 80 karakter)
     ```
     A beautiful, modern calculator app with offline support
     ```
   
   - Full description: (lihat template di bawah)
   
   - App category: Tools
   
   - Tags: calculator, math, utility
   
   - Email: your-email@example.com
   
   **b. Store Listing**
   - Upload **Feature graphic** (1024x500)
   - Upload **Icon** (512x512)
   - Upload **Screenshots** (minimal 2)

4. **Upload APK/AAB**
   - Klik "Production" atau "Testing" → "Internal testing"
   - Klik "Create new release"
   - Upload file `.aab` atau `.apk` dari PWA Builder
   - Isi "Release name": Version 1.0.0
   - Isi "Release notes":
     ```
     Initial release of Modern Calculator
     - Beautiful modern UI
     - Offline support
     - Calculation history
     - Fast and responsive
     ```
   - Klik "Save" dan "Review release"

5. **Content Rating**
   - Isi questionnaire
   - Untuk kalkulator, biasanya "Everyone" (semua umur)
   - Submit

6. **Privacy Policy**
   - Upload Privacy Policy URL atau teks
   - Template ada di bawah

7. **App Content**
   - Target audience: All ages
   - Data safety: Lihat section di bawah
   - Ads: Pilih "No" jika tidak ada iklan

8. **Pricing & Distribution**
   - Free
   - Countries: Pilih semua atau negara tertentu
   - Centang content guidelines

9. **Submit for Review**
   - Review semua informasi
   - Klik "Submit for review"
   - Proses review: 1-7 hari

---

## 📄 Template Konten

### **App Description (Play Store)**

```
Modern Calculator - A Beautiful & Powerful Calculator App

Transform your calculation experience with Modern Calculator, a sleek and powerful Progressive Web App designed for speed and simplicity.

✨ KEY FEATURES:
• Beautiful gradient UI with smooth animations
• Lightning-fast calculations
• Complete calculation history
• Offline support - works without internet
• Keyboard shortcuts for power users
• Responsive design for all screen sizes
• No ads, completely free

🎯 PERFECT FOR:
• Students doing homework
• Professionals at work
• Anyone who needs quick calculations
• People who appreciate beautiful design

📱 WORKS OFFLINE:
Once installed, Modern Calculator works perfectly without an internet connection. Your calculations are always available.

🚀 LIGHTWEIGHT & FAST:
Only 500KB installed size - won't take up much space on your device. Loads instantly and runs smoothly on any Android device.

🔒 PRIVACY-FOCUSED:
No tracking, no data collection. Your calculations stay on your device.

💡 MODERN TECHNOLOGY:
Built using Progressive Web App (PWA) technology for the best mobile experience. Regular automatic updates ensure you always have the latest features.

📊 TECHNICAL SPECS:
• Supports all basic operations: +, -, ×, ÷, %
• Decimal calculations
• History of last 10 calculations
• Works on Android 5.0 and above

Download Modern Calculator today and experience the future of mobile calculators!

---

Developer: Awanmendung
Website: https://awanmendung.pythonanywhere.com
Privacy Policy: [Your Privacy Policy URL]

For support, contact: awanmendung@example.com
```

### **Privacy Policy**

Simpan file ini sebagai HTML dan host di GitHub Pages atau website Anda:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Modern Calculator</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; line-height: 1.6; }
        h1 { color: #6366f1; }
        h2 { color: #333; margin-top: 30px; }
    </style>
</head>
<body>
    <h1>Privacy Policy for Modern Calculator</h1>
    <p><strong>Effective Date:</strong> January 14, 2026</p>
    
    <h2>1. Introduction</h2>
    <p>Modern Calculator ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information in our calculator application.</p>
    
    <h2>2. Information We Collect</h2>
    <p><strong>We do NOT collect, store, or transmit any personal information.</strong></p>
    <p>Modern Calculator is a simple calculator app that:</p>
    <ul>
        <li>Does not require registration or login</li>
        <li>Does not collect personal data</li>
        <li>Does not track your usage</li>
        <li>Does not use analytics</li>
        <li>Does not contain advertisements</li>
    </ul>
    
    <h2>3. Data Storage</h2>
    <p>All calculations are performed locally on your device. The calculation history is stored only in your browser's local storage and never leaves your device.</p>
    
    <h2>4. Third-Party Services</h2>
    <p>We do not use any third-party analytics, advertising, or tracking services.</p>
    
    <h2>5. Children's Privacy</h2>
    <p>Our app is safe for children of all ages as we do not collect any information.</p>
    
    <h2>6. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. We will notify users of any changes by posting the new Privacy Policy on this page.</p>
    
    <h2>7. Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us at:</p>
    <p>Email: awanmendung@example.com<br>
    Website: https://awanmendung.pythonanywhere.com</p>
    
    <hr>
    <p><small>Last updated: January 14, 2026</small></p>
</body>
</html>
```

### **Data Safety Form (Google Play)**

Jawab seperti ini di Play Console:

**Does your app collect or share any of the required user data types?**
- ☑️ No, our app doesn't collect or share any of the required user data types

**Data Collection & Security:**
- Data is encrypted in transit: Not applicable
- Data is not collected
- Users can request data deletion: Not applicable (no data collected)

---

## ⚠️ Penting!

### **Signing Key**
- **JANGAN PERNAH HILANGKAN** file `signing-key.keystore`!
- Simpan di cloud storage (Google Drive, Dropbox)
- Simpan backup key info
- Tanpa key ini, Anda TIDAK BISA update aplikasi!

### **Package Name**
- Package name (com.awanmendung.calculator) TIDAK BISA DIGANTI setelah publish
- Pastikan sudah benar sebelum upload

### **Review Process**
- Review pertama biasanya 3-7 hari
- Update selanjutnya lebih cepat (1-2 hari)
- Bisa ditolak jika:
  - Privacy policy kurang lengkap
  - Screenshot tidak jelas
  - App crash saat testing
  - Melanggar kebijakan Google

---

## 🎯 Checklist Pre-Launch

Sebelum submit ke Play Store:

- [ ] APK/AAB file sudah di-generate dari PWA Builder
- [ ] Signing key sudah disimpan dengan aman
- [ ] Feature graphic (1024x500) sudah dibuat
- [ ] Screenshots (minimal 2) sudah disiapkan
- [ ] Privacy Policy sudah di-host online
- [ ] App description sudah ditulis
- [ ] Email kontak valid
- [ ] Google Play Console account sudah dibuat ($25 dibayar)
- [ ] Content rating questionnaire sudah diisi
- [ ] Data safety form sudah diisi

---

## 💰 Total Biaya

| Item | Biaya |
|------|-------|
| Google Play Console Registration | $25 USD (one-time) |
| PWA Builder | FREE |
| Hosting (PythonAnywhere) | FREE |
| Domain (optional) | $10-15/tahun |
| **TOTAL** | **$25** (atau $35-40 dengan domain) |

---

## 🚀 Alternative: Sideload APK

Jika tidak ingin bayar $25 untuk Play Store, Anda bisa:

1. Generate APK dengan PWA Builder
2. Upload APK ke website/Google Drive
3. User download dan install manual (enable "Unknown Sources")
4. Gratis, tapi user harus percaya untuk install

---

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:

1. **PWA Builder**: https://docs.pwabuilder.com/
2. **Google Play Console Help**: https://support.google.com/googleplay/android-developer/
3. **GitHub Issues**: [Your GitHub repo]/issues

---

**Selamat! Anda siap publish aplikasi ke Google Play Store! 🎉**

Jika butuh bantuan di langkah manapun, jangan ragu untuk bertanya!
