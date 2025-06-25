"use server"
import { prisma } from "@/db/db"

export const getFreeTimesFromAppointments = async (medicId: string, date: Date) => {
    if (!medicId) return

    const getDoctorRegisters = await prisma.appointments.findMany({
        where: {
            doctorId: medicId,
            date: date
        }
    })

    console.log('passou por aqui')

    if (getDoctorRegisters.length === 0) {
        console.log('deu negativo')
        const doctorTimes = await prisma.doctors.findFirst({
            where: {
                id: medicId
            }
        })

        const initialTime = Number(doctorTimes?.availableFromTime.split(':')[0])
        const finalTime = Number(doctorTimes?.availableToTime.split(':')[0])

        const freeSlots = []

        for (let i = initialTime; i <= finalTime; i++) {
            if (i < 10) {
                freeSlots.push(`0${i.toString()}:00`)
            } else {
                freeSlots.push(`${i.toString()}:00`)
            }
        }

        return freeSlots
    }
}