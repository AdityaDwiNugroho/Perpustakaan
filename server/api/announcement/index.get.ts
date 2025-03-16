import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const getAnnouncement = await prisma.pengumuman.findMany({
    where: {
      is_active: true
    }
  })


  return {
    success: true,
    status: 200,
    message: "Announcement fetched successfully",
    data: getAnnouncement
  }
})
