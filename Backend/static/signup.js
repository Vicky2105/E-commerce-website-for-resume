function helloworld(){
    const ele=document.getElementById("ps");
    if(ele.type=="password") ele.type=Text;
    else ele.type="password";
}
function validate(event){
    event.preventDefault();
    const form = event.target;

    const mail = form.querySelector('input[name="email"]').value;
    const user = form.querySelector('input[name="username"]').value;
    const pass = form.querySelector('input[name="password"]').value;

    if(user==""&&pass=="") alert("please enter valid username and password")
    else if(user=="") alert("Please enter valid username");
    else if(pass=="") alert("Please enter valid password"); 
    else if(mail=="") alert("please enter valid email");
    else{
        fetch("/signup",
    {
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            "username":user,
            "password":pass,
            "email":mail
        })
    }
)
        .then(res=>res.text())
        .then(result=>{
            result;
        }
);
    }
}
