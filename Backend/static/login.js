function helloworld(){
    const ele=document.getElementById("ps");
    if(ele.type=="password") ele.type="text";
    else ele.type="password";
}
function validate(event){
    event.preventDefault();
    const user=document.getElementsByName("username")[0].value;
    const pass=document.getElementById("ps").value;
    if(user==""&&pass=="") alert("please enter valid username and password")
    else if(user=="") alert("Please enter valid username");
    else if(pass=="") alert("Please enter valid password");
    else{
        fetch("/login",
            {
                method:"post",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    username:user,
                    password:pass
                })
            }
        ).then(res=>res.text()).then(result=>{alert(result)});
    }
}