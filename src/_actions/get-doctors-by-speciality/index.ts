"use server"
import { prisma } from "@/db/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const getDoctorBySpeciality = async (speciality: string) => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const getClinicId = await prisma.user.findFirst({
        where: { id: session?.user.id }
    })

    if (!getClinicId?.clinicId || !speciality) return []

    const doctors = await prisma.doctors.findMany({
        where: {
            speciality: speciality,
            clinicId: getClinicId.clinicId
        }
    })

    if (!doctors) return []

    return doctors
}  