import './CartProds.css';   
import eggs from '../assets/eggs.jpg';
import Display from './Display';
import { useState,useEffect } from 'react';
export default function CartProds(props){
    const [cartItems, setCartItems] = useState([]);
    let cost= cartItems.reduce((total, item) => {
             return total + parseInt(item.price) * parseInt(item.quantity);
        },0);
    const fetchCart = async () => {
        let res = await fetch("http://localhost:5000/cart/" + props.userid);
        let data = await res.json();
        setCartItems(data);
        };
    useEffect(() => {
        fetchCart();
        }, []);

        return (
            <div className='container'>
                <div className="first">
                        {/* {props.count==0 && <h1>Your cart is empty</h1> } */}
                        {1&& 
                            <>
                    {cartItems.map(item => (
                        <>  
                            <img src={item.image}/>
                            <Display userid={props.userid} details={item} setCartItems={setCartItems} refresh={fetchCart}/>
                        </>
                        ))}
                    </>
                    } 
                </div>
                <div className="amount">
                    <h1>Amount</h1>
                        <div className="align">
                            <div>
                                <p>Price:</p>  
                                {cartItems.length!=0&& <p>Delivery Charges:</p>}  
                                <p>Total: </p>
                            </div>
                            <div>
                                <p>₹{cost}</p>
                                {cartItems.length!=0&& <p>₹40</p>}
                                <p>₹{cost+40}</p>
                            </div>
                        </div>
                    <button className="proceed" >Proceed to buy</button>
                </div>
            </div>
        );
}