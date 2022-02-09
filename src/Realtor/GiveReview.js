import React,{useState} from 'react';
import StarRatings from 'react-star-ratings';
import {BaseUrl} from '../Common/Comon';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const GiveReview = () => {

    const [Rating, setRating] = useState();
    const [errorMsg, seterrorMsg] = useState("");
    const [Emailchecking, setEmailchecking] = useState();
    const [errorcheck, seterrorcheck] = useState(false);

    const { register, getValues, handleSubmit, reset,  watch, formState: { errors, isValid } } = useForm({mode: 'all'});

    const {id} = useParams();
    const Apiurl = BaseUrl();


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

        fetch(`${Apiurl}/master/check-rating-user-email-exists`, requestOptions)
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
  };


   const changeRating = ( newRating, name ) => {
       setRating(newRating)
    }
    const onSubmit = data => {
        console.log(data)
        if(!Rating){
            seterrorMsg("Field is Required !");
        }
        else{
            seterrorMsg("");
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "Id": 0,
            "ExpertId": id,
            "VisitorId": 2,
            "Email": data.Email,
            "Rating": Rating,
            "Review": data.Review,
            "StatusId": 0
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(`${Apiurl}/master/insert-update-rating-review`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.IsSuccess === true)
                {
                    Swal.fire({
                        title: 'Thanks for your feedback !',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                      }).then((result) => {
                        if (result.isConfirmed) {
                            reset();
                        }
                      })
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
    };
    console.log(Rating);

    return (
            <div className="detailsreviewcomments">
            <h4>Reviews &amp; Comments</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 form-group">
            <StarRatings
            rating={Rating}
            starRatedColor="Red"
            changeRating={changeRating}
            numberOfStars={5}
            starDimension="30px"
            name='rating'
          />
          {<p className="errormsg">{errorMsg}</p>}
          </div>
            <div className="form-group">
                <input type="email" name="Email" {...register("Email",{required:true,pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})} className="form-control" placeholder="Email"
                onBlur={(event) => onChangeHandler(event)}
                autoComplete="off"
                />

                {errors.Email && errors.Email.type === "required" && (<p className="errormsg">Field is required</p>)}
                {errors.Email && errors.Email.type === "pattern" && (<p className="errormsg">Email is not valid</p>)}
                {errorcheck ? <p className="errormsg">{Emailchecking}</p>:null}
            </div>

            <textarea placeholder="Write your review here" name="Review" {...register("Review",{required:true})}></textarea>
            {errors.Review && errors.Review.type === "required" && (<p className="errormsg">Field is required</p>)}
            <div className="clr"></div>
            <input type="submit" value="send" className="detailssend"/>
            </form>
        </div>
    )
}

export default GiveReview



