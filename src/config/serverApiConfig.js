// export const API_BASE_URL = import.meta.env.VITE_BACKEND_SERVER
//     ? import.meta.env.VITE_BACKEND_SERVER + '/api/v1'
//     : 'http://localhost:8000/api/v1'

export const API_BASE_URL = import.meta.env.VITE_BACKEND_SERVER
    ? import.meta.env.VITE_BACKEND_SERVER + '/api/v1'
    : 'http://192.168.52.56:8000/api/v1'

export const STUDENT_IMG_BASE_URL =
    'https://myrungta.com/erp/StudentPanel/stud_photos'
