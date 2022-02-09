import React,{useState,useEffect} from 'react'
import {BaseUrl, refreshpage} from '../Common/Comon';
import {NavLink} from 'react-router-dom';


const ServicesContent = () => {
    const [CmsData, setCmsData] = useState([]);
    const Apiurl = BaseUrl();
    var imgApi = `${Apiurl}/file/get-image?q=`;

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`${Apiurl}/master/get-url-content-data?url=SERVICE-PAGE-55552`, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                if(result.Content != null){
                    setCmsData(result.Content);
                    console.log(result);
                }
            })
            .catch(error => console.log('error', error));
    }, [])


    return (
        <div className="services-right">
            <h5>Services</h5>
            <h2>{CmsData.Title}</h2>
            <div dangerouslySetInnerHTML={{__html:CmsData.ExactDescription}}/>
            <NavLink exact to="/cms/SERVICE-PAGE-55552" activeClassName="active">Read More</NavLink>
        </div>
    )
}

export default ServicesContent
