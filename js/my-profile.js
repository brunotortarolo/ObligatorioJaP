const userEmail = sessionStorage.getItem("emailDisplay") || localStorage.getItem("emailDisplay");

let userInfo = {
  nombre: "",
  apellido1: "",
  apellido2: "",
  ciudad: "",
  pais: "",
  edad: "",
  email: "",
  contacto: "",
  picture: ""
};

//MOSTRAR DATOS DE PERFIL
function showProfileContent() {

  !localStorage.getItem(userEmail) ? userInfo = userInfo : userInfo = JSON.parse(localStorage.getItem(userEmail));

  let profileContainer = document.getElementById("info-profile");

  let profileToAppend = `
    <header class="header">
        <div class="details">
          <img src=${userInfo.picture || "img/user.png"} alt="profile-picture" class="profile-pic">
          <p>Usuario</p>
          <h2 id="user-name" class="heading" style="border-bottom: ridge 1px">${userInfo.nombre} ${userInfo.apellido1} ${userInfo.apellido2}</h2>
          <div class="location" style="border-bottom: ridge 1px">
            <p>Ubicación</p>
            <h4><small>${userInfo.ciudad} ${userInfo.pais}</small></h4>
          </div>
          <div class="datos mt-5">
            <div class="col-4" style="border-bottom: ridge 1px">
              <p>Edad</p>
              <h6 id="user-age"><small>${userInfo.edad}</small></h6>   
            </div>
            <div class="col-4" style="border-bottom: ridge 1px">
              <p>Email</p>
              <h6 id="user-email"><small>${userInfo.email}</small></h6> 
            </div>
            <div class="col-4" style="border-bottom: ridge 1px">
              <p>Contacto</p>
              <h6 id="user-phone"><small>${userInfo.contacto}</small></h6>
            </div>
          </div> 
          <div class="d-flex justify-content-around mt-4">
            <button onclick="editProfileContent()" class="btn btn-lg text-white" id="edit-data">EDITAR PERFIL</button>
          </div>
        </div>
    </header>
    `
  profileContainer.innerHTML = profileToAppend;
}

//EDITABLE DATOS DE PERFIL
function editProfileContent() {

  !localStorage.getItem(userEmail) ? userInfo = userInfo : userInfo = JSON.parse(localStorage.getItem(userEmail));

  let formContainer = document.getElementById("info-profile")

  let formToAppend = `
  <form method="#" action="#">
  <header class="header">
    <div class="details">
      <div>
        <label for="edit-picture" class="col-form-label pic-edit">
          <img src=${userInfo.picture || "img/user.png"} alt="profile-picture" class="profile-pic">
          <input type="text" id="edit-picture" class="form-control mt-2 text-white" placeholder="Pega la URL de tu imagen">  
          <small class="d-block mt-1">Cambiar foto</small>   
        </label>
      </div>

      
      <div id="user-name-inputs" class="location row justify-content-between">

        <div class="col-4">
          <label for="edit-nombre" class="col-form-label"><small>Nombre</small></label>
          <input class="form-control col-12 mr-1 name-inputs" name="nombre" type="text" id="edit-nombre"
            placeholder="${userInfo.nombre || "Nombre"}" value="${userInfo.nombre}" required>
        </div>

        <div class="col-4">
          <label for="edit-apellido1" class="col-form-label"><small>Primer apellido</small></label>
          <input class="form-control col-12 mr-1 name-inputs" name="apellido1" type="text" id="edit-apellido1"
            placeholder="${userInfo.apellido1 || "Primer apellido"}" value="${userInfo.apellido1}" required>
        </div>

        <div class="col-4">
          <label for="edit-apellido1" class="col-form-label"><small>Segundo apellido</small></label>
          <input class="form-control col-12 name-inputs" name="apellido2" type="text" id="edit-apellido2"
            placeholder="${userInfo.apellido2 || "Segundo apellido"}" value="${userInfo.apellido2}">
        </div>

      </div>
      
      <div class="location row justify-content-between">
        <div class="col-6">
          <label for="edit-city" class="col-form-label"><small>Ciudad</small></label>
          <input id="edit-city" class="form-control col-12 location-input" type="text" name="ciudad"
            placeholder="${userInfo.ciudad || "Ciudad"}" value="${userInfo.ciudad}">
        </div>

        <div class="col-6">
          <label for="edit-country" class="col-form-label"><small>País</small></label>
          <input id="edit-country" class="form-control col-12 location-input" type="text" name="pais"
            placeholder="${userInfo.pais || "País"}" value="${userInfo.pais}">
        </div>

      </div>
     
      <div class="location row justify-content-between">

        <div id="user-data-inputs" class="location d-flex justify-content-between">

          <div class="col-4">
            <label for="edit-age" class="col-form-label"><small>Edad</small></label>
            <input class="form-control col-12 mr-1 data-inputs" name="edad" type="text" id="edit-age"
              placeholder="${userInfo.edad || "Edad"}" value="${userInfo.edad}">
          </div>

          <div class="col-4">
            <label for="edit-email" class="col-form-label"><small>Email</small></label>
            <input class="form-control col-12 mr-1 data-inputs" name="email" type="text" id="edit-email"
              placeholder="${userInfo.email || "Email"}" value="${userInfo.email}"required>
          </div>

          <div class="col-4">
            <label for="edit-contact" class="col-form-label"><small>Contacto</small></label>
            <input class="form-control col-12 data-inputs" name="contact-number" type="text" id="edit-contact"
              placeholder="${userInfo.contacto || "Número de contacto"}" value="${userInfo.contacto}">
          </div>

        </div>

      </div>

      <div class="location row justify-content-between mt-4">
        <div class="col-4">
          <button onclick="updateData(event)"type="submit" class="btn btn-lg text-white" id="save-profile-data">ACTUALIZAR</button>
        </div>
        <div class="col-4">
          <button onclick="showProfileContent()" class="btn btn-lg text-white" id="cancel-data">CANCELAR</button>
        </div>
      </div>
    </div>
  </header>
</form>
  `

  formContainer.innerHTML = formToAppend;
}

