import { z } from 'zod'

export const FormSchema = z.object({
    especialidade: z.string().min(1, { message: "Especialidade inválida" }),
    doutor: z.string().min(1, { message: "Nome do médico inválido" }),
    data: z.date({ required_error: "A data é obrigatória" }),
    horario: z.string().min(1, { message: "Horário inválido" })
})

export type PatientFormSchema = z.infer<typeof FormSchema>
