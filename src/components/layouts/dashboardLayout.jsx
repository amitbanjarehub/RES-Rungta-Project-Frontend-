// import Header from '@/components/navigation/header'
// import React from 'react'
// import Sidebar from '@/components/navigation/sidebar'
// import { Outlet } from 'react-router-dom'

// export default function DashboardLayout() {
//     return (
//         <>
//             <Header />
//             <div className="flex h-screen overflow-hidden relative">
//                 <Sidebar />
//                 <main className="w-full pt-16 h-full overflow-auto ">
//                     <Outlet />
//                 </main>
//             </div>
//         </>
//     )
// }

import React, { useState } from 'react'
import Header from '@/components/navigation/header'
import Sidebar from '@/components/navigation/sidebar'
import Footer from '../navigation/footer'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />

            <div className="flex h-screen overflow-hidden relative">
                {isSidebarOpen && <Sidebar />}
                <main className="w-full pt-16 h-full overflow-auto">
                    <Outlet />
                </main>
            </div>
            <main className="w-full pt-16 h-full overflow-auto">
                <Footer />
            </main>
        </>
    )
}
