"use server"
import { prisma } from "@/db/db"
import { revalidatePath } from "next/cache"

export const deleteDoctor = async (doctorId: string): Promise<{ success: string } | { error: string }> => {
    if (!doctorId) return { error: "Médico não encontrado" }

    const deletedDoctor = await prisma.doctors.delete({
        where: {
            id: doctorId
        }
    })

    if (!deletedDoctor) return { error: "Erro ao deletar médico" }

    revalidatePath('/medicos')
    return { success: 'Médico excluído com sucesso' }
}