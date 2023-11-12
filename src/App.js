import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const handleAddNewTask = () => {
    let newTaskObj = {
      task: newTask,
    };

    let updatedTaskList = [...tasks];
    updatedTaskList.push(newTaskObj);
    setTasks(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    setNewTask('');
  };

  useEffect(() => {
    let savedTasks = JSON.parse(localStorage.getItem('taskList'));
    let savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'));

    if (savedTasks) {
      setTasks(savedTasks);
    }

    if (savedCompletedTasks) {
      setCompletedTasks(savedCompletedTasks);
    }
  }, []);

  const handleTaskDelete = (index) => {
    let reducedTasks = [...tasks];
    reducedTasks.splice(index, 1);

    localStorage.setItem('taskList', JSON.stringify(reducedTasks));
    setTasks(reducedTasks);
  };

  const handleCompletedTaskDelete = (index) => {
    let reducedCompletedTasks = [...completedTasks];
    reducedCompletedTasks.splice(index, 1);

    localStorage.setItem('completedTasks', JSON.stringify(reducedCompletedTasks));
    setCompletedTasks(reducedCompletedTasks);
  };

  const handleComplete = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTask = {
      ...tasks[index],
      completedOn: finalDate,
    };

    let updatedCompletedList = [...completedTasks, filteredTask];
    setCompletedTasks(updatedCompletedList);
    localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedList));

    handleTaskDelete(index);
  };

  return (
    <div className="App">
      <h1>Todo App 📃</h1>

      <div className="task-wrapper">
        <div className="task-input">
          <div className="task-input-item">
            <label>Task:</label>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your Task here...."
            />
          </div>
          <div className="task-input-item">
            <button className="add-btn" type="button" onClick={handleAddNewTask}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`view-btn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`view-btn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="task-list">
          {isCompletedScreen === false &&
            tasks.map((item, index) => (
              <div className="task-list-item" key={index}>
                <div>
                  <h4>{item.task}</h4>
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleTaskDelete(index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}
          {isCompletedScreen === true &&
            completedTasks.map((item, index) => (
              <div className="task-list-item" key={index}>
                <div>
                  <h4>{item.task}</h4>
                  <p>
                    <i>Completed at: {item.completedOn}</i>
                  </p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTaskDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;

