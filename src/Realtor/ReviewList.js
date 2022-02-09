import React,{useState, useEffect} from 'react';
import {BaseUrl} from '../Common/Comon';
import { useParams } from "react-router-dom";


const ReviewList = () => {

	const[Data, setData] = useState([]);

	const Apiurl = BaseUrl();
	const {id} = useParams();

	useEffect(() => {
		
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  
		  fetch(`${Apiurl}/master/get-rating-review-list?id=${id}`, requestOptions)
			.then(response => response.json())
			.then(result => {
				if(result.Content != null){
					setData(result.Content);
				}
				
				console.log(result)
			})
			.catch(error => console.log('error', error));
	}, [])



    return (
		<React.Fragment>
		{Data.filter(newdata => newdata.StatusId === 1).map((item, index)=>{
			var StarData = [];
			for(var i = 0; i <5; i++){
				if(i < item.Rating){
					StarData.push(<i className="fa fa-star checked"></i>)
				}
				else {
					StarData.push(<i className="fa fa-star"></i>)
				}
			}
			return (
				<div className="detailsreviewbox" key={index}>
				<h3>{item.Subject} 
				<span><em>Posted On</em> {item.CreatedOn} </span></h3>
				<div className="detailsreviewstar">
					{StarData}
				</div>
				<p>{item.Review}</p>
			</div>
			)
	})
	}
	</React.Fragment>

			
    )
}

export default ReviewList
