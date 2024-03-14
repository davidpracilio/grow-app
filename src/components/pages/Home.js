import React from "react";
import '../../App.css';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path)
  };

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
        <button type='button' className='button-seeplan' onClick={() => navigateTo('/plan')}>See your plan</button>
      </section>
    </>
  );
}