//ACTUALIZAR DATOS DE USUARIO
function updateData(event) {

  event.preventDefault();

  let nombre = document.getElementById('edit-nombre').value;
  let apellido1 = document.getElementById('edit-apellido1').value;
  let apellido2 = document.getElementById('edit-apellido2').value;
  let ciudad = document.getElementById('edit-city').value;
  let pais = document.getElementById('edit-country').value;
  let edad = document.getElementById('edit-age').value;
  let email = document.getElementById('edit-email').value;
  let contacto = document.getElementById('edit-contact').value;
  let picture = document.getElementById("edit-picture").value;

  userInfo.nombre = nombre;
  userInfo.apellido1 = apellido1;
  userInfo.apellido2 = apellido2;
  userInfo.ciudad = ciudad;
  userInfo.pais = pais;
  userInfo.edad = edad;
  userInfo.email = email;
  userInfo.contacto = contacto;
  userInfo.picture = picture;
  
  
  /*PASAR FOTO DE LINK A BASE64, GUARDAR EN LOCAL Y CARGAR DESDE LOCAL

  let pictureCanvas = document.createElement("canvas");
      pictureContext = pictureCanvas.getContext("2d");

      pictureCanvas.width = picture.width;
      pictureCanvas.height = picture.height;

      pictureContext.drawImage(picture, 0, 0, picture.width, picture.height);

  let pictureAsDataURL = pictureCanvas.toDataURL("image/png");

      userInfo.picture = pictureAsDataURL;*/
      

  let valWarning = 'Debes completar los campos de "Nombre", "Apellido 1" y "Email" para actualizar los datos.'
  let validateLoc = 'Debes completar ambos campos de "Ubicación" para agregar tus datos.'


  if (nombre == "" || apellido1 == "" || email == "") {
    alert(valWarning);
  } else if (pais != "" && ciudad == "") {
    alert(validateLoc);
  } else if (pais == "" && ciudad != "") {
    alert(validateLoc);
  } else {
    localStorage.setItem(userEmail, JSON.stringify(userInfo));
    showProfileContent();
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
  showProfileContent();
});

