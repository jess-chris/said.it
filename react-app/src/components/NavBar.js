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
          <div>
            <img alt='Said.it' src='public/assets/said_it.png'></img>
            {/* <svg class="_1bWuGs_1sq4Pqy099x_yy-" viewBox="0 0 57 18" xmlns="http://www.w3.org/2000/svg" width="57" height="18"><g fill="#1C1C1C"><path d="M54.63,16.52V7.68h1a1,1,0,0,0,1.09-1V6.65a1,1,0,0,0-.93-1.12H54.63V3.88a1.23,1.23,0,0,0-1.12-1.23,1.2,1.2,0,0,0-1.27,1.11V5.55h-1a1,1,0,0,0-1.09,1v.07a1,1,0,0,0,.93,1.12h1.13v8.81a1.19,1.19,0,0,0,1.19,1.19h0a1.19,1.19,0,0,0,1.25-1.12A.17.17,0,0,0,54.63,16.52Z" fill="#1C1C1C"></path><circle fill="#FF4500" cx="47.26" cy="3.44" r="2.12"></circle><path d="M48.44,7.81a1.19,1.19,0,1,0-2.38,0h0v8.71a1.19,1.19,0,0,0,2.38,0Z" fill="#1C1C1C"></path><path d="M30.84,1.19A1.19,1.19,0,0,0,29.65,0h0a1.19,1.19,0,0,0-1.19,1.19V6.51a4.11,4.11,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S22.28,18,25.42,18a4.26,4.26,0,0,0,3.1-1.23,1.17,1.17,0,0,0,1.47.8,1.2,1.2,0,0,0,.85-1.05ZM25.41,15.64c-1.83,0-3.32-1.77-3.32-4s1.48-4,3.32-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z" fill="#1C1C1C"></path><path d="M43.28,1.19A1.19,1.19,0,0,0,42.09,0h0a1.18,1.18,0,0,0-1.18,1.19h0V6.51a4.15,4.15,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S34.72,18,37.86,18A4.26,4.26,0,0,0,41,16.77a1.17,1.17,0,0,0,1.47.8,1.19,1.19,0,0,0,.85-1.05ZM37.85,15.64c-1.83,0-3.31-1.77-3.31-4s1.47-4,3.31-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z" fill="#1C1C1C"></path><path d="M17.27,12.44a1.49,1.49,0,0,0,1.59-1.38v-.15a4.81,4.81,0,0,0-.1-.85A5.83,5.83,0,0,0,13.25,5.3c-3.1,0-5.69,2.85-5.69,6.35S10.11,18,13.25,18a5.66,5.66,0,0,0,4.39-1.84,1.23,1.23,0,0,0-.08-1.74l-.11-.09a1.29,1.29,0,0,0-1.58.17,3.91,3.91,0,0,1-2.62,1.12A3.54,3.54,0,0,1,10,12.44h7.27Zm-4-4.76a3.41,3.41,0,0,1,3.09,2.64H10.14A3.41,3.41,0,0,1,13.24,7.68Z" fill="#1C1C1C"></path><path d="M7.68,6.53a1.19,1.19,0,0,0-1-1.18A4.56,4.56,0,0,0,2.39,6.91V6.75A1.2,1.2,0,0,0,0,6.75v9.77a1.23,1.23,0,0,0,1.12,1.24,1.19,1.19,0,0,0,1.26-1.1.66.66,0,0,0,0-.14v-5A3.62,3.62,0,0,1,5.81,7.7a4.87,4.87,0,0,1,.54,0h.24A1.18,1.18,0,0,0,7.68,6.53Z" fill="#1C1C1C"></path></g></svg> */}
          </div>
        </NavLink>


            {/* <div>
              <NavLink className='main-links' to='/users' exact={true} activeClassName='active'>
              Users
              </NavLink>
            </div> */}



        <div className='search-bar-cont'>
          {/* <form className='search-bar'>
            <div className='search-bar-input'>
              <label  htmlFor='search'><i style={{'color':'grey', 'background':'#f6f7f8'}} className="fa-solid fa-magnifying-glass"></i></label>
              <input
                type='search'
                name='search'
                className='search-bar-input'
                placeholder='Search Said.it'
              />
            </div>
          </form> */}
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
