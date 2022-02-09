
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {BaseUrl, getUser, removeUserSession, getTime, getToken, getId, refreshpage} from './Comon';
import IdleTimer,{ useIdleTimer } from 'react-idle-timer';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {

  return (
   
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
   
  )
}
 
export default PrivateRoute;