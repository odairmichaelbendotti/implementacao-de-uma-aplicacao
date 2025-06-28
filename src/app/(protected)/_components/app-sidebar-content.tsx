"use client"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Banknote, Calendar, FileUser, Home, UserSearch } from 'lucide-react';
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const AppSidebarContent = () => {

    const items = [
        {
            path: '/',
            title: 'Dashboard',
            icon: Home
        },
        {
            path: '/agendamentos',
            title: 'Agendamentos',
            icon: Calendar
        },
        {
            path: '/medicos',
            title: 'Médicos',
            icon: UserSearch
        },
        {
            path: '/pacientes',
            title: 'Pacientes',
            icon: FileUser
        }
    ]


    const path = usePathname()
    console.log(path)

    return (
        <SidebarContent>

            <SidebarGroup>
                <SidebarGroupLabel>Funções de administrador</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map(item => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton className={`cursor-pointer h-10 ${path === item.path && 'bg-gray-200'}`} asChild>
                                    <Link href={item.path}><item.icon />{item.title}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Funções de administrador</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className={`cursor-pointer h-10 ${path === '/planos' && 'bg-gray-200'}`} asChild>
                                <Link href='/planos'><Banknote />Planos</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

        </SidebarContent>
    );
};

export default AppSidebarContent