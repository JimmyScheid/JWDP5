let panier = localStorage.getItem("panier");
panier = JSON.parse(panier);

let form = document.getElementById("informations");

form.addEventListener("submit", (e) => {
     e.preventDefault();
    const $firstName = document.querySelector('#nom');
    const $lastName = document.querySelector('#prenom');
    const $adress = document.querySelector('#adresse');
    const $city = document.querySelector('#ville');
    const $mail = document.querySelector('#mail');

    let order = {
        contact: {
             firstName: $firstName.value.trim(), 
             lastName: $lastName.value.trim(),
             address: $adress.value.trim(),
             city: $city.value.trim(),
             email: $mail.value.trim(),
        },
        products: panier.map(p => {
             return p.id
        })
   };


   fetch("http://localhost:3000/api/cameras/order", {
          method: 'POST', 
          headers: new Headers({ "Content-Type": "application/json"}),
          body: JSON.stringify(order) 
     })
     .then( (result_) => {
          return result_.json();
     })
     .then(result =>{
          form.innerHTML = `<p>Votre commande n°${result.orderId} à bien été prise en compte. Merci de votre achat !</p>`      
     })
     .catch(error => {
          console.log(error);
     })
})


