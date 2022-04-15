import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import './Auth.css';

const LoginForm = ({value}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(value ? true : false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <>
      <button onClick={() => setShowModal(true)} className='main-links' id='login-btn'>Login</button>
      {showModal && (
      <Modal onClose={() => setShowModal(false)}>
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
                  type='text'
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
