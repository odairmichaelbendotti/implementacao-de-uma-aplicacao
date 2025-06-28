import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'
import { Forward } from 'lucide-react'
import Link from 'next/link';

type DashboardCardType = {
    firstDescription: string
    secondDescription: string
    value: string
    path?: string
}

const DashboardCard = ({ firstDescription, secondDescription, value, path }: DashboardCardType) => {
    return (
        <Card className='w-full hover:opacity-90'>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <CardDescription>{firstDescription}</CardDescription>
                    {path && <Link href={`/${path}`}><Badge variant="outline" className='min-w-12 min-h-6 cursor-pointer hover:opacity-70'><Forward size={18} /></Badge></Link>}
                </div>
                <CardTitle className='text-4xl'>{value}</CardTitle>
                <CardDescription className='text-xs mt-2'>{secondDescription}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default DashboardCard