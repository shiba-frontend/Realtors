import React,{useState, useEffect} from 'react'
import RealtorCard from './RealtorCard';
import {BaseUrl} from '../Common/Comon'

const RealtorList = () => {
    const [realtordata, setrealtodata] = useState()
    const Apiurl = BaseUrl();

    useEffect(() => {
        
        fetch(`${Apiurl}/page/top-3-expert`,{
            method:'GET',
            headers:{
                Accept:'Accept/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
          .then((responseJson) => {
              if(responseJson.Content != null)
              {
                setrealtodata(responseJson);
              }
            
           //console.log(responseJson)
          })
    }, [])

    //console.log(realtordata);
    return (
            <div className="row">
            {realtordata && realtordata.Content.map((item, index)=>{
               return ( <RealtorCard key={index} info={item} /> )
               
            })}
        </div>
    )
}

export default RealtorList
