import SignOutButton from '@/components/shared/sign-out-button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/db/db'

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/authentication')
    }

    const userComplete = await prisma.user.findFirst({
        where: {
            id: session.user.id
        }
    })

    if (!userComplete?.clinicId) {
        redirect('/clinic-form')
    }

    return (
        <div>
            <p>Olá {session.user.name.split(' ')[0]}</p>
            <SignOutButton logout="Sair" />
        </div>
    );
}

export default Dashboard