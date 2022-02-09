import React,{useState, useEffect} from 'react';
import Slider from "react-slick";
import {BaseUrl} from '../Common/Comon'
import TestiminialForm from './TestiminialForm';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const Testimonial = () => {
    const [datatestimonial, setdatatestimonial] = useState()
    const [loading, setloading] = useState(false)
    const [errorData, seterrorData] = useState();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [Emailchecking, setEmailchecking] = useState();
    const [phonechecking, setphonechecking] = useState();
    const [errorcheck, seterrorcheck] = useState(false);
    const { register, handleSubmit, getValues, watch, formState: { errors, isValid } } = useForm({mode:"all"});

    const Apiurl = BaseUrl();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true
      };

      useEffect(()=>{
        
        fetch(`${Apiurl}/page/testimonial-list`,{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
        .then((result) =>{
            if(result.IsSuccess == true){
                setdatatestimonial(result)
                setloading(true)
            }
            else 
                if(result.IsSuccess == false){
                    setdatatestimonial(result)
                    setloading(false)
                    seterrorData(result.Message)
                }
            
        }).catch((error)=>{

        })

      },[])

    //   const handleClick = () => {
    //     setShow(!show);
    //   };

    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
       
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
        },
      };

      const onSubmit = (data) =>{


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "Name": data.Name,
            "Designation": data.Designation,
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
        
        fetch(`${Apiurl}/testimonial/add-new`, requestOptions)
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
                    closeModal()
                }
              })
            console.log(result)
          })
          .catch(error => console.log('error', error));
    
        }


    
    
    
    const EmailValue = getValues("Email");
    const PhoneValue = getValues("Phone");


    const onChangeHandler = e => {
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "Email": EmailValue
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${Apiurl}/testimonial/check-user-email-exists`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.Content === true){
                seterrorcheck(true)
                setEmailchecking(result.Message)
            }
            else
            {
                seterrorcheck(false)
            }
           
        })
        .catch(error => console.log('error', error));
  }

  const onChangeHandler1 = e => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "Phone": PhoneValue
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${Apiurl}/testimonial/check-user-phone-exists`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.Content === true){
                seterrorcheck(true)
                setphonechecking(result.Message)
            }
            else
            {
                seterrorcheck(false)
            }
           
        })
        .catch(error => console.log('error', error));

  };
      
    return (
        <div className="relator testimonial-section">
            <div className="container">
                <h4>What client say</h4>
                <h2>Testimonial</h2>
                <div className="teatimonilas_panel">
                { !loading ? 
                    <div className="Loading">{errorData}</div>

                    :

                    <Slider {...settings}>
                    {datatestimonial && datatestimonial.Content.map((item, index)=>{

                        return(
                            <div className="row d-flex" key={index}>
                                
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="testimonials_r">
                                        <span><i className="fas fa-quote-left"></i></span>
                                        <p> {item.Message}</p>
                                        <h3>{item.Name}</h3>
                                        <h4>{item.Designation}</h4>
                                    </div>
                                </div>
                    </div>
                        )
                       
                    })}

                    </Slider>

                }
              
               
                <button type="button" className="btn btn-primary testimonialbtn" onClick={openModal}>Write a testimonial</button>
                    
            </div>
                    </div>

                    <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h2>Give Feedback</h2>
                    <button className="close-btn" onClick={closeModal}><i className="fas fa-window-close"></i></button>
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
                                <input type="email" name="Email" {...register("Email",{required:true,pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})} className="form-control" placeholder="Email"
                                onBlur={(event) => onChangeHandler(event)}
                                />
            
                                {errors.Email && errors.Email.type === "required" && (<p className="errormsg">Field is required</p>)}
                                {errors.Email && errors.Email.type === "pattern" && (<p className="errormsg">Email is not valid</p>)}
                                {errorcheck ? <p className="errormsg">{Emailchecking}</p>:null}
                            </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                <label>Phone</label>
                                <input type="text" maxLength="10" name="Phone" {...register("Phone",{required:true,pattern:/^[0-9\b]+$/,maxLength:10})} className="form-control" placeholder="Phone Number"
                                onBlur={(event) => onChangeHandler1(event)}
                                />
            
                                {errors.Phone && errors.Phone.type === "required" && (<p className="errormsg">Field is required</p>)}
                                {errors.Phone && errors.Phone.type === "pattern" && (<p className="errormsg">Phone number is not valid</p>)}
                                {errors.Phone && errors.Phone.type === "maxLength" && (<p className="errormsg">Maximam 10 Digit</p>)}
            
                                {errorcheck ? <p className="errormsg">{phonechecking}</p>:null}
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
                  </Modal>

        </div>
    )
}

export default Testimonial
