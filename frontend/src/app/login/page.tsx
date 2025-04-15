"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import {BASE_URL} from "../utils/utils"
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import { useUser } from "../context/AuthContext";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";

const Login = () => {
  const { loading, setLoading, setUserInfo: setContextUserInfo } = useUser();
  const [error, setError] = useState([])
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  
  useEffect(() => {
    const auth = Cookies.get("token");
    if(auth) router.push("/");
  }, [router]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/local`, {
        identifier: userInfo.email,
        password: userInfo.password,
      });

      Cookies.set("token", response.data.jwt, { expires: 7, secure: process.env.NODE_ENV === 'production' });
      
      const user = response.data.user;
      Cookies.set("userInfo", JSON.stringify({ username: user.username, email: user.email, id: user.id }), 
                 { expires: 7, secure: process.env.NODE_ENV === 'production' });
      
      setContextUserInfo({ username: user.username, email: user.email, id: user.id });
      setLoading(false);
      router.push("/");
    } catch (err: any) {
      setLoading(false);
      if(err.response?.data.error.message === "Invalid identifier or password"){
        toast.error(err.response.data.error.message);
      } else if (err.response?.data.error.details.errors) {
        err.response.data.error.details.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };
  
  return (
    <div className="flex items-center h-screen">
      <div className="flex flex-col items-center justify-center gap-2 w-[400px] mx-auto shadow-2xl shadow-dark-300 h-[500px] p-4 bg-orange-100">
        <Image width={50} height={50} className="logo" src='/logo.webp' alt="logo" />
        <h1>Sign In</h1>
        <form className="flex flex-col gap-4">
          <input className="p-2 border rounded-l" type={"email"} onChange={handleChange} name="email" placeholder="email"/>
          <input className="p-2 border rounded-l" type={"password"} onChange={handleChange} name="password" placeholder="password"/>
          <button className="py-2 px-4 bg-orange-200 hover:opacity-90 cursor-pointer" onClick={handleSubmit}>Sign In</button>
          <span>No account?<b><Link href="/register">Sign up now</Link></b> </span>
        </form>
      </div>
    </div>
  )
}

export default Login;