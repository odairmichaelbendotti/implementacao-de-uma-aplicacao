"use server"
import { prisma } from "@/db/db"
import { revalidatePath } from "next/cache"

export const deletePatient = async (patientId: string) => {
    if (!patientId) return

    const deletedPatient = await prisma.patients.delete({
        where: {
            id: patientId
        }
    })

    if (!deletePatient) return
    revalidatePath('/pacientes')

    return deletedPatient
}