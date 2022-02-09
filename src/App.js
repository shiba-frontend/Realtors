import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Component/Home";
import About from "./Component/About";
import NotFound from './NotFound'
import Login from "./Auth/Login";
import Footer from "./Footer/Footer";
import Register from "./Component/Register";
import axios from 'axios';
//import RegisterForm from "./Component/RegisterForm";
import PrivateRoute from './Common/PrivateRoute';
import PublicRoute from './Common/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Common/Comon';
import Dashboard from "./Auth/Dashboard";
import AfterLoginMenu from './Auth/AfterLoginMenu';
import ManageListing from './Auth/ManageListing';
import Notification from './Auth/Notification';
import FindRealtor from './Realtor/FindRealtor';
import RealtorDetails from './Realtor/RealtorDetails';
import MyLeads from './Auth/MyLeads';
import Rating from './Auth/Rating';
import ChangePassword from './Auth/ChangePassword';
import HelpSupport from './Auth/HelpSupport';
import ForgotPassword from './Auth/ForgotPassword';
import ContactUs from './Component/ContactUs';
import ChangePasswordBeforeL from './Auth/ChangePasswordBeforeL';
import CmsPage from './Component/CmsPage';
import News from './Component/News';
import Blog from './Component/Blog';
import NewsDetails from './Component/NewsDetails';
import { BlogDetails } from './Component/BlogDetails';


function App() {
  const [authLoading, setAuthLoading] = useState(true);

  const token = getToken();

  return (
    <div className="App">
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/About" component={About}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/find-realtor" component={FindRealtor}></Route>
                <Route exact path="/news" component={News}></Route>
                <Route exact path="/news-details/:id" component={NewsDetails}></Route>
                <Route exact path="/blog" component={Blog}></Route>
                <Route exact path="/blog-details/:id" component={BlogDetails}></Route>
                <Route exact path="/details/:id" component={RealtorDetails}></Route>
                <Route exact path="/cms/:id" component={CmsPage}></Route>
                <Route exact path="/contact-us" component={ContactUs}></Route>
                <Route exact path="/forgot-password" component={ForgotPassword}></Route>
                <Route exact path="/change_password" component={ChangePasswordBeforeL}></Route>
                <PublicRoute exact path="/login" component={Login}></PublicRoute>
                <PrivateRoute  exact path="/dashboard" component={Dashboard}></PrivateRoute>
                <PrivateRoute exact path="/my-leads" component={MyLeads}></PrivateRoute>
                <PrivateRoute  exact path="/notification" component={Notification}></PrivateRoute>
                <PrivateRoute exact path="/rating" component={Rating}></PrivateRoute>
                <PrivateRoute exact path="/change-password" component={ChangePassword}></PrivateRoute>
                <PrivateRoute exact path="/help-support" component={HelpSupport}></PrivateRoute>
                <Route path="*" component={NotFound} />
            </Switch>
           
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
