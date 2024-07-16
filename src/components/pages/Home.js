import React, { useContext, useState, useEffect } from "react";
import '../../App.css';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { createClient } from '@supabase/supabase-js'

export default function Home() {
  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

  const { setIsLoggedIn } = useContext(AuthContext);
  const [session, setSession] = useState(null);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path)
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }})
  }, []);

  return (
    <>
      <section className='banner'>
        <h1 className='white'>A tool for you.</h1>
        <h1 className='yellow'>Track your learning.</h1>
        <p>Keep notes about your learning, get some suggestions or plan a path. 
          Grow is your learning assistant availabile anywhere.
        </p>
        <p></p>
        <br/>
        <button type='button' className='button-seeplan' onClick={() => session ? navigateTo('/plan'): navigateTo('/signin')}>See your plan</button>
      </section>
    </>
  );
}