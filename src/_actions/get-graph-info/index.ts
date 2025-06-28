"use server"
import { prisma } from "@/db/db"
import { Appointments } from "@/generated/prisma"

export type graphType = {
    diasNoMes: number
    chartData: { dia: string, agendamentos: number }[]
}

export const getDoctorsQtd = async (userId: string): Promise<graphType | null> => {
    if (!userId) return null

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) return null

    const appointments = await prisma.$queryRaw<Appointments[]>`
        SELECT * FROM
            appointments
    `

    if (!appointments) return null

    const date = new Date()
    const month = date.getMonth() + 1
    const monthLenght: string[] = []

    appointments.map(item => {
        if ((Number(item.createdAt.toLocaleDateString().split("T")[0].split("/")[1])) === month) {
            monthLenght.push(item.createdAt.toLocaleDateString().split("T")[0])
        }
    })

    const hoje = new Date()

    const getDays = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
    const diasNoMes = Number(getDays.toLocaleString().split(',')[0].split('/')[0])

    const chartData = []

    for (let dia = 1; dia <= diasNoMes; dia++) {
        // Filtra os agendamentos do dia atual
        const agendamentosDia = appointments.filter(appointment => {
            return appointment.createdAt.getDate() === dia;
        });

        chartData.push({
            dia: dia.toString(),
            agendamentos: agendamentosDia.length
        });
    }

    return { diasNoMes, chartData }
}