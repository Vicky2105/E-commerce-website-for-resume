import Address from './Address';
import './CartProds.css';
import Display from './Display';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
export default function CartProds(props){
    const [cartItems, setCartItems] = useState([]); 
    const [checkout,setCheckout]=useState(false);
    let cost= cartItems.reduce((total, item) => {
             return total + parseInt(item.price) * parseInt(item.quantity);
        },0);
    const fetchCart = async () => {
        let res = await fetch("http://localhost:5000/cart/" + props.userid);
        let data = await res.json();
        setCartItems(data);
        };
    const navigate=useNavigate();
    function ordered(){
        navigate("/Orders");
    }
    useEffect(() => {
        props.userid!=""&&fetchCart();
        }, []);

        return (
            
            <div className='container'>
                { !checkout?
                (<div className="first">
                        { cartItems.length==0 && <h1>Your cart is empty</h1>  }
                        {cartItems.length!=0&& 
                            <>
                    {cartItems.map(item => (
                        <>  
                            <img src={item.image}/>
                            <Display userid={props.userid} details={item} setCartItems={setCartItems} refresh={fetchCart}/>
                        </>
                        ))}
                    </>
                    } 
                </div>):
                  <Address/>
                }
                
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
                                <p>₹{cost+(cartItems.length!=0&&40)}</p>
                            </div>
                        </div>
                    {checkout&&
                        <div className="payment">
                            <h2>select payment method</h2>
                            <fieldset>
                                <input type="radio" id="online" name="mode" value="online"/>
                                <label htmlFor="online">online</label><br/>
                                <input type="radio" id="cod" name="mode" value="cod"/>
                                <label htmlFor='cod'>cash on delivery</label>
                            </fieldset>
                        </div>
                    } 
                    {
                        !checkout?(<button className="proceed" onClick={()=>{  
                        if(cartItems.length!=0) setCheckout(true)
                        }}>Proceed to buy</button> ):(<button className="proceed" onClick={ordered}>Place your order</button> )
                    }
                    
                </div>
            </div>
        );
}