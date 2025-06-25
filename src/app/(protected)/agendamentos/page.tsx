import { Header, Page, HeaderContent, HeaderTitle, HeaderDescription, PageContentScheduler } from "@/components/ui/page-container"
import ScheduleTable from "./_components/table";

const Agendamentos = () => {
    return (
        <Page>
            <Header>
                <HeaderContent>
                    <HeaderTitle>Agendamentos</HeaderTitle>
                    <HeaderDescription>Aqui você tem acesso a todos os agendamentos da sua clínica</HeaderDescription>
                </HeaderContent>
            </Header>

            <PageContentScheduler>
                <ScheduleTable />
            </PageContentScheduler>

        </Page>
    );
};

export default Agendamentos