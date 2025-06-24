import { z } from "zod"

export const newClinicSchema = z.object({
    name: z.string().trim().min(1, { message: "O nome da sua clínica deve ter pelo menos 2 caracteres" })
})

export type newClinicFormData = z.infer<typeof newClinicSchema>
