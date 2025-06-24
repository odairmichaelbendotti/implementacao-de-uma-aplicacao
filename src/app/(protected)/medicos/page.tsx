import { Button } from "@/components/ui/button"
import { Header, HeaderActions, HeaderContent, HeaderDescription, HeaderTitle, Page, PageContent } from "@/components/ui/page-container"
import { UserRoundPlus } from "lucide-react"
import AddMedic from "./_components/add-medic"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getClinicByUser } from "@/_actions/clinic-by-user-id"
import { getAllDoctorsByUserId } from "@/_actions/get-all-doctors-by-user-id"
import { Doctors } from "@/generated/prisma"
import DoctorCard from "./_components/doctor-card"

const Medicos = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) redirect('/authentication')

    const userHasAClinic = await getClinicByUser(session.user.id)

    if (!userHasAClinic) redirect('/clinic-form')

    const doctors = await getAllDoctorsByUserId() as Doctors[]

    return (
        <Page>
            <Header>
                <HeaderContent>
                    <HeaderTitle>Médicos</HeaderTitle>
                    <HeaderDescription>Os médicos aparecerão aqui</HeaderDescription>
                </HeaderContent>
                <HeaderActions>
                    <Button className="cursor-pointer" variant="outline"><UserRoundPlus />Ordenar</Button>
                    <Button className="cursor-pointer" variant="outline"><UserRoundPlus />Filtrar</Button>
                    <AddMedic title='Adicionar médico' />
                </HeaderActions>
            </Header>

            <PageContent doctors={doctors}>
                {doctors.length === 0 && <p className="p-2">Sua clínica ainda não possui médicos cadastrados.</p>}
                {doctors.length > 0 && (
                    doctors.map((item) => (
                        <DoctorCard key={item.id} item={item} />
                    ))
                )}
            </PageContent>

        </Page>
    );
};

export default Medicos