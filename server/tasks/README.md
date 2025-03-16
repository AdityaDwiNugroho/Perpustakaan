# Server Tasks Documentation

<div align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/folder-tasks.svg" width="100" height="100" alt="Tasks Folder Icon"/>
  
  *Mengelola tugas-tugas server untuk aplikasi perpustakaan*
</div>

## Daftar Isi

- [Pengenalan](#pengenalan)
- [Struktur Direktori](#struktur-direktori)
- [Tasks](#tasks)
  - [Seed User](#seed-user)
  - [Seed Book](#seed-book)
- [Cara Menjalankan Tasks](#cara-menjalankan-tasks)
- [Catatan Tambahan](#catatan-tambahan)

## Pengenalan

Tasks dalam direktori ini dirancang untuk melakukan operasi-operasi yang berhubungan dengan manajemen data dan pemeliharaan sistem. Beberapa tugas umum termasuk seeding database, migrasi data, dan tugas administratif lainnya.

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" width="60" height="60" alt="Gear"/>
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Card%20File%20Box.png" width="60" height="60" alt="Database"/>
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png" width="60" height="60" alt="Laptop"/>
</div>

## Struktur Direktori

```
server/tasks/
├── README.md
├── user-seed.ts
├── book-seed.ts
└── ... (task files lainnya)
```

## Tasks

### Seed User

File: `user-seed.ts`

Task ini bertugas untuk melakukan seeding data pengguna awal ke dalam database. Task ini memeriksa keberadaan pengguna yang sudah ada sebelum mencoba membuat pengguna baru untuk menghindari duplikasi.

#### Fungsionalitas:

1. Memeriksa apakah pengguna dengan email tertentu sudah ada
2. Membuat hash password menggunakan bcrypt
3. Membuat beberapa pengguna dengan peran berbeda:
   - Administrator (Dr. Sophia Mindscape)
   - Petugas (Elias Perception)

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Technologist.png" width="60" height="60" alt="Technologist"/>
</div>

#### Contoh Kode:

```typescript
import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

async function main() {
    // User: Check if any of these users already exist
    const existingUser = await prisma.user.findFirst({
        where: {
            email: { in: ["ineffable@qualia.flux", "navigator@qualia.flux", "guide@qualia.flux"] }
        }
    });

    if (existingUser) {
        console.log("User already exists:", existingUser);
        return;
    }

    console.log("Seeding new users...");

    // Pasword: Hash passwords
    const hashedPasswordAdmin = await bcrypt.hash("Qu4l!4C0nsc10usn3ss", 10);
    const hashedPasswordOfficer = await bcrypt.hash("1n3ff4bl3P4thw4ys", 10);

    // User: Prepare user data
    const userData: Prisma.UserCreateInput[] = [
        {
            fullname: "Dr. Sophia Mindscape",
            username: "navigator_qualia",
            email: "navigator@qualia.flux",
            password: hashedPasswordAdmin,
            phone: "+1-702-544-9023",
            gender: "Female",
            birthdate: new Date(),
            role: "ADMINISTRATOR",
            photo: null,
            address: "88 Consciousness Circle, Perception Vale, PV 45Q2",
            is_verify: true,
            is_active: true,
            last_login: null
        },
        {
            fullname: "Elias Perception",
            username: "guide_ineffable",
            email: "guide@qualia.flux",
            password: hashedPasswordOfficer,
            phone: "+1-702-544-9024",
            gender: "Male",
            birthdate: new Date(),
            role: "PETUGAS",
            photo: null,
            address: "34 Subjective Avenue, Perception Vale, PV 45Q2",
            is_verify: true,
            is_active: true,
            last_login: null
        }
    ];

    // User: Create multiple users
    await prisma.user.createMany({
        data: userData
    });

    console.log("Users seeded successfully.");
}

// System: Execute seed script
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
```

### Seed Book

File: `book-seed.ts`

Task ini bertugas untuk melakukan seeding data buku awal ke dalam database. Script ini memeriksa keberadaan buku yang sudah ada sebelum mencoba membuat entri buku baru untuk menghindari duplikasi.

#### Fungsionalitas:

1. Memeriksa apakah buku sudah ada dalam database
2. Membuat beberapa buku dengan detail lengkap:
   - Judul, pengarang, penerbit, tahun terbit
   - Jumlah, status, kode buku
   - Sinopsis dan cover URL

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" width="60" height="60" alt="Books"/>
</div>

#### Contoh Kode:

```typescript
import prisma from "~/lib/prisma";
import { statusBuku, Prisma } from "@prisma/client"; // Import enum statusBuku

async function main() {
    console.log("Checking if books already exist...");

    // Book: Check if any books already exist
    const existingBook = await prisma.buku.findFirst();

    if (existingBook) {
        console.log("Books already exist, skipping seeding.");
        return;
    }

    console.log("Seeding new books...");

    // Book: Prepare book data
    const bookData: Prisma.BukuCreateManyInput[] = [
        {
            judul: "The Quantum Enigma",
            pengarang: "Dr. Sophia Mindscape",
            penerbit: "Perception Vale Press",
            tahun_terbit: new Date("2015-08-20"),
            jumlah: 5,
            cover: "https://example.com/quantum-enigma.jpg",
            status: statusBuku.TERSEDIA, 
            kode_buku: "BK-001",
            sinopsis: "A deep dive into the mysteries of consciousness and quantum mechanics."
        },
        {
            judul: "Layers Beyond the Void",
            pengarang: "Elias Perception",
            penerbit: "Infinity Knowledge",
            tahun_terbit: new Date("2018-06-10"),
            jumlah: 3,
            cover: "https://example.com/layers-beyond.jpg",
            status: statusBuku.TERSEDIA,
            kode_buku: "BK-002",
            sinopsis: "Exploring the ineffable paths of reality through perception and awareness."
        },
        {
            judul: "The Ineffable Guide",
            pengarang: "Anonymous",
            penerbit: "Mystic Archives",
            tahun_terbit: new Date("2021-02-15"),
            jumlah: 2,
            cover: "https://example.com/ineffable-guide.jpg",
            status: statusBuku.TERSEDIA,
            kode_buku: "BK-003",
            sinopsis: "A mysterious book said to reveal knowledge beyond human comprehension."
        }
    ];

    // Book: Create multiple books
    await prisma.buku.createMany({
        data: bookData
    });

    console.log("Books seeded successfully.");
}

// System: Run the main function
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
```

## Cara Menjalankan Tasks

Berdasarkan konfigurasi dalam `package.json`, Anda telah menyiapkan script yang menjalankan semua seed secara berurutan:

```json
"prisma": {
  "seed": "npm run seed:all"
},
"scripts": {
  "seed:all": "tsx server/tasks/user-seed.ts && tsx server/tasks/book-seed.ts"
}
```

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Green%20Circle.png" width="20" height="20" alt="Start"/>
  
  ```bash
  # Menjalankan semua seed dengan Prisma CLI
  npx prisma db seed
  ```
</div>

Perintah ini akan menjalankan `npm run seed:all`, yang kemudian menjalankan script user-seed.ts dan book-seed.ts secara berurutan.

### Cara Alternatif

Anda juga dapat menjalankan script secara langsung:

```bash
# Menjalankan semua seed secara berurutan
npm run seed:all

# Menjalankan seed user saja
npx tsx server/tasks/user-seed.ts

# Menjalankan seed buku saja
npx tsx server/tasks/book-seed.ts
```

## Catatan Tambahan

- **Keamanan**: Pastikan file yang berisi kredensial (seperti password) tidak dicommit ke repositori publik.
- **Penggunaan**: Tasks ini sebaiknya dijalankan hanya dalam lingkungan pengembangan atau pada saat deployment awal.
- **Password**: Password dalam contoh adalah untuk tujuan demonstrasi - gunakan password yang lebih kuat di lingkungan produksi.
- **Prisma**: Pastikan model Prisma Anda telah diperbarui dan migrasi terbaru telah diterapkan sebelum menjalankan task.
- **Urutan Eksekusi**: Script `seed:all` yang dikonfigurasi menjalankan `user-seed.ts` terlebih dahulu sebelum `book-seed.ts`, yang merupakan urutan yang tepat jika ada ketergantungan antar tabel.

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Victory%20Hand.png" width="60" height="60" alt="Victory Hand"/>
  
  *Happy coding!*
</div>