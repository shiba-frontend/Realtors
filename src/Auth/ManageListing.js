import React from 'react';
import AfterLoginMenu from './AfterLoginMenu';
import { removeUserSession, getUser, refreshpage, getToken } from '../Common/Comon';

const ManageListing = () => {
    const token = getToken();

    if(!token) {

        return null

    }
    else
    {
    return (
        <div className="comon-page py-5">
            <div className="container">
                <div className="row">
                     <AfterLoginMenu/>
                    <div className="col-md-9">
                        <div className="afterlogin_right">
                            fhh
                            <button >Logout</button>
                        </div>
                   
                    </div>
                </div>

               
            </div>
            
        </div>
    )
}
}

export default ManageListing
