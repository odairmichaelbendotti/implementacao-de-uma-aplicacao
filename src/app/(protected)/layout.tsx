import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import AppSidebar from "./_components/app-sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getClinicByUser } from "@/_actions/clinic-by-user-id"
import { Clinics } from "@/generated/prisma"
import { redirect } from "next/navigation"

interface ChildrenProps {
    children: ReactNode
}

interface UserProps {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    age?: number | null
    clinicId?: string | null
}

const LayoutProtected = async ({ children }: ChildrenProps) => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/authentication')
    }

    const user: UserProps = session.user

    const clinic: Clinics | { error: string } = await getClinicByUser(user.id)

    if (!clinic || !user) return

    return (
        <>
            <SidebarProvider open={true}>
                <AppSidebar user={user} clinic={clinic} />
                <main className="w-full bg-gray-100">
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
};

export default LayoutProtected