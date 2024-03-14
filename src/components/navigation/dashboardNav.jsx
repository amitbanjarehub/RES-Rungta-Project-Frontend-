import { cn } from '@/lib/utils'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function DashboardNav({ items, closeSheet }) {
    const location = useLocation()
    if (!items?.length) {
        return null
    }
    const pathnameTail = location.pathname.split('/').pop()

    return (
        <nav className="grid item-start gap-2  ">
            {items.map((item, index) => {
                return (
                    item.href && (
                        <Link
                            key={index}
                            to={`/student/dashboard/${item.href}`}
                            onClick={() => closeSheet?.()}
                        >
                            <span
                                className={cn(
                                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent-foreground hover:text-accent transition-colors',
                                    pathnameTail === item.href
                                        ? 'bg-accent-foreground text-accent'
                                        : 'transparent',
                                    item.disabled &&
                                        'cursor-not-allowed opacity-80'
                                )}
                            >
                                {item.icon({
                                    size: 18,
                                    className: 'mr-2',
                                })}
                                <span>{item.title}</span>
                            </span>
                        </Link>
                    )
                )
            })}
        </nav>
    )
}
