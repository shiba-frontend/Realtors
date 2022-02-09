import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {BaseUrl, getUser, removeUserSession, getTime, getToken, getId, refreshpage} from './Comon';
import IdleTimer,{ useIdleTimer } from 'react-idle-timer';
import { useHistory } from 'react-router';

function ExpiredTime() {
  const history = useHistory()
  const time = getTime();
  const mintime = time / 60;
  const SESSION_IDEL_MINUTES = mintime;
  console.log(SESSION_IDEL_MINUTES)
  
  const handleOnIdle = event => {
    // console.log('user is idle', event)
    // console.log('last active', getLastActiveTime())
            removeUserSession();
            history.push("./login")
            refreshpage();
  }

  const handleOnActive = event => {
  //   console.log('user is active', event)
  //  console.log('time remaining', getRemainingTime())
  }

  const handleOnAction = event => {
    // console.log('user did something', event)
  }

const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * SESSION_IDEL_MINUTES,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
    emitOnAllTabs: true
  })
    
}

export default ExpiredTime
