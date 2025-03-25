import React from 'react'

const AddTask = () => {
  return (
<div className="flex gap-2 rounded-2xl">
    <input className="p-4' bg-blue-100" type="text" placeholder="Type Title Of Task" />
    <input className="p-4 bg-blue-100" type="text" placeholder="Type Title Of Task" />
    <button className="py-2 px-8 bg-[#5d9966] text-white"><span className="text-2xl">+</span></button>
  </div>
  )
}

export default AddTask