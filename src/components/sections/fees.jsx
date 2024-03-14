import React from 'react'
import { Grid } from '@mui/material'
import FeesDetails from '@/pages/FeesSection/Rps_Fees/feesDetails'
import FeesSummary from '@/pages/FeesSection/Rps_Fees/feesSummary'
import FoodCredit from '@/pages/FeesSection/Rps_Fees/foodCredit'
import StudentDetails from '@/pages/FeesSection/Rps_Fees/studentDeatils'
import StudentDashboardProfile from './studentDashboardProfile'

const Fees = () => {
    return (
        <Grid container spacing={4}>

            <Grid item xs={12} sm={12}>
                <StudentDetails />
            </Grid>

            <Grid item xs={12}>
                <FeesSummary />
            </Grid>

            <Grid item xs={12}>
                <FeesDetails />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FoodCredit />
            </Grid>

        </Grid>

    )
}

export default Fees

// Note:
// Adjust the xs, sm, md, lg, and xl values as per your layout requirements. This setup will make your components responsive, adjusting their widths according to the screen size.
