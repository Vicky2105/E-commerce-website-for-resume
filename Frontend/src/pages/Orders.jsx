import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Orders.css"

export default function orders(props){
    const [cart,setCart]=useState([]);
    const [date, setDate] = useState(new Date());
    const fetchCart=async ()=>{
        const res=await fetch("http://localhost:5000/cart/"+props.userid);
        const data=await res.json();
        console.log(data);
        setCart(data);
    }
    let cost= cart.reduce((total, item) => {
             return total + parseInt(item.price) * parseInt(item.quantity);
        },0);
    useEffect(()=>{
        console.log(props.userid);
        props.userid!="" && fetchCart();
    },[]);
    return (
        <>
            <Navbar setShowLogPage={props.setShowLogPage} showlogpage={props.showlogpage} count={props.count} data={props.data}/>
            <h2>Your Orders</h2>
            <div className="orders">
                {cart.map(item => (
                        <>  
                            <img src={item.image} className="image"/>
                            <div className="info">
                                <h4>{item.name}</h4>
                                <div>
                                    <p>Arriving on:{date.toDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                    <p>Quantity:{item.quantity}</p>
                                </div>
                            </div>
                        </>
            ))}
            <div className="summary">
                <h3>Order Placed:<p>{date.toDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p></h3>
                <h3>Total:<p>₹{cost}</p></h3>
            </div>
            </div>
            
        </>
    );
}