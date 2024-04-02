// login   sign up + save data in local storage 
// products // add products to cart // add some products fav and delete
// add 1 or more products 
// user without login can see only the products 

let userInfo = document.querySelector ("#user_info")
let userD = document.querySelector ("#user")
let links = document.querySelector ("#links")
let chosenProductsCount = localStorage.getItem("chosenProductsCount") ? localStorage.getItem("chosenProductsCount") : 0;

if (localStorage.getItem("username")){
    links.remove()
    userInfo.style.display ="flex"
    userD.innerHTML = localStorage.getItem("username")
}
let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } , 1500)
})
////////////////////////////////////////////////////////////////////////////////
let allProducts = document.querySelector(".products")
let products = [
    {
        id:1,
        title: "Venice City Of Pictures",
        color: "black",
        imageUrl : "./Images/book1.jpg",
        desc:"From its rich history as a maritime power and magnet for diverse cultures to the central role it played during the ...",
        count:0

    },
    {
        id:2,
        title: "Monet",
        color: "red",
        imageUrl : "./Images/book2.jpg",
        desc:"Anyone who has followed Wullschläger’s amazing writing and art criticism over the years will probably not ...",
        count:0

    },
    {
        id:3,
        title: "What should Danny Do?",
        color: "blue",
        imageUrl : "./Images/book3.jpg",
        desc:"With 9 Stories in 1, the fun never ends! What Should Danny Do? is an innovative, interactive book that empowers ...",
        count:0

    },
    {
        id:4,
        title: "he Wager",
        color: "grey",
        imageUrl : "./Images/book4.jpg",
        desc:"From the author of Killers of the Flower Moon, a page-turning story of shipwreck, survival, and savagery ...",
        count:0

    },
    {
        id:5,
        title: "The Covenant of water",
        color: "grey",
        imageUrl : "./Images/book5.jpg",
        desc:"Verghese’s first novel since 2008’s bestselling Cutting for Stone is a gorgeous and unforgettable epic about ...",
        count:0

    },
    {
        id:6,
        title: "Never Lie",
        color: "grey",
        imageUrl : ".././Images/book6.jpg",
        desc:"The success of Freida McFadden's The Housemaid has made her an entire domestic thriller brand that ...",
        count:0

    },
    {
        id:7,
        title: "What should Danny Do?",
        color: "grey",
        imageUrl : "./Images/book7.jpg",
        desc:"Grant contends that character development and learning ability, rather than hard labor or intrinsic talent, ...",
        count:0

    },
    {
        id:8,
        title: "Atomic Habits",
        color: "grey",
        imageUrl : "./Images/book8.jpg",
        desc:"Thoughtful and easy to understand, James Clear’s Atomic Habits is a must for anyone trying to change their ...",
        count:0

    }
]
function drawItems (){
    let x= products.forEach(function (item){
        allProducts.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-12  my-3">
        <div class="service card shadow rounded mx-auto product_item" style="width: 18rem;">
            <img src="${item.imageUrl}" class="card-img-top " alt="..." height="300">
            <div class="card-body position-relative ">
                <div class="d-flex flex-row">
                    <h5 class="card-title">${item.title}</h5>
                </div>
                <p class="card-text mt-3 ">${item.desc}</p>
                <div class="service-btn product_item_action ">
                        <button class="btn service-btn-cus add_to_cart onClick="addToCart(${item.id})" onClick="addToCart(${item.id})">Add To Cart</button>
                    </div>
            </div>
        </div>
    </div> `
    })
}
drawItems ()

let cartProductDiv = document.querySelector(".carts_products div")
let badge = document.querySelector(".badge")


// let addedItem = [];
let addedItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];


if(addedItem) {
    addedItem.map(item => {
        if (item.count == 1)
                cartProductDiv.innerHTML += `<p id=${item.id}>${item.title}</p>`;
            else
            {
                cartProductDiv.innerHTML  += `<p id=${item.id}>${item.title} x${item.count}</p>`;
            }
    })
    badge.setAttribute('style', 'display:block !important');
    badge.innerHTML = localStorage.getItem("chosenProductsCount");
}



  if(localStorage.getItem=("username")){
        function addToCart(id){
           // let c=localStorage.getItem("ProductsInCart").fin
           /* let choosenItem = products.find((item) => item.id === id );
            
            let index = products.indexOf(choosenItem);
            products[index].count += 1 ; 
            if (products[index].count == 1)
            {
                chosenProductsCount++;
                cartProductDiv.innerHTML += `<p id=${choosenItem.id}>${choosenItem.title}</p>`;
                addedItem = [...addedItem , choosenItem]
            }
            else
            {
                chosenProductsCount++;
                let cartProduct = document.getElementById(choosenItem.id)
                console.log("chh" + cartProduct)
                cartProduct.innerHTML = `<p id=${choosenItem.id}>${choosenItem.title} (${choosenItem.count})</p>`;
                
            }*/
            let choosenItem = addedItem.find((item) => item.id === id );
            if (choosenItem)
            {
                chosenProductsCount++;
                addedItem[addedItem.indexOf(choosenItem)].count ++;
                let cartProduct = document.getElementById(choosenItem.id)
                cartProduct.innerHTML = `<p id=${choosenItem.id}>${choosenItem.title} x${choosenItem.count}</p>`;
                
            }
            else
            {
                choosenItem = products.find((item) => item.id === id );
                choosenItem.count ++;
                chosenProductsCount++;
                cartProductDiv.innerHTML += `<p id=${choosenItem.id}>${choosenItem.title}</p>`;
                addedItem = [...addedItem , choosenItem]
            }
            
            localStorage.setItem("ProductsInCart" , JSON.stringify(addedItem) )
            localStorage.setItem("chosenProductsCount",chosenProductsCount);
            let cartProductsLength = chosenProductsCount;
            badge.setAttribute('style', 'display:block !important');
            badge.innerHTML = cartProductsLength;
            console.log(addedItem)
        }
    }else {
        window.location ="login.html"
    }




//////////////////////////////////////////////////////////////////////////
let shoppingCartIcon = document.querySelector(".shopping_cart")
let cartsProducts = document.querySelector(".carts_products")
shoppingCartIcon.addEventListener("click", opencart)

function opencart(){
     if(cartProductDiv.innerHTML !=""){
         if(cartsProducts.style.display=="block"){
            cartsProducts.style.display="none"
         }else {
            cartsProducts.style.display="block";
         }
     } 
}
///////////////////////////////////////////////////////////////////////


