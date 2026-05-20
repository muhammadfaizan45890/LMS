import React, { useRef, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle, Loader2, RotateCcw, RefreshCcw } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import API from "../config/api.js";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  // Handle OTP input change and auto-focus
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API}/user/verify-otp/${email}`, { otp: finalOtp });
      setSuccessMessage(res.data.message || "OTP verified successfully!");
      toast.success(res.data.message || "OTP verified!");
      setIsVerified(true);
      setTimeout(() => navigate(`/change-password/${email}`), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      const res = await axios.post(`${API}/user/resend-otp`, { email });
      toast.success(res.data.message || "OTP resent successfully!");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white font-poppins px-4 py-10'>
      <div className='w-full max-w-md space-y-6'>

        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-bold text-black'>Verify Your Email</h1>
          <p className='text-gray-700'>
            Enter the 6-digit verification code sent to <span className='font-medium text-black'>{email}</span>
          </p>
        </div>

        <Card className='shadow-xl rounded-2xl border border-gray-200'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center text-black'>Enter OTP</CardTitle>
            <CardDescription className='text-center text-gray-700'>
              {isVerified ? "OTP verified! Redirecting..." : "Enter the 6-digit code from your email"}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <p className='text-green-600 text-center'>{successMessage}</p>
            )}

            {isVerified ? (
              <div className='flex flex-col items-center space-y-4'>
                <div className='bg-gray-100 rounded-full p-3'>
                  <CheckCircle className='h-8 w-8 text-black' />
                </div>
                <p className='text-black font-medium'>Your email has been verified!</p>
                <div className='flex items-center space-x-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span className='text-gray-500 text-sm'>Redirecting...</span>
                </div>
              </div>
            ) : (
              <>
                <div className='flex justify-between mb-4'>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      maxLength={1}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-12 h-12 text-center text-xl font-bold rounded-lg shadow focus:ring-2 focus:ring-gray-400 text-black"
                    />
                  ))}
                </div>

                <div className='flex flex-col gap-3'>
                  <Button
                    onClick={handleVerify}
                    disabled={isLoading || otp.some(d => d === "")}
                    className='bg-black w-full flex justify-center items-center gap-2 text-white hover:bg-gray-800'
                  >
                    {isLoading ? <><Loader2 className='h-4 w-4 animate-spin' /> Verifying...</> : "Verify OTP"}
                  </Button>

                  <Button
                    onClick={clearOtp}
                    variant='outline'
                    disabled={isLoading || isVerified}
                    className='w-full flex justify-center items-center gap-2 text-black border-black hover:bg-gray-100'
                  >
                    <RotateCcw className='h-4 w-4' /> Clear
                  </Button>

                  <Button
                    onClick={handleResend}
                    variant='ghost'
                    disabled={isResending}
                    className='w-full flex justify-center items-center gap-2 text-black hover:underline'
                  >
                    {isResending ? <Loader2 className='h-4 w-4 animate-spin' /> : <RefreshCcw className='h-4 w-4' />} Resend OTP
                  </Button>
                </div>
              </>
            )}
          </CardContent>

          <CardFooter className='flex justify-center'>
            <p className='text-sm text-gray-700'>
              Wrong email? <Link to='/forgot-password' className='text-black font-medium hover:underline'>Go back</Link>
            </p>
          </CardFooter>
        </Card>

        <div className='text-center text-xs text-gray-500'>
          <p>For testing, use code: <span className='font-mono font-medium'>123456</span></p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
