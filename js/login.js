function validateLogin(event) {
    event.preventDefault();
    let email = document.getElementById("inputEmail").value;
    let pass = document.getElementById("inputPassword").value;
    let saveLogin = document.getElementById("keep-login").checked;
      
      
    if (email != "" && pass != "") {
        let destinationURL = sessionStorage.getItem("returnURL");
        if (!saveLogin){ 
        sessionStorage.setItem('validado','true');
        sessionStorage.setItem('emailDisplay',email);
        } else {
            localStorage.setItem('validado','true');
            localStorage.setItem('emailDisplay',email);
        }    
        location.href = destinationURL;
        
    } else {
        alert("Completa los campos para continuar");
    }
    return true;
  }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.getElementById("login-form").addEventListener("submit", validateLogin);