import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }).trim().min(1, { message: "E-mail obrigatório" }),
    password: z.string().trim().min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
})

export type LoginFormData = z.infer<typeof loginSchema>