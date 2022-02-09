import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BaseUrl} from '../Common/Comon';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';

const FindRealtorList = () => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage, setperPage] = useState(9);
    const [HasMore, setHasMore] = useState(true);
    const [errormsg, seterrormsg] = useState();
    const [Condition, setCondition] = useState(false)

    const query = new URLSearchParams(window.location.search);
    var zipcode  = query.get('zipcode');
    var arealist  = query.getAll('Area');
    var specializatinlist  = query.getAll('Specialization');
    var Rname  = query.get('Name');



    var queryparam = `Limit=${perPage}&Offset=${offset}`

    if(zipcode != null){
        queryparam += `&Pincode=${zipcode}`
    }
    if(arealist != null){
        queryparam += `&Area=${arealist}`
    }
    if(specializatinlist != null){
        queryparam += `&Specialization=${specializatinlist}`
    }
    if(Rname != null){
        queryparam += `&Name=${Rname}`
    }
    
    console.log(queryparam);
    const Apiurl = BaseUrl();
    var imgApi = `${Apiurl}/file/get-image?q=`;

    const handlePageClick = () =>{
        var requestOptions = {
            method: 'GET',
            headers:{
              "Content-Type":"application/json"
            },
            redirect: 'follow'
          };
          
          fetch(`${Apiurl}/expert/top-rated-expert-list?${queryparam}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if("Content" in result){
                    if(result.Content != null){
                        var datalist = result.Content;
                        setData((prevdata) => {
                            return [...new Set([...prevdata, ...datalist])];
                          });
                          setOffset((prevPageNumber)=>prevPageNumber + perPage);
                          var IsLoadMoreVisiable = datalist.length == perPage;
                          //console.log("loadmore",IsLoadMoreVisiable)
                          setHasMore(IsLoadMoreVisiable);
                          setCondition(true)
                    }
                    else{
                        seterrormsg(result.Message);
                        setCondition(false)
                        
                    }
                }

              
              })
            .catch(error => console.log('error', error));
    }


 useEffect(() => {
    handlePageClick();
    document.title = 'Agent List';
 }, [])


    return (
            <React.Fragment>


            <div className="row">
            
                {data && data.map((info, index)=>{
                    return (
                        <div className="col-md-4" key={index}>
                            <div className="relatorbox">
                            <Link to={`/details/${info.ExpertId}`}>
                                    <div className="relatorbox_img">
                                        <img src={`${imgApi}${info.ProfileImage}`} />
                                    </div>
                                    <div className="relatorbox_text">
                                        <h3>{info.Name}</h3>
                                        <div className="card-bottom">
                                            <span>{info.PostalCode}</span>
                                            <b><i className="fa fa-star" aria-hidden="true"></i> {info.Rating}</b>
                                        </div>
                                        <h5><i className="fas fa-map-marker-alt"></i> &nbsp;
                                        {info.pCModels && info.pCModels.map((cityList, index)=>{
                                            var dataValue = cityList.City;
                                            dataValue = dataValue.trim();
                                            if(dataValue != "")
                                            {
                                            var WithComaData = dataValue;
                                            if(index < info.pCModels.length-1){
                                                WithComaData +=', ';
                                            }
                                        }
                                    
                                            return(
                                                WithComaData
                                            )
                                            
                                        })}
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            <p> {errormsg }</p>
                {Condition ? 

            <div className="load-more">
                {HasMore ? 
                    <button onClick={handlePageClick} type="button">Load More</button>
                :
                null
                }
            </div>
            
            :
            null
            }
       
        </React.Fragment>
    )
}

export default FindRealtorList
