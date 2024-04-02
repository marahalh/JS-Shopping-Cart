let username = document.querySelector("#username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let confirm_password = document.querySelector("#confirm-password")

let register_btn = document.querySelector("#sign_up")

register_btn.addEventListener ("click" , function (e){
    e.preventDefault()
    if (username.value==="" || email.value==="" || password.value ==="" || confirm_password.value ===""){
        alert("please fill data")
    }
    else if(password.value != confirm_password.value)
    {
        alert("The passwords don't match, please try again")
    }
    else {
        localStorage.setItem("username" , username.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value); // 

        setTimeout ( () => {
            window.location = "login.html"
        } , 1500)
    }
})

