import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/forgot-password`, {
                email
            });

            if (res.data.success) {
                navigate(`/verify-otp/${email}`)
                toast.success(res.data.message)
                setEmail("")
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-white flex items-center justify-center px-4'>
            <div className='w-full max-w-md space-y-6'>

                {/* Page Title */}
                <div className='text-center space-y-2'>
                    <h1 className='text-3xl font-bold tracking-tight text-black'>
                        Reset Your Password
                    </h1>
                    <p className='text-gray-600'>
                        Enter your email address and we'll send you instructions to reset your password
                    </p>
                </div>

                <Card className='bg-white border border-gray-200 shadow-xl rounded-2xl'>
                    <CardHeader className='space-y-2 text-center'>
                        <CardTitle className='text-2xl text-black'>
                            Forgot Password
                        </CardTitle>
                        <CardDescription className='text-gray-600'>
                            {isSubmitted
                                ? "Check your email for reset instructions"
                                : "Enter your email address to receive a password reset link"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className='space-y-4'>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {isSubmitted ? (
                            <div className='py-6 flex flex-col items-center text-center space-y-4'>
                                <div className='bg-gray-100 rounded-full p-3'>
                                    <CheckCircle className='h-6 w-6 text-black' />
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='font-medium text-lg text-black'>
                                        Check your inbox
                                    </h3>
                                    <p className='text-gray-600'>
                                        We've sent a password reset link to{" "}
                                        <span className='font-medium text-black'>
                                            {email}
                                        </span>
                                    </p>
                                    <p className='text-gray-600'>
                                        If you don't see the email, check your spam folder or{" "}
                                        <button
                                            className='text-black hover:underline font-medium'
                                            onClick={() => setIsSubmitted(false)}>
                                            try again
                                        </button>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleForgotPassword} className='space-y-4'>

                                <div className='space-y-2'>
                                    <Label className="text-black">Email</Label>
                                    <Input
                                        type='email'
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="border-gray-300 focus:ring-black focus:border-black"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-black text-white hover:bg-gray-800"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Sending reset link...
                                        </>
                                    ) : (
                                        "Send reset link"
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>

                    <CardFooter className='flex justify-center'>
                        <p className='text-gray-600 text-sm'>
                            Remember your password?{" "}
                            <Link
                                to={'/login'}
                                className='text-black hover:underline font-medium'>
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default ForgotPassword
