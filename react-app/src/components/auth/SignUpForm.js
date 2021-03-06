import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username.trim(), email.trim(), password.trim()));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords do not match']);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} className='main-links' id='signup-btn'>Sign Up</button>
      {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <div className='auth-cont'>
          <div className='auth-side-banner'></div>
          <div className='auth-content'>
            <h1>Sign Up</h1>
            <form className='auth-forms' onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <label></label>
                <input
                  className='auth-input'
                  type='text'
                  name='username'
                  placeholder='Username'
                  onChange={updateUsername}
                  value={username}
                  required
                ></input>
              </div>
              <div>
                <label></label>
                <input
                  className='auth-input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={updateEmail}
                  value={email}
                  required
                ></input>
              </div>
              <div>
                <label></label>
                <input
                  className='auth-input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={updatePassword}
                  value={password}
                  required
                ></input>
              </div>
              <div>
                <label></label>
                <input
                  className='auth-input'
                  type='password'
                  name='repeat_password'
                  placeholder='Repeat password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <button className='main-links login-btn' type='submit'>Sign Up</button>
              <button style={{'marginTop':'20px', 'background':'#fff', 'border':'1px solid #0079D3', 'color':'#0079D3'}} className='main-links login-btn' onClick={demoLogin}>Demo</button>
            </form>
          </div>
        </div>
      </Modal>
      )}
    </>
  );
};

export default SignUpForm;
