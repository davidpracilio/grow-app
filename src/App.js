import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Plan from './components/pages/Plan';
import LogIn from './components/pages/LogIn';
import './App.css';

function App() {
  return (
    <div className='content'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='./' element={<Home />} />
          <Route path='./about' element={<About />} />
          <Route path='./plan' element={<Plan />} />
          <Route path='./login' element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;