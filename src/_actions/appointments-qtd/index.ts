"use server"
import { prisma } from "@/db/db"

export const getTotalAppointment = async (idDaClinica: string) => {
    const result = await prisma.$queryRaw`
        SELECT COUNT(*) FROM appointments
        WHERE clinicId=${idDaClinica}
    `
    if (!result) return

    return result
}