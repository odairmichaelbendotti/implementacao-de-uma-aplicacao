"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { AddMedicFormData } from '../_utils/schema'
import { AddMedicSchema } from '../_utils/schema'
import { FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { medicalSpecialtiesOptions } from '../_utils/speciality'
import { daysConverted } from '../_utils/days'
import { convertedTimes } from '../_utils/times'
import { editDoctorData } from '@/_actions/edit-doctor-infos'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

type EditDoctorType = {
    item: AddMedicFormData & { id: string }
    open: boolean
    setOpen: (open: boolean) => void
}

const EditDoctor = ({ item, open, setOpen }: EditDoctorType) => {
    const form = useForm<AddMedicFormData>({
        resolver: zodResolver(AddMedicSchema),
        defaultValues: {
            name: item.name || '',
            speciality: item.speciality || '',
            availableFromWeekDay: item.availableFromWeekDay || '',
            availableToWeekDay: item.availableToWeekDay || '',
            availableFromTime: item.availableFromTime || '',
            availableToTime: item.availableToTime || '',
            appointmentPriceDents: item.appointmentPriceDents || 0
        }
    })

    const onSubmit = async (data: AddMedicFormData) => {
        const doctorId = item.id
        const updatedDoctor = await editDoctorData({ data, doctorId })

        if (!updatedDoctor) return

        toast.success('Usuário alterado com sucesso')
        console.log(updatedDoctor)
    }

    const onError = (values: FieldErrors<AddMedicFormData>) => {
        console.log(values)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button className='cursor-pointer' onClick={() => setOpen(true)}>Editar informações</Button></DialogTrigger>
            <DialogContent>
                <DialogTitle>Editar informações</DialogTitle>

                {/* NOME */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
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
                        {/* ESPECIALIDADE */}
                        <FormField
                            control={form.control}
                            name="speciality"
                            render={({ field }) => (
                                <FormItem className='my-3'>
                                    <FormLabel>Especialidade</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl className='w-full'>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {medicalSpecialtiesOptions.map(item => (
                                                <SelectItem key={item.key} value={item.key}>{item.value}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        {/* PREÇO */}
                        <FormField
                            control={form.control}
                            name="appointmentPriceDents"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
                                    <Input placeholder='R$200' {...field} />
                                </FormItem>
                            )}
                        />

                        {/* DIAS DE AGENDAMENTO */}
                        <div className='flex gap-2 items-center w-full bg-red-500v my-3'>
                            <FormField
                                control={form.control}
                                name="availableFromWeekDay"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Dia inicial</FormLabel>
                                        <Select onValueChange={field.onChange} value={item.availableFromWeekDay}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="dia inicial" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {daysConverted.map(day => (
                                                    <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
                                                ))}
                                            </SelectContent>


                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="availableFromWeekDay"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Dia inicial</FormLabel>
                                        <Select onValueChange={field.onChange} value={item.availableFromWeekDay}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="dia final" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {daysConverted.map(day => (
                                                    <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
                                                ))}
                                            </SelectContent>


                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* HORÁRIOS DE AGENDAMENTO */}
                        <div className='flex gap-2 items-center w-full bg-red-500v my-3'>
                            <FormField
                                control={form.control}
                                name="availableFromTime"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Horário início</FormLabel>
                                        <Select onValueChange={field.onChange} value={item.availableFromTime}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="dia inicial" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {convertedTimes.map(time => (
                                                    <SelectItem key={time.value} value={time.value}>{time.value}</SelectItem>
                                                ))}
                                            </SelectContent>


                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="availableToTime"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Horário término</FormLabel>
                                        <Select onValueChange={field.onChange} value={item.availableToTime}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="dia final" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {convertedTimes.map(time => (
                                                    <SelectItem key={time.value} value={time.value}>{time.value}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button className='cursor-pointer w-full mt-2' onClick={() => setOpen(false)}>
                            {form.formState.isSubmitting && <Loader2 className='animate-spin' />}
                            Alterar informações
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
};

export default EditDoctor;