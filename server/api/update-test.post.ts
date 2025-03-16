import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  await prisma.buku.update({
    where: { id: '16accb6b-3ac1-4485-aa93-42d840bf82b4' },
    data: { jumlah: 200 }, 
  });
  console.log('Book Updated, Prisma Singletons: WORKING');
})
