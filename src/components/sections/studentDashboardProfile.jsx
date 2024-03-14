import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { API_BASE_URL, STUDENT_IMG_BASE_URL } from '@/config/serverApiConfig'
import makeAnimated from 'react-select/animated'
import {
    categoryEnum,
    genderEnum,
    handicappedEnum,
    studentProfileValidator,
} from '@/lib/validator/studentProfileValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Input } from '../ui/input' 
import { Label } from '../ui/label'
import { useNavigate } from 'react-router-dom'

import { studentCareerOptions } from '@/contants/studentProfile'
import { useAuth } from '@/hooks/useAuth'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { getInitials } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { Box } from '@mui/material'

export default function StudentDashboardProfile() {
    const { auth } = useAuth()
    const navigate = useNavigate()
    if (!auth.token) navigate('/auth/student')

    const axiosPrivate = useAxiosPrivate()
    const studentProfileForm = useForm({
        resolver: zodResolver(studentProfileValidator),
        defaultValues: {
            fullName: '',
            email: '',
            contact: '',
            admissionDate: '',
            dob: '',
            gender: '',
            category: '',
            handicapped: false,
            fatherName: '',
            fatherContactNumber: '',
            motherName: '',
            motherContactNumber: '',
            careerChoice: '',
        },
        mode: 'onChange',
    })
    const studentQuery = useQuery({
        queryKey: ['student'],
        queryFn: () =>
            axiosPrivate.get(`${API_BASE_URL}/student/${auth.user?.id}`),
    })
    const studentDetails = studentQuery.data?.data.data
    console.log('studentDetails:=====>>', studentDetails)
    const animatedComponents = makeAnimated()
    // console.log(studentProfileForm.formState.errors)
    // console.log(studentProfileForm.getValues())

    const properties = [
        'stud_roll_no',
        'session_name',
        'stud_clg_name',
        'course',
        'branch_sub_name',
        'sem_year_name',
    ]
    const studentInfo =
        studentDetails &&
        Object.entries(studentDetails)
            .filter(([key, value]) => {
                return properties.includes(key)
            })
            .sort((a, b) => {
                return properties.indexOf(a[0]) - properties.indexOf(b[0])
            })

    const getStudentInfoLabel = React.useCallback((key) => {
        switch (key) {
            case 'stud_roll_no':
                return 'Roll No'
            case 'session_name':
                return 'Year'
            case 'stud_clg_name':
                return 'College'
            case 'course':
                return 'Course'
            case 'branch_sub_name':
                return 'Branch'
            case 'sem_year_name':
                return 'Semester/Year/class'
            case 'stud_mobile':
                return 'Mobile No'
            default:
                return key
        }
    }, [])

    useEffect(() => {
        if (studentDetails) {
            const fields = {
                fullName: 'stud_name',
                email: 'stud_email_id',
                contact: 'stud_mobile',
                admissionDate: 'admission_date',
                dob: 'stud_dob',
                gender: 'stud_gender',
                category: 'stud_category',
                handicapped: 'handicapped_status',
                fatherName: 'stud_fathername',
                fatherContactNumber: 'stud_father_mobno',
                motherName: 'stud_mothername',
                motherContactNumber: 'stud_mother_mobno',
                aadharCardNumber: 'stud_adhar_no',
                panCardNumber: 'stud_pancard_no',
                careerChoice: 'career_choice',
            }

            for (const key in fields) {
                studentProfileForm.setValue(key, studentDetails[fields[key]])
            }
        }
    }, [studentDetails])

    const selectedCareerChoices =
        studentProfileForm.watch('careerChoice') &&
        studentProfileForm
            .watch('careerChoice')
            .split(',')
            .map((option) => ({
                label: option,
                value: option,
            }))

    const [updateMessage, setUpdateMessage] = useState('')
    const [isUpdating, setIsUpdating] = useState(false)
    // const [statusCode, setStatusCode] = useState(false)

    const updateStudentProfile = async (data) => {
        setIsUpdating(true)
        console.log('data:====>>', data)
        try {
            const response = await axiosPrivate.put(
                `${API_BASE_URL}/student/${auth.user?.id}/update_data`,
                data
            )
            // console.log('response:====>>', response.data.statusCode)
            // setStatusCode(response.data.statusCode)
            if (response.data.statusCode === 200) {
                setUpdateMessage(response.data.data.message)
                toast.success('Profile updated successfully')
            }
        } catch (error) {
            console.error('Update failed:', error)
        } finally {
            setIsUpdating(false)
        }
    }

    const showAlert = () => {
        window.alert(updateMessage)
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const isLargeScreen = windowWidth >= 1024

    return (
        studentDetails && (
            <div className="m-2 rounded-2xl border p-6 flex flex-col space-y-4 overflow-scroll">
                <div
                    className={`flex ${
                        isLargeScreen ? 'md:flex' : 'flex-col'
                    } w-full rounded-2xl gap-3`}
                >
                    <img
                        src={
                            studentDetails?.stud_profile_pic
                                ? `${STUDENT_IMG_BASE_URL}/${studentDetails?.stud_profile_pic}`
                                : `https://avatar.vercel.sh/${
                                      studentDetails?.stud_name
                                  }.svg?text=${getInitials(
                                      studentDetails?.stud_name
                                  )}`
                        }
                        className="flex object-cover object-top aspect-square md:max-w-40 max-w-20 w-full bg-primary rounded-3xl"
                    />
                    <span className="my-auto">
                        <h1 className="text-4xl font-bold capitalize">
                            {studentDetails?.stud_name}
                        </h1>
                        <div className="flex gap-3 mt-5 flex-wrap">
                            {studentInfo.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-primary/20 rounded-full px-2 whitespace-nowrap"
                                >
                                    <span className="text-xs font-bold">
                                        {getStudentInfoLabel(item[0])} :{' '}
                                    </span>
                                    <span className="text-xs">{item[1]}</span>
                                </div>
                            ))}
                        </div>
                    </span>
                </div>
                <Box sx={{border: '1px solid #a9aaab', width: "100%", height: "100%"}}>
                    <div className="space-y-4" style={{marginLeft: "20px",marginRight: "20px",marginBottom: "20px"}}>
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Personal Details
                        </h3>
                        <form
                            onSubmit={studentProfileForm.handleSubmit((data) =>
                                updateStudentProfile(data)
                            )}
                        >
                            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .fullName.description
                                        }
                                    </Label>

                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        {...studentProfileForm.register(
                                            'fullName'
                                        )}
                                    />
                                    {studentProfileForm.formState.errors
                                        .fullName && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.fullName.message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape.email
                                                .description
                                        }
                                    </Label>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        {...studentProfileForm.register(
                                            'email'
                                        )}
                                    />
                                    {studentProfileForm.formState.errors
                                        .email && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.email.message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .contact.description
                                        }
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder="contact"
                                        {...studentProfileForm.register(
                                            'contact'
                                        )}
                                        className="bg-secondary"
                                        disabled
                                    />
                                    {studentProfileForm.formState.errors
                                        .contact && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.fatherContactNumber
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Label>Admission date</Label>
                                    <Input
                                        type="date"
                                        placeholder="admission date"
                                        {...studentProfileForm.register(
                                            'admissionDate'
                                        )}
                                        className="bg-secondary"
                                        disabled
                                    />
                                    {studentProfileForm.formState.errors
                                        .admissionDate && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.admissionDate
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape.dob
                                                .description
                                        }
                                    </Label>
                                    <Input
                                        type="date"
                                        placeholder="admission date"
                                        {...studentProfileForm.register('dob')}
                                        className="bg-secondary"
                                    />
                                    {studentProfileForm.formState.errors
                                        .dob && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.dob.message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape.gender
                                                .description
                                        }
                                    </Label>
                                    <Select
                                        {...studentProfileForm.register(
                                            'gender'
                                        )}
                                        value={studentProfileForm.watch(
                                            'gender'
                                        )}
                                        onValueChange={(value) => {
                                            studentProfileForm.setValue(
                                                'gender',
                                                value,
                                                { shouldDirty: true }
                                            )
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(genderEnum).map(
                                                (gender, index) => (
                                                    <SelectItem
                                                        value={gender[1]}
                                                        key={gender[1]}
                                                    >
                                                        {gender[0]}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {studentProfileForm.formState.errors
                                        .gender && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.gender.message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .category.description
                                        }
                                    </Label>
                                    <Select
                                        {...studentProfileForm.register(
                                            'category'
                                        )}
                                        value={studentProfileForm.watch(
                                            'category'
                                        )}
                                        onValueChange={(value) => {
                                            const newVal = Object.entries(
                                                categoryEnum
                                            ).find((category) => {
                                                return category[1] === value
                                            })

                                            studentProfileForm.setValue(
                                                'category',
                                                newVal[1],
                                                { shouldDirty: true }
                                            )
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(categoryEnum).map(
                                                (category, index) => (
                                                    <SelectItem
                                                        value={category[1]}
                                                        key={category[1]}
                                                    >
                                                        {category[0]}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {studentProfileForm.formState.errors
                                        .category && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.category.message
                                            }
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .handicapped.description
                                        }
                                    </Label>

                                    <Select
                                        {...studentProfileForm.register(
                                            'handicapped'
                                        )}
                                        value={studentProfileForm.watch(
                                            'handicapped'
                                        )}
                                        onValueChange={(value) => {
                                            const newVal = Object.entries(
                                                handicappedEnum
                                            ).find((category) => {
                                                return category[1] === value
                                            })

                                            studentProfileForm.setValue(
                                                'handicapped',
                                                newVal[1],
                                                { shouldDirty: true }
                                            )
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(
                                                handicappedEnum
                                            ).map((handicap, index) => (
                                                <SelectItem
                                                    value={handicap[1]}
                                                    key={handicap[1]}
                                                >
                                                    {handicap[0]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {studentProfileForm.formState.errors
                                        .handicapped && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.handicapped.message
                                            }
                                        </span>
                                    )}
                                </div>
                                {/* father name */}
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .fatherName.description
                                        }
                                    </Label>

                                    <Input
                                        type="text"
                                        placeholder="Father Name"
                                        {...studentProfileForm.register(
                                            'fatherName'
                                        )}
                                    />
                                    {studentProfileForm.formState.errors
                                        .fatherName && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.fatherName.message
                                            }
                                        </span>
                                    )}
                                </div>
                                {/* father contact number */}
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .fatherContactNumber.description
                                        }
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder="enter contact number"
                                        {...studentProfileForm.register(
                                            'fatherContactNumber'
                                        )}
                                        className="bg-secondary"
                                        disabled
                                    />
                                    {studentProfileForm.formState.errors
                                        .fatherContactNumber && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.fatherContactNumber
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                                {/* mohter name */}
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .motherName.description
                                        }
                                    </Label>

                                    <Input
                                        type="text"
                                        placeholder="Father Name"
                                        {...studentProfileForm.register(
                                            'motherName'
                                        )}
                                    />
                                    {studentProfileForm.formState.errors
                                        .motherName && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.motherName.message
                                            }
                                        </span>
                                    )}
                                </div>
                                {/* mother contact number */}
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .motherContactNumber.description
                                        }
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder="enter contact number"
                                        {...studentProfileForm.register(
                                            'motherContactNumber'
                                        )}
                                        className="bg-secondary"
                                        disabled
                                    />
                                    {studentProfileForm.formState.errors
                                        .motherContactNumber && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.motherContactNumber
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                                {/* addhaar number */}
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .aadharCardNumber.description
                                        }
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder="enter aadhar number"
                                        {...studentProfileForm.register(
                                            'aadharCardNumber'
                                        )}
                                        className="bg-secondary"
                                    />
                                    {studentProfileForm.formState.errors
                                        .aadharCardNumber && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.aadharCardNumber
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                                {/* pan card  */}
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .panCardNumber.description
                                        }
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="enter pan number"
                                        {...studentProfileForm.register(
                                            'panCardNumber'
                                        )}
                                        className="bg-secondary"
                                    />
                                    {studentProfileForm.formState.errors
                                        .panCardNumber && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.panCardNumber
                                                    .message
                                            }
                                        </span>
                                    )}
                                </div>
                                {/* career choice  */}
                                <div>
                                    <Label>
                                        {
                                            studentProfileValidator.shape
                                                .careerChoice.description
                                        }
                                    </Label>
                                    <ReactSelect
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={studentCareerOptions}
                                        value={selectedCareerChoices}
                                        onChange={(selected) => {
                                            studentProfileForm.setValue(
                                                'careerChoice',
                                                selected
                                                    .map(
                                                        (option) => option.value
                                                    )
                                                    .join(','),
                                                { shouldDirty: true }
                                            )
                                        }}
                                    />
                                    {studentProfileForm.formState.errors
                                        .careerChoice && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                studentProfileForm.formState
                                                    .errors.careerChoice.message
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                            {isUpdating ? (
                                <Button
                                    className="w-full mt-2"
                                    type="submit"
                                    disabled
                                >
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full mt-2"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Updating...' : 'Update'}
                                </Button>
                            )}
                        </form>
                    </div>
                </Box>
            </div>
        )
    )
}
