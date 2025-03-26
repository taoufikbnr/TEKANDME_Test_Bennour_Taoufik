"use client"

import { useEffect, useState } from "react";
import { ArrowDropDown, ArrowDropUp, CheckCircle, CheckCircleOutline, Delete, DeleteOutline, EditOutlined, Search, SearchOffOutlined, SearchOutlined } from '@mui/icons-material';
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { useUser } from "../context/AuthContext";

const TaskList = ({userInfo}) => {
const [search, setSearch] = useState("")

  const {token,tasks,setTasks} = useUser()
    type Task = {
        id: number;
        title: string;
        description: string;
        startDate: string;
        dueDate: string;
        completed: boolean;
      };
            console.log(tasks);
            

    useEffect(() => {
      const storedToken = localStorage.getItem("token");

          const fetchTasks = async () => {
            try {
              const response = await axios.get(
                `${BASE_URL}/tasks?&[filters][userId][$eq]=${userInfo.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${storedToken}`,
                  },
                }
              );
              setTasks(response.data.data);
              
            } catch (err) {
              console.error("Error fetching tasks:", err);
            }
          };
  
          fetchTasks();
    }, [userInfo.id]); 

    const toggleCompleted = async(documentId: number,completed:boolean) => {

      
      const token = localStorage.getItem("token");

      try {
        const response = await axios.put(`${BASE_URL}/tasks/${documentId}`, {
          data: { completed: !completed }
        },    {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.status === 200) {
          setTasks((prev) => 
            prev.map((task) =>
              task.documentId === documentId ? { ...task, completed: !task.completed } : task
            )
          );
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };
    
      const handleDelete = async(documentId: number) => {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.delete(`${BASE_URL}/tasks/${documentId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.status === 204) {
            if (response.status === 204) {
              setTasks((prev) => prev.filter((task) => task.documentId !== documentId));
            }
          }
        } catch (error) {
          console.error("Error deleting task:", error);
        }
  
      };
    
      const handleEdit = (id: number) => {
        console.log(id);
        
      };
  return (
    <div className="flex flex-col gap-4">
    <div className="flex justify-between">
        <div className="flex gap-2">
                <div className="flex bg-orange-100">
                    <button className="p-2 px-4 ">By category </button>
                    <span className="flex flex-col"><ArrowDropUp/><ArrowDropDown/></span> 
                </div>
                <div className="flex bg-orange-100">
                    <button className="p-2 px-4 ">By priority </button>
                    <span className="flex flex-col"><ArrowDropUp/><ArrowDropDown/></span> 
                </div>
            </div>
            <div className="border-2 border-orange-100" >
            <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search by Name" className="p-2 rounded outline-none placeholder:text-blue-200"/>
            <SearchOutlined className="text-2l"/>
            </div>
    </div>
      <div className="flex justify-between flex-wrap gap-4 w-full ">
        {tasks&&tasks?.filter(task=>task.title.toLowerCase().includes(search.toLowerCase())).map((task) => (
          <div key={task.id} className="flex items-center w-[48%] justify-between p-4 bg-orange-100 rounded-lg ">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="text-xs text-gray-500">
                <span>Start Date: {task.startDate}</span>
                <br />
                <span>Due Date: {task.endDate}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <button
                className={`text-xl ${task.completed ? 'text-green-500' : 'text-gray-500'}`}
                onClick={() => toggleCompleted(task.documentId,task.completed)}
              >
                <CheckCircleOutline />
              </button>

              <button onClick={() => handleEdit(task.documentId)}> <EditOutlined /></button>

              <button onClick={() => handleDelete(task.documentId)}>
                <DeleteOutline />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList