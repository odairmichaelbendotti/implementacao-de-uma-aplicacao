import { z } from 'zod'

export const PatientSchema = z.object({
    name: z.string().min(1, { message: "O nome é obrigatório" }),
    email: z.string().min(1, { message: "O e-mail é obrigatório" }),
    phoneNumber: z.string().min(1, { message: "O contato é obrigatório" }),
    gender: z.string()
})

export type PacienteFormSchema = z.infer<typeof PatientSchema>