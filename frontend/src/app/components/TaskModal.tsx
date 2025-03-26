import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
          value={task.title}
          onChange={(e) => setTitle(e.target.value)}
        />
          <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={task.title}
          onChange={(e) => setTitle(e.target.value)}
        />
              <Box display="flex" gap={2}>
              <DatePicker
            selected={task.startDate ? new Date(task.startDate) : null}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border p-2 rounded-md w-full"
          />
              <DatePicker
            selected={task.endDate ? new Date(task.endDate) : null}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={task.startDate}
            endDate={endDate}
            minDate={startDate} 
            className="border p-2 rounded-md w-full"
          />
                </Box>
          <Button
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
