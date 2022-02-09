import React,{useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { setUserSession, refreshpage, BaseUrl } from '../Common/Comon';

const Login = (props) => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //const [cookies, setCookie] = useCookies(['ExpiredTime']);
    
    
    //const Swal = require('sweetalert2');
    let history = useHistory();
    const Apiurl = BaseUrl();


    useEffect(()=>{
		document.title = 'Login';
	},[])

    const HandleLogin = () => {
        setError(null);
        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);
        urlencoded.append("grant_type", "password");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch(`${Apiurl}/oauth/token`, requestOptions)
        .then(response => response.text())
        .then(result => {
            setLoading(false);
            var tokendata = JSON.parse(result);
            //console.log(tokendata);
            if("access_token" in tokendata)
            { 
                setUserSession(tokendata.access_token, tokendata.user_name, tokendata.user_id, tokendata.expires_in);
                        //Cookies.set('expiredtime', tokendata.expires_in, { path: '/' })
                        history.push('/dashboard');
                        refreshpage();
                
            }
            else
            {
                setLoading(false);
                setError(tokendata.error_description);
            }
        })
        .catch(error =>{
            setLoading(false);
            setError("Something went wrong. Please try again later.");
        } );


      }



    return (
        <div className="comon-page">
            <div className="container">
                <div className="login-form">
                    <h2>Login</h2>
                    <form>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                                <input type="text" name="username" 
                                value={username} 
                                onChange={(e)=>setusername(e.target.value)}
                                className="form-control" placeholder="Email"/>
                            </div>
                        </div>			
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                                 <input type="password" name="password"
                                 value={password} 
                                onChange={(e)=>setpassword(e.target.value)}
                                 className="form-control" placeholder="Password" />
                                 
                            </div>
                        </div>			
                    </div>
                    
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-5 col-5">
                                    <Link className="frgtpassword" to="/forgot-password">Forgot to password?</Link>
                                </div>
                                <div className="col-md-7 col-7 text-right">
                                    <label>Don't have account ? <Link  to="/register">Register</Link></label>
                                </div>
                                
                            </div>
                          
                        </div>
                        {error && <p className="errormsg">{error}</p>}
                        <input type="submit" value={loading ? "Loading..." : "Sign In"} 
                        disabled={loading}
                        className="signupbtn" onClick={HandleLogin}  />
                    </form>
                </div>
            </div>
            
        </div>

        
    )
}

export default Login
