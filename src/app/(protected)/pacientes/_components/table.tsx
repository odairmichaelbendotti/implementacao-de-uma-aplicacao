import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAllPatients } from "../_actions/get-all-patients";

import React from 'react';
import AddSchedule from "./add-schedule";
import { redirect } from "next/navigation";
import { Patients } from "@/generated/prisma";
import { ListCheck } from "lucide-react";

const PatientTable = async () => {
    const patients = await getAllPatients() as Patients[]
    if (!patients) redirect('/dashboard')

    return (
        <Table>
            <TableCaption>Lista de agendamentos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Paciente</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">E-mail</TableHead>
                    <TableHead className="text-center">WhatsApp</TableHead>
                    <TableHead className="text-center">Agendamentos</TableHead>
                    <TableHead className="text-center">Agendar</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {patients.map(patient => (
                    <TableRow className="text-center" key={patient.id}>
                        <TableCell className="font-medium text-left max-w-26">{patient.name}</TableCell>
                        <TableCell className="text-center">Ativo</TableCell>
                        <TableCell className="text-center">{patient.email}</TableCell>
                        <TableCell className="text-center">{patient.phoneNumber}</TableCell>
                        <TableCell className="flex justify-center cursor-pointer"><div className="flex items-center justify-center"><ListCheck /></div></TableCell>
                        <TableCell className="flex justify-center cursor-pointer"><div className="flex items-center justify-center"><AddSchedule /></div></TableCell>
                    </TableRow>
                ))}


            </TableBody>
        </Table >
    );
};

export default PatientTable