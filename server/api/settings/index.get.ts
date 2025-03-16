import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    
    
    const settings = await prisma.settings.findMany({})

    if(!settings) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
            message: 'User haven\'t logged in yet'
        })
    }

    
})