const userID = sessionStorage.getItem("emailDisplay") || localStorage.getItem("emailDisplay");

let cartContent = [];
let successMessage = {};

let finSubTotal = 0;
let shippingCost = 0;
let isDollar = false;


//INCREMENTADOR Y REDUCTOR DE CANTIDAD
function addToCounter(i) {
  let subTotalToShow = 0;
  let valueCounter = document.getElementsByClassName("item-counter")[i].value;
  valueCounter++;

  let itemSub = cartContent[i].unitCost * valueCounter;

  cartContent[i].currency == "USD" ? finSubTotal += cartContent[i].unitCost * 40 : finSubTotal += cartContent[i].unitCost;

  document.getElementsByClassName("item-counter")[i].value = valueCounter;
  document.getElementsByClassName("item-total")[i].innerHTML = itemSub.toFixed(2);
  document.getElementsByClassName("decremental")[i].disabled = false;

  subTotalToShow = isDollar ? finSubTotal / 40 : finSubTotal;
  document.getElementById("subtotal-cost").innerHTML = subTotalToShow.toFixed(2);

  cartContent[i].count = valueCounter;
  showTotalCost();
}


function takeFromCounter(i) {
  let subTotalToShow = 0;
  let valueCounter = document.getElementsByClassName("item-counter")[i].value;
  let disButton = document.getElementsByClassName("decremental")[i];

  if (valueCounter > 0) {
    valueCounter--
  }
  if (valueCounter <= 0) {
    disButton.disabled = true;
  }

  let itemSub = cartContent[i].unitCost * valueCounter;

  cartContent[i].currency == "USD" ? finSubTotal -= cartContent[i].unitCost * 40 : finSubTotal -= cartContent[i].unitCost;

  document.getElementsByClassName("item-counter")[i].value = valueCounter;
  document.getElementsByClassName("item-total")[i].innerHTML = itemSub.toFixed(2);

  subTotalToShow = isDollar ? finSubTotal / 40 : finSubTotal;
  document.getElementById("subtotal-cost").innerHTML = subTotalToShow.toFixed(2);
  cartContent[i].count = valueCounter;
  showTotalCost();
}


//REMOVER ITEM
function removeItem(i) {
  cartContent.splice(i, 1);
  showCartContent(cartContent);
  currencyConversion();
  showTotalCost();
}


//CARGAR VALORES DE SUBTOTAL, COSTO ENVIO Y TOTAL
function showTotalCost() {
  let shippingRadios = document.getElementsByName("shipping-type");
  let shippingTypeValue = 0
  for (let i = 0; i < shippingRadios.length; i++) {
    if (shippingRadios[i].checked) {
      shippingTypeValue = shippingRadios[i].value;
      break;
    }
  }

  shippingCost = finSubTotal * shippingTypeValue;
  let total = finSubTotal + shippingCost;
  let shippingCostToShow = isDollar ? shippingCost / 40 : shippingCost;
  let totalToShow = isDollar ? total / 40 : total;

  document.getElementById("shipping-cost").innerHTML = shippingCostToShow.toFixed(2);
  document.getElementById("total-amount").innerHTML = totalToShow.toFixed(2);
}


//FINALIZCIÓN DE COMPRA:
function successfulPurchase() {
  

  let modalHeader = document.getElementById("success-message");

  //table 1
  let tableProducts = "";
  for (let i = 0; i < cartContent.length; i++) {
    let finalCount = document.getElementsByClassName("item-counter")[i].value;
    tableProducts += `
      <tr>
        <th scope="row"></th>
        <td>`+ cartContent[i].name + `</td>
        <td>x`+ finalCount + `</td>
        <td>`+ cartContent[i].currency + ` ` + cartContent[i].unitCost + `</td>
      </tr>
  `
  }

  //table 2
  let shippingAddress = document.getElementById("shipping-add").value;
  let shippingCity = document.getElementById("shipping-city-country").value;
  let shippingRadios = document.getElementsByName("shipping-type");
  let shippingTypeValue = ""
  for (let i = 0; i < shippingRadios.length; i++) {
    if (shippingRadios[i].checked) {
      shippingTypeValue = shippingRadios[i].id;
      break;
    }
  }

  let shippingInfo = shippingAddress + ` (` + shippingCity + `)`;

  //table 3
  let paymentRadios = document.getElementsByName("payment-method");
  let paymentTypeValue = ""
  for (let i = 0; i < paymentRadios.length; i++) {
    if (paymentRadios[i].checked) {
      paymentTypeValue = paymentRadios[i].value;
      break;
    }
  }

  let subTotalCurrency = document.getElementById("subtotal-currency").innerText;
  let subTotal = document.getElementById("subtotal-cost").innerText;
  let subTotalInfo = subTotalCurrency + " " + subTotal;

  let shippingCurrency = document.getElementById("shipping-currency").innerText;
  let shippingCostMod = document.getElementById("shipping-cost").innerText;
  let shippingCostInfo = shippingCurrency + " " + shippingCostMod;

  let totalCurrency = document.getElementById("total-currency").innerText;
  let totalCost = document.getElementById("total-amount").innerText;
  let totalCostInfo = totalCurrency + " " + totalCost;


  //Append contenido
  modalHeader.innerHTML = successMessage.msg;

  document.getElementById("modal-content-product").innerHTML = tableProducts;

  document.getElementById("modal-shipping-type").innerHTML = shippingTypeValue;

  document.getElementById("modal-shipping-address").innerHTML = shippingInfo;

  document.getElementById("modal-metodo-pago").innerHTML = paymentTypeValue;

  document.getElementById("modal-sub-total").innerHTML = subTotalInfo;

  document.getElementById("modal-costo-envio").innerHTML = shippingCostInfo;

  document.getElementById("modal-total").innerHTML = totalCostInfo;

}


