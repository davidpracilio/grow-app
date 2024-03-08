import React, { useState } from 'react';
import '../../App.css';
import './Plan.css';
import './Task.css';

// use react-modal instead?

const Task = ({ newTask, task, handleEdit, handleSave, handleExit }) => {

  const [inputs, setInputs] = useState(task);

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'category') {
      switch (value) {
        case '1':
          value = 'Development';
          break;
        case '2':
          value = 'Reading';
          break;
        default:
          break;
      }
    }

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
                  name='heading'
                  value={inputs.heading || ""}
                  placeholder='Up to 100 characters'
                  maxLength={100}
                  required
                  onChange={handleChange}
                  />
                <div className='subhead'>Details</div>
                <textarea
                  name='detail'
                  value={inputs.detail || ""}
                  placeholder='Up to 200 characters'
                  rows={3}
                  maxLength={200}
                  required
                  onChange={handleChange}
                />
                <hr/>
                <div className='subhead'>Category</div>
                <select
                  name='category'
                  required
                  onChange={handleChange}>
                  <option value=''>Select a category</option>
                  <option value='1' selected={true ? inputs.category === 'Development' : ''}>Development</option>
                  <option value='2' selected={true ? inputs.category === 'Reading' : ''}>Reading</option>
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