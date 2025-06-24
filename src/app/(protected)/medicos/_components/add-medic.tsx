"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, UserRoundPlus } from "lucide-react"
import { AddMedicSchema } from "../_utils/schema"
import { AddMedicFormData } from "../_utils/schema"
import { FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { medicalSpecialtiesOptions } from "../_utils/speciality"
import { NumericFormat } from 'react-number-format'
import { daysConverted } from "../_utils/days"
import { convertedTimes } from "../_utils/times"
import { addNewDoctor } from "@/_actions/create-doctor"
import { toast } from "sonner"
import { useState } from "react"

interface Props {
    title: string
}

const AddMedic = ({ title }: Props) => {
    const [open, setOpen] = useState(false)
    const form = useForm<AddMedicFormData>({
        resolver: zodResolver(AddMedicSchema),
        defaultValues: {
            name: '',
            speciality: '',
            availableFromWeekDay: '',
            availableToWeekDay: '',
            availableFromTime: '1',
            availableToTime: '2',
            appointmentPriceDents: 0
        }
    })

    const onSubmit = async (values: AddMedicFormData) => {
        const doctorData = {
            name: values.name,
            speciality: values.speciality,
            availableFromWeekDay: values.availableFromWeekDay,
            availableToWeekDay: values.availableToWeekDay,
            availableFromTime: values.availableFromTime,
            availableToTime: values.availableToTime,
            appointmentPriceDents: values.appointmentPriceDents,
        }

        try {
            const doctor = await addNewDoctor(doctorData);

            if (!doctor) {
                toast.error('Erro ao cadastrar médico');
                return;
            }

            toast.success('Médico cadastrado com sucesso!');
            setOpen(false);
            form.reset()
        } catch (error) {
            toast.error('Ocorreu um erro ao cadastrar o médico');
            console.error(error);
        }
    }

    const onError = (errors: FieldErrors<AddMedicFormData>) => {
        console.log(errors)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" onClick={() => setOpen(true)}><UserRoundPlus />{title}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-xl text-center font-bold">{title}</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">

                        {/* Nome */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Especialidade */}
                        <FormField
                            control={form.control}
                            name="speciality"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Especialidade</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a epecialidade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {medicalSpecialtiesOptions.map(item => (
                                                <SelectItem key={item.key} value={item.key}>{item.value}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Preço */}
                        <FormField
                            control={form.control}
                            name="appointmentPriceDents"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
                                    <NumericFormat
                                        value={field.value}
                                        onValueChange={value => {
                                            field.onChange(value.floatValue)
                                        }}
                                        decimalScale={2}
                                        fixedDecimalScale
                                        decimalSeparator=","
                                        allowNegative={false}
                                        allowLeadingZeros={false}
                                        thousandSeparator="."
                                        customInput={Input}
                                        prefix="R$"
                                        className="text-gray-600"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Dias p/ agendamento */}
                        <div className="flex items-center gap-2">
                            <FormField
                                control={form.control}
                                name="availableFromWeekDay"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Dia inicial</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Dia inicial" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {daysConverted.map(item => (
                                                    <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="availableToWeekDay"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Dia final</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Dia final" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {daysConverted.map(item => (
                                                    <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Horários p/ agendamento */}
                        <div className="flex items-center gap-2">
                            <FormField
                                control={form.control}
                                name="availableFromTime"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Horário inicial</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Início" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {convertedTimes.map(item => (
                                                    <SelectItem key={item.key} value={item.key}>{item.value}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="availableToTime"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Horário final</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Fim" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {convertedTimes.map(item => (
                                                    <SelectItem key={item.key} value={item.key}>{item.value}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button className="w-full cursor-pointer">
                            {form.formState.isSubmitting && <Loader2 />}
                            Cadastrar
                        </Button>
                    </form>
                </Form >
            </DialogContent>
        </Dialog >

    );
};

export default AddMedic;