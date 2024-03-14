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
import { Input } from '../../../components/ui/input' 
import { Label } from '../../../components/ui/label'
import { useNavigate } from 'react-router-dom'

import { studentCareerOptions } from '@/contants/studentProfile'
import { useAuth } from '@/hooks/useAuth'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { getInitials } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { Box } from '@mui/material'

export default function studentDeatils() {
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
              
            </div>
        )
    )
}



