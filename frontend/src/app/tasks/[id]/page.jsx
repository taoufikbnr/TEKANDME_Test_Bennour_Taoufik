"use client"

import { notFound, useParams } from 'next/navigation';
import { useEffect ,useState} from 'react';
import { BASE_URL } from "../../utils/utils";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import Image from "next/image";

const SingleTask =  () => {
  const searchParams = useSearchParams().get("id");
  const { id } = useParams();
  
    const [task, setTask] = useState("")
    
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      const userInfo = localStorage.getItem("user");
      
          const fetchTasks = async () => {
            try {
              const response = await axios.get(`${BASE_URL}/tasks?&[filters][userId][$eq]=${searchParams}`,
                {
                  headers: {
                    Authorization: `Bearer ${storedToken}`,
                  },
                }
              );
              
              setTask(response.data.data.find(el=>el.documentId===id));
            } catch (err) {
              console.error("Error fetching tasks:", err);
            }
          };
  
          fetchTasks();
    }, [id]); 

  return (
    <div className="flex flex-col md:flex-row gap-4 h-screen mx-[10%] mt-4">
      <div className='flex-1 shadow-md shadow-amber-400 p-4 max-h-max'>
        <h1>Task : {task.title}</h1>
        <p>Description : {task.description}</p>
        <p><strong>Start Date:</strong> {task.startDate}</p>
        <p><strong>Due Date:</strong> {task.endDate}</p>
        <p><strong>CreatedAt:</strong> {task?.createdAt ? new Date(task.createdAt).toISOString().split("T")[0] : "N/A"}</p>
        <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
      </div>
      <div>
        <Image width={600}  height={600} src="/desktop.png" />
      </div>
    </div>
  );
};

export default SingleTask;
