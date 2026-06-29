## Panduan Instalasi & Menjalankan Proyek (Lokal)

Karena direktori `node_modules` dan file pangkalan data `dev.db` tidak disertakan di dalam repositori ini, silakan ikuti langkah-langkah berikut untuk menjalankan aplikasi di lingkungan lokal.

### 1. Prasyarat
Pastikan komputer Anda sudah terinstal:
* **Node.js** (versi 16 atau terbaru)
* **Git**

### 2. Kloning & Instalasi Dependensi
Buka terminal dan jalankan perintah berikut:
```bash
git clone https://github.com/katelynn2/SoftwareArchitecture-FinalProject.git
cd SoftwareArchitecture-FinalProject
npm install
```

### 3. Konfigurasi Database (Prisma SQLite)
Sistem ini menggunakan SQLite sehingga tidak memerlukan instalasi server pangkalan data terpisah. Jalankan perintah ini untuk melakukan sinkronisasi skema dan membuat file `dev.db` secara otomatis:
```bash
npx prisma db push
```

### 4. Inisialisasi Data Admin (Seeding)
Agar Anda dapat mengakses portal Admin, sistem memerlukan setidaknya satu akun admin. Jalankan perintah *seeder* ini untuk membuat akun *default*:
```bash
npx ts-node seed.ts
```

### 5. Menjalankan Server
```bash
npm run dev
```
Aplikasi sekarang berjalan di `http://localhost:3000`

---

## Kredensial Akses Admin (Untuk Pengujian)

Setelah menjalankan langkah *seeding* (Langkah 4), gunakan kredensial berikut untuk menguji *endpoint* otentikasi (Login):
* **Username:** `admin`
* **Password:** `secret123`

*(Catatan: Login akan mengembalikan token JWT yang harus dimasukkan ke dalam Header `Authorization: Bearer <token>` untuk mengakses rute privat).*

---