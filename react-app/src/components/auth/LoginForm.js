import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './Auth.css';

const LoginForm = ({value}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const location = useLocation();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(value ? true : false);
  const path = window.location.pathname;
  const user = useSelector(state => state.session.user)

  if (path === '/login' && user) {
    return <Redirect to='/' />;
  } 

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      if (path === '/login' && history.length > 2) {
        history.goBack()
      } else {
        return <Redirect to={path} />
      }
    }
  };

  const demoLogin = async (e) => {
    console.log(history)
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      if (path === '/login' && history.length > 2) {
        history.goBack()
      } else {
        return <Redirect to={path} />
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClose = () => {

    if (path === '/login') {
      setShowModal(false);
      history.push('/');
      history.goBack()
    } else {
      setShowModal(false);
    }

  }

  return (
    <>
      {!value && (
      <button onClick={() => setShowModal(true)} className='main-links' id='login-btn'>Login</button>
      )}
      {showModal && (
      <Modal onClose={handleClose}>
        <div className='auth-cont'>
          <div className='auth-side-banner'></div>
          <div className='auth-content'>
            <h1>Login</h1>
            <p className='light-text'>By continuing, you agree to our User Agreement and Privacy Policy.</p>
            <form className='auth-forms' onSubmit={onLogin}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <label htmlFor='email'></label>
                <input
                  className='auth-input'
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <label htmlFor='password'></label>
                <input
                  className='auth-input'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
                <button className='main-links login-btn' type='submit'>Login</button>
                <button style={{'marginTop':'20px', 'background':'#fff', 'border':'1px solid #0079D3', 'color':'#0079D3'}} className='main-links login-btn' onClick={demoLogin}>Demo</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      )}
    </>
  );
};

export default LoginForm;
