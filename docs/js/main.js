const f=document.querySelector(".js_input-search"),m=document.querySelector(".js_submit-search"),a=document.querySelector(".js_list-products"),u=document.querySelector(".js_list-cart"),d=document.querySelector(".js_delete_cart");let i=[],n=[];localStorage.getItem("cart")!==null&&(n=JSON.parse(localStorage.getItem("cart")),s());function o(e){for(let t of e){let c=n.findIndex(l=>l.id===t.id),r=document.getElementById(t.id);r!==null&&(c!==-1?(r.classList.add("product__button--selected"),r.innerHTML="Eliminar"):(r.classList.remove("product__button--selected"),r.innerHTML="Comprar"))}}function h(e){let t=e.currentTarget.id;console.log(t);const c=n.findIndex(r=>"bin-"+r.id===t);n.splice(c,1),localStorage.setItem("cart",JSON.stringify(n)),o(i),s()}function _(){document.querySelectorAll(".js_bin").forEach(t=>{t.addEventListener("click",h)})}function b(){localStorage.removeItem("cart"),n=[],s(),o(i)}function g(){n.length!==0?d.classList.remove("hidden"):d.classList.add("hidden")}function s(){u.innerHTML=" ";let e="";for(let t of n)e+=`
            <li>
                <div class="cart">
                    <div class="cart__img" style="background-image: url('${t.image}'), url('https://placehold.co/50x50');"></div>
                    <p class="cart__product-title">${t.title} | ${t.price}€</p>
                    <button class="js_bin cart__button" id="bin-${t.id}">🗑️</button>
                </div>
            </li>
        `;u.innerHTML=e,localStorage.setItem("cart",JSON.stringify(n)),_(),g()}function S(e){let t=parseInt(e.currentTarget.id),c=i.find(l=>l.id===t),r=n.findIndex(l=>l.id===t);r===-1?n.push(c):n.splice(r,1),s(),o(i)}function L(){document.querySelectorAll(".js_comprar").forEach(t=>{t.addEventListener("click",S)})}function p(e){a.innerHTML=" ";let t="";for(let c of e)t+=`
            <li>
                <div class="product">
                    <div class="product__img" style="background-image: url('${c.image}'), url('https://placehold.co/300x200');"></div>
                    <h4 class="product__title">${c.title}</h4>
                    <p class="product__price">${c.price}€</p>
                    <button class="js_comprar product__button" id="${c.id}">Comprar</button>
                </div>
            </li>
        `;a.innerHTML=t,L()}function v(e){e.preventDefault();const t=f.value,c=i.filter(r=>r.title.toLowerCase().includes(t.toLowerCase()));p(c),o(c)}fetch("https://fakestoreapi.com/products").then(e=>e.json()).then(e=>{i=e,p(i),o(i)});m.addEventListener("click",v);d.addEventListener("click",b);
//# sourceMappingURL=main.js.map
