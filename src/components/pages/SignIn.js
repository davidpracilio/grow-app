import React, { useContext, useState, useRef, useEffect } from "react";
import '../../App.css';
import './SignIn.css';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'

const SignIn = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  }

  const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.email.focus();
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      console.error(error);
      setError(error);
    } else {
      localStorage.setItem('userId', data.user.id);
      setIsLoggedIn(true);
      navigate('/plan');
    }
  };

  const handleCheckUser = async (event) => {
    event.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    const userData = JSON.stringify(user);
    alert(userData);
  }

  return (
    <>
      <section className='card'>
        <form onSubmit={handleSignIn} ref={formRef}>
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
          {/* <div className='forgotpassword'>Forgot password?</div> */}
          {error?<div className='account-signinup-error'>{error.message}</div>: null}
          <br/>
          <div className='signinbottom'>
            <button type='submit' className='button-signin'>Sign in</button>
            <div className='account-signup'>
              <span onClick={() => navigateTo('/signup')}>Sign up to Grow!</span>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default SignIn;