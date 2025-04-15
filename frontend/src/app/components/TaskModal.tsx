import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../utils/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/AuthContext";
import Cookies from "js-cookie";

const TaskModal = ({ edit, userId, task, onClose }: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [startDate, setStartDate] = useState<Date | string>(task?.startDate ? new Date(task.startDate) : new Date());
  const [endDate, setEndDate] = useState<Date | string>(task?.endDate ? new Date(task.endDate) : new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tasks, setTasks } = useUser();

  const handleTaskSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSubmitting(true);
    const token = Cookies.get("token");

    if (!token) {
      toast.error("Authentication failed. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    const updateTaskData = {
      data: {
        title,
        description,
        startDate: startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate,
        endDate: endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate,
      },
    };
    
    const addTaskData = {
      data: {
        userId,
        title,
        description,
        startDate: startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate,
        endDate: endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate,
      },
    };

    try {
      let response;
      if (edit && task?.documentId) {
        response = await axios.put(
          `${BASE_URL}/tasks/${task.documentId}`, updateTaskData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        // Update local state
        setTasks((prev) => 
          prev.map((t) => 
            t.documentId === task.documentId ? { ...t, ...response.data.data } : t
          )
        );
        
        toast.success("Task updated successfully!");
      } else {
        response = await axios.post(`${BASE_URL}/tasks`, addTaskData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        // Add to local state
        setTasks((prev) => [...prev, response.data.data]);
        toast.success("Task created successfully!");
      }
      
      onClose();
    } catch (error: any) {
      console.error("Error saving task:", error);
      
      if (error.response?.data?.error?.details?.errors) {
        error.response.data.error.details.errors.forEach((err: any) =>
          toast.error(err.message)
        );
      } else {
        toast.error("Failed to save task. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update form when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStartDate(task.startDate ? new Date(task.startDate) : new Date());
      setEndDate(task.endDate ? new Date(task.endDate) : new Date());
    }
  }, [task]);

  return (
    <Modal open={edit === true || edit === false} onClose={onClose} aria-labelledby="task-modal-title">
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
          required
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />
        <Box display="flex" gap={2}>
          <DatePicker
            selected={startDate instanceof Date ? startDate : new Date(startDate)}
            onChange={(date: Date) => setStartDate(date)}
            maxDate={endDate instanceof Date ? endDate : new Date(endDate)}
            dateFormat="yyyy-MM-dd"
            className="border p-2 rounded-md w-full"
          />
          <DatePicker
            selected={endDate instanceof Date ? endDate : new Date(endDate)}
            onChange={(date: Date) => setEndDate(date)}
            minDate={startDate instanceof Date ? startDate : new Date(startDate)}
            dateFormat="yyyy-MM-dd"
            className="border p-2 rounded-md w-full"
          />
        </Box>
        <Button
          onClick={handleTaskSave}
          variant="contained"
          color="success"
          sx={{ width: "100%" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : (edit ? "Save Changes" : "Create Task")}
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
