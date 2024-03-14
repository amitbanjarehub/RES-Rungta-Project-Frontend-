import * as React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { API_BASE_URL } from '@/config/serverApiConfig'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { debounce } from 'lodash'
import { useDemoData } from '@mui/x-data-grid-generator'
import { SearchIcon } from 'lucide-react'

export default function BookRequestTable() {
    const columns = [
        {
            field: 's_no',
            headerName: 'S.No.',
            width: 110,            
            headerClassName: 'header-cell',
            renderCell: (params) => (
                <div style={{ paddingLeft: '10px' }}>{params.value}</div>
            ),
        },
        {
            field: 'title',
            headerName: 'BOOK NAME',
            width: 300,
            sortable: true,
            headerClassName: 'header-cell',
        },
        {
            field: 'author',
            headerName: 'AUTHOR NAME',
            width: 300,
            sortable: true,
            headerClassName: 'header-cell',
        },
        {
            field: 'edition',
            headerName: 'EDITION',
            type: 'number',
            width: 150,
            headerAlign: 'right',
            sortable: true,
            headerClassName: 'header-cell',
        },
        {
            field: 'action',
            headerName: 'ACTION',
            sortable: false,
            headerAlign: 'right', 
            align: 'right',
            
            width: 150,
            renderCell: (params) => {
                return (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleButtonClick(params.row)}
                    >
                        Request
                    </Button>
                )
            },
            headerClassName: 'header-cell',
        },
    ]

    const { auth } = useAuth()
    const userId = auth.user?.id
    // console.log('UserId:=====>>', userId)
    const navigate = useNavigate()
    if (!auth.token) navigate('/auth/student')

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(
                    `${API_BASE_URL}/student/${auth.user?.id}/library/book_list`
                )
                if (!response.data) {
                    throw new Error('Response Data not found ..!')
                }

                const newData = response?.data?.data.map((item, index) => ({
                    ...item,
                    s_no: index + 1,
                }))

                setData(newData || [])
                setFilteredData(newData || [])
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const getRowId = (row) => row.s_no

    const handleSearch = debounce((searchText) => {
        const filtered = data.filter(
            (item) =>
                item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                item.author.toLowerCase().includes(searchText.toLowerCase()) ||
                item.edition.toString().includes(searchText.toLowerCase())
        )
        setFilteredData(filtered)
    }, 300)

    const onSearchChange = (e) => {
        handleSearch(e.target.value)
    }

    const handleButtonClick = async (rowData) => {
        const requestData = {
            ...rowData,
            userId: userId, // Add userId to the request data
        }

        console.log('requestData:=====>>', requestData)

        try {
            const response = await axiosPrivate.post(
                `${API_BASE_URL}/student/${auth.user?.id}/library/book_request`,
                requestData
            )
            console.log(
                'Book Requested Response from API:--------->>>>',
                response
            )
            if (response?.data?.data?.message) {
                alert(response?.data?.data?.message)
            } else {
                alert('An error occurred. Please try again later.')
            }
        } catch (error) {
            console.error('Error while calling API:', error)
        }
    }

    const { data1, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6,
    })

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div
            // mb-2 px-4   tracking-tight
                className="mb-2 px-4 text-xl font-semibold tracking-tight text-center"
                style={{ marginTop: '15px', marginBottom: '20px' }}
            >
                <h1>Book Request </h1>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: '20px',
                }}
            >
                <TextField
                    label="Search"
                    variant="outlined"
                    onChange={onSearchChange}
                    style={{ marginLeft: "20px" ,width: "100%" }}
                    InputProps={{
                        startAdornment: (
                            <SearchIcon style={{ marginRight: '10px' }} />
                        ),
                    }}
                    size="small"
                />
            </div>
            <div style={{ height: 500, width: '100%', padding: '22px' }}>
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    getRowId={getRowId}
                    pagination
                    defaultPageSize={10} // Default page size
                    pageSizeOptions={[10, 25, 50, 100]} // Page size options
                    // checkboxSelection
                    // autoHeight
                    disableExtendRowFullWidth
                    headerClassName="custom-header"
                    loading={loading}
                    // slots={{ toolbar: GridToolbar }}
                    sx={{
                        boxShadow: 2,
                        border: 1,
                        borderColor: '#a9aaab',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .applied-on-header': {
                            marginRight: '50px',
                        },
                    }}
                />
            </div>
        </div>
    )
}
