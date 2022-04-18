const user = "admin"
const pass = "admin"

function login(){
    txtUser = document.getElementById("username")
    txtPass = document.getElementById("password")

    if(txtUser.value == user && txtPass.value == pass){
        alert("Đăng nhập thành công")
    }
    else{
        alert("Đăng nhập thất bại")
    }
    txtUser.value = ""
    txtPass.value = ""
}

function reset(){
    txtUser = document.getElementById("username")
    txtPass = document.getElementById("password")

    txtUser.value = ""
    txtPass.value = ""
}