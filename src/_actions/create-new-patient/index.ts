"use server"
import { prisma } from "@/db/db"
import { PacienteFormSchema, PatientSchema } from "@/app/(protected)/pacientes/schema/add-patient-schema"
import { revalidatePath } from "next/cache"

export const addNewPatient = async (data: PacienteFormSchema) => {
    const validation = PatientSchema.safeParse(data)

    if (!validation.success) return

    const newPatient = await prisma.patients.create({
        data: validation.data
    })

    if (!newPatient) return
    revalidatePath('/pacientes')
}