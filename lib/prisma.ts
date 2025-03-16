import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();

  prisma.$use(async (params, next) => {
    if (params.model === "Buku") {
      if (params.action === "create" || params.action === "update") {
        const data = params.args.data;

        // Fetch: Jumlah buku
        if (data?.jumlah !== undefined) {
          if (data.jumlah === 0) {
            console.log("Buku kehabisan stok, status diubah menjadi TIDAK TERSEDIA");
            data.status = "TIDAK_TERSEDIA"; 
          } else if ((!data.status || data.status === "TIDAK_TERSEDIA") && data.jumlah > 0) {
            console.log("Stok tersedia kembali, status diubah menjadi TERSEDIA");
            data.status = "TERSEDIA"; 
          }
        }
      }
    }

    return next(params);
  });

  return prisma;
};

// Prisma: singleton
declare const globalThis: {
  prismaGlobal?: PrismaClient;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma;
