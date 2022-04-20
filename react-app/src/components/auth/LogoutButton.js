import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { remove_session } from '../../store/data_store';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(remove_session());
    history.push('/');
  };

  return <button className='main-links' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
