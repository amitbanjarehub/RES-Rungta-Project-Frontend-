

// import { API_BASE_URL } from '@/config/serverApiConfig'
// import { useAuth } from '@/hooks/useAuth'
// import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
// import { Pagination } from '@mui/material'
// import { useQuery } from '@tanstack/react-query'
// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { DataGrid } from '@mui/x-data-grid';

// const Student_unit_notes = () => {
//     const location = useLocation()
//     const { academicSubject } = location.state
//     const { auth } = useAuth()
//     const navigate = useNavigate()
//     if (!auth.token) navigate('/auth/student')

//     let emp_id = academicSubject.emp_id
//     let subject_id = academicSubject.subject_id

//     const axiosPrivate = useAxiosPrivate()

//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const [subjectUnits, setSubjectUnits] = useState([])
//     const [dataCountToShow, setDataCountToShow] = useState(10)

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosPrivate.get(
//                     `${API_BASE_URL}/student/${auth.user?.id}/academic/subject_unit_information`,
//                     {
//                         params: {
//                             emp_id: emp_id,
//                             subject_id: subject_id,
//                         },
//                     }
//                 )
//                 setSubjectUnits(response?.data?.data?.subjectUnitInformation)
//             } catch (error) {
//                 setError(error)
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchData()
//     }, [emp_id, subject_id])

//     const handleDownload = (file) => {
//         window.open(file, '_blank')
//     }

//     const columns = [
//         { field: 'id', headerName: 'S.No', width: 90 },
//         { field: 'unit_name', headerName: 'Unit Name', width: 150 },
//         { field: 'topic_name', headerName: 'Topic Name', width: 150 },
//         { field: 'planning_date', headerName: 'Teaching Plan Date', width: 180 },
//         { field: 'execution_date', headerName: 'Execution Date', width: 180 },
//         { field: 'no_of_que', headerName: 'No. Of Assignment Questions', width: 210 },
//         { field: 'remark', headerName: 'Assignment Questions', width: 180 },
//         { field: 'provide_notes_on', headerName: 'Provided Notes Date', width: 180 },
//         {
//             field: 'provided_notes_file',
//             headerName: 'Notes',
//             width: 150,
//             renderCell: (params) => {
//                 const file = 'https://myrungta.com/erp/adminpanel/notes/' + params.row.provided_notes_file;
//                 return (
//                     <button
//                         style={{
//                             backgroundColor: '#f0ad5d',
//                             color: 'white',
//                             borderRadius: '20px',
//                             padding: '10px 20px',
//                             border: 'none',
//                             cursor: 'pointer',
//                         }}
//                         onClick={() => handleDownload(file)}
//                     >
//                         Download
//                     </button>
//                 )
//             }
//         },
//     ];

//     return (
//         <div style={{ height: 400, width: '100%' }}>
//         <h2 className="scroll-m-20 pb-4 text-xl md:text-3xl font-semibold tracking-tight first:mt-0 text-center">
//             Subject unit information
//         </h2>
//         {loading ? (
//             <div>Loading...</div>
//         ) : error ? (
//             <div>Error: {error.message}</div>
//         ) : (
//             <DataGrid
//                 rows={subjectUnits}
//                 columns={columns}
//                 pageSize={10}
//                 rowsPerPageOptions={[10]}
//                 checkboxSelection={false}
//             />
//         )}
//     </div>
//     )
// }

// export default Student_unit_notes

import { API_BASE_URL } from '@/config/serverApiConfig'
import { useAuth } from '@/hooks/useAuth'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { Pagination } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';

const Student_unit_notes = () => {
    const location = useLocation()
    const { academicSubject } = location.state
    const { auth } = useAuth()
    const navigate = useNavigate()
    if (!auth.token) navigate('/auth/student')

    let emp_id = academicSubject.emp_id
    let subject_id = academicSubject.subject_id

    const axiosPrivate = useAxiosPrivate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [subjectUnits, setSubjectUnits] = useState([])
    const [dataCountToShow, setDataCountToShow] = useState(10)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(
                    `${API_BASE_URL}/student/${auth.user?.id}/academic/subject_unit_information`,
                    {
                        params: {
                            emp_id: emp_id,
                            subject_id: subject_id,
                        },
                    }
                )
                setSubjectUnits(response?.data?.data?.subjectUnitInformation)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [emp_id, subject_id])

    const handleDownload = (file) => {
        window.open(file, '_blank')
    }

    const generateSerialNumbers = () => {
        return subjectUnits.map((_, index) => ({ id: index + 1 }));
    };

    const columns = [
        { field: 'id', headerName: 'S.No', width: 90 },
        { field: 'unit_name', headerName: 'Unit Name', width: 150 },
        { field: 'topic_name', headerName: 'Topic Name', width: 150 },
        { field: 'planning_date', headerName: 'Teaching Plan Date', width: 180 },
        { field: 'execution_date', headerName: 'Execution Date', width: 180 },
        { field: 'no_of_que', headerName: 'No. Of Assignment Questions', width: 210 },
        { field: 'remark', headerName: 'Assignment Questions', width: 180 },
        { field: 'provide_notes_on', headerName: 'Provided Notes Date', width: 180 },
        {
            field: 'provided_notes_file',
            headerName: 'Notes',
            width: 150,
            renderCell: (params) => {
                const file = 'https://myrungta.com/erp/adminpanel/notes/' + params.row.provided_notes_file;
                return (
                    <button
                        style={{
                            backgroundColor: '#f0ad5d',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleDownload(file)}
                    >
                        Download
                    </button>
                )
            }
        },
    ];

    return (
        <div style={{ height: 450, width: '100%' }}>
        <h2 className="scroll-m-20 pb-4 text-xl md:text-3xl font-semibold tracking-tight first:mt-0 text-center">
            Subject unit information
        </h2>
        {loading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>Error: {error.message}</div>
        ) : (
            <DataGrid
                rows={subjectUnits.map((subject, index) => ({ ...subject, id: index + 1 }))}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection={false}
                autoHeight
            />
        )}
    </div>
    )
}

export default Student_unit_notes
