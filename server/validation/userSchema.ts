import { z } from "zod";

export const userSchema = z.object({
  fullname: z.string().min(3, "Fullname must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.string(),
  birthdate: z.string().transform((val) => new Date(val)),
  address: z.string().optional(),
  role: z.enum(["ADMINISTRATOR", "PETUGAS", "PEMINJAM"]).optional(),
  photo: z.string().optional(),
  last_login: z.string().optional().transform((val) => val ? new Date(val) : undefined),
});
