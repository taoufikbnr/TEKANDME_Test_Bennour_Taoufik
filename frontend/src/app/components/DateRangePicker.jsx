import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./date.css"
export default function DateRangePicker() {
  const [date, setDate] = useState([new Date(), new Date()]);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "2-digit",   
    month: "long",   
    year: "numeric", 
  });
  return (
    <div>
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
