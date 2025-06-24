"use server"
import { prisma } from "@/db/db"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Patients } from "@/generated/prisma"

export const getAllPatients = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !session.user) {
        redirect('/authentication')
    }

    const patient = await prisma.patients.findMany()

    if (!patient) return

    return patient as Patients[]
}