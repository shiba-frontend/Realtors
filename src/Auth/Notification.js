import React,{useEffect, useState} from 'react';
import {BaseUrl, getUser, removeUserSession, getTime, getToken, getId, refreshpage} from '../Common/Comon';
import AfterLoginMenu from './AfterLoginMenu';
import IdleTimer,{ useIdleTimer } from 'react-idle-timer';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
//import { useCookies } from 'react-cookie';

const Notification = () => {
    const [datalist, setdatalist] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Dmsg, setDmsg] = useState();


    const history = useHistory()
    const Apiurl = BaseUrl();
    const token = getToken();
    const userid = getId();

console.log(userid)
useEffect(()=>{
  document.title = 'Notification';
},[])

    useEffect(() => {
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${Apiurl}/notification/get-expert-notification?id=${userid}`, requestOptions)
  .then(response => response.json())
  .then(result => {
   if(result.Content != null){
    setdatalist(result);
}
else 
    if(result.IsSuccess == false){
        setDmsg(result.Message);
    }

  })

  .catch(error => console.log('error', error));

        }, [])


     const DeleteItem = (Id) =>{

        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Id": Id
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${Apiurl}/master/delete-notification/${Id}`, requestOptions)
  .then(response => response.json())
  .then(result => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            result.Message,
            'success'
          )
          refreshpage();
        }
      })
  })
  .catch(error => console.log('error', error));
     }   

         console.log(datalist) 

    return (
        <div className="comon-page py-5">
        <div className="container">
            <div className="row">
                 <AfterLoginMenu/>
                <div className="col-md-9">
                <div className="afterlogin_right">
                <h2>Notifications </h2>
                
                {Dmsg ? <h4>{Dmsg}</h4>
                  :
                <div className="notification_box">
                
                {datalist && datalist.Content.map((item, index)=>{
                    return (
                        
                    <div className="notification-list" key={index}><b><i className="fas fa-bell"></i></b>
                    <div dangerouslySetInnerHTML={ {__html: item.Notification} } />
                    <span>{item.NotifiedOn} BY {item.NotificationSender}</span>

                    <label onClick={()=>DeleteItem(item.Id)}><i className="fas fa-trash-alt"></i></label>

                    </div>
                   
                    )
                })} 
            
             
                </div>
              }
                </div>
               
                </div>
            </div>

            
        </div>

        
    </div>
    )
}

export default Notification


