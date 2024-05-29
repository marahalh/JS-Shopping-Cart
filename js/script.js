// login   sign up + save data in local storage 
// products // add products to cart // add some products fav and delete
// add 1 or more products 
// user without login can see only the products 

let cartsProducts = document.querySelector(".carts_products")
let shoppingCartIcon = document.querySelector(".icon")
let chosenProductsCount = localStorage.getItem("chosenProductsCount") ? localStorage.getItem("chosenProductsCount") : 0;
let addedItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
let ProductsInFavourit = localStorage.getItem("ProductsInFavourit") ? JSON.parse(localStorage.getItem("ProductsInFavourit")) : [];


////////////////////////////////////////////////////////////////////////////////
let allProducts = document.querySelector(".products")
let products = [
    {
        id: 1,
        title: "Venice City Of Pictures",
        price: "40",
        category: "History",
        imageUrl: "./Images/book1.jpg",
        desc: "From its rich history as a maritime power and magnet for diverse cultures to the central role it played during the ...",


    },
    {
        id: 2,
        title: "Monet",
        price: "30",
        category: "Art",
        imageUrl: "./Images/book2.jpg",
        desc: "Anyone who has followed Wullschläger’s amazing writing and art criticism over the years will probably not ...",


    },
    {
        id: 3,
        title: "What should Danny Do?",
        price: "10",
        category: "Children",
        imageUrl: "./Images/book3.jpg",
        desc: "With 9 Stories in 1, the fun never ends! What Should Danny Do? is an innovative, interactive book that empowers ...",


    },
    {
        id: 4,
        title: "The Covenant of water",
        price: "33",
        category: "Historical Fiction",
        imageUrl: "./Images/book4.jpg",
        desc: "Verghese’s first novel since 2008’s bestselling Cutting for Stone is a gorgeous and unforgettable epic about ...",


    },
    {
        id: 5,
        title: "Never Lie",
        price: "18",
        category: "Thriller",
        imageUrl: "./Images/book5.jpg",
        desc: "The success of Freida McFadden's The Housemaid has made her an entire domestic thriller brand that ...",


    },
    {
        id: 6,
        title: "Atomic Habits",
        price: "10",
        category: "grey",
        imageUrl: "./Images/book7.jpg",
        desc: "Thoughtful and easy to understand, James Clear’s Atomic Habits is a must for anyone trying to change their ...",


    },
    {
        id: 7,
        title: "Hidden Potential",
        price: "15",
        category: "self-help",
        imageUrl: "./Images/book6.jpg",
        desc: "Grant contends that character development and learning ability, rather than hard labor or intrinsic talent, ...",


    },
    {
        id: 8,
        title: "The Wager",
        price: "18",
        category: "Nonfiction",
        imageUrl: "./Images/book8.jpg",
        desc: "From the author of Killers of the Flower Moon, a page-turning story of shipwreck, survival, and savagery ...",


    }
]
function drawItems(productsToDraw) {
    let x = productsToDraw.forEach(function (item) {
        allProducts.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-12  my-3">
        <div class="service card shadow rounded mx-auto product_item" style="width: 18rem;">
            <img src="${item.imageUrl}" class="card-img-top " alt="..." height="300">
            <div class="card-body position-relative card_cus">
                <div class="d-flex flex-row">
                    <h5 class="card-title">${item.title}</h5>
                </div>
                <p class="card-text mt-3 ">${item.desc}</p>
                <div class="service-btn product_item_action ">
                    <button id="${item.id}add" class="btn service-btn-cus add_to_cart" onClick="addToCart(${item.id})">Add To Cart</button>
                    <button id="${item.id}remove" class="btn service-btn-cus2 add_to_cart" onClick="removeFromCart(${item.id},true)">Remove from Cart</button>
                    <i id="${item.id}fav" class="fas fa-heart add_to_favourit" onClick="removeFromFavourite(${item.id},this)"></i>
                </div>
            </div>  
        </div>
    </div> `;
        let addbutton_id = document.getElementById(item.id + "add");
        let removebutton_id = document.getElementById(item.id + "remove");
        if (addedItem.find(ele => ele.id == item.id)) {
            console.log("found")
            addbutton_id.style.display = "none";
            // removebutton_id.style.display = "block !important";
            removebutton_id.setAttribute('style', 'display:block !important');
        }
        else
            console.log("not")

        let favIcon = document.getElementById(item.id + "fav");
        if (ProductsInFavourit.find(ele => ele.id == item.id)) {
            favIcon.style.color = "rgb(175, 12, 12)";
        }

    })
}
drawItems(products)

let cartProductDiv = document.querySelector(".carts_products div")
let badge = document.querySelector(".badge")


// let addedItem = [];



if (addedItem.length != 0) {
    addedItem.map(item => {
        cartProductDiv.innerHTML += `<p id=${item.id} class="selected_title">${item.title}
        <span class="count">${item.count}</span> 
        <i class="plus fas fa-plus-circle" onClick="addToCart(${item.id})"></i>
         <i class="minus fas fa-minus-circle" onClick="removeFromCart(${item.id})"></i> 
         </p>`;

    })
    badge.setAttribute('style', 'display:block !important');
    badge.innerHTML = localStorage.getItem("chosenProductsCount");
}


function addToCart(id) {

    if (localStorage.getItem("username")) {
        let addbutton_id = document.getElementById(id + "add");
        let removebutton_id = document.getElementById(id + "remove");

        addbutton_id.style.display = "none";
        //  removebutton_id.style.display = "block";
        removebutton_id.setAttribute('style', 'display:block !important');

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
            if (cartProductDiv)
                cartProductDiv.innerHTML += `<p id=${choosenItem.id} class="selected_title">${choosenItem.title}<span class="count">1</span> <i class="plus fas fa-plus-circle" onClick="addToCart(${choosenItem.id})"></i> <i class="minus fas fa-minus-circle"  onClick="removeFromCart(${choosenItem.id})"></i></p>`;
            ProductsInCart = [...ProductsInCart, choosenItem]
            ProductsInCart[ProductsInCart.indexOf(choosenItem)].count = 1;

        }

        localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart))
        localStorage.setItem("chosenProductsCount", chosenProductsCount);
        let cartProductsLength = chosenProductsCount;
        badge.setAttribute('style', 'display:block !important');
        badge.innerHTML = cartProductsLength;
        // cartsProducts.setAttribute('style', 'display:block !important');

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
        let addbutton_id = document.getElementById(id + "add");
        let removebutton_id = document.getElementById(id + "remove");

        addbutton_id.style.display = "block";
        removebutton_id.setAttribute('style', 'display:none !important');


    }
    cartProductDiv.innerHTML = "";
    if (ProductsInCart.length != 0) {
        ProductsInCart.map(item => {
            cartProductDiv.innerHTML += `<p id=${item.id} class="selected_title">${item.title}<span class="count">${item.count}</span> <i class="plus fas fa-plus-circle" onClick="addToCart(${item.id})"></i> <i class="minus fas fa-minus-circle" onClick="removeFromCart(${item.id})"></i> </p>`;
        })
    }
    localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart))
    let count = localStorage.getItem("chosenProductsCount");
    console.log(choosenItem.count);
    if (ifAll)
        count = count - choosenItem.count - 1;
    else
        count = count - 1;
    badge.innerHTML = count;
    localStorage.setItem("chosenProductsCount", count);

}

//////////////////////////////////////////////////////////////////////////

shoppingCartIcon.addEventListener("click", opencart)

function opencart() {
    if (cartProductDiv.innerHTML != "") {
        if (cartsProducts.style.display == "block") {
            cartsProducts.style.display = "none"
        } else {
            cartsProducts.style.display = "block";
        }
    }
}
///////////////////////////////////////////////////////////////////////

console.log("view4" + cartsProducts.style.display)
let globalSearch = document.querySelector(".globalSearch");
let searchByCat = document.querySelector(".searchByCat");
globalSearch.addEventListener("input", search)

function search() {
    let searchResult = []
    console.log(products)

    if (searchByCat.value == "ByTitle") {
        console.log("title")
        products.forEach(item => {
            if (item.title.toLowerCase().includes(document.querySelector(".globalSearch").value.toLowerCase()))
                searchResult.push(item);
        })
    }
    if (searchByCat.value == "ByCategory") {
        console.log("ByCategory")
        products.forEach(item => {
            if (item.category.toLowerCase().includes(document.querySelector(".globalSearch").value.toLowerCase()))
                searchResult.push(item);
        })
    }



    console.log(searchResult)
    allProducts.innerHTML = "";
    drawItems(searchResult)

}

/////////////////////////////////////////////////////////////////
//favourit
function removeFromFavourite(id, curFavIcon) {
    if (localStorage.getItem("username")) {
        ProductsInFavourit = localStorage.getItem("ProductsInFavourit") ? JSON.parse(localStorage.getItem("ProductsInFavourit")) : [];
        let item = ProductsInFavourit.find((ele) => ele.id === id);
        if (item) {
            console.log("delete")
            curFavIcon.style.color = "black";
            ProductsInFavourit.splice(ProductsInFavourit.indexOf(item), 1);
        }
        else {
            console.log("add")
            curFavIcon.style.color = "rgb(175, 12, 12)";
            item = products.find((ele) => ele.id === id);
            ProductsInFavourit = [...ProductsInFavourit, item];
        }

        localStorage.setItem("ProductsInFavourit", JSON.stringify(ProductsInFavourit))

    }
    else {
        window.location = "login.html"
    }

}
