import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SuggestionsList from './SuggestionsList';
import '../../App.css';
import './Plan.css';


export default function Suggestions () {

  const learningSuggestionsUrl = process.env.REACT_APP_LEARNING_SUGGESTIONS_URL;

  const [tasks, setTasks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchTerm = location.state?.searchTerm;

    async function fetchData() {
      const response = await fetch(`${learningSuggestionsUrl}?searchterm=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        setTasks(data);
      } else {
        console.log('error');
      }
    }

    if (searchTerm) {
      fetchData();
    }
  }, [location.state, learningSuggestionsUrl]);

  if (!location.state?.searchTerm) {
    return (
      <div>
        <center>
          <p>
            <br /><br /><br />Return <i>home</i> to get some feedback on what to learn!
          </p>
        </center>
      </div>
    );
  }

  return (
    <>
      <section className='plan'>
        {/* <h1>Plan</h1> */}
        <SuggestionsList tasks={tasks} />
      </section>
    </>
  );
}