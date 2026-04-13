import { useState,useEffect } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart"
import Orders from "./pages/Orders";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom';
function App(){
  const [count,setCount]=useState(0);
  const [showlogpage,setShowLogPage]=useState(false);
  const [showsignpage,setShowSignPage]=useState(false);
  const [login,setLogin]=useState(false);
  const [pass,setPass]=useState("password");
  const [userid,setUserid]=useState("");
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
  
  return(
    <Routes>
      <Route path="/"  element={<Home login={login} setLogin={setLogin} userid={userid} setUserid={setUserid}  count={count} setCount={setCount} data={data} setData={setData} setShowLogPage={setShowLogPage} showsignpage={showsignpage} 
          showlogpage={showlogpage}  setShowSignPage={setShowSignPage} pass={pass} setPass={setPass} credentials={credentials} setCredentials={setCredentials}/>}/>
      <Route path="/cart" element={<Cart  login={login} setLogin={setLogin} userid={userid} setUserid={setUserid}   count={count} setCount={setCount} data={data} setData={setData} setShowLogPage={setShowLogPage} showsignpage={showsignpage} 
          showlogpage={showlogpage}  setShowSignPage={setShowSignPage} pass={pass} setPass={setPass} credentials={credentials} setCredentials={setCredentials}/>}/>
      <Route path="/orders" element={<Orders login={login} setLogin={setLogin} showlogpage={showlogpage}  setShowSignPage={setShowSignPage} data={data} count={count} userid={userid} />}/>
    </Routes>
  );
}
export default App;