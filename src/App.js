import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Plan from './components/pages/Plan';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import './App.css';
import AuthContext from './components/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className='content'>
        <Router>
          <Navbar />
          <div></div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/plan' element={<Plan/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </Router>
      </div> 
    </AuthContext.Provider>
  );
}

export default App;