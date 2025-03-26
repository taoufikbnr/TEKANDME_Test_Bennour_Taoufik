"use client"
import React from 'react'
import { useUser } from '../context/AuthContext'

const TaskStatus = () => {
    const {tasks}:UserContextType = useUser();
    const completedTasks = tasks?.filter((task:task) => task.completed === true).length  || 0;
    const pendingTasks = tasks?.filter((task:task) => task.completed === false).length || 0;
 
    return (
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-2 w-full mb-4'>
            <div className='flex justify-between gap-2'>
            <div className='bg-orange-200 font-bold rounded-4xl p-4 w-full md:w-[150px] h-[100px] md:h-[120px]'>
                <h1 className='flex flex-col items-center p-4 text-center'>
                <span>COMPLETED TASKS</span>
                <span className='text-2xl'>{String(completedTasks).padStart(2, '0')}</span>
                </h1>
            </div>
            <div className='bg-red-100 font-bold rounded-4xl p-4 w-full md:w-[150px] h-[100px] md:h-[120px]'>
                <h1 className='flex flex-col items-center p-4 text-center'>
                <span>PENDING TASKS</span>
                <span className='text-2xl'>{String(pendingTasks).padStart(2, '0')}</span>
                </h1>
            </div>
            </div>
        <div className='flex flex-col md:flex-2 items-center justify-center text-center shadow-2xl rounded-3xl h-full md:h-[120px]'>
          <h1 className='flex items-center gap-8 p-4 text-center font-bold text-4xl'>
            <span className='text-blue-400'>TASKS CREATED</span>
            <span>{tasks && String(tasks.length).padStart(2, '0')}</span>
          </h1>
        </div>
      </div>      

  )
}

export default TaskStatus