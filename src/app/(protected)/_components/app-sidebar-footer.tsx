"use client"
import { SidebarFooter } from '@/components/ui/sidebar'
import React from 'react'
import { LogOut } from 'lucide-react'
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { AppSidebarProps } from './app-sidebar'

const AppSidebarFooter = ({ user, clinic }: AppSidebarProps) => {
    const router = useRouter()
    const handleLogOut = () => {
        signOut()
        router.push('/authentication')
    }

    return (
        <SidebarFooter>
            <div className='flex w-full items-center gap-4 mb-1'>
                <div className='w-10 h-10 bg-blue-500 rounded-full'></div>
                <div className='flex  items-center  justify-between flex-1'>
                    <div>
                        <p className='text-xs font-bold'>{"error" in clinic ? user.name : clinic.name}</p>
                        <p className='text-xs'>{user.email}</p>
                    </div>
                    <LogOut size={15} className='cursor-pointer' onClick={handleLogOut} />
                </div>
            </div>
        </SidebarFooter>
    );
};

export default AppSidebarFooter;