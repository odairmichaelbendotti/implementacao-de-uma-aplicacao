import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/db/db'
import { Header, HeaderContent, HeaderDescription, HeaderTitle, Page, PageContentScheduler } from '@/components/ui/page-container'
import DashboardCard from './_components/dashboard-card'
import { getDoctorsQtd } from '@/_actions/get-graph-info'
import { Graph } from './_components/graph'
import { getTotalAppointment } from '@/_actions/appointments-qtd'
import { getTotalDoctors } from '@/_actions/doctor-qtd'

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

    const graphInfos = await getDoctorsQtd(userComplete.id)
    if (!graphInfos) return

    const appointmentCount = await getTotalAppointment(userComplete.clinicId)
    if (!appointmentCount) return
    const appointmentTotal = Number(appointmentCount[0]['COUNT(*)'])

    const doctorCount = await getTotalDoctors(userComplete.clinicId)
    if (!doctorCount) return
    const doctorTotal = Number(doctorCount[0]['COUNT(*)'])

    return (
        <Page>
            <Header>
                <HeaderContent>
                    <HeaderTitle>Suas estatísticas</HeaderTitle>
                    <HeaderDescription>Aqui você tem acesso aos gráficos de crescimento da sua empresa</HeaderDescription>
                </HeaderContent>
            </Header>
            <PageContentScheduler>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-2 gap-3'>
                    <DashboardCard firstDescription="Agendamentos" secondDescription="Pacientes cadastrados em sua clínica" value={appointmentTotal.toString()} path="agendamentos" />
                    <DashboardCard firstDescription="Médicos" secondDescription="Médicos cadastrados em sua clínica" value={doctorTotal.toString()} path="medicos" />
                </div>
            </PageContentScheduler>
            <div className='w-2xl mx-auto'>
                <Graph graphInfos={graphInfos} />
            </div>
        </Page>
    );
}

export default Dashboard