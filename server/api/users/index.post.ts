import prisma from "~/lib/prisma"
import { userSchema } from "~/server/validation/userSchema"
import bcrypt from "bcrypt"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parsedData = userSchema.parse(body)


  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: parsedData.email
        },
        {
          username: parsedData.username
        },
        {
          phone: parsedData.phone
        }
      ]
    }
  })

  if (existingUser) {
    // Handle the conflict with generic message
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "The request could not be processed."
    });
  } 

  const hashedPassword = await bcrypt.hash(parsedData.password, 10)

  const user = await prisma.user.create({
    data: {
      ...parsedData,
      gender: parsedData.gender || "",
      password: hashedPassword
    }
  })

  return {
    success: true,
    status: 201,
    message: "User created successfully",
    ...user,
    password: undefined
  }
})
