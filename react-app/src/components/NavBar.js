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
    <>
      <nav className='main-navbar'>


        <NavLink className='main-logo' to='/' exact={true} activeClassName='active'>
          <img src='/said_it.png'></img>
        </NavLink>


            {/* <div>
              <NavLink className='main-links' to='/users' exact={true} activeClassName='active'>
              Users
              </NavLink>
            </div> */}



        <div className='search-bar-cont'>
          <form className='search-bar'>
            <div className='search-bar-input'>
              <label  htmlFor='search'><i style={{'color':'grey', 'background':'#f6f7f8'}} className="fa-solid fa-magnifying-glass"></i></label>
              <input
                type='search'
                name='search'
                className='search-bar-input'
                placeholder='Search Said.it'
              />
            </div>
          </form>
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
  </>
  );
}

export default NavBar;
