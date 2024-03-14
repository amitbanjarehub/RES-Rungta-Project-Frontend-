import React from 'react'
import {
    Card,
    CardContent,
    FormControl,
    TextField,
    Box,
    Grid,
    styled,
} from '@mui/material'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { API_BASE_URL } from '@/config/serverApiConfig'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const ApplyGatePass = () => {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()

    if (!auth.token) navigate('/auth/student')

    const validationSchema = Yup.object().shape({
        reason: Yup.string().required('Reason is required'),
        outTime: Yup.string().required('Out Time is required'),
        inTime: Yup.string().required('In Time is required'),
        outDate: Yup.string().required('Out Date is required'),
        inDate: Yup.string().required('In Date is required'),
    })

    const CustomTextField = styled(TextField)({
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'orange',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'orange',
            borderRadius: '12px', // Adjust border radius here
        },
    })

    return (
        <React.Fragment>
            <Card
                sx={{
                    display: 'flex',
                    mb: 3.5,
                    marginTop: '10px',
                    height: '550px',
                    border: '1px solid #a9aaab',
                }}
            >
                <CardContent sx={{ marginTop: '20px' }}>
                    <Formik
                        initialValues={{
                            reason: '',
                            outTime: '',
                            inTime: '',
                            outDate: '',
                            inDate: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            try {
                                const response = await axiosPrivate.post(
                                    `${API_BASE_URL}/student/${auth.user?.id}/hostel/apply_hostel_gate_pass`,
                                    values
                                )
                                console.log('API response:=====>>', response)
                                if (response?.data?.data?.message) {
                                    alert(response?.data?.data?.message)
                                } else {
                                    alert(
                                        'An error occurred. Please try again later.'
                                    )
                                }
                            } catch (error) {
                                console.error('Error fetching data:', error)
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <Form
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={2}>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        <FormControl fullWidth>
                                            <CustomTextField
                                                id="reason"
                                                name="reason"
                                                label="Enter Reason"
                                                variant="outlined"
                                                color="warning"
                                                value={values.reason}
                                                error={
                                                    touched.reason &&
                                                    Boolean(errors.reason)
                                                }
                                                helperText={
                                                    touched.reason &&
                                                    errors.reason
                                                }
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                size="small"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        <FormControl fullWidth>
                                            <CustomTextField
                                                id="outTime"
                                                name="outTime"
                                                label="Out Time"
                                                type="time"
                                                color="warning"
                                                value={values.outTime}
                                                error={
                                                    touched.outTime &&
                                                    Boolean(errors.outTime)
                                                }
                                                helperText={
                                                    touched.outTime &&
                                                    errors.outTime
                                                }
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                size="small"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        <FormControl fullWidth>
                                            <CustomTextField
                                                id="inTime"
                                                name="inTime"
                                                label="In Time"
                                                type="time"
                                                color="warning"
                                                value={values.inTime}
                                                error={
                                                    touched.inTime &&
                                                    Boolean(errors.inTime)
                                                }
                                                helperText={
                                                    touched.inTime &&
                                                    errors.inTime
                                                }
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                size="small"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        <FormControl fullWidth>
                                            <CustomTextField
                                                id="outDate"
                                                name="outDate"
                                                label="Select Out Date"
                                                type="date"
                                                color="warning"
                                                value={values.outDate}
                                                error={
                                                    touched.outDate &&
                                                    Boolean(errors.outDate)
                                                }
                                                helperText={
                                                    touched.outDate &&
                                                    errors.outDate
                                                }
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                size="small"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ marginBottom: '20px' }}
                                    >
                                        <FormControl fullWidth>
                                            <CustomTextField
                                                id="inDate"
                                                name="inDate"
                                                label="Select In Date"
                                                type="date"
                                                color="warning"
                                                value={values.inDate}
                                                error={
                                                    touched.inDate &&
                                                    Boolean(errors.inDate)
                                                }
                                                helperText={
                                                    touched.inDate &&
                                                    errors.inDate
                                                }
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                size="small"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <LoadingButton
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            size="small"
                                            color="warning"
                                            sx={{ mt: 2 }}
                                        >
                                            Submit
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default ApplyGatePass
