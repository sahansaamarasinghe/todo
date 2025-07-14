import React, { useState ,useEffect} from "react";

function ToDoList()
{
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [newTask, setNewTask] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [viewedTask, setViewedTask] = useState(null);

    useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
    }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    function handleInputChange(event)
    {
        setNewTask(event.target.value);
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
        setNewTask("");
        setDescription("");
        setCategory("");
        setError("");
    }


    function removeTask(index)
    {
       const updatedTasks = tasks.filter((e,i) => i !== index);
        setTasks(updatedTasks);

    }
    return (
        <div className="todo-container">
            <h1>To Do List</h1>

            <div className="input-group">

            <input
                type="text"
                placeholder="Task name..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className={error ? "input-error" : ""}
                

            />
            <input
                type="text"
                placeholder="Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                

            />
            
            {error && <p className="error-message">{error}</p>}
            <button className="add-button" onClick={addTask}>
                Add
            </button>
            </div>

            <div className="filter-section">
            <label htmlFor="category-filter"><strong>Filter by Category:</strong></label>
            <select
                id="category-filter"
                onChange={(e) => setFilterCategory(e.target.value)}
                value={filterCategory}
            >
                <option value="All">All Categories</option>
                {[...new Set(tasks.map((t) => t.category))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            </div>

            { (
            <h2 className="task-list-title">Task List</h2>
            )}

            <ol className="task-list">
            {tasks
                .filter((task) => filterCategory === "All" || task.category === filterCategory)
                .map((task, index) => (
                <li key={index}>
                    <span className="text">{task.name}</span>
                    <button className="delete-button" onClick={() => removeTask(index)}>
                    Delete
                    </button>
                    <button className="view-button" onClick={() => setViewedTask(task)}>
                    View
                    </button>
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

export default ToDoList