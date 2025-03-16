import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const search = query.search?.toString().trim() || "";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const whereCondition = search
    ? {
        OR: [
          {
            fullname: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      }
    : {};

  const users = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
  });

  const adminAndPetugasCount = await prisma.user.count({
    where: {
      role: {
        in: ["ADMINISTRATOR", "PETUGAS"], 
      },
    },
  });

  const peminjamCount = await prisma.user.count({
    where: {
      role: {
        in: ["PEMINJAM"],
      }
    },
  })

  const newUserCount = await prisma.user.count({
    where: {
      role: {
        in: ["PEMINJAM"], 
      },
      created_at: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  const blockedUserCount = await prisma.user.count({
    where: {
      role: {
        in: ["PEMINJAM"], 
      },
      is_active: false,
    },
  })

  const total = await prisma.user.count({
    where: whereCondition,
  });

  return {
    success: true,
    status: 200,
    message: "Users fetched successfully",
    items: users,
    total,
    adminAndPetugasCount,
    peminjamCount,
    newUserCount,
    blockedUserCount
  };

  // return { items: users, total }
});
