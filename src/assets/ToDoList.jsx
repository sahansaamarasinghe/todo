import React, { useState } from "react";



function ToDoList()
{
    const [tasks, setTasks] = useState(["eat", "shower", "walk" ]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event)
    {
        setNewTask(event.target.value);

    }

    function addTask()
    {
  
    }

    function removeTask(index)
    {

    }
    return(
        <div className="To Do List">
            <h1>To Do List</h1>
            <div>
                <input 
                    type ="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange ={handleInputChange}/>
                <button
                    className="add-button"
                    onClick={addTask}>
                        Add
                    </button>
                    
            
            </div>
            <ol>
                {tasks.map((task,index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className = "delete-button"
                        onClick={() =>removeTask(index)}>
                            Delete
                        </button>

                    </li>
                )}               
            </ol>
            
        </div>
    );

}
export default ToDoList