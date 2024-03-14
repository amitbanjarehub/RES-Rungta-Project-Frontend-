import * as React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { API_BASE_URL } from '@/config/serverApiConfig'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box, TextField } from '@mui/material'
import { debounce } from 'lodash'
import SearchIcon from '@mui/icons-material/Search'
import { useDemoData } from '@mui/x-data-grid-generator'

export default function BookRequestStatus() {
    const columns = [
        {
            field: 's_no',
            headerName: 'S.No.',
            width: 120,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
            renderCell: (params) => (
                <div style={{ paddingLeft: '10px' }}>{params.value}</div>
            ),
        },
        {
            field: 'book_title',
            headerName: 'BOOK NAME',
            width: 250,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'book_author',
            headerName: 'AUTHOR NAME',
            width: 250,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'book_edition',
            headerName: 'EDITION',
            type: 'number',
            width: 130,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'request_status',
            headerName: 'Status',
            type: 'number',
            width: 150,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: getStatusColor(params.value),
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '10px',
                        display: 'inline-block',
                        border: 'none',
                    }}
                >
                    {getStatusText(params.value)}
                </div>
            ),
          
        },
    ]

    const { auth } = useAuth()
    const navigate = useNavigate()
    if (!auth.token) navigate('/auth/student')

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(
                    `${API_BASE_URL}/student/${auth.user?.id}/library/book_request_status`
                )
                if (!response.data) {
                    throw new Error('Response Data not found ..!')
                }

                const newData = response?.data?.data?.requestedBooks.map(
                    (item, index) => ({
                        ...item,
                        s_no: index + 1,
                    })
                )

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
                item.book_title
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                item.book_author
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                item.book_edition.toString().includes(searchText.toLowerCase())
        )
        setFilteredData(filtered)
    }, 300)

    const onSearchChange = (e) => {
        handleSearch(e.target.value)
    }

    const getStatusText = (status) => {
        switch (status) {
            case '0':
                return 'Pending'
            case '1':
                return 'Requested'
            case '2':
                return 'Approved'
            case '3':
                return 'Rejected'
            default:
                return 'NI'
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case '0':
                return '#ff9800'
            case '1':
                return '#3f51b5'
            case '2':
                return '#4caf50'
            case '3':
                return '#f44336'
            default:
                return '#9e9e9e'
        }
    }

    const { filteredData1, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6,
    })

    const customCellStyle = {
        border: 'none',
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <div
                className="mb-2 px-4 text-xl font-semibold tracking-tight text-center"
                style={{ marginTop: '15px', marginBottom: '20px' }}
            >
                <h1>Book Request Status</h1>
            </div>
            <Box sx={{ height: 300, width: '100%' }}>
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
                        style={{ marginLeft: '20px', width: '100%' }}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon style={{ marginRight: '10px' }} />
                            ),
                        }}
                        size="small"
                    />
                </div>

                <div style={{ height: 200, width: '100%', padding: '22px' }}>
                    <DataGrid
                        rows={filteredData}
                        columns={columns}
                        getRowId={getRowId}
                        pagination
                        defaultPageSize={10}
                        pageSizeOptions={[10, 25, 50, 100, 150]}
                        autoHeight
                        disableExtendRowFullWidth
                        headerClassName="custom-header"
                        loading={loading}
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
            </Box>
        </div>
    )
}
