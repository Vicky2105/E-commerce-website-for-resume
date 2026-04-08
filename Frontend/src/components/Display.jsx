import "./Display.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
export default function Display(props){

    const addToCart = async (productId,act) => {
        await fetch("http://localhost:5000/add-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: props.userid,
                product_id: productId,
                fun:act
            })
        });
        props.refresh();
}
    const removeItem = async (productId) => {
        await fetch("http://localhost:5000/remove-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: props.userid,
                product_id: productId
            })
        });
        props.refresh();
    }
    // function increment(id){
    //     const updatedCart = props.cartItems.map(item => {
    //     if(item.id === id){
    //         return {...item, quantity: item.quantity + 1}
    //     }
    //     return item; 
    // });
    //     props.setCartItems(updatedCart);
    //     //localStorage.setItem("cart", JSON.stringify(updatedCart));
    // }
    // function decrement(id){
    //     const updatedCart = props.cartItems.map(item => {
    //     if(item.id === id){
    //         return {...item, quantity: item.quantity>0?item.quantity- 1:0};
    //     }
    //     return item;
    // });
    //     props.setCartItems(updatedCart);
    //     //localStorage.setItem("cart", JSON.stringify(updatedCart));
    // }
    // function remove(id){
    //     const updatedCart=props.cartItems.filter(item=>item.id!=id);
    //     props.setCartItems(updatedCart);
    //     //localStorage.setItem("cart",JSON.stringify(updatedCart));
    // }
    return(
        <div className="insidecontainer"> 
            <div className="inside">
                <h3>{props.details.name}</h3>
                <p>₹{props.details.price}</p>
                <div className="quant">
                    <button className="btn" onClick={()=>addToCart(props.details.product_id,"dec")}>-</button>
                    <p>{props.details.quantity}</p>
                    <button className="btn2" onClick={()=>addToCart(props.details.product_id,"inc")}>+</button>
                </div>  
                <button className="remove" onClick={()=>removeItem(props.details.product_id)}>Remove <FontAwesomeIcon icon={faTrashCan}/></button>
            </div>
        </div>
    );
}