"use server"
import { prisma } from "@/db/db"

export const getUserClinic = async (userId: string) => {
    console.log(userId)

    if (!userId) return

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) return

    return user.clinicId
}