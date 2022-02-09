import React,{useState,useEffect} from 'react';
import { BaseUrl } from '../Common/Comon';
import {NavLink} from 'react-router-dom';

const BottomFooter = () => {

    const [ConData, setConData] = useState([]);
    const Apiurl = BaseUrl();

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

    return (
        <div className="footer">
            <div className="container">
            <div className="row">
			<div className="col-lg-4 col-md-12 col-sm-12">
				<div className="footer_l">
					<img src="/images/footer_icon.png" alt="footer_icon"/>
					<p>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also</p>
				</div>
			</div>
			<div className="col-lg-2 col-md-12 col-sm-12">
				<div className="footerbox">
					<h3>Quick Links</h3>
					<ul>
					<li><NavLink exact to="/find-realtor" activeClassName="active">Find Realtor</NavLink></li>
					<li><NavLink exact to="/news" activeClassName="active">News</NavLink></li>
					<li><NavLink exact to="/blog" activeClassName="active">Blog</NavLink></li>
					</ul>
				</div>
			</div>
			<div className="col-lg-3 col-md-12 col-sm-12">
				<div className="footerbox">
					<h3>Main office</h3>
					<p>{ConData.Address}</p>	
					<h3>Contact No</h3>	
					<p><a href={`tel:+${ConData.Phone}`}>{ConData.Phone}</a></p>			
				</div>
			</div>
			<div className="col-lg-3 col-md-12 col-sm-12">
				<div className="footerbox">
					<h3>Email</h3>					
					<p><a href="mailto:contact@sitename.com">{ConData.Email}</a></p>			
				</div>
			</div>
		</div>
            </div>
            <div className="copyright">
                <p>© {(new Date().getFullYear())} Great Relators of America. All rights reserved. <a href="">Privacy Statement</a></p>
            </div>
        </div>
    )
}

export default BottomFooter
