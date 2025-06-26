"use server"
import { prisma } from "@/db/db"

type AppointmentType = {
    data: {
        date: Date,
        patientId: string,
        doctorId: string,
        especialidade: string,
        clinicId: string,
        horario: string,
    }

}

export const newAppointment = async ({ data }: AppointmentType) => {
    if (!data) {
        console.log('deu ruim ao acessar')
        return
    }
    const appointment = await prisma.appointments.create({
        data: {
            date: data.date,
            patients: { connect: { id: data.patientId } },
            doctors: { connect: { id: data.doctorId } },
            especialidade: data.especialidade,
            clinics: { connect: { id: data.clinicId } },
            horario: data.horario
        }
    })
    return appointment
}