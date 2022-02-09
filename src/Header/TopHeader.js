import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { getToken, getUser, BaseUrl } from '../Common/Comon';


const TopHeader = () => {

    const [conditionButton, setconditionButton] = useState(false)
    const [ConData, setConData] = useState([]);
    const [NewsData, setNewsData] = useState([]);

    const Apiurl = BaseUrl();

    const username = getUser();


    useEffect(() => {
        const token = getToken();
        if(!token){
            setconditionButton(true)
        }
        else{
            setconditionButton(false)
        }
    }, [])

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


    useEffect(()=>{

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch(`${Apiurl}/page/active-news`, requestOptions)
  .then(response => response.json())
  .then(result => {
      if(result.Content != null)
      {
        setNewsData(result.Content);
      }
  })
  .catch(error => console.log('error', error));

    }, [])

    const ids = NewsData.map(object => {
        return object.Id;
      });

      const max = Math.max(...ids);

    return (
        <div className="top-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        {NewsData.filter(newdata => newdata.Id == max).map((item, index)=>{
                            var TextLength = item.Description.length;
                            var TextInfo = item.Description;
                            if(TextLength > 70)
                            {
                                var string2 = TextInfo.substring(0, 70).concat('...');    
                            }
                            else
                            {
                                var string2 = TextInfo; 
                            }

                        
                            return(
                                <p key={index}><b>In the news :</b> <div dangerouslySetInnerHTML={{__html:string2}}/> <Link to={`/news-details/${item.Id}`}>Read More</Link> </p>
                            )
                        })}

                        
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li><a href={`tel:${ConData.Phone}`}>Call {ConData.Phone}</a></li>
                            {conditionButton ?  <li><Link  to="/register">Register </Link><Link className="login-btn"  to="/login">Login <i className="fas fa-user"></i></Link></li> 
                            :
                            <li><Link className="login-btn"  to="/dashboard">Welcome {username} <i className="fas fa-user"></i></Link></li> 
                        }   
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
