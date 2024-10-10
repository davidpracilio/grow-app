import React, { useState, useEffect } from 'react';
import '../../App.css';
import './Plan.css';
import './Task.css';
import './TaskList.css';
import { createClient } from '@supabase/supabase-js';

const SuggestionsList = ({ tasks }) => {

  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

  const [tasksWithId, setTasksWithId] = useState([]);
  const [addedTasks, setAddedTasks] = useState({});

  useEffect(() => {
    const tasksWithUniqueId = tasks.map((task, index) => ({
      ...task,
      id: task.id || `${index}`,
    }));
    setTasksWithId(tasksWithUniqueId);
  }, [tasks]);

  const handleAdd = async (task) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return;
    };

    setAddedTasks((prevState) => ({
      ...prevState,
      [task.id]: !prevState[task.id],
    }));

    const userId = localStorage.getItem('userId');

    const { data, error } = await supabase
      .from('user_tasks')
      .insert([{name: task.title, detail: task.description, category: 'reading', status: 'not started', priority: 'low', user_id: userId}]);

      if (error) {
        console.log('error', error);
      }
    };

  const getTaskCategoryClassName = (category) => {
    switch (category) {
      case "coding":
        return "category-coding";
      case "reading":
        return "category-reading";
      case "meeting":
        return "category-meeting";
      case "other":
        return "category-other";
      default:
        return "";
    }
  };

  const getTaskStatusClassName = (status) => {
    switch (status) {
      case "not started":
        return "status-notstarted";
      case "in progress":
        return "status-inprogress";
      case "completed":
        return "status-completed";
      default:
        return "";
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      <section className='tasks'>
        {tasksWithId.map((task) => (
          <div key={task.id} className='task'>
            <div className='head'>{task.title}</div>
            <div className='detail'>{task.description}</div>
            <div className='categorystatus'>
              <div className={getTaskCategoryClassName('reading')}>
                {capitalizeFirstLetter('reading')}
              </div>
              <div className={getTaskStatusClassName('not started')}></div>
            </div>
            <div>
              <hr />
              <div className='shortcuts'>
                <button
                  className={!addedTasks[task.id] ? 'button-add' : 'button-added'}
                  onClick={!addedTasks[task.id] ? () => handleAdd(task) : null}
                >
                  {addedTasks[task.id] ? 'Added' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default SuggestionsList;