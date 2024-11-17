import React, { useContext, useState, useEffect } from "react";
import '../../App.css';
import './Home.css';
import supabase from "../SupabaseClient";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import GetSuggestionsButton from "../GetSuggestionsButton";

export default function Home() {

  const {setIsLoggedIn} = useContext(AuthContext);
  const [session, setSession] = useState(null);
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = () => {
    navigate('/suggestions', { state: { searchTerm } });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchTerm !== '') {
      handleSearch();
    }
  }

  const setTextBoxVisible = () => {
    if (!session) {
      setIsTextBoxVisible(false);
      navigateTo('/signin');
      return;
    };

    if (!isTextBoxVisible) {
      setIsTextBoxVisible(true);
    }
  }

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
        <GetSuggestionsButton session={session} />
        {/* {isTextBoxVisible ? (
          <div className='input-wrapper'>
            <i className='fas fa-search'></i>
            <input 
              type='text'
              className='text-suggest'
              placeholder='Your search term, e.g. JavaScript'
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : ( 
          <button type='button' className='button-suggest' onClick={() => setTextBoxVisible()}>Get suggestions</button>
        )} */}
      </section>
    </>
  );
}