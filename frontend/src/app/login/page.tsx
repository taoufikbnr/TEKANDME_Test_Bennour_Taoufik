"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import {BASE_URL} from "../utils/utils"
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";
import { useUser } from "../context/AuthContext";
import Link from "next/link";
import { toast } from "react-toastify";

const Login = () => {
  const {loading,setloading, setUserInfo: setContextUserInfo } = useUser();
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
      const auth = localStorage.getItem("token")
      if(auth) router.push("/")
      }, [])
      
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setloading(true)
        try {
          const response = await axios.post(`${BASE_URL}/auth/local`, {
            identifier: userInfo.email,
            password: userInfo.password,
          });
    
          localStorage.setItem("token",response.data.jwt);
          const user = response.data.user;
          setContextUserInfo({ username: user.username, email: user.email, id: user.id });
          setloading(false)
          router.push("/");
        } catch (err: any) {
          if(err.response.data.error.message==="Invalid identifier or password"){
            toast.error(err.response.data.error.message)
          }else{
            err.response?.data.error.details.errors.forEach((err) => toast.error(err.message));

          }
      
          }
      };
  
  return (
    <div className="flex items-center h-screen">
        <div className="top">
            <img className="logo" src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' />
        </div>
        <div className="flex items-center justify-center w-[400px] mx-auto  h-[500px] p-4  bg-orange-100">
           <form className="flex flex-col gap-4">
              <h1>Sign In</h1>
              <input className="p-2 border rounded-l" type={"email"} onChange={handleChange} name="email" placeholder="email"/>
              <input className="p-2 border rounded-l" type={"password"} onChange={handleChange} name="password" placeholder="password"/>
              <button className="py-2 px-4 bg-orange-200 cursor-pointer"  onClick={handleSubmit}>Sign In</button>
              <span>No account?<b><Link href="/register">Sign up now</Link></b> </span>
           </form>
        </div>
    </div>
  )
}

export default Login