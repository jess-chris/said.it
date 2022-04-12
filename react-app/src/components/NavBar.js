import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import './NavBar.css';

const NavBar = () => {
  return (
    <nav className='main-navbar'>

      <div className='main-navbar navbar-items'>
          <div>
            <NavLink className='main-links' to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>

          <div>
            <NavLink className='main-links' id='login-btn' to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>

          <div>
            <NavLink className='main-links' id='signup-btn' to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>

          {/* <div>
            <NavLink className='main-links' to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div> */}

          <div>
            <LogoutButton />
          </div>

      </div>
    </nav>
  );
}

export default NavBar;
