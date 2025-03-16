export type UserRole = "ADMINISTRATOR" | "PETUGAS" | "PEMINJAM";
export type StatusBuku = "TERSEDIA" | "DIPINJAM" | "DIBLOKIR" | "DIRESERVASI" | "TIDAK_TERSEDIA";


export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  birthdate?: string | Date;
  address?: string | null;
  role: UserRole;
  photo?: string | null;
  is_verify: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login?: Date | string | undefined | null;
}

export interface Book {
    id: string;
    judul: string;
    pengarang: string;
    penerbit: string;
    tahun_terbit: Date;
    jumlah: number;
    cover: string;
    status: StatusBuku;
    kode_buku: string;
    created_at: string;
    updated_at: string;
  }
  

  export interface Category {
    id: string;
    name: string;
  }

  export interface BookCategory {
    id: string;
    bookId: string;
    categoryId: string;
  }
  
  export type StatusPinjaman =
  | "PENDING"
  | "DIAJUKAN"
  | "DISETUJUI"
  | "DIPINJAM"
  | "DIPERPANJANG"
  | "MENDEKATI_TANGGAL_PENGEMBALIAN"
  | "DIKEMBALIKAN"
  | "DIBATALKAN"
  | "DITOLAK"
  | "TERLAMBAT"
  | "DIBERHENTIKAN"
  | "MENDEKATI_TANGGAL_PENGEMBALIAN";


  export interface Peminjaman {
    id: string;
    userId: string;
    bookId: string;
    borrowedAt: string;
    dueDate: string;
    status: StatusPinjaman;
    returnedAt?: string | null;
    parentLoanId?: string | null;
    extensions?: Peminjaman[]; // Jika ada riwayat perpanjangan
    book: Book; // Hubungan ke Book
  }

  export type KategoriPengumuman = 
  | "INFORMASI" 
  | "EVENT" 
  | "PERUBAHAN_KEBIJAKAN" 
  | "PERINGATAN";


  export interface Ulasan {
    id: string;
    userId: string;
    bookId: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
  }
  

  export interface Pengumuman {
    id: string;
    judul: string;
    isi: string;
    kategori: KategoriPengumuman;
    userId: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  

  export interface Settings {
    id: string;
    key: string;
    value: string;
    updated_by?: string | null;
    updated_at: string;
  }
  