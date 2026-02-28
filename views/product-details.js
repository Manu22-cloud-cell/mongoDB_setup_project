const productDetails = document.getElementById("productDetails");

document.addEventListener("DOMContentLoaded", loadProduct);

function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    axios.get(`/shop/products/${productId}`)
        .then(response => {
            const prod = response.data;

            productDetails.innerHTML = `
    <div class="details-card">
        <div class="details-image">
            <img src="${prod.imageUrl}" />
        </div>

        <div class="details-content">
            <h2>${prod.title}</h2>
            <p class="price">₹ ${prod.price}</p>
            <p class="description">${prod.description}</p>

            <button class="cart-btn">Add to Cart</button>
        </div>
    </div>
`;
        })
        .catch(err => console.log(err));
}