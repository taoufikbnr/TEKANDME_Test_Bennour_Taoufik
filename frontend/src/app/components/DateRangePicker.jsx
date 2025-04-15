"use client"
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./date.css"
export default function DateRangePicker({date,setDate}) {
  const currentDate = new Date();
  const day = currentDate.toLocaleString("en-US", { weekday: "long" }); 

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "2-digit",   
    month: "long",   
    year: "numeric", 
  });
  return (
    <div>
      <h2><i className="text-red-500">{day}</i></h2>
      <h3 className="font-bold">{formattedDate}</h3>
      <Calendar
        selectRange
        value={date}
        onChange={setDate}
        showWeekNumbers={true}
      />
    </div>
  );
}
