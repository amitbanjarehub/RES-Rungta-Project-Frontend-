import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_BACKEND_SERVER

export default axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
})
