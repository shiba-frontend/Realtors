import React,{useState} from 'react';
import { BaseUrl } from '../Common/Comon';
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';


const ValidOtp = () => {

    const [errorcheck, seterrorcheck] = useState();

    const { register, getValues, handleSubmit,  watch, formState: { errors, isValid } } = useForm({mode: 'all'});

    let history = useHistory();
    const Apiurl = BaseUrl();
    const EmailValue = getValues("UserName");


const onSubmit = (data) => {
     
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
                history.push('/valid-otp');
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
    
      console.log(result);
    })
  .catch(error => console.log('error', error));

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
                            <input type="email" name="UserName" {...register("UserName",{required:true,pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})} className="form-control" placeholder="Email"
                            autoComplete="off"
                            />
                            {errors.UserName && errors.UserName.type === "required" && (<p className="errormsg">Field is required</p>)}
                             {errors.UserName && errors.UserName.type === "pattern" && (<p className="errormsg">Email is not valid</p>)}
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

export default ValidOtp
