"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SignIn from "./_components/sign-in-form"
import SignUp from "./_components/sign-up-form"

const AuthenticationPage = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Tabs defaultValue="login">
                    <TabsList className="w-full">
                        <TabsTrigger value="login" className="cursor-pointer">Login</TabsTrigger>
                        <TabsTrigger value="register" className="cursor-pointer">Criar conta</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Card>
                            <SignIn />
                        </Card>
                    </TabsContent>
                    <TabsContent value="register">
                        <Card>
                            <SignUp />
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    );
};

export default AuthenticationPage