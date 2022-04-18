function show(){
    txtName = document.getElementById("name")
    txtAddress = document.getElementById("address")
    txtPhone = document.getElementById("phone")

    pName = document.getElementById("hoten")
    pAddress = document.getElementById("diachi")
    pPhone = document.getElementById("sdt")

    pName.innerHTML += txtName.value
    pAddress.innerHTML += txtAddress.value
    pPhone.innerHTML += txtPhone.value

    profile = document.getElementById("profile")
    profile.style.display = "inline-block"
}

