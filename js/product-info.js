let product = {};
let reviews = [];
let allProd = [];
let slideIndex = 1;
const userID = sessionStorage.getItem("emailDisplay") || localStorage.getItem("emailDisplay");
let showingReviews = false;

//MOSTRAR IMAGENES DEL PRODUCTO SELECCIONADO Y SLIDER
function showProductsImg(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        
        htmlContentToAppend += `
        <div class="mySlides">
                <img src="` + imageSrc + `" style="width: 100%">
        </div>
        `
    }
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

    document.getElementById("productImagesGallery").innerHTML += `
        
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
    `;
}

function showSlides(n) {
    showProductsImg(product.images);

    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}
function plusSlides(n) {
    showSlides(slideIndex += n);
}



//MOSTRAR PRODUCTOS RELACIONADOS (se modifican parámetros de URL cuando se acciona el link, pero no modifica info del producto ya que no existe)
function showRelatedProducts(relatedProducts) {
    
    let htmlContentToAppend = "";

    for (let i = 0; i < relatedProducts.length; i++) {
        let relatedProdIndex = relatedProducts[i];

        if (relatedProdIndex < allProd.length) {
            let product = allProd[relatedProdIndex];

            htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <h5 class="mb-1">`+ product.name + `</h5>
                    <p class="mb-1">`+ product.currency + product.cost + `</p>
                    <a href="product-info.html?model=`+product.name+`">
                        <img class="img-fluid img-thumbnail" src="` + product.imgSrc + `" alt="product.name">
                    </a>
                </div>
            </div>
            `
        }
    }
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend
}



//MOSTRAR REVIEWS DE PRODUCT_INFO_COMMENTS_URL
function showReviews(array) {
    let htmlContentToAppend = "";
    let starOn = `<span style="color: orange" class="fa fa-star checked"></span>`
    let starOff = `<span class="fa fa-star"></span>`
    let formBtn = `<button id="open-review-form" type="input" class="btn btn-light btn-lg btn-block" onclick="yourReview()">Califica este producto!</button>`

    for (let i = 0; i < array.length; i++) {
        let reviewContent = array[i];

        let totalStarOn = starOn.repeat(reviewContent.score);
        let totalStarOff = starOff.repeat(5 - reviewContent.score);
        let starRating = totalStarOn + totalStarOff;

        htmlContentToAppend += `  
            <div class="single-review">                
                <div class = "user-and-score"> `+ reviewContent.user + ` ` + starRating + ` </div>
                <div class = "user-review"> "`+ reviewContent.description + `". </div>
                <div class = "date-time">`+ reviewContent.dateTime + ` </div>
            </div> 
    `
    }
    document.getElementById("review-container").innerHTML = htmlContentToAppend;
    document.getElementById("your-review").innerHTML = formBtn;

}


//CREAR FORM PARA NUEVA REVIEW DE PRODUCTO
function yourReview() {
    let formContainer = document.createElement("div");
    document.getElementById("your-review").appendChild(formContainer);
    formContainer.id = "form-container";



    let htmlContentToAppend = `
        <div>
            <p id="user-name">Usuario: `+ userID + `</p>
        
            <form id="review-form" method="GET" action"#"> 
                <div id="score-input-box" class="form-group">
                    <input id="score-input" class="form-control" type="number" min="0" max="5" class="btn btn-light btn-block" placeholder="Califica tu producto">
                </div>
            
                <div id="text-submit" class="form-group">
                    <textarea id="review-text-input" class="form-control" placeholder="Deja aquí tu opinión"></textarea>
                
                    <input id"submit-review-form" class="btn btn-light btn-lg btn-block form-control" type="submit" value="Enviar" onclick="submitReview(event)">
                </div>
            </form>
        </div>
        `

    document.getElementById("form-container").innerHTML = htmlContentToAppend;

}

// PUBLICAR NUEVO REVIEW
function submitReview(event) {
    event.preventDefault();

    const clientRating = document.getElementById("score-input").value;
    const clientReview = document.getElementById("review-text-input").value;
    const now = new Date();
    const dateTime = now.getUTCFullYear().toString() + "-" +
        (now.getUTCMonth() + 1).toString() +
        "-" + now.getUTCDate() + " " + now.getUTCHours() +
        ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();

    const postReview = {
        "score": clientRating,
        "description": clientReview,
        "user": userID,
        "dateTime": dateTime,
    }
    if (clientRating == null || clientReview == "") {
        alert("Debes completar los campos para publicar tu review")
    } else {
        reviews.push(postReview);
        showReviews(reviews);
    }
}


//Events:
//No se retira información de los parámetros query de la URL para cargar el contenido para evitar que el sitio quede vacío en caso de ingresar desde una opción no existente.

document.addEventListener("DOMContentLoaded", function (e) {
    
    let params = new URLSearchParams(document.location.search)
    let model = params.get("model");

   

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCostHTML = document.getElementById("productCost")

            productNameHTML.innerHTML = model;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = (product.currency + product.cost);


            showSlides(slideIndex)

            getJSONData(PRODUCTS_URL).then(function (resultObject) {
                if (resultObject.status === "ok") {

                    allProd = resultObject.data;
                    if (product != null && product.relatedProducts.length > 0) {
                        showRelatedProducts(product.relatedProducts);
                    }
                }
            });
        }
    });


    

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObject) {
        if (resultObject.status === "ok") {

            reviews = resultObject.data;
        }
    });
});



document.getElementById("review-link").addEventListener("click", function (e) {
    if (showingReviews) {
        document.getElementById("review-container").innerHTML = "";
        document.getElementById("your-review").innerHTML = "";
        document.getElementById("review-link").innerHTML = "Ver reviews";
        showingReviews = false;
    } else {
        showReviews(reviews);
        showingReviews = true;
        document.getElementById("review-link").innerHTML = "Ocultar reviews";
    }
});

