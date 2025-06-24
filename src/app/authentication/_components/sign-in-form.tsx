import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginSchema, LoginFormData } from './../_utils/loginSchema'
import { signIn } from "@/lib/auth-client"
import { LoaderCircle } from 'lucide-react'
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"
import { handleGoogleLogin } from "@/lib/auth-client"

const SignIn = () => {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(values: LoginFormData) {
        const { } = await signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/dashboard"
        }, {
            onSuccess: () => {
                toast.success('Login realizado com sucesso')
            },
            onError: (ctx) => {
                if (ctx.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
                    console.log(ctx)
                    toast('Informações de login inválidas')
                }
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Faça login para continuar
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 mt-6">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-mail" type="email" {...field} />
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
                <CardFooter className="flex flex-col gap-4">
                    <Button
                        type="submit" className="w-full cursor-pointer"
                        disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />} Entrar
                    </Button>

                    <Separator />

                    <Button className="w-full cursor-pointer" variant="outline" type="button" onClick={handleGoogleLogin}>
                        <FcGoogle size={30} />
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
};

export default SignIn