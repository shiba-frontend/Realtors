import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {BaseUrl, getUser, removeUserSession, getTime, getToken, getId, refreshpage} from './Comon';
import { useHistory } from 'react-router';
 
// handle the public routes
function PublicRoute({ component: Component, ...rest }) {



  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
    />
  )
}
 
export default PublicRoute;