import React from 'react';
import '../../App.css';
import './Plan.css';
import './Task.css';

// use react-modal instead?

const Task = ( { handleEdit }) => {
  
  return (
    <>
      <div className='taskheading'>
        <section className='tasks'>
          <div className='task-large'>
            <div className='head'>Task</div>
            <div className='form'>
              {/* Change to h? */}
              <div className='subhead'>Title</div>
              {/* Change to labal? */}
              <input
                type='text'
                name='title'
                placeholder='Up to 100 characters'
                maxLength={100}
                required
                />
              <div className='subhead'>Description</div>
              <textarea
                name='description'
                placeholder='Up to 200 characters'
                rows={3}
                maxLength={200}
                required
              />
              <hr></hr>
              <div className='subhead'>Category</div>
              <select required>
                <option value=''>Select a category</option>
                <option value='1'>Development</option>
              </select>
              <div className='subhead'>Website</div>
              <input
                type='text'
                name='website'
                placeholder='Enter a website address'
              />
              <button className='button-save' onClick={() => handleEdit('')}>Save</button>
              <button className='button-exit' onClick={() => handleEdit('')}>Exit</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Task;