import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewedTask, setViewedTask] = useState(null);
  const navigate = useNavigate();


  const getTasksFromLocalStorage = useCallback(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    getTasksFromLocalStorage();
  }, [getTasksFromLocalStorage]);

  function removeTask(index) {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  return (
    <div className="todo-container">
      <h1>All Tasks</h1>
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Add Task
      </button>

      <div className="filter-section">
        <label htmlFor="filter"><strong>Filter by Category:</strong></label>
        <select
          id="filter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {[...new Set(tasks.map(t => t.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <h2 className="task-list-title">Task List</h2>
      <ol className="task-list">
        {tasks
          .filter(t => filterCategory === "All" || t.category === filterCategory)
          .map((t, i) => (
            <li key={i}>
              <span className="text">{t.name}</span>
              <button className="delete-button" onClick={() => removeTask(i)}>Delete</button>
              <button className="view-button2" onClick={() => setViewedTask(t)}>View</button>
            </li>
          ))}
      </ol>

      {viewedTask && (
        <div className="task-details">
          <h3>Task Details</h3>
          <p><strong>Name:</strong> {viewedTask.name}</p>
          <p><strong>Description:</strong> {viewedTask.description}</p>
          <p><strong>Category:</strong> {viewedTask.category}</p>
          <button className="close-button" onClick={() => setViewedTask(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default ViewTasks;
