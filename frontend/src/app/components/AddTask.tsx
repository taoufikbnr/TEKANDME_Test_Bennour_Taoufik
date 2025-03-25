"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL, config } from '../utils/utils';
import { format } from 'date-fns';

const AddTask = ({userId,date}:any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem('token'); 
    }
  }, []); 

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
            Authorization: `Bearer ${token}`,  // Ensure that the Bearer token is included
            'Content-Type': 'application/json', // Set content type as JSON
          },
        }
      );
      alert("Task added successfully!");
      setTitle("");
      setDescription("");
      setCompleted(false);
 
    } catch (error) {
      console.error("Error adding task", error);
      alert("Failed to add task");
    }
  };

  
  return (
<div className="flex gap-2 rounded-2xl w-full">
    <input onChange={(e)=>setTitle(e.target.value)} className="p-4' bg-blue-100" type="text" placeholder="Type Title Of Task" />
    <input onChange={(e)=>setDescription(e.target.value)} className="p-4 bg-blue-100" type="text" placeholder="Type Title Of Task" />
    <button onClick={handleSubmit} className="py-2 px-8 bg-[#5d9966] text-white"><span className="text-2xl">+</span></button>
  </div>
  )
}

export default AddTask