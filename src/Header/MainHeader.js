import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Nav from './Nav';
import {SessionTimeoutAlert, BaseUrl} from '../Common/Comon';

const MainHeader = () => {

    SessionTimeoutAlert();


    return (
        <div className="main-header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4 col-7 order-2 order-lg-1">
                        <div className="logo">
                            <Link to="/"><img src="../images/logo.png" alt="Logo"/></Link>
                        </div>
                    </div>
                    <div className="col-md-8 col-5 order-1 order-lg-2">
                        <Nav/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHeader
