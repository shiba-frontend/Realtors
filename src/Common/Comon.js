import { setTimeout } from "timers";
import Swal from 'sweetalert2';
import React,{useEffect} from 'react';

export const BaseUrl = () => {
  const Url = "http://98.142.107.236:1230/api";
  //const Url = "http://10.12.102.144/gra/api";
  return Url;
}

// return the user data from the session storage
export const getUser = () => {
  return sessionStorage.getItem('user_name') || null;
  // const userStr = sessionStorage.getItem('user_name');
  // if (userStr) return JSON.parse(userStr);
  // else return null;
  //expires_in
}
export const getTime = () => {
  return sessionStorage.getItem('expires_in') || null;
}

export const getId = () => {
  return sessionStorage.getItem('user_id') || null;

}
 
// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('access_token') || null;
}
 
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('user_name');
  sessionStorage.removeItem('expires_in');
}
 
// set the token and user from the session storage
export const setUserSession = (access_token, user_name, user_id, expires_in) => {
  sessionStorage.setItem('access_token', access_token);
  sessionStorage.setItem('user_name', user_name);
  sessionStorage.setItem('user_id', user_id);
  sessionStorage.setItem('expires_in', expires_in);
}


export const refreshpage = () =>{
  window.location.reload(false);
}



export const SessionTimeoutAlert = () => {
  const locale = 'en';
  var expiredtime = getTime(), curentTime = new Date(), minute_timer;
  curentTime = new Date(curentTime.setSeconds(curentTime.getSeconds() + parseInt(expiredtime)));
  //console.log("curent second", curentTime.getSeconds())
  const [today, setDate] = React.useState(curentTime);

  useEffect(() => {
    setDate(curentTime);
  }, [])


  //console.log("React time", today)
    
  if(parseInt(expiredtime) > 0){
    //console.log("Add Secend",today)
    //console.log("Minute Timer On", minute_timer)
    if(!minute_timer) {
      minute_timer = window.setInterval(function() { 
        if(minute_timer != null){
          var now = new Date();
          var _sessionOutDatetime = new Date(today);
          var diff = new Date(_sessionOutDatetime.getTime() - now.getTime());
          var _inMinute = Math.round(((diff % 86400000) % 3600000) / 60000);
          //console.log("In Minute - ",_inMinute);
          if(_inMinute <= 1){
            //console.log("Minute Timer Off")
            ShowSessionTimer();
            minute_timer = null;        
          }
        }      
      }, 60000); // every minute
    }
  }
  
  
}


function ShowSessionTimer()
{
  //console.log("Second Timer On")
  var seconds=60;
  var _secondTimer;
  if(!_secondTimer) {
    _secondTimer = window.setInterval(function() { 
      if(_secondTimer != null){
        //var _msg = "You have been logout in " + seconds;
        
        //console.log(_msg);
        if(seconds > 0){
          seconds--;
        } else if(seconds == 0){
         
        }  
      }          
    }, 1000); // every Second
    Swal.fire({
      title: 'Logout Alert !',
      text: "Session is expired!",
      icon: 'warning',
      //showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      allowOutsideClick:false,
    }).then((result) => {
      if (result.isConfirmed) {
        removeUserSession();
        refreshpage();
      }
    })
  }
}








