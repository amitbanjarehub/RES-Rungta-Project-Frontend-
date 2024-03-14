import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    return (
        <div className="block mx-auto  ">
            Home page
            <br />
            <Button onClick={() => navigate('/student/dashboard')}>
                Go to student dashboard
            </Button>
        </div>
    )
}

export default Home
