import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../images/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  window.addEventListener('resize', function(event){
    if (this.window.innerWidth > 900) {
      closeMobileMenu();
    }
  });

  return (
    <>
      <nav className='navbar'>
        <div className="logo-with-text">
          <img src={logo} alt="orange" />
          <div>
            <h1>GROW</h1>
            <p>Improve yourself as a software engineer</p>
          </div>
        </div>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu block': 'nav-menu default'}>
          <li className='menu-item'>
            <Link to='./' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='./about' className='nav-links' onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='./plan' className='nav-links' onClick={closeMobileMenu}>
              Plan
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='./signin' className='nav-links' onClick={closeMobileMenu}>
              Sign in
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar;