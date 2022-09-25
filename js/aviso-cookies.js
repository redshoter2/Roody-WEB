const cookieBox = document.querySelector(".wrapper"),
                acceptBtn = cookieBox.querySelector("button");
                acceptBtn.onclick = ()=>{
                  //setting cookie for 1 month, after one month it'll be expired automatically
                  document.cookie = "CookieBy=Roody; max-age="+60*60*24*30;
                  if(document.cookie){ //if cookie is set
                    cookieBox.classList.add("hide"); //hide cookie box
                  }else{ //if cookie not set then alert an error
                    alert("No podemos usar cookies! Desbloquea esta web desde tu configuración!.");
                  }
                }
                let checkCookie = document.cookie.indexOf("CookieBy=Roody"); //checking our cookie
                //if cookie is set then hide the cookie box else show it
                checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide");