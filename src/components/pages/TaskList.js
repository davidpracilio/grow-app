import React from 'react';
import '../../App.css';
import './Plan.css';
import './Task.css';
import './TaskList.css';

// use react-modal instead?

const TaskList = ({ tasks, handleDelete, handleEdit }) => {
  
  const getTaskCategoryClassName = (category) => {
    switch (category) {
      case "Development":
        return "category-dev"
      case "Reading":
        return "category-reading"
      default:
        break;
    }
  };

  const getTaskStatusClassName = (status) => {
    switch (status) {
      case "Not Started":
        return "status-notstarted"
      case "In Progress":
        return "status-inprogress"
      default:
        break;
    }
  }

  return (
    <>
      <section className='tasks'>
        {tasks.map(function(task, i) {
          return (
            <div key = {task.id} className='task'>
              <div className='head'>{task.heading}</div>
              <div className='detail'>{task.detail}</div>
              <div className='categorystatus'>                
                <div className={getTaskCategoryClassName(task.category)}>{task.category}</div>
                <div className={getTaskStatusClassName(task.status)}></div>
              </div>
              <hr></hr>
              <div className='shortcuts'>
                <button className='button-edit' onClick={() => handleEdit(task.id)}>Edit</button>
                <button className='button-delete' onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default TaskList;