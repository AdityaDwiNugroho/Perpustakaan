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
        judul: {
          contains: search
        }
      },
      {
        pengarang: {
          contains: search
        }
      }
    ]
  } : {}


  const books = await prisma.buku.findMany({
    where: whereCondition,
    skip,
    take: limit,
    select: {
      id: true,
      judul: true,
      pengarang: true,
      categories: true,
      penerbit:true,
      tahun_terbit: true,
      jumlah: true,
      status: true,
      kode_buku: true, 
    }
  });
  // console.log("Data buku terkini:", books);

  const availableBook = await prisma.buku.count({
    where: {
      status: {
        in: ["TERSEDIA"], 
      },
    },
  });

  const borrowedBook = await prisma.buku.count({
    where: {
      status: {
        in: ["DIPINJAM"],
      },
    },
  });

  const total = await prisma.buku.count({
    where: whereCondition
  })

  return {
    success: true,
    status: 200,
    message: "Books fetched successfully",
    items: books,
    total,
    availableBook,
    borrowedBook
  }
})
