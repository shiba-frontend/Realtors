import React from 'react'
import FindRealtorForm from './FindRealtorForm';
import FindRealtorList from './FindRealtorList';
import BannerForm from '../Component/BannerForm';

const FindRealtor = () => {

    return (
        <React.Fragment>
        <div className="inner-banner">
           <img src="./images/inner_banner.jpg"/>
           <div className="inner-banner-overlay">
                <div className="inn-banner-content">
                    <h1>Agents list</h1>
                </div>
           </div>
        </div>
        <div className="container py-4">
            <div className="find-realtor-form">
                <h4>Find a Agent</h4>
                <BannerForm/>
            </div>
        </div>
       <div className="relator">
        <div className="container">
            <h4>Great Real Estate Agent</h4>
            <h2>Our Top Agent</h2>
            <FindRealtorList/>
        </div>
       </div>
        </React.Fragment>
    )
}

export default FindRealtor
