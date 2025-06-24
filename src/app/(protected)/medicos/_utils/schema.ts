import { z } from "zod"

export const AddMedicSchema = z.object({
    name: z.string().min(3, { message: "Mínimo 3 caracteres" }),
    speciality: z.string(),
    availableFromWeekDay: z.string(),
    availableToWeekDay: z.string(),
    availableFromTime: z.string(),
    availableToTime: z.string(),
    appointmentPriceDents: z.number()
}).refine((data) => {
    if (Number(data.availableFromTime.split(':')[0]) < Number(data.availableToTime.split(':')[0])) return true
}, {
    message: "O horário de início não pode ser anterior ao horário de fim",
    path: ["availableToTime"]
})

export type AddMedicFormData = z.infer<typeof AddMedicSchema>