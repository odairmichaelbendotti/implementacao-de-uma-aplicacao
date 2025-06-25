"use server"
import { prisma } from "@/db/db"

export const getAllDoctorsSpeciality = async (): Promise<string[]> => {
    const specialities: string[] = []
    const doctors = await prisma.doctors.findMany()

    if (!doctors) return []

    if (Array(doctors)) {
        doctors.map(doctor => {
            if (!specialities.includes(doctor.speciality)) {
                specialities.push(doctor.speciality)
            }

        })
        return specialities
    }

    return []
}