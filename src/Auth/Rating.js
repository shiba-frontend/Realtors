import React, { useState, useEffect } from 'react';
import AfterLoginMenu from './AfterLoginMenu';
import {BaseUrl, removeUserSession, getToken, getId, refreshpage} from '../Common/Comon';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import IdleTimer,{ useIdleTimer } from 'react-idle-timer';

const Rating = () => {

    const [ratingdata, setratingdata] = useState();
    const [error, seterror] = useState(false);
    const [Dmsg, setDmsg] = useState();

    const token = getToken();
    const Apiurl = BaseUrl();
    const history = useHistory();
    const ExpertId = getId();

    useEffect(()=>{
		document.title = 'Rating';
	},[])

    useEffect(() => { 
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`${Apiurl}/expert/rated-details-list?id=${ExpertId}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.Content != null){
            setratingdata(result);
            console.log(result)
            }
            else{
                setDmsg(result.Message);
            }
          })
          .catch(error => console.log('error', error)); 

    }, [])


    return (
        <div className="comon-page py-5">
            <div className="container">
                <div className="row">
                    <AfterLoginMenu/>
                    <div className="col-md-9">
                    <div className="afterlogin_right">
                    <h2>Rating</h2>
                    <div className="table-responsive">
                    {Dmsg ? <h4>{Dmsg}</h4> :
					<table className="tableafterprofile">
						<tbody><tr>
							<th>Date</th>
							<th>User Email</th>
							<th>Rating Message</th>
							<th>Rating</th>							
						</tr>
                        {ratingdata && ratingdata.Content.map((item, index)=>{
                            return(
                                <tr key={index} id={item.Id}>
                                    <td><span>{item.RatedOn}</span></td>
                                    <td><span>{item.Email}</span></td>
                                    <td><span>{item.Review}</span></td>
                                    <td><span><i className="fas fa-star" aria-hidden="true"></i> {item.Rating} Stars</span></td>	
                                </tr>
                            )
                        })} 
                        
                        
						
                    </tbody>
                    
                    </table>
                    }
				</div>
                    </div>
                
                    </div>
                </div>

            
            </div>

        
    </div>

    

    )

}

export default Rating
