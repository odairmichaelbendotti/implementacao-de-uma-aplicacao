"use server"
import { prisma } from "@/db/db"
import { revalidatePath } from "next/cache"

export const deleteAppointment = async (appointmentId: string) => {
    if (!appointmentId) return

    const deletedAppointment = await prisma.appointments.delete({
        where: { id: appointmentId }
    })

    if (!deletedAppointment) return
    revalidatePath('/agendamentos')
}