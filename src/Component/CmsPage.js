import React,{useEffect, useState} from 'react';
import {BaseUrl, refreshpage} from '../Common/Comon';
import { useParams } from "react-router-dom";
import img from '../inner_banner.jpg'

const CmsPage = () => {
    const [CmsData, setCmsData] = useState([]);


    const {id} = useParams();
    const Apiurl = BaseUrl();
    var imgApi = `${Apiurl}/file/get-image?q=`;

    

useEffect(() => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`${Apiurl}/master/get-url-content-data?url=${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result);
            if(result.Content != null){
                setCmsData(result.Content);
                console.log(result);
            }
        })
        .catch(error => console.log('error', error));
        window.scrollTo(0, 0)
}, [])


//console.log(CmsData)

    return (
        <React.Fragment>
            <div className="inner-banner cms-p">
            <img src={`${imgApi}/${CmsData.PageImage}`}/>
            <div className="inner-banner-overlay">
                <div className="inn-banner-content">
                    <h1>{CmsData.Title}</h1>
                </div>
            </div>
        </div>
        <div className="comon-page pt-5">
            <div className="container">
                <div className="cms-page">
                   <h3>{CmsData.Title}</h3>
                   <div dangerouslySetInnerHTML={{__html:CmsData.ExactDescription}}/>
            </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default CmsPage
