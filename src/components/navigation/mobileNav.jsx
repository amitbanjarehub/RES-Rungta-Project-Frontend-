import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import DashboardNav from './dashboardNav'
import { dashboardConfig } from '@/config/studentDashboard'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'

export default function MobileNav() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <IoMenu size={'25'} />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                Overview
                            </h2>
                            <div className="space-y-1">
                                <DashboardNav
                                    items={dashboardConfig.sideBarNav}
                                    setOpen={setOpen}
                                    closeSheet={() => setOpen(false)}
                                />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
