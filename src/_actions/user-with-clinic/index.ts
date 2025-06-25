"use server"
import { prisma } from "@/db/db"

export const checkUserHaveAClinic = async (userId: string) => {
    const response = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (response?.clinicId) {
        return { error: 'User already have an clinic.' }
    }

    return { success: 'Usuário apto para cadastrar novas clínicas' }
}