import React,{useState, useEffect} from 'react';
import { BaseUrl } from '../Common/Comon';
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import OtpInput from 'react-otp-input';
import ChangePassword from './ChangePassword';


const ForgotPassword = () => {

    const [errorcheck, seterrorcheck] = useState();
    const [otp, setotp] = useState("");
    const [enablestep, setenablestep] = useState(false);
    const { register, getValues, handleSubmit,  watch, formState: { errors, isValid } } = useForm({mode: 'all'});

    let history = useHistory();
    const Apiurl = BaseUrl();
    const EmailValue = getValues("UserName");





    function Forgotapi(data){
    var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "UserName": data.UserName
        });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${Apiurl}/user/send-forget-password-otp`, requestOptions)
  .then(response => response.json())
  .then(result => {
      if(result.IsSuccess == true){
        Swal.fire({
            title: result.Message,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            allowOutsideClick:false,
          }).then((result) => {
            if (result.isConfirmed) {
                setenablestep(true);
            }
          })
      }
      else if(result.IsSuccess == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.Message,
            allowOutsideClick:false,
          })
      }
    })
  .catch(error => console.log('error', error));

    }
    
    function ValidOtp(data){
        var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "UserName": data.UserName,
    "OTP": otp
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`${Apiurl}/user/validate-otp`, requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result.IsSuccess == true){
            //console.log(result.Content.UserId)
            localStorage.setItem('User-Id', result.Content.UserId)
            Swal.fire({
                title: result.Message,
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                allowOutsideClick:false,
              }).then((result) => {
                
                if (result.isConfirmed) {
                    
                   history.push('/change_password');
                }
              })
          }
          else if(result.IsSuccess == false){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.Message,
                allowOutsideClick:false,
              })
          }
    })
    .catch(error => console.log('error', error));
    }


const onSubmit = (data) => {
     
   if(!enablestep){
    Forgotapi(data);
   } 

   if(enablestep){
    ValidOtp(data);
   }

};




    return (
        <div className="comon-page">
            <div className="container">
                <div className="login-form">
                    <h2>Forgot Password</h2>
                   
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                            <label><b>Email</b></label>
                            <input type="email" name="UserName" {...register("UserName",{required:true,pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})} className="form-control" placeholder="Email"
                            disabled={enablestep ? true :null}
                            autoComplete="off"
                            />
                            {errors.UserName && errors.UserName.type === "required" && (<p className="errormsg">Field is required</p>)}
                             {errors.UserName && errors.UserName.type === "pattern" && (<p className="errormsg">Email is not valid</p>)}
                             {enablestep ?
                                <div>
                               <label><b>OTP</b></label>
                                <OtpInput
                                value={otp}
                                onChange={setotp}
                                numInputs={4}
                                separator={<span>-</span>}
                                isInputNum={true}
                                hasErrored={true}
                                inputStyle={{
                                    width: "3rem",
                                    height: "3rem",
                                    margin: "0 10px",
                                    fontSize: "15px",
                                    borderRadius: 4,
                                    border: "1px solid rgba(0,0,0,0.3)"
                                  }}

                            />
                            </div> 
                                : null }
                             
                            </div>
                        </div>			
                    </div>
                        <input type="submit" value="Send" 
                        className="signupbtn"   />
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default ForgotPassword
