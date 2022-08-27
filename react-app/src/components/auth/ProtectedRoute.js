import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BASE_URL

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to={`${baseUrl}/login`} />}
    </Route>
  )
};


export default ProtectedRoute;
