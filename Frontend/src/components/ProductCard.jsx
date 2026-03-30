import "./ProductCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

function Body(props){
    const addToCart=(product)=>{
        props.setCount(prev=>prev+1);
        let cart=JSON.parse(localStorage.getItem("cart"))||[];
        const prevItem=cart.find(item=>item.id==product.id);
        if(prevItem){
            prevItem.quantity+=1;
        }
        else cart.push({...product,quantity:1});
        localStorage.setItem("cart",JSON.stringify(cart));
    };
    return(
        <div className="items">
            <div className={props.item.product}>
                <img src={props.item.image} alt={props.item.product} />
                <h2>{props.item.name}</h2>
                <p>{props.item.price}</p>
                <button className="cart" onClick={()=>addToCart(props.item)} id={props.item.id}><FontAwesomeIcon icon={faCartPlus} /> Add</button>
            </div>
        </div>
    );
}
export default Body;