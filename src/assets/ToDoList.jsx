import React, { useState } from "react";



function ToDoList()
{
    const [tasks, setTasks] = useState([
        { name: "eat", description: "Have breakfast", category: "Personal" },
        { name: "shower", description: "Take a morning shower", category: "Personal" },
        { name: "walk", description: "Evening walk", category: "Health" } ]);



    const [newTask, setNewTask] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [viewedTask, setViewedTask] = useState(null);




    function handleInputChange(event)
    {
        setNewTask(event.target.value);

    }


    function addTask() {
        if (newTask.trim() !== "") {
            const newEntry = {
            name: newTask,
            description: description || "No description provided",
            category: category || "Uncategorized"
            };
            setTasks((prev) => [...prev, newEntry]);
            setNewTask("");
            setDescription("");
            setCategory("");
        }
    }


    function removeTask(index)
    {
       const updatedTasks = tasks.filter((e,i) => i !== index);
        setTasks(updatedTasks);

    }
    return(
        <div className="To Do List">
            <h1>To Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Task name..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
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
                <button className="add-button" onClick={addTask}>
                    Add
                </button>     
            </div>

            <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
            <option value="All">All Categories</option>
            {[...new Set(tasks.map((t) => t.category))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
            </select>

            <ol>
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
                <button onClick={() => setViewedTask(null)}>Close</button>
            </div>
            )}
        </div>
    );

}
export default ToDoList