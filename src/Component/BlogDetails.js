import React,{useEffect,useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {BaseUrl, refreshpage} from '../Common/Comon';
import img from '../inner_banner.jpg'

export const BlogDetails = () => {
    const [NewsData, setNewsData] = useState([]);

    const {id} = useParams();
    const Apiurl = BaseUrl();
    var imgApi = `${Apiurl}/file/get-image?q=`;


    useEffect(()=>{
		document.title = "Blog Details";
	},[])
    useEffect(()=>{

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`${Apiurl}/master/blog-content-list/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
              if(result.Content != null)
              {
                setNewsData(...result.Content);
              }
          })
          .catch(error => console.log('error', error));
          window.scrollTo(0, 0)
            }, [])

    return (

        <React.Fragment>
            <div className="inner-banner">
            <img src={img}/>
            <div className="inner-banner-overlay">
                <div className="inn-banner-content">
                    <h1>{NewsData.Title}</h1>
                </div>
            </div>
        </div>
        <div className="comon-page py-5">
            <div className="container">
                <div className="cms-page">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="news-left">
                                <h3>{NewsData.Title}</h3>
                                <div dangerouslySetInnerHTML={{__html:NewsData.Description}} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <img src={`${imgApi}/${NewsData.BlogImage}`} className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}
