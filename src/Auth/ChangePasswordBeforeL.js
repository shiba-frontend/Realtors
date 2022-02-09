import React,{useState, useRef, useEffect} from 'react';
import { BaseUrl } from '../Common/Comon';
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const ChangePasswordBeforeL = () => {

    const UserID = localStorage.getItem('User-Id');

    const { register, getValues, handleSubmit,  watch, formState: { errors, isValid } } = useForm({mode: 'all'});

    const password = useRef({});
    password.current = watch("Password", "");
    const Apiurl = BaseUrl();
    let history = useHistory();


    useEffect(()=>{
		document.title = 'Change Password';
	},[])

const onSubmit = (data) =>{

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "UserId": UserID,
  "Password": data.Password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${Apiurl}/user/change-user-password`, requestOptions)
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
                
               history.push('/login');
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
        console.log(data)
    }


    return (
        <div className="comon-page">
            <div className="container">
                <div className="login-form">
                    <h2>Change Password</h2>
                   
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                            <input type="password" name="Password" {...register("Password",{required:true,minLength:6})} className="form-control" placeholder="Password" />

                            {errors.Password && errors.Password.type === "required" && (<p className="errormsg">Field is required</p>)}
                            {errors.Password && errors.Password.type === "minLength" && (<p className="errormsg">Must have atleast 6 characters</p>)}

                            </div>
                            <div className="form-group">
                            <input type="password" name="password_repeat" {...register("password_repeat",{
                                validate: value =>
                                value === password.current || "The passwords do not match"
                            })} 
                            className="form-control" placeholder="Confirm Password" />
        
                            {errors.password_repeat && <p className="errormsg">{errors.password_repeat.message}</p>}
                            </div>
                        </div>			
                    </div>
                        <input type="submit" value="Submit" 
                        className="signupbtn"   />
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default ChangePasswordBeforeL
