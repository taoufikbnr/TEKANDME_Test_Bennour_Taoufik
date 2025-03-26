import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { format } from "path";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/AuthContext";

interface Task {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
}

const TaskModal= ({ task, onClose }:TaskModalProps) => {
  if (!task) return null;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.endDate);
  const {tasks,setTasks} = useUser()

  const handeTaskSave = async (documentId) => {
    const token = localStorage.getItem("token");

    const taskData = {
      data:{  
        title,
        description,
        startDate:startDate ,
        endDate: endDate}
    };
    
    try {
      const response = await axios.put(`${BASE_URL}/tasks/${documentId}`, taskData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,  
            'Content-Type': 'application/json', 
          },
        }
      );
      
      setTasks((prev) =>prev.map((task) =>task.documentId === documentId ? { ...task, ...response.data.data } : task)
      );
      toast.success("Task updated successfully!");

      
    } catch (error) {
      
      error.response?.data.error.details.errors.forEach((error) => toast.error(error.message));
  
    }
  };


  return (
    <Modal open={!!task} onClose={onClose} aria-labelledby="task-modal-title">
    <Box
      sx={{
        display:"flex",
        flexDirection:"column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        gap:1,
      }}
    >
      {task && (
        <>
          <Typography id="task-modal-title" variant="h6" component="h2">
            {task.title}
          </Typography>
          <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
          <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
              <Box display="flex" gap={2}>
              <DatePicker
            selected={new Date(startDate)}
            onChange={(date) => setStartDate(date)}
            startDate={new Date(task.startDate)}
            endDate={new Date(task.endDate)}
            className="border p-2 rounded-md w-full"
          />
              <DatePicker
            selected={new Date(endDate)}
            onChange={(date) => setEndDate(date)}
            startDate={new Date(task.startDate)}
            endDate={new Date(task.endDate)}
            minDate={new Date(task.startDate)} 
            className="border p-2 rounded-md w-full"
          />
                </Box>
          <Button
          onClick={()=>handeTaskSave(task.documentId)}
            variant="contained"
            color="success"
            sx={{ width: "100%" }}
          >
            Save
          </Button>
        </>
      )}
    </Box>
  </Modal>
  );
};

export default TaskModal;
