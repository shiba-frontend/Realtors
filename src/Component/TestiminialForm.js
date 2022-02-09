import React from 'react';
import {BaseUrl} from '../Common/Comon';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';


const TestiminialForm = () => {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({mode:"all"});
    const Apiurl = BaseUrl();


    const onSubmit = (data) =>{


    var myHeaders = new Headers();
    myHeaders.append("id", 0);
    myHeaders.append("Name", data.Name);
    myHeaders.append("Designation", data.Designation);
    myHeaders.append("Email", data.Email);
    myHeaders.append("Phone", data.Phone);
    myHeaders.append("Message", data.Message);
    
    var formdata = new FormData();
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${Apiurl}/master/insert-update-testimonial`, requestOptions)
      .then(response => response.text())
      .then(result => {
        Swal.fire({
            title: 'Thanks for giving support !',
            //text: "You won't be able to revert this!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
                
            }
          })
        console.log(result)
      })
      .catch(error => console.log('error', error));

    }

    return (
        <div className="testimonial-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" {...register("Name")} className="form-control"  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Designation</label>
                            <input type="text" {...register("Designation")} className="form-control"  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" {...register("Email")} className="form-control"  />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" {...register("Phone")} className="form-control"
                            
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Description</label>
                            <textarea {...register("Message")} className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <button type="submit" className="btn btn-warning">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TestiminialForm
