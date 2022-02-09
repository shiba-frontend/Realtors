import React,{useState} from 'react';
import {BaseUrl} from '../Common/Comon';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

const EnqueryForm = () => {

    const [Loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, reset,  formState: { errors, isValid } } = useForm({mode:"all"});

    const Apiurl = BaseUrl();
    const {id} = useParams();



    const onSubmit = async (data) =>{

        console.log(data)
        console.log(id)


        setLoading(true);
        var enqueryImage = "";
        var formdata = new FormData();
        formdata.append("", data.AttachedFile[0]);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        const response1 = await fetch(`${Apiurl}/file/enquiry-attachment`, requestOptions)
        .then(response1 => response1.json())
        .then(result => {
           enqueryImage = result.Content
        })
        .catch(error => console.log('error', error));

        console.log(enqueryImage)
   var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Id": 0,
  "FirstName": data.FirstName,
  "LastName": data.LastName,
  "Email": data.Email,
  "Phone": data.Phone,
  "Message": data.Message,
  "ExpertId":parseInt(id),
  "VisitorId":0,
  "Attachment":enqueryImage
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const response2 = await fetch(`${Apiurl}/enquiry/insert-update-enquiry`, requestOptions)
  .then(response2 => response2.json())
  .then(result => {
    setLoading(false);  
    Swal.fire({
        title: 'Enquery has been successfully done !',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
            reset();
        }
      })
  })
  .catch(error => console.log('error', error));

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input 
                        {...register("FirstName",{required:true})}
                        type="text" className="form-control" placeholder="First Name" />
                        {errors.FirstName && errors.FirstName.type == "required" && (<p className="errormsg">Field is required</p>)}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input 
                        {...register("LastName",{required:true})}
                        type="text" className="form-control" placeholder="Last Name" />
                        {errors.LastName && errors.LastName.type == "required" && (<p className="errormsg">Field is required</p>)}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <input 
                        {...register("Email",{required:true,pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})}
                        type="email" className="form-control" placeholder="Email" />

                        {errors.Email && errors.Email.type == "required" && (<p className="errormsg">Field is required</p>)}
                        {errors.Email && errors.Email.type == "pattern" && (<p className="errormsg">Email is not valid</p>)}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                    <input type="text" maxLength="10" name="Phone" {...register("Phone",{required:true,pattern:/^[0-9\b]+$/,maxLength:10})} className="form-control" placeholder="Phone Number"
                    />

                        {errors.Phone && errors.Phone.type === "required" && (<p className="errormsg">Field is required</p>)}
                        {errors.Phone && errors.Phone.type === "pattern" && (<p className="errormsg">Phone number is not valid</p>)}
                        {errors.Phone && errors.Phone.type === "maxLength" && (<p className="errormsg">Maximam 10 Digit</p>)}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <textarea {...register("Message")} className="form-control" placeholder="Message"></textarea>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <input type="file" {...register("AttachedFile")} placeholder="Attached File" className="form-control"/>    
                    
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">{Loading ? "Loading.." : "Submit"}</button>
                    </div>
                </div>
            </div>
            
        </form>
    )
}

export default EnqueryForm
