const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('logeateaqui')

button.addEventListener('click', (e) => {
    e.preventDefault()
    const usuario = localStorage.getItem("usuario:")
    const contraseña = localStorage.getItem("contraseña:")

    if(username.value !== usuario) return alert("¡Ese nombre de usuario no existe!")
    if(password.value !== contraseña) return alert("Contraseña incorrecta")

    alert("Logeado correctamente. Redirigiendo a el inicio...")

    location.href = "index.html"
})

