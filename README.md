# Cicilan HP — Aplikasi Pengelolaan Cicilan Handphone

Aplikasi Android (web app offline) sesuai rancangan: **Pelanggan → Kontrak → Cicilan**, lengkap dengan kuitansi PDF/JPG, pengingat WhatsApp, laporan, dan tema terang/gelap.

Tidak butuh server, tidak butuh internet, tidak butuh install dari Play Store.

Bisa dipakai sebagai **file tunggal di HP** (`file://`) **atau di-hosting gratis di GitHub Pages** dengan mode offline (PWA). Data tetap tersimpan di HP, bukan di GitHub. Panduan hosting: **[GITHUB-PAGES.md](GITHUB-PAGES.md)**.

---

## 1. Cara membuka di HP Android

File aplikasi: **`CicilanHP.html`** (satu file, sudah tersimpan di folder **Download**).

> Alternatif: hosting di GitHub Pages agar bisa dibuka lewat alamat `https://...github.io/...` dan dipasang seperti aplikasi. Lihat **[GITHUB-PAGES.md](GITHUB-PAGES.md)**.

**Cara A — lewat Chrome (disarankan)**
1. Buka **Chrome**.
2. Ketik di address bar: `file:///sdcard/Download/CicilanHP.html` lalu Enter.
3. Menu **⋮ → Tambahkan ke layar utama** agar ada ikon aplikasi di homescreen.

**Cara B — lewat aplikasi Files**
1. Buka **Files** → **Download** → ketuk `CicilanHP.html`.
2. Pilih **Chrome** (atau browser lain) untuk membukanya.

> Jika muncul pilihan "buka dengan", pilih browser. Jangan pilih editor teks.
> Jika di Download ada beberapa file dengan nama sama, pilih yang paling baru.

## 2. Fitur

| Bagian | Isi |
| --- | --- |
| **Beranda** | Total piutang berjalan, kontrak aktif/lunas, cicilan masuk bulan ini, status penyimpanan, daftar kontrak & pembayaran terakhir |
| **Pelanggan** | Tambah/edit/hapus pelanggan, pencarian, tombol telepon & WhatsApp, riwayat kontrak per pelanggan |
| **Kontrak** | Buat kontrak (total harga otomatis jadi sisa tagihan, status AKTIF), filter Semua/Aktif/Lunas, progress pembayaran |
| **Pembayaran** | Input tanggal + nominal, potong sisa tagihan otomatis, status berubah **LUNAS** saat sisa 0, validasi agar tidak melebihi sisa |
| **Kuitansi** | Pratinjau kuitansi + **gambar JPG** (langsung tampil di WhatsApp) + **PDF asli A5** untuk arsip/cetak, teks kuitansi untuk WhatsApp |
| **Laporan** | Grafik 6 bulan, total cicilan per bulan (pilih bulan), total piutang, ekspor CSV (Excel) |
| **Pengaturan** | Identitas toko, **tema Terang / Gelap**, **penyimpanan ke file di HP**, cadangan/pulihkan JSON, data contoh, hapus semua data |

Detail kecil yang sudah diurus:

- ID otomatis berurutan (`P001`, `K001`, `C001`).
- Format Rupiah `Rp 1.250.000` dan format tanggal Indonesia.
- Nominal cepat: **50 rb**, **100 rb**, **200 rb**, tombol **+** (menambah Rp 50.000 tiap ketuk), atau "Lunasi". Nominal otomatis dibatasi maksimal sebesar sisa tagihan.
- **Tema terang / gelap** bisa diganti kapan saja di **Pengaturan → Tampilan**. Pilihan tersimpan di perangkat dan langsung berlaku tanpa memuat ulang. Kuitansi (PDF/JPG) selalu putih agar tetap rapi saat dicetak atau dikirim.
- Hapus pembayaran → sisa tagihan dihitung ulang otomatis (koreksi salah input).
- Hapus kontrak → riwayat cicilannya ikut terhapus (dengan konfirmasi).
- Pelanggan yang masih punya kontrak tidak bisa dihapus.
- Tombol back Android menutup dialog, bukan keluar aplikasi.
- Nomor `08xx` otomatis jadi `628xx` saat kirim WhatsApp.

## 3. Alur pemakaian

