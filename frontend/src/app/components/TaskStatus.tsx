import React from 'react'

const TaskStatus = () => {
  return (
    <div className='h-[120px] flex mt-6 items-stretch justify-between gap-2'>
        <div className='flex space-x-4'>
            <div className='bg-orange-100 font-bold rounded-4xl w-[150px] h-full'>
                <h1 className='flex flex-col items-center p-4 text-center'>
                    <span>COMPLETED TASKS</span>
                    <span className='text-2xl'>04</span>
                </h1>
            </div>
            <div className='bg-red-100 font-bold rounded-4xl p-4 w-[150px] h-full'>
                <h1 className='flex flex-col items-center p-4 text-center'>
                    <span>COMPLETED TASKS</span>
                    <span className='text-2xl'>04</span>
                </h1>
            </div>
        </div>
        <div className='flex flex-2 items-center justify-center text-center shadow-2xl rounded-3xl h-full'>
                <h1 className='flex items-center gap-8 p-4 text-center font-bold text-4xl'>
                    <span className='text-blue-400'>TASKS CREATED</span>
                    <span>1?500</span>
                </h1>
        </div>
    </div>

  )
}

export default TaskStatus