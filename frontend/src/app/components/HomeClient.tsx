"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useUser } from '../context/AuthContext';
import TaskList from "./TaskList";
import TaskStatus from "./TaskStatus";
import CalendarPicker from './DateRangePicker';
import AddTask from './AddTask';
import '@fortawesome/fontawesome-svg-core/styles.css';

interface HomeClientProps {
  userData: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
  initialTasks: task[];
}

export default function HomeClient({ userData, token, initialTasks }: HomeClientProps) {
  const [date, setDate] = useState([new Date(), new Date()]); 
  const router = useRouter();    
  const { loading, setTasks } = useUser();

  useEffect(() => {
    if (initialTasks && initialTasks.length > 0) {
      setTasks(initialTasks);
    }
  }, [initialTasks, setTasks]);

  if (loading) return (<div>Loading...</div>);
  
  return (
    <div className="flex flex-col gap-4 mx-2 md:mx-15">
      <h1 className="text-3xl text-center mx-auto mt-3">
        <span className="font-bold">Hello, {userData?.username}, </span>
        <span>Start planning today</span>
      </h1>
      <div className="flex max-h-[400px] overflow-auto">
        <div className="w-[40%] hidden md:block">
          <CalendarPicker date={date} setDate={setDate}/> 
        </div>
        <div className="flex flex-col gap-4 w-full">
          <AddTask userId={userData?.id} date={date}/>
          <TaskList userInfo={userData} initialLoaded={initialTasks.length > 0} />
        </div>
      </div>
      <TaskStatus/>
    </div>
  );
} 