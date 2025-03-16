import { kategoriPengumuman } from "@prisma/client"
import { z } from "zod";

export const announcementSchema = z.object({
    judul: z.string().min(3, "Title must be at least 3 characters"),
    isi: z.string().min(3, "Content must be at least 3 characters"),
    kategori: z.nativeEnum(kategoriPengumuman),
    // userId: z.string().uuid("UUID must be valid"),
})


export type AnnouncementSchema = z.infer<typeof announcementSchema>;