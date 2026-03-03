const cartItems = document.getElementById("cartItems");

document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    axios.get("/shop/cart")
        .then(response => {
            cartItems.innerHTML = "";

            response.data.forEach(prod => {
                const div = document.createElement("div");
                div.classList.add("product");

                div.innerHTML = `
                    <h3>${prod.title}</h3>
                    <p>₹ ${prod.price}</p>
                    <p>Quantity: ${prod.quantity}</p>
                    <button onclick="removeFromCart('${prod._id}')">
                        Remove
                    </button>
                `;

                cartItems.appendChild(div);
            });
        })
        .catch(err => console.log(err));
}

function removeFromCart(productId) {
    axios.post("/shop/cart-delete-item", { productId })
        .then(() => {
            loadCart();
        })
        .catch(err => console.log(err));
}