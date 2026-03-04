const cartItems = document.getElementById("cartItems");
const placeOrderBtn = document.getElementById("placeOrderBtn");

document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    axios.get("/shop/cart")
        .then(response => {
            cartItems.innerHTML = "";

            // If cart is empty
            if (response.data.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <h3>Your cart is empty 🛒</h3>
                        <p>Add some products from the shop.</p>
                    </div>
                `;

                placeOrderBtn.classList.add("hidden");
                return;
            }

            // If cart has items
            placeOrderBtn.style.display = "inline-block";

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

function placeOrder() {
    axios.post("/shop/create-order")
        .then(() => {
            alert("Order Placed Successfully!");
            loadCart();
        })
        .catch(err => console.log(err));
}