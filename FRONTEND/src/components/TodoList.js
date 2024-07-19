// src/components/TodoList.js

import React, { useEffect, useState } from 'react';
import './TodoList.css'; // Import the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/todos/')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => setError(error));
  }, []);

  const addTask = () => {
    fetch('http://127.0.0.1:8000/api/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    })
      .then(response => response.json())
      .then(newTask => setTodos([...todos, newTask]))
      .catch(error => setError(error));

    setTask('');
  };

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      method: 'DELETE',
    })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => setError(error));
  };

  const startEditing = (id, currentTask) => {
    setEditTaskId(id);
    setEditTask(currentTask);
  };

  const updateTask = (id) => {
    fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: editTask }),
    })
      .then(response => response.json())
      .then(updatedTask => {
        setTodos(todos.map(todo => (todo.id === id ? updatedTask : todo)));
        setEditTaskId(null);
        setEditTask('');
      })
      .catch(error => setError(error));
  };

  return (
    <div className="container">
      <h2>Tasks</h2>
      {error && <p className="error">{error.message}</p>}
      <ul className="task-list">
        {todos.map(todo => (
          <li key={todo.id} className="task-item">
            {editTaskId === todo.id ? (
              <input
                type="text"
                value={editTask}
                onChange={e => setEditTask(e.target.value)}
                className="task-input"
              />
            ) : (
              <span className="task-text">{todo.task}</span>
            )}
            <div className="task-actions">
              <button className="btn delete-btn" onClick={() => deleteTask(todo.id)}>Delete</button>
              {editTaskId === todo.id ? (
                <button className="btn update-btn" onClick={() => updateTask(todo.id)}>Update</button>
              ) : (
                <button className="btn edit-btn" onClick={() => startEditing(todo.id, todo.task)}>Edit</button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          className="task-input"
          placeholder="Enter a new task"
        />
        <button className="btn add-btn" onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TodoList;
