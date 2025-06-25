import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SquareArrowOutUpRight } from "lucide-react";

import React from 'react';

const ScheduleTable = () => {
    return (
        <Table>
            <TableCaption>Lista de agendamentos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Paciente</TableHead>
                    <TableHead className="text-center">Data</TableHead>
                    <TableHead className="text-center">Horário</TableHead>
                    <TableHead className="text-center">Médico</TableHead>
                    <TableHead className="text-center">Especialidade</TableHead>
                    <TableHead className="text-center">Valor</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Lembrar cliente</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="text-center">
                    <TableCell className="font-medium text-left max-w-26">Odair Michael Bendotti</TableCell>
                    <TableCell>12/06/2025</TableCell>
                    <TableCell>12:00</TableCell>
                    <TableCell className="max-w-26">Larissa Paixão Sousa</TableCell>
                    <TableCell>Esteticista</TableCell>
                    <TableCell>R$200,00</TableCell>
                    <TableCell><Badge>Confirmado</Badge></TableCell>
                    <TableCell className="flex justify-center cursor-pointer"><SquareArrowOutUpRight size={14} /></TableCell>
                </TableRow>
            </TableBody>
        </Table >
    );
};

export default ScheduleTable;