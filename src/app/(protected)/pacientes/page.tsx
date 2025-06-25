import { Header, HeaderActions, HeaderContent, HeaderDescription, HeaderTitle, Page, PageContentScheduler } from "@/components/ui/page-container";
// import { Button } from "@/components/ui/button";
// import { UserRoundPlus } from "lucide-react"
import PatientTable from "./_components/table";
import AddPatient from "./_components/add-patient";

const Pacientes = () => {
    return (
        <Page>
            <Header>
                <HeaderContent>
                    <HeaderTitle>Pacientes</HeaderTitle>
                    <HeaderDescription>Os pacientes aparecerão aqui</HeaderDescription>
                </HeaderContent>
                <HeaderActions>
                    {/* <Button className="cursor-pointer" variant="outline"><UserRoundPlus />Ordenar</Button>
                    <Button className="cursor-pointer" variant="outline"><UserRoundPlus />Filtrar</Button> */}
                    <AddPatient title='Adicionar paciente' />
                </HeaderActions>
            </Header>

            <PageContentScheduler>
                <PatientTable />
            </PageContentScheduler>

        </Page>
    );
};

export default Pacientes