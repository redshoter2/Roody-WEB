const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('registrarseaqui')

button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        username: username.value,
    }

    const data2 = {
        password: password.value
    }

    var json = JSON.stringify(data)
    var json2 = JSON.stringify(data2)

    const obj = JSON.parse(json)
    const obj2 = JSON.parse(json2)
    localStorage.setItem("usuario:", obj.username)
    localStorage.setItem("contraseña:", obj2.password)

    if(username.value === '') return alert("¡Debes escribir un nombre de usuario!")
    if(password.value === '') return alert("¡Debes escribir una contraseña!")
})
