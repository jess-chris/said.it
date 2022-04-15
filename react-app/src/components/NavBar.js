import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './NavBar.css';
import ProfileButton from './ProfileButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  return (
    <nav className='main-navbar'>

      <div className='main-navbar navbar-items'>
          <div>
            <NavLink className='main-links bold-text' style={{'fontSize': '18px'}} to='/' exact={true} activeClassName='active'>
              Said.it
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
          <LoginForm />
        </div>
        <div>
          <SignUpForm />
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
