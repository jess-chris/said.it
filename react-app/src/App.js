import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import * as data_funcs from './store/data_store';

import HomePage from './components/HomePage/HomePage';
import ViewCommunity from './components/Communities/ViewCommunity';
import ViewPost from './components/Posts/ViewPost';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const baseUrl = process.env.REACT_APP_BASE_URL


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(data_funcs.get_communities());
      setLoaded(true);
    })();
  }, [dispatch]);


  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <div className='navbar-cont'>
        <NavBar />
      </div>
      <Switch>
        <Route path={`${baseUrl}/`} exact={true} >
          <HomePage />
        </Route>
        <Route path={`${baseUrl}/login`} exact={true}>
          <LoginForm value={true} />
        </Route>
        <Route path={`${baseUrl}/sign-up`} exact={true}>
          <SignUpForm />
        </Route>
        <Route path={`${baseUrl}/s/:name`} exact={true}>
          <ViewCommunity />
        </Route>
        <Route path={`${baseUrl}/s/:name/:id/:title`} exact={true}>
          <ViewPost />
        </Route>
        {/* <ProtectedRoute path='/communities/new' exact={true}>
          <CreateCommunityForm />
        </ProtectedRoute> */}
        <ProtectedRoute path={`${baseUrl}/users`} exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path={`${baseUrl}/users/:userId`} exact={true} >
          <User />
        </ProtectedRoute>
        <Route path=''>
          <Redirect to={`${baseUrl}/`} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
