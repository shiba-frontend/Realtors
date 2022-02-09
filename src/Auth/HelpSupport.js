import React, { useState, useEffect } from 'react';
import AfterLoginMenu from './AfterLoginMenu';
import {BaseUrl, removeUserSession, getToken, getId, refreshpage} from '../Common/Comon';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';


const HelpSupport = () => {

    const [QuestionList, setQuestionList] = useState();
    const [error, seterror] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const { register, handleSubmit, getValues, watch, formState: { errors, isValid } } = useForm({mode:"all"});

    const token = getToken();
    const Apiurl = BaseUrl();
    const ExpertId = getId();

    function afterOpenModal() {
     
    }

    function openModal(id) {
        setIsOpen(true);
      }
  
    function closeModal() {
      setIsOpen(false);
    }
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        background:'#0D4077',
        width:'550px'
      },
    };


    const ListedData = () =>{
      
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch(`${Apiurl}/support/help-support-list/${ExpertId}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(result.Content != null){
        setQuestionList(result);
        //console.log(result)
    }
    else{
        //console.log(result)
    }
    })
  .catch(error => console.log('error', error));
    }
    useEffect(()=>{
      document.title = 'Help and Support';
    },[])

    useEffect(() => { 

      ListedData();

    }, [])

    const onSubmit = (data) =>{
        var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "Id": 0,
    "ExpertId":ExpertId ,
    "Title":data.Title,
    "Message": data.Message,
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`${Apiurl}/support/insert-update-help-support`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if(result.IsSuccess === true)
      {
        Swal.fire({
          title: 'Thanks for reply we are connect soon !',
          //text: "You won't be able to revert this!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) {
            ListedData();
            closeModal();
          }
        })
      }
      else
      {
        Swal.fire({
          title: 'Oops...',
          text: 'Something went wrong!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        })
      }
      
    })
    .catch(error => console.log('error', error));
      
      }


    return (
        <div className="comon-page py-5">
        <div className="container">
            <div className="row">
                <AfterLoginMenu/>
                <div className="col-md-9">
                <div className="afterlogin_right">
                <h2>Help and Support</h2>
                <button className="help-support-btn" onClick={()=>openModal()}>Ask Support</button>
                        {QuestionList && QuestionList.Content.map((item, index)=>{
                            return(
                                <ul className="help-support" key={index}>
                                    <li><b>Sl.No:</b> {index + 1}</li>
                                    <li><b>Expert Name:</b> <span>{item.ExpertName}</span></li>
                                    <li><b>Title:</b> <span>{item.Title} </span></li>
                                    <li><b>Message:</b> <span>{item.Message} </span></li>
                            {/* <li><b>Replied Message: </b><div dangerouslySetInnerHTML={{__html: item.RepliedMessage}} /></li>	*/}
                                    <li><b>Date:</b> <span>{item.CreatedOn}</span></li>	
                                </ul>
                            )
                        })} 
                        <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                        <h2>Ask Support</h2>
                        <button className="close-btn" onClick={closeModal}><i className="fas fa-window-close"></i></button>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                        <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" {...register("Title",{required:true})} className="form-control" placeholder="Title Here"></input>
                                        {errors.Message && errors.Message.type === "required" && (<p className="errormsg">Field is required</p>)}
                                    </div>
                                </div>
                            <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea {...register("Message",{required:true})} className="form-control" placeholder="Message Here"></textarea>
                                        {errors.Message && errors.Message.type === "required" && (<p className="errormsg">Field is required</p>)}
                                    </div>
                                </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-warning">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                      </Modal>
                </div>
            
                </div>
            </div>

        
        </div>
    
</div>
    )
}

export default HelpSupport
