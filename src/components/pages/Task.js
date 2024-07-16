import React, { useState } from 'react';
import '../../App.css';
import './Plan.css';
import './Task.css';

const Task = ({ newTask, task, handleEdit, handleSave, handleExit }) => {
  const [inputs, setInputs] = useState(task);

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave(newTask, inputs);
  }

  const handleCancel = (event) => {
    event.preventDefault();
    handleExit();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='taskheading'>
          <section className='tasks'>
            <div className='task-large'>
              <div className='head'>Task</div>
              <div className='form'>
                {/* Change to h? */}
                <div className='subhead'>Title</div>
                {/* Change to label? */}
                <input
                  type='text'
                  name='name'
                  value={inputs.name || ""}
                  placeholder='Up to 100 characters'
                  maxLength={100}
                  required
                  onChange={handleChange}
                  />
                <div className='subhead'>Details</div>
                <textarea
                  name='detail'
                  value={inputs.detail || ""}
                  placeholder='Up to 120 characters'
                  rows={3}
                  maxLength={120}
                  required
                  onChange={handleChange}
                />
                <hr/>
                <div className='subhead'>Category</div>
                <select
                  name='category'
                  value={inputs.category || ""}
                  required
                  onChange={handleChange}>
                  <option value=''>Select a category</option>
                  <option value='coding' selected={true ? inputs.category === 'coding' : ''}>Coding</option>
                  <option value='reading' selected={true ? inputs.category === 'reading' : ''}>Reading</option>
                </select>
                <div className='subhead'>Website</div>
                <input
                  type='text'
                  name='website'
                  value={inputs.website || ""}
                  placeholder='Enter a website address'
                  onChange={handleChange}
                />
                <button type='submit' className='button-save'>Save</button>
                <button type='button' className='button-exit' onClick={handleCancel}>Exit</button>
              </div>
            </div>
          </section>
        </div>
      </form>
    </>
  )
}

export default Task;