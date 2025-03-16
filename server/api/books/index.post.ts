import prisma from "~/lib/prisma";
import { bookSchema } from "~/server/validation/bookSchema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    // console.log(body);

    // Validasi body dengan safeParse agar menangani error dengan baik
    const parsed = bookSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: parsed.error.errors.map((err) => err.message).join(", "),
      });
    }

    const parsedData = parsed.data;

    // Cek apakah judul atau kode buku sudah ada
    const existingBook = await prisma.buku.findFirst({
      where: {
        OR: [
          { judul: parsedData.judul },
          { kode_buku: parsedData.kode_buku },
        ],
      },
    });

    if (existingBook) {
      throw createError({
        statusCode: 409,
        statusMessage: "Conflict",
        message: "Buku dengan judul atau kode buku sudah ada",
      });
    }

    // Buat buku baru di database
    const book = await prisma.buku.create({
      data: {
        // Prisma otomatis generate jika tidak ada
        id: parsedData.id || undefined, 
        judul: parsedData.judul,
        pengarang: parsedData.pengarang,
        penerbit: parsedData.penerbit || "Tidak diketahui",
        tahun_terbit: parsedData.tahun_terbit ? new Date(parsedData.tahun_terbit) : new Date(),
        jumlah: parsedData.jumlah || 1,
        cover: parsedData.cover || "/default-cover.png",
        status: parsedData.status || "TERSEDIA",
        kode_buku: parsedData.kode_buku,
        sinopsis: parsedData.sinopsis || "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      message: "Buku berhasil ditambahkan",
      data: book,
    };
  } catch (error) {
    console.log(error)
  }
});
