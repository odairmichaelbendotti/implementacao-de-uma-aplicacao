"use server"
import { prisma } from "@/db/db"
import { AddMedicSchema, AddMedicFormData } from "@/app/(protected)/medicos/_utils/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getUserAndClinicId } from "../getUserAndClinicId"
import { revalidatePath } from "next/cache"

export const addNewDoctor = async (data: AddMedicFormData) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) return
        const clinicId = await getUserAndClinicId(session.user.id)

        const result = AddMedicSchema.safeParse(data)

        if (!result.success) {
            console.log(result.error)
            return { error: result.error.flatten() }
        }

        const doctor = await prisma.doctors.create({
            data: {
                ...result.data,
                clinics: {
                    connect: { id: clinicId }
                }
            }
        })

        if (!doctor) return null
        revalidatePath('/medicos')
        return doctor
    } catch (err) {
        console.log(err)
    }
}