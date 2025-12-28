import React from 'react';
import { Route , Routes} from 'react-router-dom';
import Login from "./Login.js" ;
import Signup from "./Signup.js";
import Home from './Home.js';
import Subscription from "./subscription";
import AdminDashboard from "./admindashboard";

const Myroutes = () => {

return (

    <>   
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>  
         <Route path="/subscription" element={<Subscription />} />
         <Route path="/admin" element={<AdminDashboard />} /> 
     </Routes>

    </>
)
};

export default Myroutes ;

