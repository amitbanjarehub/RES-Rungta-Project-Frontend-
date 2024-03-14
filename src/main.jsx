import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/authContext'
import { Toaster } from '@/components/ui/sonner'
import { BrowserRouter } from 'react-router-dom'



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppRoutes />
                    <Toaster />
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
)
