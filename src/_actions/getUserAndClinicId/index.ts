"use server"
import { prisma } from "@/db/db"
import { User } from "@/generated/prisma"

export const getUserAndClinicId = async (userId: string) => {
    try {
        if (!userId) return

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        }) as User

        if (!user.clinicId) return

        if (!user) return

        return user.clinicId
    } catch (error) {
        console.log(error)
    }
}