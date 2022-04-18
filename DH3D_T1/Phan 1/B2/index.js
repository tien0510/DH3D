const user = "duy2000nb"
const pass = "duy2000nb"

function login(){
    txtUser = document.getElementById("username")
    txtPass = document.getElementById("password")

    if(txtUser.value == user && txtPass.value == pass){
        alert("Đăng nhập thành công")
    }
    else{
        alert("Đăng nhập thất bại")
    }
}

function reset(){
    txtUser = document.getElementById("username")
    txtPass = document.getElementById("password")

    txtUser.value = ""
    txtPass.value = ""
}