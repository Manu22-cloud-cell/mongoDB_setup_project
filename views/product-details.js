const productDetails = document.getElementById("productDetails");

document.addEventListener("DOMContentLoaded", loadProduct);

function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    axios.get(`/shop/products/${productId}`)
        .then(response => {
            const prod = response.data;

            productDetails.innerHTML = `
                <h2>${prod.title}</h2>
                <img src="${prod.imageUrl}" width="200"/>
                <p><strong>Price:</strong> ₹ ${prod.price}</p>
                <p><strong>Description:</strong> ${prod.description}</p>
                <button>Add to Cart</button>
            `;
        })
        .catch(err => console.log(err));
}