import React,{useState,useEffect} from 'react';
import { BaseUrl } from '../Common/Comon';

const TopFooter = () => {

    const [ConData, setConData] = useState([]);
    const Apiurl = BaseUrl();

    useEffect(() => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`${Apiurl}/master/get-social-network-list`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.Content != null){
                    setConData(result.Content);
                }
                
                
            })
            .catch(error => console.log('error', error));
    }, [])



    return (
        <div className="redphone">
            <div className="container">
                <img src="/images/phoneicon.png"/>
                <span>Planning to have a nice home or office? Call {ConData.Phone} or Chat now</span>
            </div>
        </div>
    )
}

export default TopFooter