1. **Pengaturan** → isi nama, nomor, dan alamat toko (dipakai di kuitansi). Di bagian **Tampilan**, pilih tema **Terang** atau **Gelap** sesuai selera.
2. **Pengaturan → Simpan ke file di HP** (lihat bagian 5) agar data tidak bergantung pada browser.
3. **Pelanggan** → tambah pelanggan (nama wajib, HP & alamat opsional).
4. Di halaman pelanggan → **Kontrak** → isi nama barang + total harga.
5. Di halaman kontrak → **Input pembayaran** → isi tanggal & nominal → simpan.
6. Setelah tersimpan, kuitansi langsung muncul. Pilih **Bagikan JPG** → pilih WhatsApp → gambar kuitansi langsung tampil di chat (tanpa harus dibuka seperti PDF). Tombol **Simpan JPG**, **Bagikan PDF**, dan **Simpan PDF** tetap tersedia.
7. **Laporan** → pantau cicilan masuk dan sisa piutang. Ekspor CSV bila perlu diolah di Excel.

## 4. Kuitansi JPG vs PDF

| Tombol | Kegunaan |
| --- | --- |
| **Bagikan JPG** | Membuka menu berbagi Android. Pilih WhatsApp → kuitansi langsung terlihat sebagai gambar di chat. Paling praktis untuk pelanggan. |
| **Simpan JPG** | Menyimpan `Kuitansi-Cxxx-Nama.jpg` ke folder Download. |
| **Bagikan PDF** | Berbagi PDF A5 (seperti sebelumnya) — pelanggan harus membuka file. |
| **Simpan PDF** | Menyimpan PDF ke Download untuk arsip/cetak. |
| **Kirim teks WhatsApp** | Mengirim ringkasan kuitansi sebagai teks (tanpa gambar). |

Gambar dibuat langsung di HP (canvas), ukuran **1080 × 1530 px** (rasio A5), tanpa internet dan tanpa library. WhatsApp akan mengompres sedikit, tetapi teks tetap tajam.

## 5. Penyimpanan data — penting

Aplikasi ini punya **dua mode penyimpanan**. Mode 2 jauh lebih aman dan disarankan.

### Mode 1 — di dalam browser (otomatis, selalu aktif)

- Data disimpan di `localStorage` milik Chrome, dengan **salinan cermin di IndexedDB**.
- IndexedDB dipakai untuk memulihkan data bila `localStorage` terhapus tetapi data situs belum dibersihkan total.
- **Risiko:** jika kamu memilih *"Hapus data situs" / "Clear browsing data → Cookies and site data"* untuk halaman ini, atau Chrome di-uninstall, data bisa hilang.
- Beranda menampilkan peringatan kuning **"Data masih di dalam browser"** selama mode ini aktif.

### Mode 2 — file asli di penyimpanan HP (disarankan)

1. Buka **Pengaturan → Simpan ke file di HP**.
2. Akan muncul pemilih file Chrome. Pilih folder **Documents** atau **Download**, nama misalnya `cicilan-hp-data.json`, lalu **Save**.
3. Setelah terhubung, **setiap perubahan ditulis otomatis ke file itu** (pelanggan, kontrak, pembayaran, pengaturan toko).
4. Beranda berubah menjadi hijau **"Tersimpan otomatis ke file"**, dan Pengaturan menampilkan nama file + waktu tulis terakhir.

Yang perlu diketahui tentang mode ini:

- Butuh **Chrome Android 132 atau lebih baru** (rilis awal 2025). Kalau tombolnya tidak muncul, update Chrome.
- Jika Chrome dimulai ulang, Android kadang meminta izin sekali lagi. Banner biru **"Izin file perlu diaktifkan"** akan muncul — cukup ketuk **Aktifkan akses file**.
- **Jangan hapus / pindahkan / ganti nama file** `cicilan-hp-data.json`. Kalau file hilang, aplikasi tidak bisa menulis lagi (data di browser tetap ada).
- Data tetap juga disimpan di browser sebagai lapisan kedua, jadi file dan browser saling mencadangkan.
- Saat aplikasi dibuka, aplikasi membandingkan waktu simpan file vs browser dan **otomatis memakai yang paling baru**.
- File JSON bisa disalin ke Google Drive/WhatsApp sebagai cadangan tambahan, dan dibuka kembali lewat **Pengaturan → Buka file data yang sudah ada**.
- Kalau browser menolak akses file (misalnya karena kebijakan tertentu), gunakan **Unduh cadangan manual** — file masuk ke folder Download HP.

### Cadangan manual (selalu bisa)

**Pengaturan → Unduh cadangan manual (JSON)** menghasilkan file `cadangan-cicilan-hp-YYYY-MM-DD.json` di folder Download. Pulihkan dengan **Pulihkan dari cadangan** (atau **Buka file data**).

> Catatan: membuka file HTML yang sama di browser berbeda (Chrome vs Firefox) = data browser terpisah. Gunakan satu browser saja, dan andalkan file JSON untuk berpindah.

## 6. Struktur file

