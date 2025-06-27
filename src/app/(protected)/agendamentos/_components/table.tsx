import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SquareArrowOutUpRight } from "lucide-react"
import { getAllAppointments } from "@/_actions/get-appointments"
import { getDoctorInfos, getDoctorPrice, getDoctorSpeciality, getPatientNameByPatientId } from "@/_actions/get-infos-to-appointment"

import React from 'react';
import TableCellRemoveAppointment from "./TableCellRemoveAppointment"

const ScheduleTable = async () => {
    const appointments = await getAllAppointments()
    const getPatientName = async (patientId: string) => {
        return await getPatientNameByPatientId(patientId)
    }

    const handleDoctorName = async (doctorId: string) => {
        const name = await getDoctorInfos(doctorId)
        if (!name) return
        return name
    }

    const handleDoctorSpeciality = async (doctorId: string) => {
        const speciality = await getDoctorSpeciality(doctorId)
        if (!speciality) return
        return speciality
    }

    const handleDoctorPrice = async (doctorId: string) => {
        if (!doctorId) return
        const doctorPrice = await getDoctorPrice(doctorId)
        if (!doctorPrice) return
        return doctorPrice
    }

    return (
        <Table className="text-xs">
            {appointments?.length === 0 && <TableCaption className="py-2">Você não possui agendamentos</TableCaption>}
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Paciente</TableHead>
                    <TableHead className="text-center">Data</TableHead>
                    <TableHead className="text-center">Horário</TableHead>
                    <TableHead className="text-center">Médico</TableHead>
                    <TableHead className="text-center">Especialidade</TableHead>
                    <TableHead className="text-center">Valor</TableHead>
                    <TableHead className="text-center">Desmarcar</TableHead>
                    <TableHead className="text-center">Lembrar cliente</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {appointments?.map(appointment => (
                    <TableRow className="text-center" key={appointment.id}>
                        <TableCell className="font-medium text-left max-w-26">{getPatientName(appointment.patientId)}</TableCell>
                        <TableCell>{appointment.date.toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{appointment.horario}</TableCell>
                        <TableCell className="max-w-26">{handleDoctorName(appointment.doctorId)}</TableCell>
                        <TableCell>{handleDoctorSpeciality(appointment.doctorId)}</TableCell>
                        <TableCell>R$ {handleDoctorPrice(appointment.doctorId)},00</TableCell>
                        <TableCell><div className="flex justify-center items-center cursor-pointer hover:opacity-90"><TableCellRemoveAppointment appointment={appointment} /></div></TableCell>
                        <TableCell className="flex justify-center cursor-pointer"><SquareArrowOutUpRight size={14} /></TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table >
    );
};

export default ScheduleTable;