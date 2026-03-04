const ordersDiv = document.getElementById("orders");

document.addEventListener("DOMContentLoaded", loadOrders);

function loadOrders() {
    axios.get("/shop/orders")
        .then(response => {
            ordersDiv.innerHTML = "";

            response.data.forEach(order => {
                const div = document.createElement("div");
                div.classList.add("product");
                div.classList.add("order-card");

                const shortId = order._id.slice(-6);

                div.innerHTML = `
                    <h3>Order ID: ${shortId}</h3>
                    <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                    <hr/>
                    ${order.products.map(p => `
                   <p>
                     ${p.product.title} - ₹${p.product.price} × ${p.quantity}
                    </p>
                     `).join("")}
                    `;

                ordersDiv.appendChild(div);
            });
        })
        .catch(err => console.log(err));
}