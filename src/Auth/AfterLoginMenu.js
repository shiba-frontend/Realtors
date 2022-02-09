import React from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { removeUserSession, refreshpage, getToken } from '../Common/Comon';

const AfterLoginMenu = () => {


    let history = useHistory();

    const HandleLogout = () =>{


        Swal.fire({
            title: 'Are you sure Logout?',
            //text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
                removeUserSession();
                history.push("./login")
                refreshpage();
            }
          })

        
    }

    return (
        <div className="col-md-3">
            <div className="dashboard-menu">
            <ul>
                <li><NavLink exact to="/dashboard" activeClassName="active"><i className="far fa-user"></i> Manage Profile</NavLink></li>
                <li><NavLink exact to="/my-leads" activeClassName="active"><i className="fab fa-accessible-icon"></i> My Leads</NavLink></li>
                <li><NavLink exact to="/notification" activeClassName="active"><i className="far fa-star"></i> Notification</NavLink></li>
                <li><NavLink exact to="/rating" activeClassName="active"><i className="fas fa-list-ul"></i> Rating</NavLink></li>
                <li><NavLink exact to="/change-password" activeClassName="active"><i className="fas fa-key"></i> Change Password</NavLink></li>
                <li><NavLink exact to="/help-support" activeClassName="active"><i className="fas fa-question-circle"></i> Help & Support</NavLink></li>
                <li><button onClick={HandleLogout}><i className="fas fa-sign-out-alt"></i> Log Out</button></li>
            </ul>
            </div>
        </div>
    )
}

export default AfterLoginMenu
