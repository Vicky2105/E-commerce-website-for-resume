import './CartProds.css';   
import eggs from '../assets/eggs.jpg';
import Display from './Display';
import { useState,useEffect } from 'react';
export default function CartProds(props){
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);
        return (
            <div className='container'>
                <div className="first">
                        {props.count==0&&<h1>Your cart is empty</h1> }
                        {props.count!=0&& 
                            <>
                    {cartItems.map(item => (
                        <>
                            <img src={item.image}/>
                            <Display details={item} cartItems={cartItems} setCartItems={setCartItems} />
                        </>
                        ))}
                    </>
                    } 
                </div>
                <div className="amount">
                    <h1>Amount</h1>
                        <div className="align">
                            <div>
                                <p>Price</p>
                                <p>Total: </p>
                            </div>
                            <div>
                                <p>Price</p>
                                <p>Total: </p>
                            </div>
                        </div>
                    <button className="proceed" >Proceed to buy</button>
                </div>
            </div>
        );
}