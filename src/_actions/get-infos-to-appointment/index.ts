"use server"
import { prisma } from "@/db/db"

export const getPatientNameByPatientId = async (patientId: string) => {
    if (!patientId) return

    const user = await prisma.patients.findFirst({
        where: {
            id: patientId
        }
    })

    if (!user) return
    return user.name
}

export const getDoctorInfos = async (doctorId: string) => {
    if (!doctorId) return

    const doctorInfos = await prisma.doctors.findUnique({
        where: {
            id: doctorId
        }
    })

    if (!doctorInfos) return

    return doctorInfos.name
}

export const getDoctorSpeciality = async (doctorId: string) => {
    if (!doctorId) return
    const doctorSpeciality = await prisma.doctors.findFirst({
        where: {
            id: doctorId
        }
    })

    if (!doctorSpeciality) return
    return doctorSpeciality.speciality
}

export const getDoctorPrice = async (doctorId: string) => {
    if (!doctorId) return

    const doctorPrice = await prisma.doctors.findFirst({
        where: {
            id: doctorId
        }
    })

    if (!doctorPrice) return
    const price = doctorPrice.appointmentPriceDents
    return price.toString()
}