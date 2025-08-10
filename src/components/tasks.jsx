import { TabContext } from "../contexts/tabContext";
import { useState, useContext, useEffect } from "react";
import { Check, Edit, Delete } from "@mui/icons-material";
import { Modal, Box, Alert, LinearProgress } from "@mui/material";

export default function TasksBox() {
  const [tasks, setTasks] = useState([]);
  const [shownTask, setShownTask] = useState([]);
  const currentTab = useContext(TabContext);

  const [message, setMessage] = useState({
    message: "",
    status: true,
    isShown: false
  });

  const [progress, setProgress] = useState(0);

  // Filter tasks when tab changes
  useEffect(() => {
    switch (currentTab.tab) {
      case "done":
        setShownTask(tasks.filter((task) => task.status));
        break;
      case "task":
        setShownTask(tasks.filter((task) => !task.status));
        break;
      default:
        setShownTask(tasks);
        break;
    }
  }, [tasks, currentTab.tab]);

  // Progress + auto-hide alert
  useEffect(() => {
    if (!message.isShown) return;

    setProgress(0); // reset progress
    const duration = 2000; // 5 seconds
    const stepTime = 100; // update every 100ms
    const stepAmount = (100 / (duration / stepTime));

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setMessage((prevMsg) => ({ ...prevMsg, isShown: false }));
          return 100;
        }
        return prev + stepAmount;
      });
    }, stepTime);

    return () => clearInterval(progressTimer);
  }, [message.isShown]);

  // Handlers
  const [newTask, setNewTask] = useState({ name: "", description: "" });
  function handleAddTask() {
    if (!newTask.name.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTask.name,
        description: "",
        status: false
      }
    ]);
    setNewTask({ ...newTask, name: "" });
    showAlert("Task added successfully", true);
  }

  function handleDoneTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, status: !t.status } : t
      )
    );
    showAlert("Task done", true);
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showAlert("Task deleted", false);
  }

  function showAlert(msg, status) {
    setMessage({
      message: msg,
      status,
      isShown: true
    });
  }

  // Edit modal
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState({
    id: "",
    name: "",
    description: ""
  });

  const handleEdit = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === editTask.id
          ? { ...t, name: editTask.name, description: editTask.description }
          : t
      )
    );
    setOpen(false);
    showAlert("Task updated successfully", true);
  };

  return (
    <>
      <div className="tasks">
        {shownTask.map((task) => (
          <div className="task-holder" key={task.id}>
            {/* Edit Modal */}
            <Modal className="modal-container" open={open} onClose={() => setOpen(false)}>
              <Box>
                <form onSubmit={(e) => e.preventDefault()}>
                  <h2 className="head">Edit task</h2>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      value={editTask.name}
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          name: e.target.value,
                          id: task.id
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      value={editTask.description}
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          description: e.target.value,
                          id: task.id
                        })
                      }
                    />
                  </div>
                  <div className="btns">
                    <button className="form-btn" onClick={handleEdit}>Change</button>
                    <button  className="form-btn"onClick={() => setOpen(false)}>Cancel</button>
                  </div>
                </form>
              </Box>
            </Modal>

            <div className="text">
              <div className="name">{task.name}</div>
              <div className="desc">{task.description}</div>
            </div>
            <div className="btn-group">
              <button
                className={task.status ? "action-btn active" : "action-btn"}
                onClick={() => handleDoneTask(task.id)}
              >
                <Check />
              </button>
              <button
                className="action-btn"
                onClick={() => {
                  setEditTask({
                    id: task.id,
                    name: task.name,
                    description: task.description
                  });
                  setOpen(true);
                }}
              >
                <Edit />
              </button>
              <button
                className="action-btn"
                onClick={() => deleteTask(task.id)}
              >
                <Delete />
              </button>
            </div>
          </div>
        ))}
        <hr />
        <div className="input-group">
          <input
            type="text"
            value={newTask.name}
            placeholder="Add task"
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <input type="submit" value="Add Task" onClick={handleAddTask} />
        </div>
      </div>

      {message.isShown && (
        <Alert
          icon={false}
          color={message.status ? "success" : "error"}
          className="alert"
        >
          <LinearProgress variant="determinate" value={progress}  color={message.status ? "success" : "error"} />
          <p>{message.message}</p>
        </Alert>
      )}
    </>
  );
}
