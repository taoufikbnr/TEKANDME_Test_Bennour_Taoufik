"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL, config } from '../utils/utils';
import { format } from 'date-fns';
import { useUser } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AddTask = ({userId,date}:any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
 const {setTasks} = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const taskData = {
      data:{  
        userId:userId.toString(),   
        title,
        description,
        completed,
        startDate: format(new Date(date[0].toLocaleDateString()), 'yyyy-MM-dd') ,
        endDate: format(new Date(date[1].toLocaleDateString()), 'yyyy-MM-dd')}
    };
    
    try {
      const response = await axios.post(
        `${BASE_URL}/tasks`, 
        taskData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,  
            'Content-Type': 'application/json', 
          },
        }
      );
      toast.success("Task added successfully!");
      setTitle("");
      setDescription("");
      
      setTasks((prev) => [...prev, response.data.data]);
    } catch (error) {
      error.response?.data.error.details.errors.forEach((error) => toast.error(error.message));
      
    }
  };

  
  return (
<div className="flex justify-between rounded-2xl gap-2 w-full">
  <div className='hidden md:flex w-full gap-2'>
    <input onChange={(e)=>setTitle(e.target.value)} className="flex p-1 sm:p-4' bg-blue-100" type="text" placeholder="Type Title Of Task" />
    <input onChange={(e)=>setDescription(e.target.value)} className="flex-1  p-4 bg-blue-100" type="text" placeholder="Type Description Of Task" />
  </div>
    <span className='block sm:hidden text-red-400' style={{fontFamily:"Lavishly Yours",fontSize:30}}>{new Date().toLocaleString("en-US", { weekday: "long" })}</span>
    <button onClick={handleSubmit} className="py-2 px-8 bg-[#5d9966] text-white cursor-pointer"><span className="text-2xl">+</span></button>
  </div>
  )
}

export default AddTask