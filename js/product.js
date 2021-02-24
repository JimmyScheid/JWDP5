const productDesc = document.querySelector('#productDesc');
const params = (new URL(document.location)).searchParams;
const id = params.get('id'); 


fetch("http://localhost:3000/api/cameras/" + id)
  .then(async result_ => {
    const result = await result_.json()
    camera = result 
    cameraDesc(camera)
    lenseList(camera)
  })
  .catch((error) => {
    console.log(error);
  })

function cameraDesc(camera){
  camera.price = parseFloat(camera.price) / 100
  productDesc.innerHTML +=
            `<div class="col-md-6">
            <div class="row">
              <div class="col-lg-12 order-lg-2">
                <div id="carouselExampleCaptions" class="carousel slide" >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img src="${camera.imageUrl}" class="d-block" alt="...">
                    </div>
                  </div>
                </div> 
              </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="row">
              <div class="col-12">
                <h2 class="item-title">${camera.name}</h2>
                <p class="item-brand">${camera.description}</p>
                <p class="item-price" id="total-price"><strong>${camera.price} $</strong></p>
              </div>
            </div>
            <form>
              <div class="form-group">
                <label for="form-control">Objectif</label>
                <select class="form-control" id="formControl"></select>
                <label class="mt-3" for="quantity">Quantité: 
                    <select id="quantity" class="form-control mt-2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </label>
              </div>
            </form>
            <div class="row">
              <div class="col-md-8">
                <a class="btn btn-block btn-lg btn-primary" id="add-basket">Add to Cart</a>
              </div>
            </div>
        </div>`
        addToPrice()
        addToBasket() 
}

function lenseList(camera){
  for (let i = 0; i < camera.lenses.length; i++) {
      const lenses = document.querySelector("#formControl");
      const option = document.createElement("option") 
      option.setAttribute("value", camera.lenses[i])
      option.innerHTML = camera.lenses[i]
      lenses.appendChild(option)
  }
}

function addToPrice() {
  let totalPrice = document.getElementById("total-price")
  let quantity = document.getElementById("quantity")
  quantity.addEventListener('click', () => {
    totalPrice.innerHTML = `<strong>${camera.price * quantity.value} $</strong>`
  }) 
}

function addToBasket(){
  let button = document.querySelector('#add-basket');
  button.addEventListener('click', () =>{
    let quantity = document.getElementById("quantity").value
    let panier = localStorage.getItem("panier")
    let produit = {
      name: camera.name,
      id: camera._id,
      lenses: formControl.value,
      quantity: parseInt(quantity),
      price: camera.price * quantity,
      priceByItems: camera.price,
      imageUrl: camera.imageUrl
    };

    if(!panier){
      panier = []
    }else{
      panier = JSON.parse(panier)
      
    }


    let isTheSame = false;

    panier.forEach((prod,i) => {
      
        if(prod.id == produit.id && prod.lenses == produit.lenses){
            panier[i].quantity += produit.quantity;
            isTheSame = true;
        }
    })   
    if(!isTheSame) {
        panier.push(produit)
    }
    localStorage.setItem("panier", JSON.stringify(panier))
    addNumberCart()
  })
  
 
}
