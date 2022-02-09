import React,{useState, useEffect} from 'react';
import {BaseUrl, refreshpage} from '../Common/Comon';
import {Link, useParams} from 'react-router-dom';

const News = () => {
    const [NewsData, setNewsData] = useState([]);

    const Apiurl = BaseUrl();
    var imgApi = `${Apiurl}/file/get-image?q=`;

    useEffect(()=>{
		document.title = 'News';
	},[])

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


    return (
        <React.Fragment>
        <div className="inner-banner">
            <img src="./images/inner_banner.jpg"/>
            <div className="inner-banner-overlay">
                <div className="inn-banner-content">
                    <h1>News</h1>
                </div>
            </div>
        </div>
        <div className="comon-page pt-5">
            <div className="container">
                <div className="cms-page">
                   <h3>News</h3>
                   <div className="row">
                        {NewsData && NewsData.map((item, index)=>{
                            var TextLength = item.Description.length;
                            var TextInfo = item.Description;
                            if(TextLength > 100)
                            {
                                var string2 = TextInfo.substring(0, 200).concat('...');    
                            }
                            else
                            {
                                var string2 = TextInfo; 
                            }
                            return(
                                <div className="col-md-4" key={index}>
                                    <div className="news-box">
                                        <Link to={`/news-details/${item.Id}`}>
                                            <div className="news-box_image">
                                                <img src={`${imgApi}${item.NewsImage}`}/>
                                            </div>
                                            <div className="news-box-content">
                                                <h3>{item.Title}</h3>
                                                <p dangerouslySetInnerHTML={{__html:string2}}/>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                        
                   </div>
                </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default News
