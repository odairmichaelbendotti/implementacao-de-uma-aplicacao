import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';

const AddPatient = ({ title }: { title: string }) => {
    return (
        <Dialog>
            <DialogTrigger asChild><Button className='cursor-pointer'>{title}</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar novo paciente</DialogTitle>
                    <p>Informações do paciente aqui</p>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddPatient;