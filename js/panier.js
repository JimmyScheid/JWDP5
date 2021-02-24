const basketList = document.querySelector('#productList');
const orderSummary = document.querySelector('#orderSummary');
let panier = localStorage.getItem("panier")
panier = JSON.parse(panier)

for(i = 0; i < panier.length; i++){
    basketList.innerHTML +=
    ` <div class="cart-item pr-5 mt-2">
    <div class="row align-items-center">
      <div class="col-12 col-lg-6">
        <div class="media-product">
          <a href="#!"><img src="${panier[i].imageUrl}" alt="Image" class="w-100"></a>
          <div class="media-desc ml-3">
            <h5 class="media-title">${panier[i].name}</h5>
            <span class="small">${panier[i].lenses}</span>
          </div>
        </div>
      </div>
      <div class="col-4 col-lg-2 text-center">
        <span class="cart-item-price">${panier[i].price}&euro;</span>
      </div>
      <select id="quantity" class="form-control counter col-4 col-lg-2 text-center" onchange="changeQty(this.value, ${i})">
        <option value="1" ${panier[i].quantity == 1 ? " selected" : ""}>1</option></option>
        <option value="2" ${panier[i].quantity == 2 ? " selected" : ""}>2</option>
        <option value="3" ${panier[i].quantity == 3 ? " selected" : ""}>3</option>
        <option value="4" ${panier[i].quantity == 4 ? " selected" : ""}>4</option>
        <option value="5" ${panier[i].quantity == 5 ? " selected" : ""}>5</option>
        <option value="6" ${panier[i].quantity == 6 ? " selected" : ""}>6</option>
        <option value="7" ${panier[i].quantity == 7 ? " selected" : ""}>7</option>
        <option value="8" ${panier[i].quantity == 8 ? " selected" : ""}>8</option>
        <option value="9" ${panier[i].quantity == 9 ? " selected" : ""}>9</option>
      </select>

      <div class="col-4 col-lg-2 text-center">
        <span class="cart-item-price">${panier[i].price * panier[i].quantity}&euro;</span>
      </div>
      <a href="#!" class="cart-item-close"><i class="far fa-times-circle close"></i></a>
    </div>
  </div>
  <hr>`
}


if(panier){
  orderSummary.innerHTML +=
  `<div class="card">
  <div class="card-header bg-white">
        <h3 class="card-title">Order Summary</h3>
  </div>
  <div class="card-body">
      <p class="card-text">Subtotal<span class="float-right subTotal"></span></p>
      <p class="card-text">Shipping<span class="float-right">5.5%</span></p>
  </div>
  <div class="card-footer bg-white">
      <p class="">Total<span class="float-right totalTTC"></span></p>
  </div>
  </div>
  <a href="../html/checkout.html" class="btn btn-lg btn-primary btn-block mt-1">Checkout</a>
  </div>`
  addNumberTotal();
  removeProduct();
}

function changeQty(value, i){
  panier[i].quantity = parseInt(value);
  localStorage.setItem("panier", JSON.stringify(panier));
  window.location.reload();
}




function addNumberTotal(){
  let total = 0;
  let orderTotal = document.querySelector(".subTotal");
  panier.forEach((prod) =>{
    total += prod.price * prod.quantity;
  });
  orderTotal.textContent = total + "€";
  addNumberTotalTTC()

  function addNumberTotalTTC(){
    let HT = total;
    let tva = 5.5;
    let TVA = (Number(HT) * Number(tva)) / 100;
    let TTC = HT + TVA;
    document.querySelector(".totalTTC").textContent = TTC.toFixed(2) +"€";
  
  }
}



function removeProduct(){
  for (let i = 0 ; i < panier.length; i++) {
      let button = document.getElementsByClassName("close");
      button[i].addEventListener('click', () =>{
        console.log(i);
        panier.splice(i, 1);
        localStorage.setItem("panier", JSON.stringify(panier));
        window.location.reload();
      });
  }
  
}