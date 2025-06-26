"use server"
import { prisma } from "@/db/db"

export const getPatientById = async (patientId: string) => {
    if (!patientId) return

    const patient = await prisma.patients.findUnique({
        where: {
            id: patientId
        }
    })

    if (!patient) return

    return patient
}