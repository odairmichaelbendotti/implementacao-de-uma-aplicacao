"use server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/db/db"

export const createClinic = async (name: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        console.log('Login não autorizado.')
        return
    }

    try {
        const user = await prisma.clinics.create({
            data: {
                name: name,
                users: {
                    connect: [{ id: session?.user.id }]
                }
            }
        })

        if (user) return { success: 'Clínica cadastrada com sucesso' }

    } catch (error) {
        console.log(error)
        return { error: 'Erro ao cadastrar clínica' }
    }
}