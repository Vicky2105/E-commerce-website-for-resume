import Navbar from "../components/Navbar";
import Body from "../components/ProductCard";
import Form from "../components/Form"
import items from "../components/items"
import { useState } from "react";
function Home(props){
    return (
        <>
            <Navbar login={props.login} count={props.count} setShowLogPage={props.setShowLogPage} showlogpage={props.showlogpage} data={props.data}/>
            <div className="items">
                {items.map((item) => (
                <Body 
                    key={item.id}
                    setCount={props.setCount}
                    item={item}
                    userid={props.userid} />
                ))}
            </div>
            {props.showlogpage && !props.login && <Form setLogin={props.setLogin} setUserid={props.setUserid} data={props.data} setData={props.setData} setShowLogPage={props.setShowLogPage} showsignpage={props.showsignpage} 
            setShowSignPage={props.setShowSignPage} pass={props.pass} setPass={props.setPass} credentials={props.credentials} setCredentials={props.setCredentials} /> }
        </>
    );
}
export default Home;