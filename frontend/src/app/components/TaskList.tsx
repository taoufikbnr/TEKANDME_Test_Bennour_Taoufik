"use client"

import { useState } from "react";
import { ArrowDropDown, ArrowDropUp, CheckCircle, CheckCircleOutline, Delete, DeleteOutline, EditOutlined, Search, SearchOffOutlined, SearchOutlined } from '@mui/icons-material';

const TaskList = () => {
    type Task = {
        id: number;
        title: string;
        description: string;
        startDate: string;
        dueDate: string;
        completed: boolean;
      };
    const [tasks, setTasks] = useState<Task[]>([
        {
          id: 1,
          title: 'Complete React project',
          description: 'Finish the project and submit it.',
          startDate: '2025-03-20',
          dueDate: '2025-03-25',
          completed: false,
        },
        {
          id: 2,
          title: 'Write blog post',
          description: 'Write a new post about React hooks.',
          startDate: '2025-03-22',
          dueDate: '2025-03-30',
          completed: false,
        },
      ]);
      const togglecompleted = (id: number) => {
        setTasks(tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      };
    
      const handleDelete = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
      };
    
      const handleEdit = (id: number) => {
        alert(`Editing task ${id}`);
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
            <input type="text" placeholder="Search by Name" className="p-2 rounded outline-none placeholder:text-blue-200"/>
            <SearchOutlined className="text-2l"/>
            </div>
    </div>
      <div className="flex gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center w-full justify-between gap-3 p-4 bg-orange-100 rounded-lg ">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="text-xs text-gray-500">
                <span>Start Date: {task.startDate}</span>
                <br />
                <span>Due Date: {task.dueDate}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <button
                className={`text-xl ${task.completed ? 'text-green-500' : 'text-gray-500'}`}
                onClick={() => togglecompleted(task.id)}
              >
                <CheckCircleOutline />
              </button>

              <button onClick={() => handleEdit(task.id)}> <EditOutlined /></button>

              <button onClick={() => handleDelete(task.id)}>
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