```
cicilan-hp/
├── index.html          # aplikasi jadi (satu file, siap dibuka / GitHub Pages)  ≈ 129 KB
├── CicilanHP.html      # salinan untuk dikirim ke HP (nama ramah)
├── manifest.webmanifest  # manifest PWA (install ke layar utama)
├── sw.js               # service worker: aplikasi tetap terbuka tanpa internet
├── icon-180.png        # ikon iPhone / layar utama
├── icon-192.png        # ikon Android
├── icon-512.png        # ikon aplikasi
├── icon-512-maskable.png  # ikon Android (maskable)
├── .nojekyll           # agar GitHub Pages tidak memproses dengan Jekyll
├── GITHUB-PAGES.md     # panduan hosting + data offline
├── build.py            # gabungkan src/* → index.html
├── src/
│   ├── index.template.html
│   ├── styles.css      # tema gelap & terang, mobile-first
│   ├── pdf.js          # pembuat PDF kuitansi murni JS (tanpa library)
│   ├── receipt-image.js  # gambar kuitansi JPG (canvas, tanpa library)
│   ├── app-core.js     # util, data, router, dialog, toast
│   ├── app-views.js    # beranda, pelanggan, kontrak, laporan
│   ├── app-forms.js    # form, pembayaran, kuitansi, cadangan, data contoh
│   └── storage.js      # file di HP (File System Access API) + cermin IndexedDB
├── shots/              # tangkapan layar hasil uji otomatis (Playwright)
└── README.md
```

Ubah kode di `src/`, lalu jalankan:

```bash
python3 build.py     # menghasilkan index.html baru
```

## 7. Kenapa bukan APK?

Build APK native butuh JDK + Android SDK, dan komponen wajibnya (`aapt2`) tidak tersedia untuk Linux ARM64 — perangkat ini ARM64 tanpa JDK. Karena itu aplikasi dibuat sebagai web app offline satu file: tetap berjalan penuh di Android, bisa dipasang sebagai ikon di homescreen, dan tidak kalah fungsional untuk kebutuhan pencatatan cicilan.

Jika nanti ingin bentuk APK (misalnya untuk dipasang di HP lain tanpa browser), aplikasi ini bisa dibungkus WebView di komputer yang punya Android Studio — logikanya tidak perlu diubah.

## 8. Hosting di GitHub Pages (opsional)

Aplikasi bisa di-upload ke repository GitHub dan diaktifkan lewat **Settings → Pages**. Setelah dibuka sekali secara online, service worker membuatnya tetap bisa dibuka **tanpa internet** dan bisa dipasang ke layar utama seperti aplikasi biasa.

**Data tidak ikut ke GitHub.** Yang di-hosting hanya kode aplikasi; pelanggan, kontrak, dan cicilan tetap di penyimpanan HP. Antar HP tidak otomatis sinkron — pindahkan data dengan file JSON.

Panduan langkah demi langkah (file yang di-upload, pengaturan Pages, uji mode pesawat, pindah data dari `file://`): **[GITHUB-PAGES.md](GITHUB-PAGES.md)**.

## 9. Sudah diuji

- Uji otomatis end-to-end (Chromium mobile 360×780 & 430×932): tambah pelanggan, buat kontrak, bayar, kuitansi, PDF, CSV, pencarian, filter, cadangan, muat ulang data — **tanpa error console**.
- Uji penyimpanan file dengan handle tiruan: sambung file, tulis otomatis setiap pembayaran, izin dicabut → banner muncul, izin diaktifkan lagi, putuskan file.
- Uji rekonsiliasi: file lebih baru → data file dipakai; browser lebih baru → file ditimpa; file rusak → ditulis ulang; `localStorage` kosong → dipulihkan dari cermin IndexedDB.
- PDF divalidasi dengan `pypdf`: 1 halaman, A5 (420×595 pt), semua teks terbaca.
- JPG kuitansi divalidasi: 1080×1530 px, header JPEG valid, 30 elemen teks semuanya di dalam bingkai dan tidak tumpang tindih (termasuk nama pelanggan yang sangat panjang).
- Tombol **Bagikan JPG** diuji dengan Web Share API tiruan: file `image/jpeg` benar-benar dikirim ke menu berbagi; bila perangkat tidak mendukung, otomatis jatuh ke unduhan.
- Pemeriksaan layout: tidak ada elemen melebar keluar layar di semua halaman.
- Tema: pilihan **Terang/Gelap** tersimpan, bertahan setelah dibuka ulang, kontras teks lolos, dan tidak mengubah kuitansi PDF/JPG.
- Hosting/PWA: manifest valid, ikon 180/192/512/maskable tersedia, service worker menyimpan semua file shell, navigasi offline memakai `index.html` dari cache, dan cache versi lama dibersihkan otomatis.
