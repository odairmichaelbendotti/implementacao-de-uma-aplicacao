"use server"
import { prisma } from "@/db/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const session = await auth.api.getSession({
    headers: await headers()
})

const getClinicIdFromHeaders = async () => {
    if (!session?.user.id) return
    const clinicId = await prisma.user.findFirst({
        where: {
            id: session.user.id
        }
    })

    if (!clinicId) return

    return clinicId.clinicId
}

export const getAllAppointments = async () => {
    const idOfClinic = await getClinicIdFromHeaders()

    if (!idOfClinic) return

    const appointments = await prisma.appointments.findMany({
        where: {
            clinicId: idOfClinic
        }
    })

    if (!appointments) return
    return appointments
}