import DashboardNav from '@/components/navigation/dashboardNav'
import { dashboardConfig } from '@/config/studentDashboard'
import { cn } from '@/lib/utils'
import React from 'react'

export default function Sidebar() {
    return (
        <nav
            className={cn(
                `sticky top-0 hidden h-screen border-r pt-16 lg:block w-72 bg-accent `
            )}
        >
            <div className="space-y-1 py-1 ">
                <div className="px-3 py-2">
                    <div className="space-y-4">
                        <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                        {/* <h2 className="scroll-m-20 pb-4 text-xl md:text-3xl font-semibold tracking-tight first:mt-0 px-4"> */}
                            Overview
                        </h2>
                        <DashboardNav items={dashboardConfig.sideBarNav} />
                    </div>
                </div>
            </div>
        </nav>
    )
}
