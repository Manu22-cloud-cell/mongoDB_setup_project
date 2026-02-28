const productList = document.getElementById("productList");

document.addEventListener("DOMContentLoaded", loadShopProducts);

function loadShopProducts() {

    axios.get("/shop/products")
        .then(response => {
            productList.innerHTML = "";

            response.data.forEach(prod => {
                const div = document.createElement("div");
                div.classList.add("product");

                div.innerHTML = `
        <div class="product-content">
            <h3>${prod.title}</h3>
            <p class="price">₹ ${prod.price}</p>
            <img src="${prod.imageUrl}" />
            <p class="description">${prod.description}</p>
        </div>

        <div class="btn-group">
            <button class="details-btn" onclick="viewDetails('${prod._id}')">
                Details
            </button>
            <button class="cart-btn">
                Add to Cart
            </button>
        </div>
    `;

                productList.appendChild(div);
            });
        })
        .catch(err => console.log(err));
}

function viewDetails(productId) {
    window.location.href = `/product-details.html?id=${productId}`;
}