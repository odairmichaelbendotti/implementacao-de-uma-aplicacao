"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PacienteFormSchema, PatientSchema } from '../schema/add-patient-schema'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { addNewPatient } from '@/_actions/create-new-patient'

const AddPatient = ({ title }: { title: string }) => {
    const form = useForm<PacienteFormSchema>({
        resolver: zodResolver(PatientSchema),
        defaultValues: {
            name: 'Odair Michael Bendotti',
            email: 'obendotti@gmail.com',
            phoneNumber: '47996439372',
            gender: 'MASC'
        }
    })

    const handleSubmitForm = async (data: PacienteFormSchema) => {
        console.log(data)
        console.log(form.formState.errors)
        await addNewPatient(data)
    }


    return (
        <Dialog>
            <DialogTrigger asChild><Button className='cursor-pointer'>{title}</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar novo paciente</DialogTitle>
                    <Form {...form}>
                        <form className='flex flex-col gap-2 mt-2' onSubmit={form.handleSubmit(handleSubmitForm)}>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input type="text" placeholder='Nome' {...field} />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input type='email' placeholder='E-mail' {...field} />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input type='text' placeholder='Telefone' {...field} />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder="Escolha o gênero" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="MASC">Masculino</SelectItem>
                                                <SelectItem value="FEM">Feminino</SelectItem>
                                                <SelectItem value="OUTRO">Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button className='w-ful cursor-pointer'>Cadastrar usuário</Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddPatient;