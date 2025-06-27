import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAllPatients } from "../_actions/get-all-patients"

import React from 'react';
import AddSchedule from "./add-schedule";
import { redirect } from "next/navigation";
import { Patients } from "@/generated/prisma";
// import { ListCheck } from "lucide-react";
import DeletePatient from "./table-cell-delete-user"

const PatientTable = async () => {
    const patients = await getAllPatients() as Patients[]
    if (!patients) redirect('/pacientes')

    return (
        <Table>
            {patients.length === 0 && <TableCaption className="py-2">Você não possui pacientes cadastrados</TableCaption>}
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Paciente</TableHead>
                    <TableHead className="text-center hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-center hidden md:table-cell">E-mail</TableHead>
                    <TableHead className="text-center hidden md:table-cell">Contato</TableHead>
                    <TableHead className="text-center hidden md:table-cell">Deletar</TableHead>
                    {/* <TableHead className="text-center">Agendamentos</TableHead> */}
                    <TableHead className="text-center">Marcar consulta</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {patients.map(patient => (
                    <TableRow className="text-center" key={patient.id}>
                        <TableCell className="font-medium text-left max-w-26">{patient.name}</TableCell>
                        <TableCell className="text-center hidden md:table-cell">Ativo</TableCell>
                        <TableCell className="text-center hidden md:table-cell">{patient.email}</TableCell>
                        <TableCell className="text-center hidden md:table-cell">{patient.phoneNumber}</TableCell>
                        {/* <TableCell><div className="flex justify-center cursor-pointer"><ListCheck /></div></TableCell> */}
                        <DeletePatient patient={patient} />
                        <TableCell><div className="flex justify-center"><AddSchedule patientId={patient.id} /></div></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    );
};

export default PatientTable