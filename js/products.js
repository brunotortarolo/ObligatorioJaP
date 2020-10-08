//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

var prodContainer = document.createElement("div"); 
    document.body.appendChild(prodContainer);
    prodContainer.id="product-list-container";
    

    
    function showProductsList(array) {
    
    let htmlContentToAppend = "";


    for (let i = 0; i < array.length; i++){
        let product = array[i];
        let name = product.name;
        
        htmlContentToAppend += `
        <a href="product-info.html?model=`+name+`" class="list-group-item list-group-item-action">
            <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.name + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                    </div>
                    <div>` + product.description + `</div>
                    <div>` + product.currency + product.cost + `</div>
                </div>
            </div>
        </div>
        </a>
        `
    }

    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(PRODUCTS_URL).then(function(resultObject){
        if (resultObject.status === "ok"){
            productsArray = resultObject.data;
            showProductsList(productsArray);
        }
        });
});

//filtro de búsqueda entre rangos de precio libres

document.getElementById("filter-button").addEventListener("click", function(e){
    let min = document.getElementById("min-filter").value;
    let max = document.getElementById("max-filter").value; 
    getJSONData(PRODUCTS_URL).then(function(resultObject){
        if (resultObject.status === "ok"){
            productsArray = resultObject.data.filter(elemento => (!min || elemento.cost >= min) && (!max || elemento.cost <= max));
            showProductsList(productsArray);
        }
        });
});



//Filtro de búsqueda opciones predefinidas

document.getElementById("filter-select").addEventListener("change", function(e){
     
     
    const select = document.getElementById("filter-select");
    const selectedID = select.options[select.selectedIndex].id;
    
    let min = 0;
    let max = 0;
    switch(selectedID){
        case "op1": 
            min = 0;
            max = 13000;
            break;
        case "op2":
            min = 13000;
            max = 14500;
            break;
        case "op3":
            min = 14500;
            max = 15000;
            break;
        case "op4":
            min = 15000;
            max = Number.MAX_SAFE_INTEGER;
            break;
        default:
            min = 0
            max = Number.MAX_SAFE_INTEGER;
    }

    getJSONData(PRODUCTS_URL).then(function(resultObject){
        if (resultObject.status === "ok"){
            productsArray = resultObject.data.filter(elemento => (elemento.cost >= min) && (elemento.cost <= max));
            showProductsList(productsArray);
        }
        });
});

//Limpiar filtro
function clearFilter(){
    getJSONData(PRODUCTS_URL).then(function(resultObject){
        if (resultObject.status === "ok"){
            productsArray = resultObject.data;
            showProductsList(productsArray);
        }
        });
    }

//Ordenar productos

function sortProductsBy(sortingProperty, order){
    
    
    productsArray.sort(function(prodA,prodB){
      
        
        return (prodA[sortingProperty] - prodB[sortingProperty]) * order;
    })
    showProductsList(productsArray);
}

//barra de búsqueda de productos

document.getElementById("search-input").addEventListener("keyup", function(e){
    let searchInput = document.getElementById("search-input").value.toLowerCase();
    let searchArray = productsArray.filter(elemento => (elemento.name.toLowerCase().includes(searchInput)) || (elemento.description.toLowerCase().includes(searchInput)));
    showProductsList(searchArray);
});