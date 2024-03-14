
import { siteConfig } from '@/config/site'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import MobileNav from '@/components/navigation/mobileNav'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { FaUserCircle } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { IoLogOutOutline } from 'react-icons/io5'

export default function Header({ toggleSidebar }) {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="fixed top-0 left-0 right-0 bg-black text-white z-20">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="lg:flex items-center hidden">
                    <button
                        onClick={toggleSidebar}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <div>
                        <button
                            className="text-bold flex items-center gap-2"
                            onClick={() =>
                                navigate('/student/dashboard/profile')
                            }
                        >
                            <img src={siteConfig.ogImage} className="w-8" />{' '}
                            {siteConfig.name}
                        </button>
                    </div>
                </div>

                <div className={cn('flex lg:!hidden gap-2')}>
                    <MobileNav />{' '}
                    <span className="text-bold"> {siteConfig.name}</span>
                </div>
                {auth.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={'secondary'}
                                className="gap-2 flex justify-center items-center "
                            >
                                <FaUserCircle size={'15'} />{' '}
                                <span className="pointer-events-none">
                                    {auth.user.stud_name}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56  mt-1 border bg-background rounded-xl">
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className="cursor-pointer flex justify-between"
                                    onClick={() => {
                                        setAuth({
                                            ...auth,
                                            token: '',
                                        })
                                        location.replace('/auth/student')
                                    }}
                                >
                                    Logout <IoLogOutOutline />
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </nav>
        </div>
    )
}
