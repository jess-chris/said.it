import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { remove_session } from '../../store/data_store';

const baseUrl = process.env.REACT_APP_BASE_URL

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(remove_session());
    return <Redirect to={`${baseUrl}/`} />;
  };

  return <button className='main-links' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