//DISPLAY CONTENIDO DE PÁGINA
function showCartContent(array) {
  let totalItems = 0;
  let precioEnUYU = 0;
  let htmlContentToAppend = "";
  let subTotalFinal = 0;
  let articles = "";

  for (let i = 0; i < array.length; i++) {
    let cartItem = array[i];

    totalItems = array.length;

    let subTotalItem = cartItem.unitCost * cartItem.count;

    cartItem.currency == "USD" ? subTotalFinal += subTotalItem * 40 : subTotalFinal += subTotalItem;
    cartItem.currency == "USD" ? precioEnUYU = cartItem.unitCost * 40 : precioEnUYU = cartItem.unitCost;

    precioEnUYU != cartItem.unitCost ? convertPesos = `<span>( UYU ` + precioEnUYU + `)</span>` : convertPesos = "";

    totalItems == 1 ? articles = "producto" : articles = "productos";

    htmlContentToAppend += `
        <div class="row row-content">
          <div class="col-9 cart-card">
            <div class="media flex-wrap align-items-center">
              <img class="d-flex mr-3 img-thumbnail align-self-center" src=`+ cartItem.src + ` alt="tree">
              <div class="media-body">
                <h2 class="mt-0">`+ cartItem.name + `</h2>
                <p class="d-sm-block">Precio (unidad): `+ cartItem.currency + `` + cartItem.unitCost + ` ` + convertPesos + `</p>
                <div class="d-flex align-items-center">
                  <p class="d-sm-block qty-btn-group">Cantidad:</p>
                  <div class="input-group input-group-sm mb-3 qty-btn-group" width="10%">
                    <div class="input-group-prepend">
                      <button class="btn btn-outline-secondary decremental" type="button" onclick="takeFromCounter(`+ i + `)">-</button>
                    </div>
                    <div class="qty-btn">
                      <input oninput="finalizarCompra(`+ i + `)" readonly="readonly" type="number" min= 0 class="form-control item-counter" value="` + cartItem.count + `">
                    </div>
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button" onclick="addToCounter(`+ i + `)">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 cart-card" style="border-left: 1px ridge;">
            <div class="media d-flex justify-content-center my-4">
              <div class="media-body align-content-center">
                <h2 class="mt-0 text-center"><strong>Sub-total:</strong> `+ cartItem.currency + `<span class="item-total">` + subTotalItem + `</span></h2>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-secondary" onclick="removeItem(`+ i + `)">Quitar</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
        `

  }


  let kept = userID.substring(0, userID.indexOf("@"));
  document.getElementById("user-in-title").innerHTML = kept;

  document.getElementById("productos-carrito").innerHTML = htmlContentToAppend;
  document.getElementById("total-items").innerHTML = totalItems;
  document.getElementById("article").innerHTML = articles;

  document.getElementById("subtotal-cost").innerHTML = subTotalFinal.toFixed(2);
  finSubTotal = Number(document.getElementById("subtotal-cost").innerText);
  showTotalCost();

}

//CONVERSION MONEDA
function currencyConversion() {

  if (isDollar == true) {
    document.getElementById("change-currency").innerHTML = "UYU ";
    document.getElementById("subtotal-currency").innerHTML = "USD ";
    document.getElementById("total-currency").innerHTML = "USD ";
    document.getElementById("shipping-currency").innerHTML = "USD ";
  } else {
    document.getElementById("change-currency").innerHTML = "USD ";
    document.getElementById("subtotal-currency").innerHTML = "UYU ";
    document.getElementById("total-currency").innerHTML = "UYU ";
    document.getElementById("shipping-currency").innerHTML = "UYU ";
  }

  let shippingCostToShow = isDollar ? shippingCost / 40 : shippingCost;
  shippingCost = Number(document.getElementById("shipping-cost").innerText)

  document.getElementById("shipping-cost").innerHTML = shippingCostToShow.toFixed(2);

  let subTotalToShow = isDollar ? finSubTotal / 40 : finSubTotal;
  document.getElementById("subtotal-cost").innerHTML = subTotalToShow.toFixed(2);

}

