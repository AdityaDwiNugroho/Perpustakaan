import { getServerSession } from "#auth"
import prisma from "~/lib/prisma"
import { announcementSchema } from "~/server/validation/announcementSchema"

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session || !session.user) {
        return {
            status: 401,
            statusMessage: "Unauthorized"
        }
    }

    console.log(session, "Session")
    console.log(session.user, "User session")

    const body = await readBody(event)
  
    const parsedData = announcementSchema.safeParse(body)

    if(!parsedData.success) {
        return {
            status: 400,
            statusMessage: "Bad Request",
            message: parsedData.error.errors.map((err) => err.message).join(", ")
        }
    }

    // const user = await prisma.user.findUnique({
    //     where: {
    //         id: parsedData.userId
    //     }
    // })
  
    // if(!user) {
    //     return {
    //         status: 404,
    //         statusMessage: "User not found"
    //     }
    // }

    const announcement = await prisma.pengumuman.create({
      data: {
        ...parsedData.data,
        userId: session.user.id
      }
    })
  
    console.log(announcement, "Announcement created successfully")

    return {
      success: true,
      status: 201,
      message: "Announcement created successfully",
      ...announcement,
    }
})