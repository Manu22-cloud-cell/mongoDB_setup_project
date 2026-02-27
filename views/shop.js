const productList = document.getElementById("productList");

document.addEventListener("DOMContentLoaded",loadShopProducts());

function loadShopProducts() {

    axios.get("/shop/products")
        .then(response => {
            productList.innerHTML = "";

            response.data.forEach(prod => {
                const div = document.createElement("div");
                div.classList.add("product");

                div.innerHTML = `
                    <h3>${prod.title}</h3>
                    <p>₹ ${prod.price}</p>
                    <p>${prod.description}</p>
                    <img src="${prod.imageUrl}" width="100"/>
                `;

                productList.appendChild(div);
            });
        })
        .catch(err => console.log(err));
}