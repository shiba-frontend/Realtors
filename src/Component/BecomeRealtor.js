import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import { getToken, getUser } from '../Common/Comon';

const BecomeRealtor = () => {

    const [conditionButton, setconditionButton] = useState(false)


    useEffect(() => {
        const token = getToken();
        if(!token){
            setconditionButton(true)
        }
        else{
            setconditionButton(false)
        }
    }, [])

    return (
        <div className="container">
            <div className="row align-items-center justify-content-between py-5">
                <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="relator_services_l">
                        <h3>Become a Realtor</h3>					
                        <p>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    </div>			
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12">
                    {
                        conditionButton ? 
                        <div className="relator_services_r text-right">
                        <Link to="/register">GET STARTED </Link>
                    </div>

                    :
                    <div className="relator_services_r text-right">
                    <Link to="/dashboard">Dashboard </Link>
                    </div>
                    }
                    	
                </div>
            </div>
        </div>
    )
}

export default BecomeRealtor
