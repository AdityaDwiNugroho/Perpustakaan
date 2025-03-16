import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const search = query.search?.toString().trim() || ""
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const skip = (page - 1) * limit

  const whereCondition = search ? {
    OR: [
      {
        userId: {
          contains: search
        }
      },
      {
        bookId: {
          contains: search
        }
      }
    ]
  } : {}


  const loans = await prisma.peminjaman.findMany({
    where: whereCondition,
    skip,
    take: limit,
    select: {
      id: true,
      userId: true,
      bookId: true,
      borrowedAt: true,
      dueDate: true,
      status: true,
      parentLoanId: true, 
      user: {
        select: {
          id: true,
          fullname: true,
        }
      },
      book: {
        select: {
          id: true,
          judul: true,
        }
      }
    }
  });
  // console.log("Data buku terkini:", loans);

  const availableLoan = await prisma.peminjaman.count({
    where: {
      status: {
        in: [
          "PENDING",
          "DIAJUKAN",
          "DISETUJUI",
          "DIPINJAM",
          "DIPERPANJANG",
          "DIKEMBALIKAN",
          "DIBATALKAN",
          "DITOLAK",
          "TERLAMBAT",
          "DIBERHENTIKAN",
          "MENDEKATI_TANGGAL_PENGEMBALIAN"
        ],
      },
    },
  });

  const loansId = await prisma.peminjaman.findMany({
    select: {
      id: true
    }
  })

  const bookId = await prisma.peminjaman.findMany({
    select: {
      bookId: true
    }
  })

  const userId = await prisma.peminjaman.findMany({
    select: {
      userId: true
    }
  })


  const total = await prisma.peminjaman.count({
    where: whereCondition
  })

  // console.log("Loans dengan User & Buku:", JSON.stringify(loans, null, 2));

  return {
    success: true,
    status: 200,
    message: "Loans fetched successfully",
    items: loans,
    loansId,
    bookId,
    userId,
    total,
    availableLoan
  }
})
