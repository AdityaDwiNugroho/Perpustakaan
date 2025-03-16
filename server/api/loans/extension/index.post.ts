import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const body = event.context.params


    // Check existing Loan
    const existingLoan = await prisma.peminjaman.findUnique({
        where: {
            id: body?.id
        }
    })

    if(!existingLoan) {
        return {
            status: 404,
            statusMessage: "Loan not found"
        }
    }


    // Update extend loan date
    
})