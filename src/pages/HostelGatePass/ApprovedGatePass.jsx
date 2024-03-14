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

export default function ApprovedGatePass() {
    const columns = [
        {
            field: 's_no',
            headerName: 'S.No.',
            width: 110,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
            renderCell: (params) => (
                <div style={{ paddingLeft: '10px' }}>{params.value}</div>
            ),
        },
        {
            field: 'OutTime',
            headerName: 'Out Time',
            width: 130,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'InTime',
            headerName: 'In Time',
            width: 130,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'Reason',
            headerName: 'Reason',
            type: 'number',            
            width: 220,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'AppliedON',
            headerName: 'Applied On',
            type: 'number',
            width: 200,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
          
        },
        {
            field: 'ApprovedON',
            headerName: 'Approved On',
            type: 'number',
            width: 200,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
          
        },
        {
            field: 'ApprovedBy',
            headerName: 'Approved By',
            type: 'number',
            width: 150,
            sortable: true,
            headerClassName: 'header-cell',
            cellClassName: 'super-app-theme--cell',
            renderCell: (params) => (
                <div style={{ paddingRight: '5px' }}>{params.value}</div>
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
                    `${API_BASE_URL}/student/${auth.user?.id}/hostel/approved_gate_pass`
                )
                console.log("API response:=====>>", response?.data?.data?.approvedGatePass)
                if (!response.data) {
                    throw new Error('Response Data not found ..!')
                }

                const newData = response?.data?.data?.approvedGatePass.map(
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
                item.Reason
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                item.ApprovedON
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) 
        )
        setFilteredData(filtered)
    }, 300)

    const onSearchChange = (e) => {
        handleSearch(e.target.value)
    }

   

    

    const { filteredData1, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6,
    })

  

    return (
        <div style={{ height: '100%', width: '100%' }}>
            
            <Box sx={{ height: 300, width: '100%' }}>
                {/* <TextField
                    label="Search"
                    variant="outlined"
                    onChange={onSearchChange}
                    style={{ marginBottom: '20px', width: '100%' }}
                    InputProps={{
                        startAdornment: <SearchIcon  style={{ marginRight: '20px' }}/>,
                    }}
                /> */}

                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    getRowId={getRowId}
                    pagination
                    defaultPageSize={10} // Default page size
                    pageSizeOptions={[10, 25, 50, 100, 150]} // Page size options
                    // checkboxSelection
                    autoHeight
                    disableExtendRowFullWidth
                    headerClassName="custom-header"
                    // sx={{
                    //     boxShadow: 2,
                    //     border: 2,
                    //     borderColor: '#535559',
                    // }}
                    loading={loading}
                    // slots={{ toolbar: GridToolbar }}
                    sx={{
                        boxShadow: 2,
                        border: 1,
                        borderColor: '#a9aaab',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                     
                    }}
                />
            </Box>
        </div>
    )
}


