import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/AuthContext";



const TaskModal = ({ edit,userId, task, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "" );
  const [startDate, setStartDate] = useState(task?.startDate || new Date());
  const [endDate, setEndDate] = useState(task?.endDate  || new Date());
  const { tasks, setTasks } = useUser();

  const handleTaskSave = async () => {
    const token = localStorage.getItem("token");

    const updateTaskData = {
      data: {
        title,
        description,
        startDate,
        endDate,
      },
    };
    const AddTaskData = {
      data: {
        userId,
        title,
        description,
        startDate,
        endDate,
      },
    };

    try {
      let response;
      if (edit && task?.documentId) {
        response = await axios.put(
          `${BASE_URL}/tasks/${task.documentId}`,updateTaskData,{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTasks((prev) =>prev.map((t) =>t.documentId === task.documentId? { ...t, ...response.data.data }
              : t
          )
        );
        toast.success("Task updated successfully!");
      } else {
        response = await axios.post(`${BASE_URL}/tasks`, AddTaskData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setTasks((prev) => [...prev, response.data.data]);
        
        toast.success("Task created successfully!");
      }
    } catch (error) {
      console.log(error.response);
      
      error.response?.data.error.details.errors.forEach((err) =>
        toast.error(err.message)
      );
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
    }
  }, [task]);

  return (
    <Modal open={!!task || edit===false} onClose={onClose} aria-labelledby="task-modal-title">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          gap: 1,
        }}
      >
        <Typography id="task-modal-title" variant="h6" component="h2">
          {edit ? "Edit Task" : "Create New Task"}
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
            maxDate={new Date(endDate)}
            dateFormat="yyyy-MM-dd"
            className="border p-2 rounded-md w-full"
          />
          <DatePicker
            selected={new Date(endDate)}
            onChange={(date) => setEndDate(date)}
            minDate={new Date(startDate)}
            dateFormat="yyyy-MM-dd"
            className="border p-2 rounded-md w-full"
          />
        </Box>
        <Button
          onClick={handleTaskSave}
          variant="contained"
          color="success"
          sx={{ width: "100%" }}
        >
          {edit ? "Save Changes" : "Create Task"}
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
