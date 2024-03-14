import { BiSolidDashboard } from 'react-icons/bi'
import { FaMoneyBillWave } from 'react-icons/fa'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { FaRegUserCircle } from 'react-icons/fa'
import { LiaCalendarDaySolid } from 'react-icons/lia'
import { HiAcademicCap } from 'react-icons/hi2'
import { GiNotebook } from 'react-icons/gi'
import { TiNews } from 'react-icons/ti'
import { FaBook } from 'react-icons/fa'
import { GiOpenGate } from 'react-icons/gi'
import StudentDashboardProfile from '@/components/sections/studentDashboardProfile'
import Enews from '@/components/sections/enews'
import { LuScanFace } from 'react-icons/lu'
import StudentBiometricAttendance from '@/components/sections/studentBiometricAttendance'
import Academics from '@/components/sections/academics'
import Student_unit_notes from '@/pages/academics/student_unit_notes'
import BookRequestTable from '@/components/sections/bookRequestResponse'
import BookRequestStatus from '@/components/sections/bookRequestStatus'
import HostelGatePass from '@/components/sections/hostelGatePass'
import Notes from '@/components/sections/notes'
import Fees from '@/components/sections/fees'

export const dashboardConfig = {
    mainNav: [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'About',
            href: '/about',
        },
        {
            title: 'Contact',
            href: '/contact',
        },
    ],
    sideBarNav: [
        {
            title: 'Profile',
            href: 'profile',
            icon: FaRegUserCircle,
            component: <StudentDashboardProfile />,
        },

        {
            title: 'Fees',
            href: 'fees',
            icon: LiaRupeeSignSolid,
            component: <Fees />,
        },

        {
            title: 'Biometric Attendance',
            href: 'biometric-attendance',
            icon: LuScanFace,
            component: <StudentBiometricAttendance />,
        },
       

        {
            title: 'Academics',
            href: 'academics',
            icon: HiAcademicCap,
            component: <Academics />,
        },
       
        {
            title: 'Notes',
            href: 'notes',
            icon: GiNotebook,
            component: <Notes />,
        },
        {
            title: 'Request Book',
            href: 'request-book',
            icon: FaBook,
            component: <BookRequestTable />,
        },
        {
            title: 'book Request Status',
            href: 'request-book-status',
            icon: GiNotebook,
            component: <BookRequestStatus />,
        },
        {
            title: 'E-News',
            href: 'e-news',
            icon: TiNews,
            component: <Enews />,
        },
        {
            title: 'Hostel Gate Pass',
            href: 'hostel-gate-pass',
            icon: GiOpenGate,
            // component: <div>Hostel Gate Pass</div>,
            component:<HostelGatePass/>
            
        },
       
    ],
}
