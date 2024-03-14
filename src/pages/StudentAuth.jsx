import axios from '@/api/axios'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { useAxiosPrivate } from '@/hooks/useAxiosPrivate'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { getInitials } from '@/lib/utils'

function StudentAuth(props) {
    const navigate = useNavigate()
    const { isPhone = false } = props
    const [isPhoneMode, setIsPhoneMode] = useState(isPhone)
    const [multipleStudents, setMultipleStudent] = useState([])

    const axiosPrivate = useAxiosPrivate()

    const { auth, setAuth } = useAuth()

    const loginMutaion = useMutation({
        mutationFn: (credentials) => axios.post('/student/login', credentials),
        onSuccess: (result) => {
            const accessToken = result.data.data.access_token
            setAuth({
                token: accessToken,
            })
        },
        onError: (error) => {
            if (error.response.status === 401) {
                toast.error('Invalid Credentials')
            }
            toast.error('Something went wrong!')
        },
    })

    const userGroupMuation = useMutation({
        mutationFn: () => axiosPrivate.get('/student/get_user_group'),
        onSuccess: (result) => {
            const students = result.data.data
            if (!students) return toast('Something went wrong!')

            if (students.length > 1) {
                return setMultipleStudent(students)
            }
            const student = students[0]
            setAuth({
                ...auth,
                user: student,
            })
            navigate('/student/dashboard')
        },
    })
    console.log(auth, multipleStudents)
    useEffect(() => {
        if (!auth.token) return
        userGroupMuation.mutate()
    }, [auth?.token])

    return (
        <>
            {isPhoneMode ? (
                <PhoneLoginForm onModeChange={() => setIsPhoneMode(false)} />
            ) : (
                <PasswordLoginForm
                    onSubmit={loginMutaion.mutate}
                    onModeChange={() => setIsPhoneMode(true)}
                />
            )}
            <AlertDialog open={multipleStudents.length > 1}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Choose a student to continue
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="flex gap-2 justify-evenly">
                                {multipleStudents.map((student, index) => (
                                    <Button
                                        variant="outline"
                                        key={index}
                                        className=" w-full h-auto flex flex-col items-center justify-center gap-2 p-2 rounded-3xl aspect-square"
                                        onClick={() => {
                                            setAuth({
                                                ...auth,
                                                user: student,
                                            })
                                            navigate('/student/dashboard')
                                        }}
                                    >
                                        <img
                                            src={`https://avatar.vercel.sh/${
                                                student?.stud_name
                                            }.svg?text=${getInitials(
                                                student?.stud_name
                                            )}`}
                                            alt=""
                                            className="flex object-cover object-top  aspect-square md:max-w-40 max-w-20 w-full bg-primary rounded-3xl"
                                        ></img>
                                        <h3 className="font-bold  text-center">
                                            {student.stud_name}
                                        </h3>
                                    </Button>
                                ))}
                            </div>
                            <br />
                            <Button
                                className="w-full"
                                onClick={() => setMultipleStudent([])}
                            >
                                Cancel
                            </Button>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default StudentAuth

export const PhoneLoginForm = ({ onModeChange }) => {
    return (
        <div className="flex flex-col justify-center items-center h-full md:p-4 ">
            <div className=" flex flex-col gap-1  ">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight block text-center">
                    Welcome to Sanjay Rungta Group of Institutions
                </h3>
            </div>

            <Separator className="my-4  " />
            <img
                src="https://myrungta.com/erp/SRGI_LOGO_round.png"
                className="h-20 md:hidden"
                alt=""
            />
            <div className="flex flex-col  w-4/5  rounded-3xl h-full justify-center">
                <h2 className="mt-10 scroll-m-20 pb-2  w-full text-center text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Student Login
                </h2>
                <p className="leading-7 text-center">
                    Enter your mobile number to continue
                </p>
                <br />
                <div className="w-4/5 mx-auto space-y-4">
                    <Input placeholder="xxxxxxxxxx" />
                    <div>
                        <Button
                            className="w-full"
                            onClick={() => navigate('/')}
                        >
                            Submit
                        </Button>

                        <Button
                            variant={'ghost'}
                            className="text-sm flex justify-center items-center gap-2 group cursor-pointer w-full  "
                            onClick={onModeChange}
                        >
                            Authenticate with UserID & Password{' '}
                            <div className="group-hover:translate-x-1 transition-transform">
                                <FaArrowRight />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PasswordLoginForm = ({ onSubmit, onModeChange }) => {
    const [uperInput, setUserInput] = useState({
        phone: '',
        password: '',
    })
    return (
        <div className="flex flex-col justify-center items-center h-full md:p-4 p-3 ">
            <div className=" flex flex-col gap-1  ">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight block text-center">
                    Welcome to Sanjay Rungta Group of Institutions
                </h3>
            </div>

            <Separator className="my-4  " />

            <div className="flex flex-col  md:w-4/5  rounded-3xl h-full justify-center">
                <img
                    src="https://myrungta.com/erp/SRGI_LOGO_round.png"
                    className=" lg:hidden h-24  mx-auto"
                    alt=""
                />
                <h2 className="mt-10 scroll-m-20  w-full text-center text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Student Login
                </h2>
                <p className="leading-1 text-center">
                    Enter phone number and password to continue
                </p>
                <br />
                <div className="md:w-4/5 space-y-4 w-full mx-auto">
                    <div>
                        <Label htmlFor="phone" className="text-xs">
                            Phone Number
                        </Label>
                        <Input
                            id="phone"
                            placeholder="Enter your phone"
                            value={uperInput.phone}
                            onChange={(e) =>
                                setUserInput({
                                    ...uperInput,
                                    phone: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-xs">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="Enter your password"
                            value={uperInput.password}
                            onChange={(e) =>
                                setUserInput({
                                    ...uperInput,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Button
                            className="w-full"
                            onClick={() => {
                                if (!uperInput.phone) {
                                    toast.error('Please fill all the fields')
                                    return
                                }
                                onSubmit(uperInput)
                            }}
                        >
                            Submit
                        </Button>

                        <Button
                            variant={'ghost'}
                            className="text-sm flex justify-center items-center gap-2 group cursor-pointer w-full  "
                            onClick={onModeChange}
                        >
                            Authenticate with OTP{' '}
                            <div className="group-hover:translate-x-1 transition-transform">
                                <FaArrowRight />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
