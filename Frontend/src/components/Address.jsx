import { useState } from "react"
import "./Address.css"
export default function Address(props){
    const [userAdd,setUserAdd]=useState({
        cust_name:"",
        cust_number:"",
        line1:"",
        line2:"",
        town:"",
        pincode:"",
        state:""
    });
    async function saveAdd() {
        await fetch("http://localhost:5000/getAddress"+props.userid,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:{
                address:userAdd
            }
        });
    }
    return (
        <>
            <div className="add">
                <form className="addressForm">
                    <label htmlFor="cust_name">Full Name</label><br/>
                    <input type="text" id="cust_name" value={userAdd.cust_name} onChange={(e)=>setUserAdd(prev=>({...prev,cust_name:e.target.value}))} /><br/>
                    <label htmlFor="cust_number">Mobile Number</label><br/>
                    <input type="text" id="cust_number" value={userAdd.cust_number} onChange={(e)=>setUserAdd(prev=>({...prev,cust_number:e.target.value}))}/><br/>
                    <label htmlFor="line1">Flat, House no., Building, Company, Apartment</label><br/>
                    <input type="text"id="line1" value={userAdd.line1} onChange={(e)=>setUserAdd(prev=>({...prev,line1:e.target.value}))}/><br/>
                    <label htmlFor="line2">Area, Street, Sector, Village</label><br/>
                    <input type="text" id="line2" value={userAdd.line2} onChange={(e)=>setUserAdd(prev=>({...prev,line2:e.target.value}))}/><br/>
                    <label htmlFor="pincode">Pincode</label><br/>
                    <input placeholder="6 digit pin" type="text" id="pincode" value={userAdd.pincode} onChange={(e)=>setUserAdd(prev=>({...prev,pincode:e.target.value}))}/><br/>
                    <label htmlFor="town" >Town/City</label><br/>
                    <input type="text" id="town" value={userAdd.town} onChange={(e)=>setUserAdd(prev=>({...prev,town:e.target.value}))}/><br/>
                    <label htmlFor="state">State</label><br/>
                    <input type="text" id="state" value={userAdd.state} onChange={(e)=>setUserAdd(prev=>({...prev,state:e.target.value}))}/><br/>
                    <button type="button" onClick={()=>window.alert("clicked")} className="saveAddress">Save to this address</button>
                </form>
            </div>
            
        </>
    )
}