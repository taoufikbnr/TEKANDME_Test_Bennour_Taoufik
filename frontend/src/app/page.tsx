"use client"
import '@fortawesome/fontawesome-svg-core/styles.css'
import Image from "next/image";
import Header from "./components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { BASE_URL } from "./utils/utils";
import TaskList from "./components/TaskList";
import TaskStatus from "./components/TaskStatus";
import Footer from "./components/Footer";
import CalendarPicker from './components/DateRangePicker';
import AddTask from './components/AddTask';

export default function Home() {
  type userInfo = {
    username:string;
    email:string;
    id:string
  }
  const [date, setDate] = useState([new Date(), new Date()]);

    const [userInfo, setUserInfo] = useState<userInfo>({
      username:"",
      email:"",
      id:""
    });
    
  const router = useRouter();    
  
  useEffect(() => {
 
    const token = localStorage.getItem('jwt');
    
    if (!token) {
      router.push('/login');
    } else {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserInfo(response.data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchUserInfo();
    }
  }, [router]);
  return (
    <div className="flex flex-col gap-8 mx-15">
      <h1 className="text-3xl text-center mx-auto mt-3"><span className="font-bold">Hello,{userInfo?.username}, </span><span>Start planning today</span> </h1>
      <div className="flex gap-12">
          <div className="w-[40%]">
            <CalendarPicker date={date} setDate={setDate}/> 
            </div>
          <div className="flex flex-col gap-4 w-full">
            <AddTask  userId={userInfo.id}   date={date}/>
            <TaskList/>
          </div>
      </div>

      <TaskStatus/>
    </div>
  );
}
