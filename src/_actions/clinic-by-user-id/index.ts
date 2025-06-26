"use server"
import { prisma } from "@/db/db"
import { Clinics } from "@/generated/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// CASO O ID NÃO SEJA FORNECIDO NO PARÂMETRO, SERÁ FEITA UMA BUSCA PELO BACKEND

export const getClinicByUser = async (userId?: string): Promise<Clinics | { error: string }> => {
    try {
        if (!userId) {
            const session = await auth.api.getSession({
                headers: await headers()
            })

            if (!session?.user) return { error: "Informe o ID do usuário" }

            userId = session.user.id
        }

        const response = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!response?.clinicId) return { error: "O usuário não possui uma clínica associada" }

        const clinic = await prisma.clinics.findUnique({
            where: {
                id: response.clinicId
            }
        })

        if (!clinic) return { error: "Clínica não encontrada" }

        // RETORNA TODOS OS DADOS DA CLÍNICA
        return clinic
    } catch (err) {
        console.log(err)
        return { error: "Erro ao efetuar solicitação de clínica" }
    }

}