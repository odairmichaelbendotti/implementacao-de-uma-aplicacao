import { Doctors } from "@/generated/prisma"
import { ReactNode } from "react"

interface ChildrenProps {
    children: ReactNode
    doctors?: Doctors[]
}

export const Page = ({ children }: ChildrenProps) => {
    return <div className="w-full p-6 flex flex-col">{children}</div>
}

export const Header = ({ children }: ChildrenProps) => {
    return <div className="flex justify-between items-end">{children}</div>
}

export const HeaderContent = ({ children }: ChildrenProps) => {
    return <div>{children}</div>
}

export const HeaderTitle = ({ children }: ChildrenProps) => {
    return <p className="text-xl font-bold">{children}</p>
}

export const HeaderDescription = ({ children }: ChildrenProps) => {
    return <p className="text-xs text-gray-500">{children}</p>
}

export const HeaderActions = ({ children }: ChildrenProps) => {
    return <div className="flex items-center gap-2">{children}</div>
}

export const PageContent = ({ children, doctors }: ChildrenProps) => {
    return <div className={`mt-6 bg-white p-2 flex-1 rounded-sm ${doctors?.length === 0 ? '' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-3`}>{children}</div>
}

export const PageContentScheduler = ({ children }: ChildrenProps) => {
    return <div className="mt-6 bg-white flex flex-1 rounded-sm p-1">{children}</div>
}




// <Page>
//     <Header>
//         <HeaderContent>
//             <HeaderTitle>Médicos</HeaderTitle>
//             <HeaderDescription>Os médicos aparecerão aqui</HeaderDescription>
//         </HeaderContent>
//         <HeaderActions>
//             <Button className="cursor-pointer" variant="outline"><UserRoundPlus />Ordenar</Button>
//             <Button className="cursor-pointer" variant="outline"><UserRoundPlus />Filtrar</Button>
//             <AddMedic title='Adicionar médico' />
//         </HeaderActions>
//     </Header>

//     <PageContent doctors={doctors}>
//       
//     </PageContent>

// </Page>