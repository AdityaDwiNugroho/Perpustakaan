import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.password || !body.confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing required fields",
    });
  }

  if (body.password !== body.confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Passwords do not match",
    });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.email },
          { username: body.username },
          { phone: body.phone }
        ]
      }
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Username or email already taken",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        fullname: body.fullname || "",
        username: body.username || "",
        phone: body.phone || "",
        birthdate: body.birthdate ? new Date(body.birthdate) : new Date(),
        gender: body.gender || "",
        address: body.address || "",
        role: body.role || "PEMINJAM",
        photo: body.photo || "/default-avatar.png"
      },
    });

    return { ...user, password: undefined };
  } catch (error) {
    console.error("Error creating user", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "An error occurred while registering the user",
    });
  }
});
