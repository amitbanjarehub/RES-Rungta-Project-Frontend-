

// import {
//     eachDayOfInterval,
//     endOfMonth,
//     format,
//     startOfMonth,
//     getDay,
// } from 'date-fns'
// import React from 'react'
// import { cn } from '@/lib/utils'
// import { cva } from 'class-variance-authority'

// const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// const dateVariants = cva('bg-primary/30 w-full rounded-lg p-2 md:min-h-16', {
//     variants: {
//         variant: {
//             present: 'bg-green-400 border-green-700 ',
//             holiday: 'bg-primary/30 border-primary  w-full rounded-lg p-2 ',
//             default: 'bg-red-400 border-red-700 ',
//         },
//     },
//     defaultVariants: {
//         variant: 'default',
//     },
// })

// export default function MonthlyAttendanceCalender({
//     currentDate,
//     holidays,
//     presentDays,
//     holidayReason,
// }) {
//     const firstDateOfMonth = startOfMonth(currentDate)
//     const lastDateOfMonth = endOfMonth(currentDate)

//     const datesInMonth = eachDayOfInterval({
//         start: firstDateOfMonth,
//         end: lastDateOfMonth,
//     })
//     const startingDayIndex = getDay(firstDateOfMonth)

//     return (
//         <div className="mx-auto container bg-secondary rounded-2xl p-4">
//             <div className="text-primary font-bold mb-4 ">
//                 <h2 className="text-center ">
//                     {format(currentDate, 'MMMM yyyy')}
//                 </h2>
//             </div>

//             <div className="grid grid-cols-7 gap-2">
//                 {WEEKDAYS.map((day, index) => (
//                     <div
//                         className="bg-primary/50 text-center font-bold rounded-md"
//                         key={day}
//                     >
//                         {day}
//                     </div>
//                 ))}

//                 {Array.from({ length: startingDayIndex }).map((_, index) => (
//                     <div
//                         key={`empty-${index}`}
//                         className="h-full  rounded-lg p-2 bg-primary/10"
//                     />
//                 ))}
//                 {datesInMonth.map((date, index) => {
//                     // Find if date is a holiday and if there's a reason for the holiday
//                     const holidayIndex = holidays.findIndex(
//                         (day) =>
//                             format(day, 'yyyy-MM-dd') ===
//                             format(date, 'yyyy-MM-dd')
//                     )
//                     const holidayReasonIndex = holidayReason.findIndex(
//                         (day) =>
//                             format(day.holidayDate, 'yyyy-MM-dd') ===
//                             format(date, 'yyyy-MM-dd')
//                     )

//                     // Check if both holiday and holidayReason exist for the same date
//                     const isHoliday =
//                         holidayIndex !== -1 && holidayReasonIndex !== -1

//                     return (
//                         <div
//                             key={index}
//                             className={cn(
//                                 dateVariants({ default: true }),
//                                 presentDays?.some((day) => {
//                                     return (
//                                         format(day, 'yyyy-MM-dd') ===
//                                         format(date, 'yyyy-MM-dd')
//                                     )
//                                 }) && dateVariants({ variant: 'present' }),
//                                 isHoliday &&
//                                     dateVariants({ variant: 'holiday' }),
//                                 (index + startingDayIndex) % 7 === 0 &&
//                                     dateVariants({ variant: 'holiday' })
//                             )}
//                         >
//                             <div className="font-bold">
//                                 {format(date, 'd')}
//                                 <br />
//                                 {isHoliday && (
//                                     <span className="block text-xs">
//                                         {
//                                             holidayReason[holidayReasonIndex]
//                                                 .description
//                                         }
//                                     </span>
//                                 )}
//                                 {/* {isHoliday && `  ${holidayReason[holidayReasonIndex].description}`} */}
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

import React from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { eachDayOfInterval, endOfMonth, format, startOfMonth, getDay } from 'date-fns';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const dateVariants = cva('bg-primary/30 w-full rounded-lg p-2 md:min-h-16', {
    variants: {
        variant: {
            present: 'bg-green-400 border-green-700 ',
            holiday: 'bg-primary/30 border-primary  w-full rounded-lg p-2 ',
            default: 'bg-red-400 border-red-700 ',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export default function MonthlyAttendanceCalender({
    currentDate,
    holidays,
    presentDays,
    holidayReason,
}) {
    const firstDateOfMonth = startOfMonth(currentDate);
    const lastDateOfMonth = endOfMonth(currentDate);

    const datesInMonth = eachDayOfInterval({
        start: firstDateOfMonth,
        end: lastDateOfMonth,
    });
    const startingDayIndex = getDay(firstDateOfMonth);

    return (
        <div><br/>
            <div className="mx-auto container bg-secondary rounded-2xl">
                <div className="text-primary font-bold mb-4 ">
                    <h2 className="text-center ">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {WEEKDAYS.map((day, index) => (
                        <div
                            className="bg-primary/50 text-center font-bold rounded-md"
                            key={day}
                        >
                            {day}
                        </div>
                    ))}

                    {Array.from({ length: startingDayIndex }).map((_, index) => (
                        <div
                            key={`empty-${index}`}
                            className="h-full  rounded-lg p-2 bg-primary/10"
                        />
                    ))}
                    {datesInMonth.map((date, index) => {
                        // Find if date is a holiday and if there's a reason for the holiday
                        const holidayIndex = holidays.findIndex(
                            (day) =>
                                format(day, 'yyyy-MM-dd') ===
                                format(date, 'yyyy-MM-dd')
                        );
                        const holidayReasonIndex = holidayReason.findIndex(
                            (day) =>
                                format(day.holidayDate, 'yyyy-MM-dd') ===
                                format(date, 'yyyy-MM-dd')
                        );

                        // Check if both holiday and holidayReason exist for the same date
                        const isHoliday =
                            holidayIndex !== -1 && holidayReasonIndex !== -1;

                        return (
                            <div
                                key={index}
                                className={cn(
                                    dateVariants({ default: true }),
                                    presentDays?.some((day) => {
                                        return (
                                            format(day, 'yyyy-MM-dd') ===
                                            format(date, 'yyyy-MM-dd')
                                        );
                                    }) && dateVariants({ variant: 'present' }),
                                    isHoliday &&
                                        dateVariants({ variant: 'holiday' }),
                                    (index + startingDayIndex) % 7 === 0 &&
                                        dateVariants({ variant: 'holiday' })
                                )}
                            >
                                <div className="font-bold">
                                    {format(date, 'd')}
                                    <br />
                                    {isHoliday && (
                                        <span className="block text-xs">
                                            {
                                                holidayReason[holidayReasonIndex]
                                                    .description
                                            }
                                        </span>
                                    )}
                                    {/* {isHoliday && `  ${holidayReason[holidayReasonIndex].description}`} */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

