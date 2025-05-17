'use strict';

// CONSTANTES
const buscadorInput = document.querySelector(".js_input-buscador");
const buscadorSubmit = document.querySelector(".js_submit-buscador");
const listaProductos = document.querySelector(".js_list-productos");
const listaCarrito = document.querySelector(".js_list-carrito");
let productos = [];
let carrito = [];

// local storage
if (localStorage.getItem("carrito")!== null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    renderSelectedProducts();
};

// Borrar el local storage::::
// localStorage.removeItem("carrito");

// FUNCIONES

function itemSelected(){
    for (let productoTienda of productos){
        let carritoIndex = carrito.findIndex((productoCarrito) => productoCarrito.id === productoTienda.id );
        let btn = document.getElementById(productoTienda.id);
        if (carritoIndex !== -1){
            btn.classList.add("producto__button--selected");
            btn.innerHTML="Eliminar";
        } else{
            btn.classList.remove("producto__button--selected");
            btn.innerHTML="Comprar";
        };
    } 
};

function deleteSelectedProduct(ev){
    let binId = ev.currentTarget.id;
    console.log(binId);
    const index = carrito.findIndex(carrito => "bin-" + carrito.id === binId);
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    itemSelected();
    renderSelectedProducts();
};


function initDeleteButtons(){
    let binProducts = document.querySelectorAll(".js_bin");
    binProducts.forEach((bin) => {
        bin.addEventListener("click", deleteSelectedProduct);
    });
  };

function renderSelectedProducts(){
    listaCarrito.innerHTML = " ";
    let compra = "";
    for (let producto of carrito){
        compra += `
            <li>
                <div class="carrito">
                    <div class="carrito__img" style="background-image: url('${producto.image}'), url('https://placehold.co/300x200');"></div>
                    <p class="carrito__product-title">${producto.title} | ${producto.price}€</p>
                    <button class="js_bin carrito__button" id="bin-${producto.id}">🗑️</button>
                </div>
            </li>
        `;
    }
    listaCarrito.innerHTML = compra;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    initDeleteButtons();
};
    
function handleClickBuy(ev){
    let buyId = parseInt(ev.currentTarget.id);
    let productoSeleccionado = productos.find((producto) => producto.id === buyId );
    let carritoIndex = carrito.findIndex((producto) => producto.id === buyId );
    if (carritoIndex === -1){
        carrito.push(productoSeleccionado); 
    } else{
        carrito.splice( carritoIndex, 1 );
    }
    renderSelectedProducts();
    itemSelected();
};

function forEachBuy(){
    let btnBuy = document.querySelectorAll(".js_comprar");
    btnBuy.forEach((btn) => {
        btn.addEventListener("click", handleClickBuy);
    });
};

function renderProducts(muestra){
    listaProductos.innerHTML = " ";
    let lista = "";
    for (let producto of muestra){
        lista += `
            <li>
                <div class="producto">
                    <div class="producto__img" style="background-image: url('${producto.image}'), url('https://placehold.co/300x200');"></div>
                    <h4 class="producto__title">${producto.title}</h4>
                    <p class="producto__price">${producto.price}€</p>
                    <button class="js_comprar producto__button" id="${producto.id}">Comprar</button>
                </div>
            </li>
        `;
    }

    listaProductos.innerHTML = lista;
    forEachBuy();
    
};

function handleClickSearch(ev){
    ev.preventDefault();
    const busqueda = buscadorInput.value;
    const  listaBuscados = productos.filter(producto => producto.title.toLowerCase().includes(busqueda.toLowerCase()));
    renderProducts(listaBuscados);
  
};

// API
fetch("https://fakestoreapi.com/products")
.then((response) => response.json())
.then((data) => {
    productos = data;
    renderProducts(productos);
    itemSelected();
});



// EVENTOS
buscadorSubmit.addEventListener("click", handleClickSearch);

