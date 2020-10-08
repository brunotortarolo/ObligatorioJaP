const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";




var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}


function logOut(){ 
  sessionStorage.removeItem("validado");
  sessionStorage.removeItem("emailDisplay");
  localStorage.removeItem("validado");
  localStorage.removeItem("emailDisplay");
}

    

document.addEventListener("DOMContentLoaded", function (e) {
  let validadoSession = sessionStorage.getItem('validado');
  let validadoLocal = localStorage.getItem('validado')
  
  if ((validadoSession !== "true") && (validadoLocal !== "true") && (!location.href.includes("login.html"))) {

    sessionStorage.setItem("returnURL", location.href);
    location.href = "login.html";
  } else {


    let loggedMail = localStorage.getItem('emailDisplay') || sessionStorage.getItem('emailDisplay');
    document.getElementById("dropdownMenuLink").innerHTML += loggedMail;


  }
});
