const sideMenu = document.querySelector("aside")
const menuBtn = document.querySelector("#menu-btn")
const closeBtn = document.querySelector("#close-btn")
const themeToggler = document.querySelector(".theme-toggler")

ScrollReveal().reveal('.recent-orders', { delay: 500 });
ScrollReveal().reveal('.theme-toggler', { delay: 500 });
ScrollReveal().reveal('.insights', { delay: 500 });
ScrollReveal().reveal('.sales-analytics', { delay: 500 });


menuBtn.addEventListener('click', () => {
    sideMenu.style.display= 'block';
})

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span').classList.toggle('active');
})

function signup(e){
    event.preventDefault();
}

var email = document.getElementById("email").value;
var username = document.getElementById("username").value;
var pass = document.getElementById("password").value;


var user = {
    email: email,
    username: username,
    password: pass
}

var json = JSON.stringify(user)
localStorage.setItem(username, json)
console.log("user added")

function loginFunc(e){
    event.preventDefault();

    var username = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var result = document.getElementById("result");

    var user = localStorage.getItem(username);

    var data = JSON.parse(user);
    console.log(data);

    if(user == null){
        result.innerHTML = "Wrong Username :)";
    } else if(username == data.username && pass == data.password){
        result.innerHTML = "Logged in";
    }else{
        result.innerHTML = "Something went wrong";
    }
}