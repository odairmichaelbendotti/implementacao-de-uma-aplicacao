"use server"
import { prisma } from "@/db/db"

export const getDoctorBySpeciality = async (speciality: string) => {
    if (!speciality) return []

    const doctors = await prisma.doctors.findMany({
        where: {
            speciality: speciality
        }
    })

    if (!doctors) return []

    return doctors
}  