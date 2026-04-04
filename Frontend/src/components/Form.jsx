import "./Form.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import api from "../services/api"
import { useState } from "react";
export default function Form(props){
    function signup(){
        props.setData(prev=>({
            login:prev.login=="Login"?"Signup":"Login",
            link:prev.link=="login"?"signup":"login",
            acc:prev.acc=="already"?"dont":"already",
            profile:"Profile"
        }));
        props.setShowSignPage(prev=>!prev);  
        //props.setCredentials({});
    }
    const [styles,setStyles]=useState({
        username:"input",
        pass:"input",
        email:"input"
    });
    const handleSignUp=async (e)=>{ 
        e.preventDefault();
        const userData=props.credentials;
        if(props.data.login=="Signup"){
            try{
                const res=await fetch("http://localhost:5000/signup",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(userData)
                });
                const msg=await res.json();
                alert(msg.message);
                if(msg.code==1){
                    props.setShowSignPage(false);
                    props.setData(prev=>({
                    login:prev.login=="Login"?"Signup":"Login",
                    link:prev.link=="login"?"signup":"login",
                    acc:prev.acc=="already"?"dont":"already",
                    profile:"Profile",
                    }));
                    props.setCredentials(prev=>({username:"",password:"",email:""}));
                }
                if(msg.message=="username already taken") setStyles(prev=>({...prev,username:"incorrect"}));
                else if(msg.message=="email is already used") setStyles(prev=>({...prev,email:"incorrect"}));
            }
            catch(error){
                    console.error("Error",error);
                }
        }
        else{
            try{
                // console.log(props.credentials.);
                const res=await fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(userData)
                });
                const msg=await res.json();
                alert(msg.message);
                if(msg.message=="incorrect password") setStyles(prev=>({...prev,pass:"incorrect"}));
                else if(msg.message=="please enter username and password") setStyles(prev=>({...prev,username:"incorrect"})) 
                if(msg.code==1){
                    props.setShowLogPage(false);
                    props.setData(prev=>({...prev,profile:props.credentials.username}))
                }
            }
                catch(error){
                    console.error("Error",error);
                }
        }
    }
    return (
        <div className="overlay" id="overlay">
            <div className="login"> 
                <button type="button" className="close" onClick={()=>props.setShowLogPage(false)}>×</button>
                <form onSubmit={handleSignUp}>
                    <h1>User {props.data.login}</h1>
                    <label htmlFor="username" className="ul">Username</label><br/>
                    <input type="text" value={props.credentials.username} onChange={(e)=>props.setCredentials(prev=>({...prev,username:e.target.value}))} className={styles.username}/><br/>
                    {props.showsignpage &&
                        <>
                        <label htmlFor="email" className="mail">Email</label><br/>
                        <input type="email" value={props.credentials.email} onChange={(e)=>props.setCredentials(prev=>({...prev,email:e.target.value}))} className={styles.email} /><br/>
                        </>
                    }
                    <label htmlFor="password" className="pl">Password</label><br/>
                    <input type={props.pass} value={props.credentials.password} onChange={(e)=>props.setCredentials(prev=>({...prev,password:e.target.value}))} className={styles.pass} /> 
                    <button className="view" onClick={()=>props.setPass(prev=>prev=="text"?"password":"text")} type="button"><FontAwesomeIcon icon={faEye} /></button><br/><br/>
                    <button type="submit" className="logbut">{props.data.login}</button>
                </form>
            <p>{props.data.acc} have an account? <Link to="/" onClick={signup}> {props.data.link}</Link></p>
            </div>
        </div>
    );
}