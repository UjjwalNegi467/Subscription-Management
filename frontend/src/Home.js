import React from 'react';
import Login from './Login.js' ;
import Signup from './Signup.js' ;
import {Link} from 'react-router-dom';
import  "./Home.css" ;
const Home = () => {

return (
    <>
    <h1>Subscription Management System</h1>
    <nav className="navi"> 
    
    <Link to="/login" className="btn"> Login </Link>
    <Link to ="/signup" className="btn">SignUp</Link>

    </nav>
    </>
)

};

export default Home ;