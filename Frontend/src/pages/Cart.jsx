import CartProds from "../components/CartProds";
import Navbar from "../components/Navbar";
import { useState } from "react";
import LoginForm from "../components/Form"
export default function Cart(props){
    
    return (
        <>
            <Navbar setShowLogPage={props.setShowLogPage} showlogpage={props.showlogpage} count={props.count} data={props.data}/>
            <CartProds  userid={props.userid} count={props.count} price={props.price}/>
            {props.showlogpage && <LoginForm userid={props.userid} setUserid={props.setUserid} data={props.data} setData={props.setData} setShowLogPage={props.setShowLogPage} showsignpage={props.showsignpage} 
            setShowSignPage={props.setShowSignPage} pass={props.pass} setPass={props.setPass} credentials={props.credentials} setCredentials={props.setCredentials}/>}
        </>
    );
}