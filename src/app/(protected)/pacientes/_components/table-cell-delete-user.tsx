"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { TableCell } from '@/components/ui/table';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { UserMinus } from 'lucide-react'
import { Patients } from '@/generated/prisma'
import { deletePatient } from '@/_actions/delete-patient-by-id';
import { toast } from 'sonner';

const DeletePatient = ({ patient }: { patient: Patients }) => {

    const handleDeletePatient = async () => {
        try {
            await deletePatient(patient.id)
            toast.success('Paciente deletado com sucesso')
        } catch (error) {
            toast.error('Erro ao deletar paciente')
            throw error
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <TableCell className="text-center hidden md:table-cell"><div className='flex justify-center items-center'><UserMinus size={18} className='cursor-pointer' /></div></TableCell>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja realmente deletar este paciente?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className='cursor-pointer' onClick={handleDeletePatient}>Sim</AlertDialogAction>
                    <AlertDialogCancel className='cursor-pointer'>Não</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default DeletePatient 