import "./Display.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
export default function(props){
    function increment(id){
        const updatedCart = props.cartItems.map(item => {
        if(item.id === id){
            return {...item, quantity: item.quantity + 1}
        }
        return item; 
    });
        props.setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    function decrement(id){
        const updatedCart = props.cartItems.map(item => {
        if(item.id === id){
            return {...item, quantity: item.quantity>0?item.quantity- 1:0};
        }
        return item;
    });
        props.setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    function remove(id){
        const updatedCart=props.cartItems.filter(item=>item.id!=id);
        props.setCartItems(updatedCart);
        localStorage.setItem("cart",JSON.stringify(updatedCart));
        // props.
    }
    return(
        <div className="insidecontainer"> 
            <div className="inside">
                <h3>{props.details.name}</h3>
                <p>₹{props.details.price}</p>
                <div className="quant">
                    <button className="btn" onClick={()=>decrement(props.details.id)}>-</button>
                    <p>{props.details.quantity}</p>
                    <button className="btn2" onClick={()=>increment(props.details.id)}>+</button>
                </div>  
                <button className="remove" onClick={()=>remove(props.details.id)}>Remove <FontAwesomeIcon icon={faTrashCan}/></button>
            </div>
        </div>
    );
}