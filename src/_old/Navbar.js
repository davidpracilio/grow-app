import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Button from './Button';
import './Navbar_old.css';
import logo from './../images/logo.png';

const Navbar = () => {
  const [click, setClick] = useState(false);
  // const [dropdown, setDropDown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const mediaQueryLg = window.matchMedia('(min-width: 900px)');

  if (mediaQueryLg.matches) {
    alert('Large Media Query Matched!');
  }

  function handleResizeChange(e) {
    // Check if the media query is true
    if (e.matches) {
      // Then log the following message to the console
      console.log('Media Query Matched!')
    }
  }
  
  // Register event listener
  mediaQueryLg.addEventListener(handleResizeChange);
  
  // Initial check
  handleResizeChange(mediaQueryLg);

/*   const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };   */

  return (
    <>
      <nav className='navbar'>
    {/* <nav className='navbar'>
      <img src={logo} className='navbar-image' alt='grow'/>
      <Link to='/' className='navbar-logo'>
        GROW <i className='fab fa-firstdraft' />
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Home
          </Link>
        </li> */}
{/*         <li className='nav-item'
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link>

          </Link>
        </li> */}
{/*         <li className='nav-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            About
          </Link>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Plan
          </Link>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Log in
          </Link>       
        </li>
      </ul>
      <Button /> */}
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
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li className='menu-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            About
          </Link>
        </li>
        <li className='menu-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Plan
          </Link>
        </li>
        <li className='menu-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Log in
          </Link>
        </li>
      </ul>
    </nav>
    </>
  )
}

export default Navbar;