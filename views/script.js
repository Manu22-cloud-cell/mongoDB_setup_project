const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        imageUrl: document.getElementById("imageUrl").value
    };

    axios.post("/add-product", product)
        .then(response => {
            alert("Product Added!");
            loadProducts();
        })
        .catch(err => {
            console.log(err);
        });

    e.target.reset();
});

function loadProducts() {
    axios.get("/products")
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

loadProducts();