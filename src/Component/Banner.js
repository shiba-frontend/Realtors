import React,{useState, useEffect} from 'react';
import Slider from "react-slick";
import BannerForm from './BannerForm';
import axios from 'axios';
import parse from 'html-react-parser';
import {BaseUrl} from '../Common/Comon'

const Banner = () => {
    const [BannerImg, setBannerImg] = useState();
    const [BannerContent, setBannerContent] = useState();
    const [errorData, seterrorData] = useState();
    const [Loading, setLoading] = useState(false);

    const Apiurl = BaseUrl();
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true
      };

    useEffect(() => {
        
          fetch(`${Apiurl}/page/banner-image-list`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          
          })
            .then((response) => response.json())
            .then((responseJson) => {
             //console.log(responseJson);
             if(responseJson.Content != null){
                setBannerImg(responseJson);
             }
              else{
                seterrorData(responseJson.Message)
                setLoading(true)
              }
            })
            .catch((error) => {
            });
       
    }, []);

    useEffect(() => {
        
        fetch(`${Apiurl}/page/banner-content`, {
          method: 'GET',
        
        })
          .then((response) => response.json())
          .then((responseJson) => {
              if(responseJson.Content != null)
              {
                setBannerContent(responseJson.Content);
              }
            
          })
          .catch((error) => {
          });
     
  }, []);
   
//console.log(BannerContent)


    var imgApi = `${Apiurl}/file/get-image?q=`
    //console.log(imgApi)
    
    const rawdata = BannerContent && BannerContent.Description;
    
    return (
        <div className="banner">
        {!Loading ? 
            <Slider {...settings}>
            {BannerImg && BannerImg.Content.map((item, index)=>{
                return (
                    <div key={index} className="banner-item">
                        <img src={imgApi + item.ImageName}/>
                    </div>
                )
            })}
      </Slider>
      :
      <h1>{errorData}</h1>
        }
       
        

            <div className="banner-overlay">
                <div className="banner-overlay_content">
                    <div className="row">
                        <div className="col-md-7">
                        <div className="banner-left">
                        <h4>{BannerContent && BannerContent.Title}</h4>
                        <div dangerouslySetInnerHTML={ {__html: rawdata} } />
                        <ul>
                            {BannerContent && BannerContent.IsLinkButtonActive === true ? 
                            <li><a className="freequotebtn" href="">{BannerContent && BannerContent.ButtonLebel}</a></li>
                            : null
                        }
                        </ul>
                    </div>
                        </div>
                        <div className="col-md-5">
                            <div className="banner-form">
                                <h2>Find a Agent</h2>
                                <BannerForm/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner
