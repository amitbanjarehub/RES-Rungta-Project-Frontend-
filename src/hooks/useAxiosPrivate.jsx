import { API_BASE_URL } from '@/config/serverApiConfig'
import { useAuth } from './useAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const axiosPrivate = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const useAxiosPrivate = () => {
    const { auth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.token) return navigate('/auth/student')
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth.token}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.data.statusCode == 401) {
                    console.log('error', error)
                    navigate('/auth/student')
                }
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [auth.token])

    return axiosPrivate
}
