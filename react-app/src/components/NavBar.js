import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './NavBar.css';
import ProfileButton from './ProfileButton';

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  return (
    <nav className='main-navbar'>

      <div className='main-navbar navbar-items'>
          <div>
            <NavLink className='main-links' to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>

          {/* <div>
            <NavLink className='main-links' to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div> */}

      </div>
      {!user && (
      <div className='navbar-items auth-links'>
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
      </div>
      )}
      {user && user && (
      <>
        <ProfileButton />
      </>
      )}
    </nav>
  );
}

export default NavBar;
