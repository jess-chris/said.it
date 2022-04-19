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
  // const userId = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(data_funcs.get_communities());
      // await dispatch(data_funcs.get_user_votes(userId));
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
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm value={true} />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/s/:name' exact={true}>
          <ViewCommunity />
        </Route>
        <Route path='/s/:name/:id/:title' exact={true}>
          <ViewPost />
        </Route>
        {/* <ProtectedRoute path='/communities/new' exact={true}>
          <CreateCommunityForm />
        </ProtectedRoute> */}
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path=''>
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
