import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { remove_session } from '../../store/data_store';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(remove_session());
    return <Redirect to='/' />;
  };

  return <button className='main-links' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
