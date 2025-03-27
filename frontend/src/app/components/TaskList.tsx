"use client"

import { useEffect, useMemo, useState } from "react";
import { CheckCircleOutline, DeleteForever, PriorityHigh,SearchOutlined, Timer, TimerOutlined, Visibility } from '@mui/icons-material';
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { useUser } from "../context/AuthContext";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "./TaskModal";
import Link from "next/link";

const TaskList = ({userInfo}) => {
const [search, setSearch] = useState("")
const [selectedTask, setSelectedTask] = useState(null);
const [sortOption, setSortOption] = useState('endDate')
const [completedFilter, setCompletedFilter] = useState('all')
const {sortedTasks,setSortedTasks,token,tasks,setTasks} = useUser()

const filteredTasks = useMemo(() => {
  return tasks?.filter((task) => 
    (task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase())) &&
    (completedFilter === "all" || 
     (completedFilter === "completed" && task.completed) || 
     (completedFilter === "not completed" && !task.completed))
  );
}, [tasks, search,completedFilter]);

    type Task = {
        id: number;
        title: string;
        description: string;
        startDate: string;
        dueDate: string;
        completed: boolean;
      };
           
      const sortTasks = (option: string) => {
        let sorted = [...filteredTasks];
        if (option === 'endDate') {
          sorted = sorted.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        }else if (option === 'created') {
          sorted = sorted.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
      
        setSortedTasks(sorted);
      };
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
              setTasks((prev) => prev.filter((task) => task.documentId !== documentId));
              toast.success("Task deleted successfully!");      
          }
        } catch (error) {
          console.error("Error deleting task:", error);
        }
  
      };
    
      const currentDate = new Date()

  return (
    <div className="flex flex-col gap-2 overflow-auto" >
    <div className="flex justify-between gap-4">
          <div className="flex gap-2 items-center">
              <label htmlFor="sortOptions" className="mr-2 ">Sort by:</label>
              <select
                id="sortOptions"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  sortTasks(e.target.value); 
                }}
                className="p-4 px-4 border-none rounded-md bg-orange-200 cursor-pointer"
              >
                <option value="endDate">By Due Date</option>
                <option value="created">By Created Date</option>
              </select>
              <select
                id="completed"
                value={completedFilter}
                onChange={(e) => {
                  setCompletedFilter(e.target.value);
        
                }}
                className="p-4 px-4 border-none rounded-md bg-orange-200 cursor-pointer"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
              </select>
            </div>
            <div className="flex items-center border-2 border-orange-100" >
              <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search by Name" className="w-[200px] rounded outline-none placeholder:text-blue-200"/>
              <SearchOutlined className="text-2l"/>
            </div>
    </div>
      <div className="flex justify-between flex-wrap gap-4 w-full max-h-[400px]">
        {tasks&& (sortedTasks.length > 0 ? sortedTasks : filteredTasks).map((task) => 
    {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      const taskEndDate = new Date(task.endDate);
      taskEndDate.setHours(0, 0, 0, 0); 
      const isOverDue = today>=taskEndDate && !task.completed
      return (
        <div key={task.id} className="flex items-center w-full md:w-[48%] justify-between p-4 bg-orange-200 rounded-lg ">
        <div className="flex flex-col">
          <h3 className="flex items-center text-lg font-semibold text-gray-800">{task.title}{isOverDue&& <TimerOutlined className={`${today>taskEndDate?"text-red-500":"text-orange-400"}`} />}
          </h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="text-sm text-dark-500">
            <span>Start Date: {task.startDate}</span>
            <br />
            <span>Due Date: {task.endDate}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Link href={`/tasks/${task.documentId}?id=${task.userId}`}  >
            <Visibility />
          </Link>
          <button
            className={`text-xl cursor-pointer ${task.completed ? 'text-green-500' : 'text-gray-500'}`}
            onClick={() => toggleCompleted(task.documentId,task.completed)}
          >
            <CheckCircleOutline />
          </button>

          <button className="cursor-pointer" onClick={() => setSelectedTask(task)}> <FontAwesomeIcon icon={faEdit} /></button>

          <button className="cursor-pointer" onClick={() => handleDelete(task.documentId)}>
            <DeleteForever />
          </button>
        </div>
      </div>
      )
    }
        )}
      </div>
      {selectedTask && (
        <TaskModal edit={true} task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  )
}

export default TaskList