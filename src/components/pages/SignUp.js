import React, { useContext, useState, useRef, useEffect } from "react";
import '../../App.css';
import './SignIn.css';
import supabase from "../SupabaseClient";
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.email.focus();
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      console.error(error);
      setError(error);
    } else {
      setSignedUp(true);
      navigate('/home');
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
       {/* TODO - Add card into seperate 'card' component and hide or show like 
        show task on Plan.js
        */}
      {!signedUp &&
        <section className='card'>
          <form onSubmit={handleSignUp} ref={formRef}>
            <div className='heading'>Sign up</div>
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
            {error?<div className='account-signinup-error'>{error.message}</div>: null}
            <br/>
            <div className='signinbottom'>
              <button type='submit' className='button-signin'>Sign up</button>
              <div className='account-signup'>
                <span onClick={() => navigate('/signin')}>Return to Sign in</span>
              </div>
            </div>
          </form>
        </section>
      }
      {signedUp &&
        <section className='banner'>
          <center>
            <p>Check your email for a confirmation link to sign in.</p>
            <br></br>
            <button type='button' className='button-seeplan' onClick={() => navigate('/signin')}>Sign in</button>
          </center>
        </section>
      }
    </>
  )
}

export default SignUp;