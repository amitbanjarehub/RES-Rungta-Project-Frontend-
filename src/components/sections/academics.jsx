import React, { useState, useEffect } from 'react';
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@/config/serverApiConfig';
import StudentUnitNotes from '@/pages/academics/student_unit_notes';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid component from Material-UI

export default function Academics() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [academicSubjects, setAcademicSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(
                    `${API_BASE_URL}/student/${auth.user?.id}/academic/academic_subject_information`
                );
                const studentDetails = response?.data?.data?.subjectInformation;
                setAcademicSubjects(studentDetails);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [axiosPrivate, auth.user?.id]);

    const handleViewButtonClick = (academicSubject) => {
        navigate(`/student/dashboard/student_unit_notes`, {
            state: { academicSubject },
        });
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight text-center" style={{ marginTop: '15px', marginBottom: '20px' }}>
                Academics
            </h2>
            {isLoading && <p>Loading...</p>}
            {error && (
                <p>Error fetching data. Please try again later.</p>
            )}
            <div style={{ height: 600, width: '100%'}} className="data-grid-container"> 
                <DataGrid
                    rows={academicSubjects.map((subject, index) => ({ ...subject, s_no: index + 1 }))}
                    columns={[
                        { field: 's_no', headerName: 'S.No', width: 120 },
                        { field: 'subject_name', headerName: 'Subject Name', width: 280 },
                        { field: 'emp_name', headerName: 'Teacher Name', width: 280 },
                        { field: 'subject_type', headerName: 'Subject Type', width: 200 },
                        {
                            field: 'actions',
                            headerName: 'Action',
                            width: 150,
                            renderCell: (params) => (
                                <button
                                    className="bg-primary/20 hover:bg-primary/30 text-sm py-0.5 px-2 rounded"
                                    onClick={() =>
                                        handleViewButtonClick(params.row)
                                    }
                                >
                                    View
                                </button>
                            ),
                        },
                    ]}
                    pageSize={rowsPerPage}
                    page={currentPage - 1}
                    onPageChange={(page) => setCurrentPage(page + 1)}
                    rowCount={academicSubjects.length}
                    autoHeight
                    autoWidth
                />
            </div>
        </div>
    );
}
