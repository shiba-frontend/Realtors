import React from 'react'
import {BaseUrl} from '../Common/Comon';
import {Link} from 'react-router-dom'

const RealtorCard = (props) => {


   const {Name, ExpertId, ProfileImage, PostalCode, Rating, pCModels} = props.info

   const Apiurl = BaseUrl();
   var imgApi = `${Apiurl}/file/get-image?q=`;
   
    return (
        <div className="col-md-4">
            <div className="relatorbox">
                <Link to={`/details/${ExpertId}`}>
                <div className="relatorbox_img">
                    <img src={imgApi + ProfileImage} alt={Name}/>
                </div>
                <div className="relatorbox_text">
                    <h3>{Name}</h3>
                    <div className="card-bottom">
                        <span>{PostalCode}</span>
                        <b><i className="fa fa-star" aria-hidden="true"></i> {Rating}</b>
                    </div>
                    <h5><i className="fas fa-map-marker-alt"></i> &nbsp;
                    {pCModels && pCModels.map((cityList, index)=>{
                        var dataValue = cityList.City;
                        dataValue = dataValue.trim();
                        if(dataValue != "")
                        {
                        var WithComaData = dataValue;
                        if(index < pCModels.length-1){
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
}

export default RealtorCard
