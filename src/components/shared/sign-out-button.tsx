"use client"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

interface ChildrenProps {
    logout: string
}

const SignOutButton = ({ logout }: ChildrenProps) => {
    const router = useRouter()

    return <Button
        onClick={() => signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/authentication")
                }
            }
        })}
        className="cursor-pointer"
    >{logout}</Button>
};

export default SignOutButton