//VALIDACION INPUTS PAGO
function validatePayment(event) {
  event.preventDefault()  

  let cardNum = document.getElementById("card-num").value;
  let cardDate = document.getElementById("vto-card").value.split("/");
  let month = Number(cardDate[0]);
  let year = Number(cardDate[1]);
  let now = new Date();
  let currentYear = now.getUTCFullYear();

  let cardCode = document.getElementById("cvv-card").value;

  let bankNum = document.getElementById("account-n").value;
  let bankSuc = document.getElementById("sucursal-bank").value;


  let paymentOp = document.getElementsByName("payment-method")
  let checkedOption = undefined;
  for (let i = 0; i < paymentOp.length; i++) {
    if (paymentOp[i].checked) {
      checkedOption = paymentOp[i].id
    }
  }
  switch (checkedOption) {
    case "credit-radio":
      if (cardNum.length < 13 || cardNum.length > 16 || isNaN(Number(cardNum))) {
        
        alert("Verifica que el número de tu tarjeta tenga entre 13 y 16 caracteres numéricos.")

      } else if (cardCode.length != 3 || isNaN(Number(cardCode))) {
        
        alert("Corrobora que tu código de seguridad sea el correcto.")

      } else if (cardDate.length != 2 || month < 1 || month > 12 || year < (currentYear - 1)) {
        
        alert("Verifica que la fecha de vencimiento de tu tarjeta sea la correcta.")

      } else {
        $('#paymentModal').modal('hide');
      }
      break;

    case "account-radio":
      if (bankNum.length < 12 || bankNum.length > 20 || isNaN(Number(bankNum))) {
        
        alert("Verifica que tu número de cuenta tenga entre 13 y 20 caracteres numéricos")
      } else if (bankSuc.length <= 0) {
        
        alert("El campo de sucursal no puede quedar vacío");
      } else {
        $('#paymentModal').modal('hide');
      }
      break;
  }

}

function resetPaymentModal() {

  let radioCredit = document.getElementById("credit-radio");
  let radioBank = document.getElementById("account-radio");

  radioCredit.checked = false;
  radioBank.checked = false;
}


function form_submit() {
  document.getElementById("purchase-details").submit();
 } 
//EVENTOS:

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL_2).then(function (resultObject) {
    if (resultObject.status === "ok") {
      cartContent = resultObject.data.articles;
      showCartContent(cartContent);
    }
  });
  getJSONData(CART_BUY_URL).then(function (resultObject) {
    if (resultObject.status === "ok") {
      successMessage = resultObject.data;
    }
  });

});



document.getElementById("change-currency").addEventListener("click", function (e) {

  isDollar = !isDollar;

  currencyConversion();
  showTotalCost();
})



document.getElementById("finalize-purchase").addEventListener("click", function (event) {
  event.preventDefault()
  let shippingAdd = document.getElementById("shipping-add").value;
  let shippingCity = document.getElementById("shipping-city-country").value;
  let paymentCredit = document.getElementById("credit-radio");
  let paymentBank = document.getElementById("account-radio");



  if (shippingAdd.length < 5 || shippingCity.length < 5 || !isNaN(Number(shippingAdd)) || !isNaN(Number(shippingCity))) {
    
    alert("Completa los campos restantes de forma correcta para finalizar tu compra.");
    
  } else if (finSubTotal == "0") {
    
    alert("Debes añadir productos para finalizar tu compra");
    
  } else if (paymentCredit.checked == false && paymentBank.checked == false) {
    
    alert("Debes seleccionar un método de pago para finalizar tu compra")
    
  } else {
    $('#myModal').modal({ show: true });
    successfulPurchase();
  }
  
  
});

document.getElementById("credit-radio").addEventListener("click", function (e) {
  let creditInput = document.getElementsByClassName("credit-input");
  let accountCard = document.getElementById("account-data");

  let accountInput = document.getElementsByClassName("account-input");
  let creditCard = document.getElementById("credit-data");


  for (let i = 0; i < creditInput.length; i++) {
    creditInput[i].removeAttribute("disabled");
    creditInput[i].setAttribute("required", true);
  }

  for (let i = 0; i < accountInput.length; i++) {
    accountInput[i].setAttribute("disabled", true);
    accountInput[i].removeAttribute("required");
  }

  accountCard.style.opacity = "50%";
  creditCard.style.opacity = "100%";

})

document.getElementById("account-radio").addEventListener("click", function (e) {
  let accountInput = document.getElementsByClassName("account-input");
  let creditCard = document.getElementById("credit-data");

  let creditInput = document.getElementsByClassName("credit-input");
  let accountCard = document.getElementById("account-data");

  for (let i = 0; i < accountInput.length; i++) {
    accountInput[i].removeAttribute("disabled");
  }

  for (let i = 0; i < creditInput.length; i++) {
    creditInput[i].setAttribute("disabled", true);
  }

  creditCard.style.opacity = "50%";
  accountCard.style.opacity = "100%";
})

