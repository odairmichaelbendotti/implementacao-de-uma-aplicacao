"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Trash2, Check, Calendar, Timer, Banknote } from 'lucide-react'
import { Doctors } from '@/generated/prisma'
import { converToStringDay } from '../_utils/convertToStrinDay'
import { deleteDoctor } from '@/_actions/delete-doctor-by-id'
import { toast } from 'sonner'
import EditDoctor from './edit-doctor'
import { useState } from 'react'

interface DoctorProps {
    item: Doctors
}

const DoctorCard = ({ item }: DoctorProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const handleDeleteDoctor = async (id: string) => {
        if (!id) {
            toast.error('Não foi possível realizar esta ação')
            return
        }

        const deletedDoctor = await deleteDoctor(id)

        if ('error' in deletedDoctor) {
            toast.error('Não foi possível excluir este médico')
            return
        }

        toast.success('Médico excluído com sucesso')
    }

    return (
        <Card className='w-full p-4'>
            {/* HEADER */}
            <div className='flex flex-col justify-center xl:justify-start xl:flex-row  items-center gap-4'>
                <div className='w-18 h-18 rounded-full border-1 flex justify-center items-center text-xl font-bold bg-blue-200'>OB</div>
                <div className='flex flex-col gap-1'>
                    <p className='font-bold text-md'>Dr. {item.name}</p>
                    <div className='flex items-center text-sm gap-2'>
                        <Check size={18} className='bg-gray-400 rounded-full p-1 h-4 w-4 text-white' />
                        <p className='text-gray-400'>{item.speciality}</p>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                    <div className='inline-flex max-w-max gap-3 py-1 px-3 rounded-md items-center'>
                        <Calendar size={14} />
                        <p className='text-sm'>{converToStringDay(item.availableFromWeekDay)} a {converToStringDay(item.availableToWeekDay)}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='inline-flex max-w-max gap-3 py-1 px-3 rounded-md items-center'>
                        <Timer size={16} />
                        <p className='text-sm'>{item.availableFromTime} às {item.availableToTime}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='inline-flex max-w-max gap-3 py-1 px-3 rounded-md items-center'>
                        <Banknote size={18} />
                        <p className='text-sm font-bold'>R$ {item.appointmentPriceDents.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <Separator />
            <div className='flex items-center justify-between gap-4'>
                <EditDoctor item={item} open={open} setOpen={setOpen} />
                <Button variant="outline" className='cursor-pointer' onClick={() => handleDeleteDoctor(item.id)}><Trash2 size={14} /></Button>
            </div>
        </Card>
    );
};

export default DoctorCard