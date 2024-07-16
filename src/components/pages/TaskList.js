import React from 'react';
import '../../App.css';
import './Plan.css';
import './Task.css';
import './TaskList.css';

const TaskList = ({ tasks, handleDelete, handleEdit }) => {
  
  const getTaskCategoryClassName = (category) => {
    switch (category) {
      case "coding":
        return "category-coding"
      case "reading":
        return "category-reading"
      default:
        break;
    }
  };

  const getTaskStatusClassName = (status) => {
    switch (status) {
      case "not started":
        return "status-notstarted"
      case "in progress":
        return "status-inprogress"
      default:
        break;
    }
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      <section className='tasks'>
        {tasks.map(function(task, i) {
          return (
            <div key = {task.id} className='task'>
              <div className='head'>{task.name}</div>
              <div className='detail'>{task.detail}</div>
              <div className='categorystatus'>                
                <div className={getTaskCategoryClassName(task.category)}>
                  {capitalizeFirstLetter(task.category)}
                </div>
                <div className={getTaskStatusClassName(task.status)}></div>
              </div>
              <div>
                <hr></hr>
                <div className='shortcuts'>
                  <button className='button-edit' onClick={() => handleEdit(task)}>Edit</button>
                  <button className='button-delete' onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default TaskList;