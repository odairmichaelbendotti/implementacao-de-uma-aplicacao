import { Button } from "@/components/ui/button";
import { Header, Page, HeaderContent, HeaderTitle, HeaderDescription, HeaderActions, PageContentScheduler } from "@/components/ui/page-container"
import { UserRoundPlus } from 'lucide-react'
import ScheduleTable from "./_components/table";

const Agendamentos = () => {
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
                    <Button className="cursor-pointer"><UserRoundPlus />Adicionar médicos</Button>
                </HeaderActions>
            </Header>

            <PageContentScheduler>
                <ScheduleTable />
            </PageContentScheduler>

        </Page>
    );
};

export default Agendamentos