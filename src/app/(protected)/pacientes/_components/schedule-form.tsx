"use client"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormSchema, PatientFormSchema } from '../schema/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { getAllDoctorsSpeciality } from '@/_actions/get-all-doctors-by-speciality'
import { useEffect, useState } from 'react'
import { getDoctorBySpeciality } from '@/_actions/get-doctors-by-speciality'
import { Doctors } from '@/generated/prisma'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from "date-fns"
import { getFreeTimesFromAppointments } from '@/_actions/get-hours-by-appointments'

const ScheduleForm = () => {
    const [speciality, setSpeciality] = useState<string[]>([])
    const [doctors, setDoctors] = useState<Doctors[]>([])
    const [freeSlots, setFreeSlots] = useState<string[]>([])

    const form = useForm<PatientFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            especialidade: '',
            doutor: '',
            data: undefined,
            horario: ''
        },
        mode: "onChange"
    })

    console.log(form.formState.errors)

    const onSubmit = (data: PatientFormSchema) => {
        alert('submit realizado com sucesso')
        console.log(data)
    }

    console.log(form.getValues("horario"))

    useEffect(() => {
        const getDoctorsSpeciality = async () => {
            const specialities = await getAllDoctorsSpeciality()
            if (!specialities) return
            setSpeciality(specialities)
        }
        getDoctorsSpeciality()
    }, [])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className='w-full flex flex-col gap-2 mt-3'>
                    <FormField
                        control={form.control}
                        name="especialidade"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={async (value) => {
                                    field.onChange(value)
                                    const doctorBySpeciality = await getDoctorBySpeciality(value)
                                    setDoctors(doctorBySpeciality)
                                }}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Especialidade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {speciality.map((item, index) => (
                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="doutor"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={async (value) => {
                                    field.onChange(value)
                                }}>
                                    <SelectTrigger className="w-full" disabled={doctors.length === 0}>
                                        <SelectValue placeholder="Doutor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="data"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <Popover>
                                    <PopoverTrigger asChild disabled={!form.getValues("doutor")}>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Selecione a data</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={async (value) => {
                                                field.onChange(value)

                                                const values = await getFreeTimesFromAppointments(form.getValues("doutor"), value || new Date())

                                                if (!values) return

                                                setFreeSlots(values)
                                            }}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="horario"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={(value) => {
                                    console.log(value)
                                    field.onChange(value)
                                }}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Horários disponíveis" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {freeSlots.map(time => (
                                            <SelectItem value={time} key={time}>{time}</SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
                            </FormItem>
                        )}
                    />

                </div>
                <Button className='w-full mt-3 cursor-pointer'>Agendar consulta</Button>
            </form>
        </Form>
    );
};

export default ScheduleForm;