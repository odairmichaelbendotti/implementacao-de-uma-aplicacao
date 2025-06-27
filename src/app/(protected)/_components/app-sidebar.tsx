import { Sidebar, SidebarHeader } from "@/components/ui/sidebar"
import AppSidebarContent from "./app-sidebar-content"
import AppSidebarFooter from "./app-sidebar-footer"
import { Clinics } from "@/generated/prisma"

interface UserProps {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    age?: number | null
    clinicId?: string | null
}

export interface AppSidebarProps {
    user: UserProps
    clinic: Clinics | { error: string }
}

const AppSidebar = ({ user, clinic }: AppSidebarProps) => {

    if ('error' in clinic) return

    return (
        <Sidebar>
            <SidebarHeader />
            <AppSidebarContent />
            <AppSidebarFooter user={user} clinic={clinic} />
        </Sidebar>
    );
};

export default AppSidebar;