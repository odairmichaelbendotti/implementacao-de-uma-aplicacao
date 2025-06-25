"use server"
import { prisma } from "@/db/db"
import { AddMedicFormData } from "@/app/(protected)/medicos/_utils/schema"
import { revalidatePath } from "next/cache"

type EditDoctorProps = {
    data: Partial<AddMedicFormData>
    doctorId: string
}

export const editDoctorData = async ({ data, doctorId }: EditDoctorProps) => {
    if (!data || !doctorId) return

    const editedDoctor = await prisma.doctors.update({
        where: { id: doctorId },
        data: data
    })

    if (!editedDoctor) return

    console.log(editedDoctor)
    revalidatePath('/medicos')
    return editedDoctor
}