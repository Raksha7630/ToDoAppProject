import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  return (
    <div className="container">
      <h1>Team Todo App</h1>

      <input
        type="text"
        placeholder="What needs to be done?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>

      <h2 style={{fontSize:'12px', color:'blue', textAlign:'center'}}>
  Created by Hom, Rakshya, Chetana, Puspa and Team DevOps 2026 - Updated by Rakshya 
</h2>
    </div>
  );
}

export default App;