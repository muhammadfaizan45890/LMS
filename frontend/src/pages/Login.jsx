import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getData } from '@/context/userContext';

const Login = () => {
    const { setUser } = getData();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(
                `http://localhost:8000/user/login`,
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data.success) {
                setUser(res.data.user);
                localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("userId", res.data.user._id);

                toast.success(res.data.message || "Logged in successfully!");
                navigate('/');
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 
                "Failed to login. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white font-poppins px-4 py-10">
            <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200">
                
                {/* Header */}
                <CardHeader className="py-6 text-center bg-white">
                    <CardTitle className="text-3xl font-semibold text-black tracking-wide">
                        Login
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                        Start organizing your thoughts and ideas today
                    </CardDescription>
                </CardHeader>

                {/* Content */}
                <CardContent className="px-6 py-8 space-y-6">
                    
                    {/* Email */}
                    <div className="flex flex-col">
                        <Label htmlFor="email" className="text-black font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@mail.com"
                            className="mt-1 border-gray-300 focus:ring-black focus:border-black rounded-lg"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col relative">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password" className="text-black font-medium">
                                Password
                            </Label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-black hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="mt-1 pr-12 border-gray-300 focus:ring-black focus:border-black rounded-lg"
                            required
                        />

                        <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            className="absolute right-2 top-1/2 mt-3 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-600" />
                            ) : (
                                <Eye className="w-5 h-5 text-gray-600" />
                            )}
                        </Button>
                    </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className="px-6 py-6 flex flex-col gap-4 bg-white">
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Logging in...
                            </>
                        ) : "Login"}
                    </Button>

                    <p className="text-center text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <span
                            className="text-black font-medium cursor-pointer hover:underline"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
