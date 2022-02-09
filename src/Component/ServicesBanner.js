import React,{useEffect, useState} from 'react';
import {BaseUrl, refreshpage} from '../Common/Comon';
import Slider from "react-slick";

const ServicesBanner = () => {

    const [ServicesBannerData, setServicesBannerData] = useState([]);

    const Apiurl = BaseUrl();
    var imgApi = `${Apiurl}/file/get-image?q=`;


    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`${Apiurl}/page/recent-expert`, requestOptions)
            .then(response => response.json())
          .then(result => {
              if(result.Content != null)
              {
                  setServicesBannerData(result.Content)
              }
          })
            .catch(error => console.log('error', error));
    },[])

  


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true,
        margin:15,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
              }
            }
          ]
      };

    return (
        <Slider {...settings}>
        {ServicesBannerData && ServicesBannerData.map((item, index)=>{
            return (
                <div key={index} className="services-slider-item">
                    <div className="slider-image">
                    <img src={`${imgApi}${item.ProfileImage}`}/>

                    </div>
                    <div className="slide-overlay">
                        <h5>{item.Name}</h5>
                        <label>{item.PostalCode} </label>
                        <span><i className="fas fa-map-marker-alt"></i> &nbsp;
                        
                        {item.pCModels && item.pCModels.map((cityList, index)=>{
                            var dataValue = cityList.City;
                            dataValue = dataValue.trim();
                            if(dataValue != "")
                            {
                            var WithComaData = dataValue;
                            if(index < item.pCModels.length-1){
                                WithComaData +=', ';
                            }
                        }
                       
                            return(
                                WithComaData
                            )
                            
                        })}
                        </span>
                    </div>
                </div>
            )
        })}
  </Slider>
    )
}

export default ServicesBanner
