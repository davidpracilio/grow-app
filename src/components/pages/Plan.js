import React, { useState, useEffect, useContext } from 'react';
import Task from './Task';
import TaskList from './TaskList';
import '../../App.css';
import './Plan.css';
import { createClient } from '@supabase/supabase-js'
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Plan = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  }

  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);
  
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);

  fetchData();

  async function fetchData() {

    const userIdFromStorage = localStorage.getItem('userId');

    const { data: tasks, error } = await supabase
      .from('user_tasks')
      .select('*')
      .order('id', {ascending: true})
      .eq('user_id', userIdFromStorage);
    if (error) {
      console.log('error', error);
    } else {
      setTasks(tasks);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUserId(session.user.id);
        setIsLoggedIn(true);
        localStorage.setItem('userId', session.user.id);
      } else {
        setIsLoggedIn(false);
        navigateTo('/signin');
      }
    })
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  const userIdFromStorage = localStorage.getItem('userId');
  if (userIdFromStorage) {
    setIsLoggedIn(true);
    setUserId(userIdFromStorage);
    fetchData(userIdFromStorage);
  } else {
    setIsLoggedIn(false);

  }
}, []);
  
  // const [tasks, setTasks] = useState([
  //   {
  //     "id": 1,
  //     "heading": "API Endpoint",
  //     "detail": "Airedale cheeseburger ricotta who moved my cheese cauliflower " +
  //       "cheese cow cheese on toast fromage.",
  //     "category": "Development",
  //     "status": "Not Started"
  //   },
  //   {
  //     "id": 2,
  //     "heading": "Slack Integration",
  //     "detail": "Parmesan cheddar taleggio fromage frais cheesecake fondue " +
  //       "pepper jack red leicester.",
  //     "category": "Reading",
  //     "status": "In Progress"
  //   },
  //   {
  //     "id": 3,
  //     "heading": "Learn Go",
  //     "detail": "Danish fontina cheesy grin cut the cheese ricotta taleggio " +
  //       "fromage camembert de normandie cheesy.",
  //     "category": "Development",
  //     "status": "In Progress"
  //   },
  //   {
  //     "id": 4,
  //     "heading": "IAM on AWS",
  //     "detail": "Lancashire stinking bishop feta. Parmesan smelly cheese " +
  //       "ricotta cream cheese who moved my cheese.",
  //     "category": "Development",
  //     "status": "Not Started"
  //   }
  // ]);

  const [showTask, setShowTask] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowTask(true);
  }

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from('user_tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.log('error', error);
    } else {
      fetchData();
    }
  }

  const handleSave = async (newTask, task) => {
    if (newTask) {
      const { data, error } = await supabase
        .from('user_tasks')
        .insert({name: task.name, detail: task.detail, category: task.category, status: 'not started', priority: 'low', user_id: userId})

      if (error) {
        console.log('error', error);
      } else {
        fetchData();
        setNewTask(false);
        setShowTask(false);
      }
    } else {
      const { data, error } = await supabase
        .from('user_tasks')
        .update({ name: task.name, detail: task.detail, category: task.category, status: task.status })
        .eq('id', task.id);

      if (error) {
        console.log('error', error);
      } else {
        fetchData();
        setShowTask(false);
      }
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
    setTasks(tasks => [...tasks]);
  }

  return (
    <>
      {!showTask && (session) &&
        <div className='taskheading'>
          <button onClick={handleNewTask}>Add a task</button>
        </div>
      }
      {!showTask && (session) &&
        <TaskList
          tasks={tasks}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      }
      {showTask && (session) &&
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
