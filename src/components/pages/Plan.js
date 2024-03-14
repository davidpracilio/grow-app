import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskList from './TaskList';
import '../../App.css';
import './Plan.css';
import { createClient } from '@supabase/supabase-js'

const Plan = () => {

  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);
  
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "heading": "API Endpoint",
      "detail": "Airedale cheeseburger ricotta who moved my cheese cauliflower " +
        "cheese cow cheese on toast fromage.",
      "category": "Development",
      "status": "Not Started"
    },
    {
      "id": 2,
      "heading": "Slack Integration",
      "detail": "Parmesan cheddar taleggio fromage frais cheesecake fondue " +
        "pepper jack red leicester.",
      "category": "Reading",
      "status": "In Progress"
    },
    {
      "id": 3,
      "heading": "Learn Go",
      "detail": "Danish fontina cheesy grin cut the cheese ricotta taleggio " +
        "fromage camembert de normandie cheesy.",
      "category": "Development",
      "status": "In Progress"
    },
    {
      "id": 4,
      "heading": "IAM on AWS",
      "detail": "Lancashire stinking bishop feta. Parmesan smelly cheese " +
        "ricotta cream cheese who moved my cheese.",
      "category": "Development",
      "status": "Not Started"
    }
  ]);

  const [showTask, setShowTask] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowTask(true);
  }

  const handleDelete = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  const handleSave = (newTask, task) => {
    if (newTask) {
      const updatedTasks = [...tasks, { ...task, id: tasks.length + 1, status: 'Not Started' }];
      setTasks(updatedTasks);
      setNewTask(false);
      setShowTask(false);
    } else {
        const updatedTasks = tasks.map((existingTask) => {
        if (existingTask.id === task.id) {
          return { ...existingTask, heading: task.heading, detail: task.detail, category: task.category, status: task.status };
        }
        return existingTask;
      });
      setTasks(updatedTasks);
      setShowTask(false);
    }
  }

  const handleExit = () => {
    setNewTask(false);
    setShowTask(false);
    setTasks(tasks => [...tasks]);
  }

  const handleNewTask = () => {
    setNewTask(true);
    setShowTask(true);
  }

  return (
    <>
      {!showTask && //(session) &&
        <div className='taskheading'>
          <button onClick={handleNewTask}>Add a task</button>
        </div>
      }
      {!showTask && //(session) &&
        <TaskList
          tasks={tasks}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      }
      {showTask && //(session) &&
        <Task
          newTask={newTask}
          task={!newTask ? taskToEdit : tasks}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleExit={handleExit}
        />
      }
    </>
  );
}

export default Plan;
