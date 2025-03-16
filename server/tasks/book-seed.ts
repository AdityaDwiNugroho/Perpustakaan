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
            // cover: "https://example.com/quantum-enigma.jpg",
            cover: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgLi3L57FvcWAGy19Q8aXADKlWOEGp3TgfNRKPCoF4Nd-lIk_E2-QACWWwIuE7reiIVBUokocUwfQHQp41AmQjo58Clu05QbGhjB7aVXaY7FAhWzMRiJBU_kCnXY31XkkUcFfaXhcbieS4f/s320-rw/Quantum+Enigma.jpg",
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
            // cover: "https://example.com/layers-beyond.jpg",
            cover: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhrih1d4rirjgL7vTPNJAU4oZtThMNBgT0yZFQ5VbPO1S3pobJSiOLYBamL0fBbKuyV2vewcjs4jtaGEvvwNnDAwH-188F09y35NkjLUgYkkxftS6KuRX3_QFb3SyoT4d2ZKo7fE9X2gTEz5-zuuxMJ5XkJNfWL31eDbPCSEvQ36Ml9TJK4eCHJeL4QSAc/w293-h400/Badger-cover.jpg",
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
            // cover: "https://example.com/ineffable-guide.jpg",
            cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1667141204i/63132878.jpg",
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
