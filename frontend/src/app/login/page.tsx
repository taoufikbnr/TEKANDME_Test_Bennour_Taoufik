"use client"
import axios from "axios";
import { useState } from "react";
import {BASE_URL} from "../utils/utils"
import { useRouter } from 'next/navigation'

const Login = () => {
    
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
      });
      const router = useRouter();
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUserInfo({
          ...userInfo,
          [name]: value,
        });
      };
      const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
          const response = await axios.post(BASE_URL+'/auth/local', {
            identifier: userInfo.email,
            password: userInfo.password,
          });
    
          localStorage.setItem('jwt', response.data.jwt);
    
        //   // Redirect to the task manager or dashboard
          router.push('/');
        } catch (err) {
          console.error('Login error:', err.response.data);
        //   setError('Login failed. Please try again.');
        }
      };
    
  return (
    <div className="flex items-center h-screen">
        <div className="top">
            <img className="logo" src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' />
        </div>
        <div className="flex items-center justify-center w-[400px] mx-auto  h-[600px] p-4 ">
           <form className="flex flex-col gap-4">
              <h1>Sign In</h1>
              <input className="p-2 border rounded-l" type={"email"} onChange={handleChange} name="email" placeholder="email"/>
              <input className="p-2 border rounded-l" type={"password"} onChange={handleChange} name="password" placeholder="password"/>
              <button onClick={handleSubmit}>Sin In</button>
              <span>Net to Netflix? <b>Sign in now.</b> </span>
           </form>
        </div>
    </div>
  )
}

export default Login