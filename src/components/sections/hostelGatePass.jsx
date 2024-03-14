import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ApplyGatePass from '@/pages/HostelGatePass/ApplyGatePass'
import AppliedGatePass from '@/pages/HostelGatePass/AppliedGatePass'
import ApprovedGatePass from '@/pages/HostelGatePass/ApprovedGatePass'
import RejectedGatePass from '@/pages/HostelGatePass/RejectedGatePass'

export default function HostelGatePass() {
    const [value, setValue] = React.useState('one')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const renderComponent = () => {
        switch (value) {
            case 'one':
                return <ApplyGatePass />
            case 'two':
                return <AppliedGatePass />
            case 'three':
                return <ApprovedGatePass />
            case 'four':
                return <RejectedGatePass />
          
        }
    }

    return (
        <Box sx={{ width: '100%', marginLeft: '10px', marginRight: '10px' }}>
            <div
                className="mb-2 px-4 text-xl font-semibold tracking-tight text-center"
                style={{ marginTop: '15px', marginBottom: '20px' }}
            >
                <h1>Hostel Gate Pass</h1>
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                TabIndicatorProps={{
                    style: {
                      backgroundColor: "orange"
                    }
                  }}
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                sx={{ marginBottom: '30px', backgroundColor: 'white' }}
                variant='fullWidth'
               
            >
                
                    <Tab value="one" label="Apply Gate Pass" />
                    <Tab value="two" label="Applied Gate Pass" />
                    <Tab value="three" label="Approved Gate Pass" />
                    <Tab value="four" label="Rejected Gate Pass" />
             
            </Tabs>
            {renderComponent()}
        </Box>
    )
}


