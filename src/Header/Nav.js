import React,{useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {BaseUrl} from '../Common/Comon';


const Nav = () => {
    const ApiUrl = BaseUrl();

    const [toggle, settoggle] = useState("");
    const [MenuList, SetMenuList] = useState([]);

    const HandleButton = () =>{
        settoggle(toggle === "" ? "active" : "");
    }

    useEffect(() => {

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`${ApiUrl}/master/get-menu-list?id=0`, requestOptions)
          .then(response => response.json())
          .then(result =>{
              if(result.Content != null){
                SetMenuList(result.Content);
              } 
            })
          .catch(error => console.log('error', error));
    }, [])

    const windowLoad = () =>{
        window.location.reload(false);
    }


    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button onClick={HandleButton} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                 
                            <div className="collapse navbar-collapse" className={`collapse navbar-collapse ${toggle}`} id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                        <ul>
                            <li><NavLink exact to="/"  activeClassName="active">Home</NavLink></li>
                            {MenuList.filter(menu => menu.ParentId == 0).map((list, index)=>{
                                return(
                                    <li onClick={windowLoad} key={index}><NavLink activeClassName="active" id={list.ParentLink} exact to={`/cms/${list.ParentLink}`}>{list.MenuName}</NavLink></li>
                                )
                            })}
                            
                            <li><NavLink exact to="/find-realtor" activeClassName="active">Find Agent</NavLink></li>
                            <li><NavLink exact to="/news" activeClassName="active">News</NavLink></li>
                            <li><NavLink exact to="/blog" activeClassName="active">Blog</NavLink></li>
                            <li><NavLink exact to="/contact-us" activeClassName="active">Contact</NavLink></li>
                            </ul>
                            
                        </div>
                    </div>
               
                        
                
                   
                    </nav>

    )
}

export default Nav
