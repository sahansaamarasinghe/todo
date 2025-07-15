import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import ViewTasks from './components/ViewTasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/view" element={<ViewTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
