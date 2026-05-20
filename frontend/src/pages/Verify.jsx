import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from "../config/api.js";

const Verify = () => {
    const { token } = useParams()
    const [status, setStatus] = useState("Verifying...")
    const navigate = useNavigate()

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post(`${API}/user/verify`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    setStatus("✅ Email Verified Successfully")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    setStatus("❌ Invalid or Expired Token")
                }
            } catch (error) {
                console.log(error);
                setStatus("❌ Verification Failed. Please try again")
            }
        };

        verifyEmail()
    }, [token, navigate])

    return (
        <div className='min-h-screen flex items-center justify-center bg-white px-4'>
            <div className='bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center border border-gray-200'>
                <h2 className='text-xl font-semibold text-black'>{status}</h2>
            </div>
        </div>
    )
}

export default Verify
