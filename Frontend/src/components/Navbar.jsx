import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping,faUser,faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Form, Link } from "react-router";
function Navbar(props){
    return (
        <nav>
            <div className="topnav">
                <Link to="/"><FontAwesomeIcon icon={faHouse}/>Home</Link>
            </div>
            <div className="profile">
                <div className="prof">
                    <Link to="/" id="userprof" onClick={()=>props.setShowLogPage(true)}><FontAwesomeIcon icon={faUser}/>{props.data.profile}</Link>
                </div>
                <div className="dropdown">
                    <Link to="/Orders">Orders</Link>
                </div>
            <Link to="/cart"><FontAwesomeIcon icon={faCartShopping}/>Cart {props.count}</Link> 
            </div>
        </nav>
    );
}

export default Navbar;