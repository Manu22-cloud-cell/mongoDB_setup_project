let editMode = false;
let editProductId = null;

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        imageUrl: document.getElementById("imageUrl").value
    };

    if (editMode) {
        axios.put(`/admin/edit-product/${editProductId}`, product)
            .then(() => {
                alert("Product Updated!");
                editMode = false;
                editProductId = null;
                submitBtn.textContent = "Add Product";
                submitBtn.classList.remove("update-mode");

                loadProducts();
            });
    } else {
        axios.post("/admin/add-product", product)
            .then(() => {
                alert("Product Added!");
                loadProducts();
            });
    }

    e.target.reset();
});

function loadProducts() {
    axios.get("/admin/products")
        .then(response => {
            productList.innerHTML = "";

            response.data.forEach(prod => {
                const div = document.createElement("div");
                div.classList.add("product");

                div.innerHTML = `
    <div class="product-content">
        <h3>${prod.title}</h3>
        <p class="price">₹ ${prod.price}</p>
        <p class="description">${prod.description}</p>
        <img src="${prod.imageUrl}" />
    </div>

    <div class="btn-group">
        <button class="edit-btn" onclick="editProduct('${prod._id}')">Edit</button>
        <button class="delete-btn" onclick="deleteProduct('${prod._id}')">Delete</button>
    </div>
`;

                productList.appendChild(div);
            });
        })
        .catch(err => console.log(err));
}

function deleteProduct(productId) {
    if (!confirm("Are you sure you want to delete?")) return;

    axios.delete(`/admin/delete-product/${productId}`)
        .then(() => {
            alert("Deleted successfully");
            loadProducts();
        })
        .catch(err => console.log(err));
}

function editProduct(productId) {
    axios.get(`/admin/products`)
        .then(response => {
            const product = response.data.find(p => p._id === productId);

            document.getElementById("title").value = product.title;
            document.getElementById("price").value = product.price;
            document.getElementById("description").value = product.description;
            document.getElementById("imageUrl").value = product.imageUrl;

            editMode = true;
            editProductId = productId;

            submitBtn.textContent = "Update Product";
            submitBtn.classList.add("update-mode");
        });
}

loadProducts();