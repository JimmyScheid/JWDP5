let cameraList = document.querySelector('#camera-list');

fetch("http://localhost:3000/api/cameras")
    .then(async result_ => { 
        const results = await result_.json() 
        results.forEach(camera => {
            cameraCard(camera)
        })
    })
    .catch(error => {
        console.log(error);
    })

    function cameraCard(camera){
        cameraList.innerHTML +=
            `<div class="col-sm-6 col-md-4">
                <a href="./produit.html?id=${camera._id}" class="card mb-4" id=${camera._id}>
                    <img class="card-img big-height" src="${camera.imageUrl}"></img>
                    <div class="card body card-body-background text-center">
                        <div class="card-desc">
                            <h3 class="card-title text-white">${camera.name}</h3>
                        </div>
                    </div>
                </a>
            </div>`
    } 