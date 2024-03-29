import React from "react";
import '../../App.css';
import './SignIn.css';
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SignIn = () => {

  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //   })

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })

  //   return () => subscription.unsubscribe()
  // }, [])

  // if (session) {
  //   return (<div>Logged in!</div>)
  // }

  const handleSignup = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      alert(error);
    } else {
      alert('Signed up!');
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      alert(error);
    } else {
      alert('Signed in!');
    }
  };

  const handleCheckUser = async (event) => {
    event.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    const userData = JSON.stringify(user);
    alert(userData);
  }

  const handleGetSession = async (event) => {
    //event.preventDefault();

    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);

    const sessionData = JSON.stringify(session);
    alert(sessionData);
  }

  return (
    <>
      <section className='card'>
        <form onSubmit={handleSignup}>
          <div className='heading'>Sign in</div>
          <div className="labels">Email</div>
          <input
            type='text'
            name='email'
            value={email}
            placeholder='example@outlook.com'
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className='labels'>Password</div>
          <input
            type='password'
            name='password'
            value={password}
            placeholder=''
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <br/>
          {/* <button type='submit' className='buttons'>New User</button> */}
          <button type='button' className='button-signin' onClick={handleSignIn}>Sign In</button>
          {/* <button type='button' className='buttons' onClick={handleCheckUser}>Check</button> */}
          {/* <button type='button' className='buttons' onClick={handleGetSession}>Get Session</button> */}
        </form>
      </section>
    </>
  )
}

export default SignIn;