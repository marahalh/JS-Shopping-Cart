let badge = document.querySelector(".shopping_cart")
badge.style.display="none";

let ProductsInCart = localStorage.getItem("ProductsInCart")
let allProducts = document.querySelector(".products")

if(ProductsInCart){
    let item = JSON.parse(ProductsInCart) ;
    drawCartProducts(item);
}

function drawCartProducts(products){
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
                        <button class="btn service-btn-cus add_to_cart" onClick="removeFromCart(${item.id})">Remove From Cart</button>
                    </div>
            </div>
            <div class="item-count">X ${item.count}</div>
        </div>
    </div> `
    })
}


function removeFromCart(id){
    console.log("delete")
    let products = JSON.parse(localStorage.getItem("ProductsInCart"));
   /*  let choosenItem = products.find((item) => item.id === id );
    let index=products.indexOf(choosenItem);
    console.log(index);
    console.log(products.length)
    products.slice(index,1);
    console.log(products);
    drawCartProducts(products); */
    var choosenItem =products.find(item=>item.id == id);
    console.log(choosenItem)
    if (choosenItem.count > 1 )
    {
        let index = products.indexOf(choosenItem);
        products[index].count -- ;
    }
    else
    {
        let index = products.indexOf(choosenItem);
        console.log(index)
        products.splice(index,1);
        
        
    }
    if(products.length == 0)
        window.location = "index.html";
  /*   var filtered = products.filter(function(el) { return el.id != id; }); 
    console.log(filtered);
    if(filtered.length == 0)
    {
        window.location = "index.html";
    } */
    allProducts.innerHTML="";
    localStorage.setItem("ProductsInCart" , JSON.stringify(products) )
    console.log(products)
    let count = localStorage.getItem("chosenProductsCount") - 1;
    localStorage.setItem("chosenProductsCount", count)
    
    drawCartProducts(products);

    
}