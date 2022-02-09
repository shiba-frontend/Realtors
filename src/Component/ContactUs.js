import React,{useEffect, useState} from 'react';
import { BaseUrl } from '../Common/Comon';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';


const ContactUs = () => {
    const [ConData, setConData] = useState([]);
    const [errorrepeatcheck, seterrorrepeatcheck] = useState(false);

    const { register, handleSubmit, reset,  watch, formState: { errors, isValid } } = useForm({mode: 'all'});

    const Apiurl = BaseUrl();

    useEffect(()=>{
		document.title = 'Contact Us';
	},[])
    useEffect(() => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`${Apiurl}/master/get-social-network-list`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.Content != null){
                    setConData(result.Content);
                }
                
                
            })
            .catch(error => console.log('error', error));
    }, [])


    const onSubmit = (data) =>{
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Id": 0,
  "Name": data.Name,
  "Email": data.Email,
  "Phone": data.Phone,
  "Message": data.Message
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${Apiurl}/support/insert-contact-us`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.IsSuccess === true)
    {
        Swal.fire({
            title: result.Message,
            //text: "You won't be able to revert this!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
                reset();
            }
          })

        //console.log("Step=seven", result);
    }
    else if(result.IsSuccess === false)
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    }
  })
  .catch(error => console.log('error', error));
    }
    const onChangeHandler = e => {

        var InputId = document.getElementById("PhoneNo");
        console.log(InputId);
    
        var pwList = [InputId.value];
    
        for (var p = 0; p < pwList.length; p++) {
            var pw = pwList[p];
            var check = (/^(.)\1+$/.test(pw));           
            if (check == true) {
                seterrorrepeatcheck(true)
            }
            else{
                seterrorrepeatcheck(false)
            }
        }
    
      };


    return (
        <div className="comon-page contact-us">
            <div className="container">
                <div className="cms-page contact-bg">
                   
                    <div className="row">
                        <div className="col-md-6">
                        
                            <div className="contact_l" >
                            <h2>Connect With Us</h2>
                             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                <div>
                                    <span><i className="fas fa-map-marker-alt"></i> Address</span>
                                    <p>{ConData.Address}</p>
                                </div>
                                <div>
                                    <span><i className="fas fa-envelope-open"></i> Email</span>
                                    <p>{ConData.Email}</p>
                                </div>
                                <div>
                                    <span><i className="fas fa-mobile-alt"></i> Phone</span>
                                    <p>{ConData.Phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="contact-R">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                             <label>Name</label>
                                            <input name="Name" {...register("Name",{required:true})} type="text" className="form-control"/>
                                            {errors.Name && errors.Name.type === "required" && (<p className="errormsg">Field is required</p>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" name="Email" {...register("Email",{required:true,pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})} className="form-control"/>
                                            {errors.Email && errors.Email.type === "required" && (<p className="errormsg">Field is required</p>)}
                                           {errors.Email && errors.Email.type === "pattern" && (<p className="errormsg">Email is not valid</p>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" id="PhoneNo" name="Phone" maxLength="10" {...register("Phone",{required:true,pattern:/^[0-9\b]+$/,maxLength:10})} className="form-control" onBlur={(event) => onChangeHandler(event)} />
                                    {errors.Phone && errors.Phone.type === "required" && (<p className="errormsg">Field is required</p>)}
                                    {
                                        errors.Phone && errors.Phone.type === "pattern" && (<p className="errormsg"> Phone no should be Numeric </p>)
                                    }
                                    {errors.Phone && errors.Phone.type === "maxLength" && (<p className="errormsg">Maximam 10 Digit</p>)}
                                    {errorrepeatcheck ? <p className="errormsg">Phone number is not valid</p>:null}
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea name="Message" {...register("Message",{required:true})} className="form-control"></textarea>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="map">
                    <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={`https://www.google.com/maps?width=100%&height=600&hl=en&q=${ConData.Address}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}></iframe>

                    </div>
        </div>
    )
}

export default ContactUs
