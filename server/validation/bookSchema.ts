import { z } from "zod";

export const bookSchema = z.object({
  id: z.string().uuid().optional(),
  judul: z.string().min(1, "Judul harus diisi"),
  pengarang: z.string().min(1, "Pengarang harus diisi"),
  penerbit: z.string().min(1, "Penerbit harus diisi"),
  tahun_terbit: z.string().transform((val) => new Date(val)),
  jumlah: z.number().int().nonnegative().min(1, "Jumlah minimal 1"),
  cover: z.string().optional(),
  status: z.enum(["TERSEDIA", "DIPINJAM", "DIBLOKIR", "DIRESERVASI", "TIDAK_TERSEDIA"]),
  kode_buku: z.string().min(1, "Kode buku harus diisi"),
  sinopsis: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type BookSchema = z.infer<typeof bookSchema>;
