'use strict';

// CONSTANTES
const searchInput = document.querySelector(".js_input-search");
const searchSubmit = document.querySelector(".js_submit-search");
const listProducts = document.querySelector(".js_list-products");
const listCart = document.querySelector(".js_list-cart");
const deleteCart = document.querySelector(".js_delete_cart");
let products = [];
let cart = [];

// local storage
if (localStorage.getItem("cart")!== null) {
    cart = JSON.parse(localStorage.getItem("cart"));
    renderSelectedProducts();
};

// FUNCIONES
function itemSelected(sample){
    for (let productShop of sample){
        let cartIndex = cart.findIndex((productCart) => productCart.id === productShop.id );
        let btn = document.getElementById(productShop.id);
        if (btn !== null) {
        if (cartIndex !== -1){
            btn.classList.add("product__button--selected");
            btn.innerHTML="Eliminar";
        } else{
            btn.classList.remove("product__button--selected");
            btn.innerHTML="Comprar";
        };
    }
    } 
};

function deleteSelectedProduct(ev){
    let binId = ev.currentTarget.id;
    console.log(binId);
    const index = cart.findIndex(cart => "bin-" + cart.id === binId);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    itemSelected(products);
    renderSelectedProducts();
};

function initDeleteButtons(){
    let binProducts = document.querySelectorAll(".js_bin");
    binProducts.forEach((bin) => {
        bin.addEventListener("click", deleteSelectedProduct);
    });
};

function deleteCartList(){
    localStorage.removeItem("cart");
    cart = [];
    renderSelectedProducts();
    itemSelected(products);
};

function showBtnDeleteCartList(){
    if (cart.length !== 0){
        deleteCart.classList.remove("hidden");
    } else{
        deleteCart.classList.add("hidden");
    }
}

function renderSelectedProducts(){
    listCart.innerHTML = " ";
    let compra = "";
    for (let product of cart){
        compra += `
            <li>
                <div class="cart">
                    <div class="cart__img" style="background-image: url('${product.image}'), url('https://placehold.co/50x50');"></div>
                    <p class="cart__product-title">${product.title} | ${product.price}€</p>
                    <button class="js_bin cart__button" id="bin-${product.id}">🗑️</button>
                </div>
            </li>
        `;
    }
    listCart.innerHTML = compra;
    localStorage.setItem("cart", JSON.stringify(cart));
    initDeleteButtons();
    showBtnDeleteCartList();
};
    
function handleClickBuy(ev){
    let buyId = parseInt(ev.currentTarget.id);
    let selectedProduct = products.find((product) => product.id === buyId );
    let cartIndex = cart.findIndex((product) => product.id === buyId );
    if (cartIndex === -1){
        cart.push(selectedProduct); 
    } else{
        cart.splice( cartIndex, 1 );
    }
    renderSelectedProducts();
    itemSelected(products);
};

function forEachBuy(){
    let btnBuy = document.querySelectorAll(".js_comprar");
    btnBuy.forEach((btn) => {
        btn.addEventListener("click", handleClickBuy);
    });
};

function renderProducts(sample){
    listProducts.innerHTML = " ";
    let lista = "";
    for (let product of sample){
        lista += `
            <li>
                <div class="product">
                    <div class="product__img" style="background-image: url('${product.image}'), url('https://placehold.co/300x200');"></div>
                    <h4 class="product__title">${product.title}</h4>
                    <p class="product__price">${product.price}€</p>
                    <button class="js_comprar product__button" id="${product.id}">Comprar</button>
                </div>
            </li>
        `;
    }

    listProducts.innerHTML = lista;
    

    forEachBuy();
    
};

function handleClickSearch(ev){
    ev.preventDefault();
    const search = searchInput.value;
    const  listSearch = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
    renderProducts(listSearch); 
    itemSelected(listSearch); 
};

// API
fetch("https://fakestoreapi.com/products")
.then((response) => response.json())
.then((data) => {
    products = data;
    renderProducts(products);
    itemSelected(products);
});


// EVENTOS
searchSubmit.addEventListener("click", handleClickSearch);
deleteCart.addEventListener("click", deleteCartList);
