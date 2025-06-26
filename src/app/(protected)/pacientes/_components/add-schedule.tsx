"use server"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarCheck } from 'lucide-react'
import ScheduleForm from './schedule-form';

const AddSchedule = async ({ patientId }: { patientId: string }) => {
    return (
        <Dialog>
            <DialogTrigger asChild><CalendarCheck size={18} className='cursor-pointer' /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agendar consulta</DialogTitle>

                    <ScheduleForm patientId={patientId} />

                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddSchedule;