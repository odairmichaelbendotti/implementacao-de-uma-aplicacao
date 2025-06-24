import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }).trim().min(1, { message: "E-mail obrigatório" }),
    password: z.string().trim().min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
})

export type RegisterFormData = z.infer<typeof registerSchema>