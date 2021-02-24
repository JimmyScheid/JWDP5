

addNumberCart()



function addNumberCart(){
  let panier = localStorage.getItem("panier")//recupere en caractere le tableau
  let total = 0;
  if(!panier){
    panier = []
  }else{
    panier = JSON.parse(panier)
  }
  panier.forEach((prod) =>{
    total += prod.quantity;
  });
  document.querySelector(".badge").textContent = total;
}