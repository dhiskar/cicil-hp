# Hosting di GitHub Pages — data tetap offline

Aplikasi ini **bisa di-hosting gratis di GitHub Pages** dan tetap bekerja seperti aplikasi offline. GitHub hanya menyimpan **kode aplikasi**; data pelanggan/kontrak/cicilan **tidak pernah dikirim ke GitHub**.

---

## 1. File yang di-upload

Buat repository baru (misalnya `cicilan-hp`), lalu upload file berikut ke **root repository**:

| File | Wajib? | Fungsi |
| --- | --- | --- |
| `index.html` | Ya | Aplikasi lengkap (sudah berisi CSS + JS + PDF/JPG) |
| `manifest.webmanifest` | Ya | Supaya bisa "Install / Tambahkan ke layar utama" |
| `sw.js` | Ya | Service worker — membuat aplikasi tetap terbuka tanpa internet |
| `icon-180.png` | Ya | Ikon iPhone / layar utama |
| `icon-192.png` | Ya | Ikon Android |
| `icon-512.png` | Ya | Ikon aplikasi |
| `icon-512-maskable.png` | Ya | Ikon Android bentuk bulat/persegi |
| `.nojekyll` | Ya | Mencegah GitHub memproses file dengan Jekyll |

`CicilanHP.html` boleh ikut di-upload (isinya sama dengan `index.html`), tetapi tidak wajib.
Folder `src/`, `build.py`, `README.md`, dan `shots/` **tidak perlu** untuk hosting.

> **Cara cepat:** upload semua file di atas lewat tombol **Add file → Upload files** di GitHub. Jangan upload lewat fitur "Create new file" satu per satu.

---

## 2. Aktifkan GitHub Pages

1. Buka repository → **Settings**.
2. Menu kiri → **Pages**.
3. Bagian **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Klik **Save**.
5. Tunggu 1–2 menit. Alamat aplikasi muncul:

```
https://USERNAME.github.io/cicilan-hp/
```

Contoh: `https://budi.github.io/cicilan-hp/`

> Jika file diletakkan di folder `docs/`, pilih folder **`/docs`** pada langkah 3.
> Jika repository-nya bernama `USERNAME.github.io`, alamatnya langsung `https://USERNAME.github.io/`.

---

## 3. Supaya benar-benar offline di HP

1. Buka alamat GitHub Pages tadi di **Chrome** (HP harus online sekali saja).
2. Tunggu beberapa detik sampai halaman selesai dimuat (service worker otomatis menyimpan aplikasi).
3. Menu **⋮ → Tambahkan ke layar utama** / **Install app**.
4. Tutup aplikasi, lalu coba buka lagi dalam **mode pesawat**. Aplikasi tetap terbuka.

Setelah terpasang, ikonnya muncul di homescreen seperti aplikasi biasa. Kuitansi PDF/JPG juga tetap dibuat di HP tanpa internet.

---

## 4. Data tetap offline — bukan di GitHub

| Hal | Disimpan di mana |
| --- | --- |
| Kode aplikasi (HTML, CSS, JS, ikon) | Repository GitHub |
| Pelanggan, kontrak, cicilan | Penyimpanan Chrome di HP |
| File database `.json` (mode file) | Folder yang kamu pilih di HP (Documents/Download) |
| Cadangan manual `.json` | Folder Download HP |

Artinya:

- GitHub **tidak bisa membaca** data pelangganmu.
- Data **tidak otomatis tersinkron** antar HP. Setiap HP punya data sendiri.
- Untuk pindah HP: **Pengaturan → Unduh cadangan manual**, lalu di HP baru **Pengaturan → Pulihkan dari cadangan**.
- Jika data situs Chrome dihapus, data bisa hilang — kecuali kamu memakai **Simpan ke file di HP** atau rutin mengunduh cadangan.

> Hosting di GitHub Pages memakai **HTTPS**, jadi fitur **“Simpan ke file di HP”** justru lebih didukung dibanding membuka file `file://` langsung. File tetap ditulis ke folder pilihanmu di HP, bukan ke GitHub.

---

## 5. Penting saat pindah dari versi file (`file://`) ke GitHub Pages

Alamat `file:///...` dan `https://...github.io` adalah **dua tempat berbeda** di browser. Data lama tidak otomatis muncul di versi GitHub.

Langkah pindah:

1. Di versi lama: **Pengaturan → Unduh cadangan manual**.
2. Buka versi GitHub Pages.
3. **Pengaturan → Pulihkan dari cadangan** → pilih file `.json` tadi.
4. Di HP baru, sambungkan lagi file penyimpanan otomatis bila mau: **Pengaturan → Simpan ke file di HP**.

Jangan memakai versi lama dan versi GitHub bergantian tanpa memindahkan data — keduanya tidak saling sinkron.

---

## 6. Cara update aplikasi

1. Ubah kode di folder `src/`.
2. Jalankan:

```bash
python3 build.py
cp index.html CicilanHP.html
```

3. Naikkan nomor cache di `sw.js`, misalnya dari `cicilan-hp-v1.4-1` menjadi `cicilan-hp-v1.4-2`. Ini memaksa HP mengambil versi baru.
4. Upload ulang `index.html` (dan `CicilanHP.html`) ke GitHub.
5. Buka aplikasi saat online — versi baru otomatis terpasang.

---

## 7. Catatan

- Repository **publik** paling mudah dan gratis untuk GitHub Pages.
- Siapa pun yang tahu alamatnya bisa membuka **aplikasinya**, tetapi **bukan datamu** — data tidak ada di server.
- Jangan menaruh file database `.json` berisi data asli ke repository GitHub. File itu hanya untuk HP.
- GitHub Pages hanya hosting statis: tidak ada server, tidak ada database, tidak ada sinkronisasi.
