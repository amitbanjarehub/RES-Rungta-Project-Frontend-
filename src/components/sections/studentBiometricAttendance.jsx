import axios from '@/api/axios'
import MonthlyAttendanceCalender from '@/components/monthlyAttendanceCalender'
import { useAuth } from '@/hooks/useAuth'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useState, useMemo } from 'react'

function organizeDaysByMonth(holidays, presentDays, startDate, endDate) {
    const noOfMonths =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) +
        1
    const startYear = startDate.getFullYear()
    const startMonth = startDate.getMonth() + 1
    const organizedData = Array.from({ length: noOfMonths }, (_, index) => {
        let month = startMonth + index
        let year = startYear

        if (month > 12) {
            month -= 12
            year += 1
        }

        return {
            month: month,
            year: year,
            holidays: [],
            presentDays: [],
        }
    })

    const monthDataMap = {}
    organizedData.forEach((monthData) => {
        monthDataMap[`${monthData.year}-${monthData.month}`] = monthData
    })

    const holidayDates = holidays.map((dateStr) => new Date(dateStr))
    const presentDates = presentDays.map((dateStr) => new Date(dateStr))

    holidayDates.forEach((date) => {
        const monthData =
            monthDataMap[`${date.getFullYear()}-${date.getMonth() + 1}`]
        monthData && monthData.holidays.push(date.toISOString())
    })

    presentDates.forEach((date) => {
        const monthData =
            monthDataMap[`${date.getFullYear()}-${date.getMonth() + 1}`]
        monthData && monthData.presentDays.push(date.toISOString())
    })

    return organizedData
}

export default function studentBiometricAttendance() {
    const { auth } = useAuth()
    const [presentDates, setPresentDates] = useState([])
    const [holidayDates, setHolidayDates] = useState([])
    const [holidayReason, setHolidayReason] = useState([])
    const axiosPrivate = useAxiosPrivate()

    const semesterInfoQuery = useQuery({
        queryKey: ['semesterInfo'],
        queryFn: () =>
            axiosPrivate.get(`student/${auth.user?.id}/academic_tenure`),
    })
    const semesterInfoQueryData = semesterInfoQuery.data?.data.data
    // console.log("semesterInfoQueryData:======>>",semesterInfoQueryData)

    const organizedMonthData =
        semesterInfoQueryData &&
        organizeDaysByMonth(
            [],
            [],
            new Date(semesterInfoQueryData?.class_commencment_date),
            new Date(semesterInfoQueryData?.class_end_date)
        )

    const todayDate = new Date()
    const formattedTodayDate = `${todayDate.getFullYear()}-${(
        todayDate.getMonth() + 1
    )
        .toString()
        .padStart(2, '0')}-${todayDate.getDate().toString().padStart(2, '0')}`
    const labeledSemesterInfo = useMemo(() => {
        return {
            'ESSL ID': semesterInfoQueryData?.essl_id,
            'Start Date': semesterInfoQueryData?.class_commencment_date,
            'End Date': semesterInfoQueryData?.class_end_date,
            'No. of Classes': semesterInfoQueryData?.total_class_days,
            'Classes Completed Till Today':
                semesterInfoQueryData?.date_difference,
            'Present Days':
                semesterInfoQueryData?.student_present_dates?.length,
            'Attendance %': (
                (semesterInfoQueryData?.student_present_dates?.length /
                    semesterInfoQueryData?.total_class_days) *
                100
            )?.toFixed(2),
            [`Today Attendance (${formattedTodayDate})`]:
                semesterInfoQueryData?.today_attendance_status,
        }
    }, [semesterInfoQueryData, formattedTodayDate])

    useEffect(() => {
        if (semesterInfoQueryData) {
            setPresentDates(semesterInfoQueryData.student_present_dates)
            setHolidayDates(semesterInfoQueryData.holiday_dates)
            setHolidayReason(semesterInfoQueryData.holiday_reason)
        }
    }, [semesterInfoQueryData])
    return (
        <div className="p-2 space-y-10 ">
            <div>
                {/* <h2 className="scroll-m-20 pb-4 text-xl md:text-3xl font-semibold tracking-tight first:mt-0 text-center"> */}
                <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight text-center">
                    Current Semester / Year Attendance
                </h2>

                <ul className="space-y-4 text-gray-500 px-3  list-inside dark:text-gray-400 my-3 text-sm">
                    <li>
                        <span className="text-destructive font-semibold text-xl">
                            Important Note
                        </span>
                        <ol className="ps-3 mt-2 space-y-1 list-disc list-inside">
                            <li>
                                Your Everyday Attendance Will Be Reflected
                                Between 11:00 AM To 12:30 PM.
                            </li>
                            <li>
                                If You Are Facing Any Issue Related To
                                Attendance Or Face Scanning Please Contact To
                                Your Class Teacher.
                            </li>
                        </ol>
                    </li>
                </ul>

                <div className="border-black border p-4 rounded-xl">
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
                        {Object.entries(labeledSemesterInfo).map(
                            ([key, value]) => {
                                return (
                                    <div
                                        className="flex flex-col space-y-1 w-full bg-secondary rounded-2xl p-2"
                                        key={key}
                                    >
                                        <span className="font-semibold w-full bg-muted text-sm">
                                            {key}
                                        </span>
                                        <span>{value}</span>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>

            <div className=" space-y-3 ">
                <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight text-center">
                    Semester / Year Calender
                </h2>
                {/* {console.log("organizedMonthData:----->>",organizedMonthData)} */}
                {organizedMonthData?.map((month) => {
                    return (
                        <div
                            className=" rounded-xl text-xs md:text-lg"
                            key={month.month}
                        >
                            <MonthlyAttendanceCalender
                                currentDate={
                                    month
                                        ? new Date(
                                              `${month.year}-${month.month}-01`
                                          )
                                        : new Date()
                                }
                                holidays={holidayDates}
                                presentDays={presentDates}
                                holidayReason={holidayReason}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
