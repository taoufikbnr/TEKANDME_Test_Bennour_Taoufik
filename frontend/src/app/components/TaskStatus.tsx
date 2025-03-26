"use client"
import React from 'react'
import { useUser } from '../context/AuthContext'

const TaskStatus = () => {
    const {tasks} = useUser();
    const completedTasks = tasks?.filter((task) => task.completed === true).length  || [];
    const pendingTasks = tasks?.filter((task) => task.completed === false).length || [];


 
    return (
    <div className='h-[120px] flex mt-6 items-stretch justify-between gap-2'>
        <div className='flex space-x-4'>
            <div className='bg-red-100 font-bold rounded-4xl p-4 w-[150px] h-full hidden md:block'>
                <h1 className='flex flex-col items-center p-4 text-center'>
                    <span>COMPLETED TASKS</span>
                    <span className='text-2xl'>{completedTasks}</span>
                </h1>
            </div>
            <div className='bg-red-100 font-bold rounded-4xl p-4 w-[150px] h-full hidden md:block'>
                <h1 className='flex flex-col items-center p-4 text-center'>
                    <span>PENDING TASKS</span>
                    <span className='text-2xl'>{pendingTasks}</span>
                </h1>
            </div>
        </div>
        <div className='flex flex-2 items-center justify-center text-center shadow-2xl rounded-3xl h-full'>
                <h1 className='flex items-center gap-8 p-4 text-center font-bold text-4xl'>
                    <span className='text-blue-400'>TASKS CREATED</span>
                    <span>{tasks&&tasks.length}</span>
                </h1>
        </div>
    </div>

  )
}

export default TaskStatus