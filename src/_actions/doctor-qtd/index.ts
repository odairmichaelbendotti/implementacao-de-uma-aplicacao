"use server"
import { prisma } from "@/db/db"

export const getTotalDoctors = async (idDaClinica: string) => {
    const result = await prisma.$queryRaw`
        SELECT COUNT(*) FROM doctors
        WHERE clinicId=${idDaClinica}
    `
    if (!result) return

    return result
}