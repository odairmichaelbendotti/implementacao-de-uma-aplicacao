"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { newClinicFormData, newClinicSchema } from './utils/newClinicSchema'
import { Button } from '@/components/ui/button'
import { createClinic } from '@/_actions/create-clinic'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useSession } from "@/lib/auth-client"
import { useRouter } from 'next/navigation';
import { checkUserHaveAClinic } from '@/_actions/user-with-clinic';

const UserClinic = () => {
    const router = useRouter()
    const form = useForm<newClinicFormData>({
        resolver: zodResolver(newClinicSchema),
        defaultValues: {
            name: ''
        }
    })

    const { data: session } = useSession()

    if (!session?.user || session === null) {
        return
    }

    console.log(session.user.id)

    const onSubmit = async (values: newClinicFormData) => {
        const check = await checkUserHaveAClinic(session.user.id)

        if (check.error) {
            toast.error('O usuário já possui uma clínica cadastrada')
            return
        }

        const response = await createClinic(values.name)
        if (response?.success) {
            toast.success('Clínica cadastrada com sucesso')
            router.push("/pacientes")
        } else {
            toast.error('Erro ao cadastrar clínica')
        }

        form.reset()
    }

    return (
        <Dialog open>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Crie sua clínica</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome da clínica</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Clínica" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className='cursor-pointer'>
                                    {form.formState.isSubmitting && <Loader2 className='animate-spin' />}Cadastrar
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form >
            </DialogContent >
        </Dialog >
    )
};

export default UserClinic