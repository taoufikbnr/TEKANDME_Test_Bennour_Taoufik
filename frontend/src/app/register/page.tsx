"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils"
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";
import { useUser } from "../context/AuthContext";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserInfo: setContextUserInfo } = useUser();
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
    });
    
    const router = useRouter();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({...userInfo, [name]: value});
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await axios.post(`${BASE_URL}/auth/local/register`, {
                username: userInfo.username,
                email: userInfo.email,
                password: userInfo.password,
            });
            
            Cookies.set("token", response.data.jwt, { 
                expires: 7, 
                secure: process.env.NODE_ENV === 'production'
            });
            
            const user = response.data.user;
            Cookies.set("userInfo", JSON.stringify({ 
                username: user.username, 
                email: user.email, 
                id: user.id 
            }), { 
                expires: 7, 
                secure: process.env.NODE_ENV === 'production' 
            });
            
            setContextUserInfo({ 
                username: user.username, 
                email: user.email, 
                id: user.id 
            });
            
            toast.success("Registration successful!");
            router.push('/');
        } catch (err: any) {
            console.error('Registration error:', err.response?.data);
            if (err.response?.data?.error?.details?.errors) {
                err.response.data.error.details.errors.forEach((err: any) => 
                    toast.error(err.message)
                );
            } else if (err.response?.data?.error?.message) {
                toast.error(err.response.data.error.message);
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        const auth = Cookies.get("token");
        if(auth) router.push("/");
    }, [router]);
        
    return (
        <div className="flex items-center h-screen">
            <div className="flex flex-col items-center justify-center gap-2 w-[400px] mx-auto shadow-2xl shadow-dark-300 h-[500px] p-4 bg-orange-100">
                <Image width={50} height={50} className="logo" src='/logo.webp' alt="logo" />
                <h1>Sign Up</h1>
                <form className="flex flex-col gap-4">
                    <input 
                        className="p-2 border rounded-l" 
                        type="text" 
                        onChange={handleChange} 
                        name="username" 
                        placeholder="username"
                        required
                    />
                    <input 
                        className="p-2 border rounded-l" 
                        type="email" 
                        onChange={handleChange} 
                        name="email" 
                        placeholder="email"
                        required
                    />
                    <input 
                        className="p-2 border rounded-l" 
                        type="password" 
                        onChange={handleChange} 
                        name="password" 
                        placeholder="password"
                        required
                    />
                    <button 
                        className="py-2 px-4 bg-orange-200 hover:opacity-90 cursor-pointer" 
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Sign Up"}
                    </button>
                    <span>You have an account? <b><Link href="/login">Sign in now</Link></b></span>
                </form>
            </div>
        </div>
    )
}

export default Register