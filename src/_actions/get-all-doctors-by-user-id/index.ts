import { prisma } from "@/db/db"
import { Doctors } from "@/generated/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getClinicByUser } from "../clinic-by-user-id"

export const getAllDoctorsByUserId = async (): Promise<Doctors[] | { error: string }> => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return { error: 'ID do usuário não encontrado' }
    }

    const clinic = await getClinicByUser(session.user.id)

    if (!clinic || 'error' in clinic) {
        return { error: 'Deu ruim' }
    }

    try {
        const doctors = await prisma.doctors.findMany({
            where: {
                clinicId: clinic.id
            }
        })

        if (!doctors) return { error: "Não foi possível buscar os médicos" }

        return doctors

    } catch (error) {
        console.log(error)
        return { error: "Não foi possível buscar os médicos" }
    }
}