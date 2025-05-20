const f=document.querySelector(".js_input-search"),m=document.querySelector(".js_submit-search"),a=document.querySelector(".js_list-products"),u=document.querySelector(".js_list-cart"),d=document.querySelector(".js_delete_cart");let n=[],i=[];localStorage.getItem("cart")!==null&&(i=JSON.parse(localStorage.getItem("cart")),s());function o(e){for(let t of e){let c=i.findIndex(l=>l.id===t.id),r=document.getElementById(t.id);r!==null&&(c!==-1?(r.classList.add("product__button--selected"),r.innerHTML="Eliminar"):(r.classList.remove("product__button--selected"),r.innerHTML="Comprar"))}}function h(e){let t=e.currentTarget.id;const c=i.findIndex(r=>"bin-"+r.id===t);i.splice(c,1),localStorage.setItem("cart",JSON.stringify(i)),o(n),s()}function _(){document.querySelectorAll(".js_bin").forEach(t=>{t.addEventListener("click",h)})}function b(){localStorage.removeItem("cart"),i=[],s(),o(n)}function S(){i.length!==0?d.classList.remove("hidden"):d.classList.add("hidden")}function s(){u.innerHTML=" ";let e="";for(let t of i)e+=`
            <li>
                <div class="cart">
                    <div class="cart__img" style="background-image: url('${t.image}'), url('https://placehold.co/50x50');"></div>
                    <p class="cart__product-title">${t.title} | ${t.price}€</p>
                    <button class="js_bin cart__button" id="bin-${t.id}">🗑️</button>
                </div>
            </li>
        `;u.innerHTML=e,localStorage.setItem("cart",JSON.stringify(i)),_(),S()}function g(e){let t=parseInt(e.currentTarget.id),c=n.find(l=>l.id===t),r=i.findIndex(l=>l.id===t);r===-1?i.push(c):i.splice(r,1),s(),o(n)}function L(){document.querySelectorAll(".js_comprar").forEach(t=>{t.addEventListener("click",g)})}function p(e){a.innerHTML=" ";let t="";for(let c of e)t+=`
            <li>
                <div class="product">
                    <div class="product__img" style="background-image: url('${c.image}'), url('https://placehold.co/300x200');"></div>
                    <h4 class="product__title">${c.title}</h4>
                    <p class="product__price">${c.price}€</p>
                    <button class="js_comprar product__button" id="${c.id}">Comprar</button>
                </div>
            </li>
        `;a.innerHTML=t,L()}function v(e){e.preventDefault();const t=f.value,c=n.filter(r=>r.title.toLowerCase().includes(t.toLowerCase()));p(c),o(c)}fetch("https://fakestoreapi.com/products").then(e=>e.json()).then(e=>{n=e,p(n),o(n)});m.addEventListener("click",v);d.addEventListener("click",b);
//# sourceMappingURL=main.js.map
