import { useForm } from "react-hook-form"
import { RegisterFormData } from "../_utils/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../_utils/registerSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/auth-client"
import { LoaderCircle } from 'lucide-react'
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const SignUp = () => {
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const router = useRouter()

    async function onSubmit(values: RegisterFormData) {
        const { } = await signUp.email({
            name: values.name,
            email: values.email,
            password: values.password,
            callbackURL: "/dashboard"
        }, {
            onSuccess: () => {
                toast.success('Conta criada com sucesso')
                router.push('/dashboard')
            },
            onError: (ctx) => {
                if (ctx.error.code === 'USER_ALREADY_EXISTS') {
                    console.log(ctx)
                    toast.error('E-mail já cadastrado')
                    return
                }
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <CardHeader>
                    <CardTitle>Crie sua conta</CardTitle>
                    <CardDescription>
                        Preencha os dados abaixo para criar sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 mt-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o seu nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-mail" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input placeholder="Senha" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="cursor-pointer w-full"
                        disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />}Criar conta
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
};

export default SignUp;