"use client"
import { UserRoundX } from 'lucide-react';
import { Appointments } from '@/generated/prisma'
import { Badge } from '@/components/ui/badge'
import { deleteAppointment } from '@/_actions/delete-appointment';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

type AppointmetType = {
    appointment: Appointments
}

const handleDeleteAppointment = async (id: string) => {
    if (!id) return
    await deleteAppointment(id)
}

const TableCellRemoveAppointment = ({ appointment }: AppointmetType) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Badge variant="destructive"><UserRoundX /></Badge>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Desmarcar consulta</AlertDialogTitle>
                    <AlertDialogDescription>Deseja realmente desmarcar esta consulta?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className='cursor-pointer' onClick={() => handleDeleteAppointment(appointment.id)}>Sim</AlertDialogAction>
                    <AlertDialogCancel className='cursor-pointer'>Não</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TableCellRemoveAppointment