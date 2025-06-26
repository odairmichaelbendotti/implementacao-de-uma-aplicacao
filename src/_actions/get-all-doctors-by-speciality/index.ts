"use server"
import { prisma } from "@/db/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const getAllDoctorsSpeciality = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const specialities: string[] = []

    if (!session) return []

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    })

    if (!user?.clinicId) return []

    const doctors = await prisma.doctors.findMany({
        where: {
            clinicId: user.clinicId
        }
    })

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