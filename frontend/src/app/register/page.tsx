"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import {BASE_URL} from "../utils/utils"
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";

const Register = () => {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
      });
      const router = useRouter();
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUserInfo({...userInfo,[name]: value});
      };
      const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
          const response = await axios.post(BASE_URL+'/auth/local/register', {
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
          });
              localStorage.setItem('token', response.data.jwt);
          router.push('/');
        } catch (err:any) {
          console.error('Login error:', err.response.data);
          err.response?.data.error.details.errors.forEach((err:any) => toast.error(err.message));
          
        }
      };
      useEffect(() => {
        const auth = localStorage.getItem("token")
        if(auth) router.push("/")
        }, [])
        
  return (
    <div className="flex items-center h-screen">
        <div className="flex flex-col items-center justify-center  gap-2 w-[400px] mx-auto shadow-2xl shadow-dark-300 h-[500px] p-4 bg-orange-100">
        <Image width={50} height={50} className="logo" src='/logo.webp' alt="logo" />
               <h1>Sign Up</h1>
           <form className="flex flex-col gap-4">
              <input className="p-2 border rounded-l" type={"name"} onChange={handleChange} name="username" placeholder="username"/>
              <input className="p-2 border rounded-l" type={"email"} onChange={handleChange} name="email" placeholder="email"/>
              <input className="p-2 border rounded-l" type={"password"} onChange={handleChange} name="password" placeholder="password"/>
              <button className="py-2 px-4 bg-orange-200 hover:opacity-90 cursor-pointer" onClick={handleSubmit}>Sign Up</button>
              <span>You have an account?<b><Link href="/login">Sign in now</Link></b> </span>
           </form>
        </div>
    </div>
  )
}

export default Register