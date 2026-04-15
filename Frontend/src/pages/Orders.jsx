import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Orders.css"

export default function orders(props){
    const [cart,setCart]=useState([]);
    const fetchCart=async ()=>{
        const res=await fetch("http://localhost:5000/orders/"+props.userid);
        const data=await res.json();
        console.log(data[0].arrival_date.split("00")[0])
        setCart(data);
    }
    useEffect(()=>{
        console.log(props.userid);
        props.userid!="" && fetchCart();
    },[]);
    return (
        <>
            <Navbar setShowLogPage={props.setShowLogPage} showlogpage={props.showlogpage} count={props.count} data={props.data}/>
            <h2>Your Orders</h2>
            <div className="orders">
                {cart.map((group, index) => (
                    group.items.map((item, i) => (
                        <div key={`${index}-${i}`}>
                            <img src={item.image} className="image" />

                            <div className="info">
                                <h4>{item.name}</h4>
                                <div>
                                    <p>Arriving on: {group.arrival_date.split("00")[0]}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ))}
            <div className="summary">
                <h3>Order Placed:<p>{cart.length!=0&&cart[0].ordered_date.split("00")[0]}</p></h3>
                <h3>Total:<p>₹{cart.length!=0&&cart[0].total_amount}</p></h3>
            </div>
            </div>
            
        </>
    );
}