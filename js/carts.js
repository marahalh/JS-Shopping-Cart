let badge = document.querySelector(".shopping_cart")
badge.style.display = "none";

let ProductsInCart = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
let allProducts = document.querySelector(".products")
let allfavProducts = document.querySelector(".favProducts")
let favouritItem = localStorage.getItem("ProductsInFavourit") ? JSON.parse(localStorage.getItem("ProductsInFavourit")) : [];
let cartProductDiv = document.querySelector(".carts_products div")



if (ProductsInCart) {
    drawCartProducts(ProductsInCart);
}
if (favouritItem) {
    drawFavProducts(favouritItem);
}

CalculatePrice();

function drawCartProducts(products) {
    let favouritItem = localStorage.getItem("ProductsInFavourit") ? JSON.parse(localStorage.getItem("ProductsInFavourit")) : [];
    let ProductsInCart = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];

    let x = products.forEach(function (item) {
        allProducts.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-12  my-3">
        <div class="service card shadow rounded mx-auto product_item" style="width: 18rem;">
            <img src="${item.imageUrl}" class="card-img-top " alt="..." height="300">
            <div class="card-body position-relative ">
                <div class="d-flex flex-row">
                    <h5 class="card-title">${item.title}</h5>
                </div>
                <p class="card-text mt-3 ">${item.desc}</p>
                <div class="service-btn product_item_action ">
                        <button class="btn service-btn-cus add_to_cart" onClick="removeFromCart(${item.id},true)">Remove From Cart</button>
                    </div>
            </div>
            <div class="item-count">x ${item.count} <i class="plus fas fa-plus-circle" onClick="addToCart(${item.id})"></i> <i class="minus fas fa-minus-circle" onClick="removeFromCart(${item.id})"></i> </div>
        </div>
    </div> `
    })
    if (favouritItem.length == 0 && ProductsInCart.length == 0) {
        window.location = "index.html"
    }
}





function addToCart(id) {

    if (localStorage.getItem("username")) {

        let ProductsInCart = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
        let chosenProductsCount = localStorage.getItem("chosenProductsCount") ? localStorage.getItem("chosenProductsCount") : 0;


        let choosenItem = ProductsInCart.find((item) => item.id === id);
        if (choosenItem) {
            chosenProductsCount++;
            ProductsInCart[ProductsInCart.indexOf(choosenItem)].count++;
            let cartProduct = document.getElementById(choosenItem.id)
            if (cartProduct)
                cartProduct.innerHTML = `<p id=${choosenItem.id} class="selected_title">${choosenItem.title}<span class="count">${choosenItem.count}</span> <i class="plus fas fa-plus-circle" onClick="addToCart(${choosenItem.id})"></i> <i class="minus fas fa-minus-circle" onClick="removeFromCart(${choosenItem.id})"></i></p>`;
        }
        else {
            choosenItem = products.find((item) => item.id === id);
            chosenProductsCount++;
            /* if (cartProductDiv)
                cartProductDiv.innerHTML += `<p id=${choosenItem.id} class="selected_title">${choosenItem.title}<span class="count">1</span> <i class="plus fas fa-plus-circle" onClick="addToCart(${choosenItem.id})"></i> <i class="minus fas fa-minus-circle"  onClick="removeFromCart(${choosenItem.id})"></i></p>`;
             */ProductsInCart = [...ProductsInCart, choosenItem]
            ProductsInCart[ProductsInCart.indexOf(choosenItem)].count = 1;

        }

        localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart))
        localStorage.setItem("chosenProductsCount", chosenProductsCount);
        let cartProductsLength = chosenProductsCount;
        /* badge.setAttribute('style', 'display:block !important');
        badge.innerHTML = cartProductsLength; */
        // cartsProducts.setAttribute('style', 'display:block !important');
        allProducts.innerHTML = "";
        drawCartProducts(ProductsInCart);
        CalculatePrice()

    }
    else {
        window.location = "login.html"
    }


}

function removeFromCart(id, ifAll = false) {

    let ProductsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
    var choosenItem = ProductsInCart.find(item => item.id == id);

    if (choosenItem.count > 1 && !ifAll) {
        console.log("in cart")
        let index = ProductsInCart.indexOf(choosenItem);
        ProductsInCart[index].count--;
    }
    else {
        let index = ProductsInCart.indexOf(choosenItem);
        ProductsInCart[index].count--;
        ProductsInCart.splice(index, 1);


    }
    /*  cartProductDiv.innerHTML = "";
     if (ProductsInCart.length != 0) {
         ProductsInCart.map(item => {
             if (item.count == 1)
                 cartProductDiv.innerHTML += `<p id=${item.id} class="selected_title">${item.title}<span class="count">${item.count}</span> <i class="plus fas fa-plus-circle" onClick="addToCart(${item.id})"></i> <i class="minus fas fa-minus-circle" onClick="removeFromCart(${item.id})"></i> </p>`;
             else {
                 cartProductDiv.innerHTML += `<p id=${item.id} class="selected_title"> ${item.title} <span class="count">${item.count}</span> <i class="plus fas fa-plus-circle" onClick="addToCart(${item.id})"></i> <i class="minus fas fa-minus-circle" onClick="removeFromCart(${item.id})"></i> </p>`;
             }
         })
     } */
    localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart))
    let count = localStorage.getItem("chosenProductsCount");
    console.log(choosenItem.count);
    if (ifAll)
        count = count - choosenItem.count - 1;
    else
        count = count - 1;
/*     badge.innerHTML = count;
 */    localStorage.setItem("chosenProductsCount", count);
    allProducts.innerHTML = "";
    drawCartProducts(ProductsInCart);
    CalculatePrice()

}

////////////////////////////////////////////////////////////



function CalculatePrice() {
    let totalprice = document.querySelector(".totalprice");
    ProductsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
    let price = ProductsInCart.reduce(function (acc, current) {
        return acc + (current.price * current.count)
    }, 0)

    totalprice.innerHTML = price + "$"

}

//////////////////////////////////////////

function drawFavProducts(favourit) {
    let favouritItem = localStorage.getItem("ProductsInFavourit") ? JSON.parse(localStorage.getItem("ProductsInFavourit")) : [];
    let ProductsInCart = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
    
    allfavProducts.innerHTML = "";
    let x = favourit.forEach(function (item) {
        allfavProducts.innerHTML += `
        <div class="col-5 test">
        <div class="col-lg-4 col-md-6 col-sm-12 card-block">
        <div class="service card shadow rounded product_item" style="width: 18rem;">
            <img src="${item.imageUrl}" class="card-img-top " alt="..." height="300">
            <div class="card-body position-relative " style="height:250px;">
                <div class="d-flex flex-row">
                    <h5 class="card-title">${item.title}</h5>
                </div>
                <p class="card-text mt-3 ">${item.desc}</p>
                <div class="service-btn product_item_action ">
                    <i class="fas fa-heart added_to_favourit" onClick=" removeFromFavourite(${item.id},this)"></i>
                </div>
            </div>
           </div>
    </div> 

    </div>`
    })
    if (favouritItem.length == 0 && ProductsInCart.length == 0) {
        window.location = "index.html"
    }
}

function removeFromFavourite(id, curFavIcon) {
    if (localStorage.getItem("username")) {
        let ProductsInFavourit = localStorage.getItem("ProductsInFavourit") ? JSON.parse(localStorage.getItem("ProductsInFavourit")) : [];
        var choosenItem = ProductsInFavourit.find(item => item.id == id);
        ProductsInFavourit.splice(ProductsInFavourit.indexOf(choosenItem), 1);
        localStorage.setItem("ProductsInFavourit", JSON.stringify(ProductsInFavourit))

        drawFavProducts(ProductsInFavourit)
    }
    else {
        window.location = "login.html"
    }

}
