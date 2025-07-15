import React, { useState, useEffect, useCallback } from "react";
import NameInput from "./NameInput";
import { useNavigate } from "react-router-dom";
//import ViewTasks from "./ViewTasks";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  // const getTasksFromLocalStorage = useCallback(() => {
  //   const savedTasks = localStorage.getItem("tasks");
  //   if (savedTasks) {
  //     setTasks(JSON.parse(savedTasks));
  //   }
  // }, []);

  // useEffect(() => {
  //   getTasksFromLocalStorage();
  // }, [getTasksFromLocalStorage]);

  const saveTasksToLocalStorage = useCallback((tasksToSave) => {
    localStorage.setItem("tasks", JSON.stringify(tasksToSave));
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks, saveTasksToLocalStorage]);

  function resetTasks() {
    setNewTask("");
    setDescription("");
    setCategory("");
    setError("");
  }

  function addTask() {
    if (!newTask.trim()) {
      setError("Please fill in the task name.");
      return;
    }

    const newEntry = {
      name: newTask,
      description: description || "No description provided",
      category: category || "Uncategorized",
    };
    setTasks((prev) => [...prev, newEntry]);
    resetTasks();
  }

  return (
    <div className="todo-container">
      <h1>To Do List</h1>

      <div className="input-group">
        <NameInput
          type="text"
          placeholder="Task name..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className={error ? "input-error" : ""}
        />
        <NameInput
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <NameInput
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="add-button" onClick={addTask}>Add</button>
        <button className="view-button" onClick={() => navigate("/view")}>Go to View Tasks</button>
      </div>
    </div>
  );
}

export default ToDoList;
