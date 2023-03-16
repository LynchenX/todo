
import { useTranslation } from 'react-i18next';
import React, { useState } from "react";
import "./App.css";
import "./index.css";
const lngs = [
  { code: "vn", native: "Vietnamese" },
  { code: "en", native: "English" },

];
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const { t, i18n } = useTranslation();
  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTasks([{ name: taskInput, done: false }, ...tasks]);
    setTaskInput("");
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleCheck = (index) => {
    const newTasks = [...tasks];
    const task = newTasks[index];
    task.done = !task.done;
    if (task.done) {
      newTasks.splice(index, 1);
      newTasks.push(task);
    }
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h1>Todo List App</h1>

      <form onSubmit={handleSubmit}>
        <input required placeholder={t('inputPlaceholderText')} type="text" value={taskInput} onChange={handleInputChange} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div className="task-wrapper">
              <label>
                <input type="checkbox" id="paperCheck" checked={task.done} onChange={() => handleCheck(index)} />
                <span className={task.done ? "done" : ""}>{task.name}</span>
              </label>
              <button onClick={() => handleDelete(index)}>X</button>
            </div></li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;