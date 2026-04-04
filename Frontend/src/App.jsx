import { useState,useEffect } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart"
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom';
function App(){
  const [count,setCount]=useState(0);
  const [price,setPrice]=useState(0);
  const [showlogpage,setShowLogPage]=useState(false);
  const [showsignpage,setShowSignPage]=useState(false);
  const [pass,setPass]=useState("password");
  const [data,setData]=useState({
        login:"Login",
        acc:"don't",
        link:"signup",
        profile:"Login"
  });
  const [credentials,setCredentials]=useState({
        username:"",
        password:"",
        email:""
  });
  useEffect(()=>{
    localStorage.removeItem("cart")
  },[]);
  return(
    <Routes>
      <Route path="/"  element={<Home price={price} setPrice={setPrice} count={count} setCount={setCount} data={data} setData={setData} setShowLogPage={setShowLogPage} showsignpage={showsignpage} 
          showlogpage={showlogpage}  setShowSignPage={setShowSignPage} pass={pass} setPass={setPass} credentials={credentials} setCredentials={setCredentials}/>}/>
      <Route path="/cart" element={<Cart price={price} setPrice={setPrice} count={count} setCount={setCount} data={data} setData={setData} setShowLogPage={setShowLogPage} showsignpage={showsignpage} 
          showlogpage={showlogpage}  setShowSignPage={setShowSignPage} pass={pass} setPass={setPass} credentials={credentials} setCredentials={setCredentials}/>}/>

    </Routes>
  );
}
export default App;