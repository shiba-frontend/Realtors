import React,{useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import {BaseUrl} from '../Common/Comon';
import EnqueryForm from './EnqueryForm';
import GiveReview from './GiveReview';
import ReviewList from './ReviewList';


const RealtorDetails = () => {
	const [detailsdata, setdetailsdata] = useState([]);
	const [servicearea, setservicearea] = useState();
	const [specialization, setspecialization] = useState();
	const [ReviewAverage, setReviewAverage] = useState([]);
	


	const {id} = useParams();
	const Apiurl = BaseUrl();
	var imgApi = `${Apiurl}/file/get-image?q=`;

	useEffect(() => {
        
        fetch(`${Apiurl}/expert/get-own-details/${id}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
            setdetailsdata(responseJson.Content);
		  });
		  window.scrollTo(0, 0)
	}, [])
	
	useEffect(() => {
        
        fetch(`${Apiurl}/expert/get-own-service-area-details/${id}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
			setservicearea(responseJson.Content);
           //console.log(responseJson)
          })
	}, [])
	
	useEffect(() => {
        
        fetch(`${Apiurl}/expert/get-own-specialization-details/${id}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
			setspecialization(responseJson.Content);
           //console.log(responseJson)
          })
	}, [])
	
	useEffect(() => {
        
        fetch(`${Apiurl}/master/average-rating-list/${id}`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
			setReviewAverage(responseJson.Content)
          })
	}, [])

	console.log(ReviewAverage)
	


	const {ExpertId, FirstName, LastName, Profilepicture, CoverPicture, DateOfBirth, Phone,
		Email, Description, MinPrice, MaxPrice, MondayStartTimeId, MondayStartTime, MondayEndTimeId,
		MondayEndTime, TuesdayStartTimeId, TuesdayStartTime, TuesdayEndTimeId, TuesdayEndTime, WednesdayStartTimeId, WednesdayStartTime, WednesdayEndTimeId, WednesdayEndTime, ThursdayStartTimeId, ThursdayStartTime, ThursdayEndTimeId, ThursdayEndTime, FridayStartTimeId,
		FridayStartTime, FridayEndTimeId, FridayEndTime, SaturdayStartTimeId, SaturdayStartTime, SaturdayEndTimeId, SaturdayEndTime, PinCode, BusinessName, BusinessAddress, Category,
		SubCategory, Website

	} = detailsdata;

	useEffect(()=>{
			document.title = 'Realtor Details';
	},[])


	if(
		MondayStartTimeId == 0 || MondayEndTimeId == 0){
		var style= "de-active"
	}
	if(
		TuesdayStartTimeId == 0 || TuesdayEndTimeId == 0 ){
		var style1= "de-active"
	}
	if(
		WednesdayStartTimeId == 0 || WednesdayEndTimeId == 0 ){
		var style2= "de-active"
	}
	if(
		ThursdayStartTimeId == 0 || ThursdayEndTimeId == 0 ){
		var style3= "de-active"
	}
	if(
		FridayStartTimeId == 0 || FridayEndTimeId == 0 ){
		var style4= "de-active"
	}
	if(
		SaturdayStartTimeId == 0 || SaturdayEndTimeId == 0 ){
		var style5= "de-active"
	}
	// if(
	// 	MondayStartTimeId == 0 && MondayEndTimeId == 0 
	// 	&& TuesdayStartTimeId == 0 && TuesdayEndTimeId == 0 
	// 	&& WednesdayStartTimeId == 0 && WednesdayEndTimeId == 0
	// 	&& ThursdayStartTimeId == 0 && ThursdayEndTimeId == 0
	// 	&& FridayStartTimeId == 0 && FridayEndTimeId == 0
	// 	&& SaturdayStartTimeId == 0 && SaturdayEndTimeId == 0
	// 	){
	// 	var style= "de-active"
	// }

    return (
        <React.Fragment>
            <div className="details-background">
                <img src={`${imgApi}${CoverPicture}`}/>
            </div>
            <div className="findrealtor_panel">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <div className="findrealtor_top_l">
                                <img src={`${imgApi}${Profilepicture}`} alt={FirstName}/>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="findrealtor_top_r">
                                <h3>{FirstName} {LastName}</h3>
                                <h5>COUNTRY BOY REALTY</h5>
                                <h6>Write Matthew Loder' 1st recommendation</h6>
								<h6><i className="fa fa-star" aria-hidden="true"></i> &nbsp; 
								{ReviewAverage && ReviewAverage.map((item, index)=>{
									return(
										item.AverageRating
									)
									
								})}
								</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
	<div className="row">
		<div className="col-lg-8 col-md-12 col-sm-12">
			<div className="findrealtorbottom_l">
			  <div className="fullborder">
				<h2>About <b>{FirstName} {LastName}</b></h2>
				<p>{Description} </p>
				</div>
			</div>
			
			<div className="row expbox">
				<div className="col-lg-3 col-ms-12 col-sm-12">
					<div className="exppanel">
						<h3>Experience</h3>
						<span>22 years</span>
					</div>
				</div>
				<div className="col-lg-8 col-ms-12 col-sm-12">
					<div className="exppanel">
						<h3>Price Range (last 24 months)</h3>
						<span>${MinPrice} - ${MaxPrice}</span>
					</div>
				</div>
			</div>
			
			<div className="row expbox">
				<div className="col-lg-9 col-ms-12 col-sm-12">
					<div className="exppanel">
						<h3>Areas Served</h3>
						<ul>
						{servicearea && servicearea.map((itemsarea, index)=>{
							return (
								<li key={index}>{itemsarea.ServiceAreaName}</li>
							)
						})}
						</ul>
					</div>
				</div>				
			</div>
			
			<div className="row expbox">
				<div className="col-lg-10 col-ms-12 col-sm-12">
					<div className="exppanel">
						<h3>Specializations</h3>
						<ul className="explist">
						{specialization && specialization.map((item, index)=>{
							return (
								<li key={index}>{item.SpecializationsName}</li>
							)
						})}							
							
						</ul>
					</div>
				</div>				
			</div>
			
			
			<div className="row">
				<div className="col-lg-10 col-ms-12 col-sm-12">
					<div className="exppanel">
						<h3>Business Hours</h3>
						<span className={style}><b>Monday</b> {MondayStartTime} - {MondayEndTime}</span>
						<span className={style1}><b>Tuesday</b> {TuesdayStartTime} - {TuesdayEndTime}</span>
						<span className={style2}><b>Wednesday</b> {WednesdayStartTime} - {WednesdayEndTime}</span>
						<span className={style3}><b>Thrusday</b> {ThursdayStartTime} - {ThursdayEndTime}</span>
						<span className={style4}><b>Friday</b> {FridayStartTime} - {FridayEndTime}</span>
						<span className={style5}><b>Saturday</b> {SaturdayStartTime} - {SaturdayEndTime}</span>
					</div>
				</div>				
			</div>
			
			
		   <GiveReview/>
						
		   <ReviewList/>
			
		</div>
		<div className="col-lg-4 col-md-12 col-sm-12">
			<div className="findrealtorbottom_r">
				<h2>Enquiry Form</h2>
				<EnqueryForm/>				
			</div>
			
		</div>
	</div>
</div>
        </React.Fragment>
    )
}

export default RealtorDetails
