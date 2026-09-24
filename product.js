//Read URL
if (document.getElementById("productName")) {
    (async function () {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get("id");
        if (!productId) {
            alert("No product specified.");
        } else {
            const response = await fetch(`${API_BASE}/api/products/${productId}`);
            const result = await response.json();
            const product = result.data;

            //Display product
            document.getElementById("productName").textContent = product.name;
            document.getElementById("productPrice").textContent = "$" + product.price;
            document.getElementById("productDescription").textContent = product.description;
            document.getElementById("productCategory").textContent = product.category;
            document.getElementById("main-product-image").src = product.images[0];
            const thumbnailRow = document.getElementById("thumbnail-row");
            thumbnailRow.innerHTML = "";
            product.images.forEach((imgSrc, index) => {
                const button = document.createElement("button");
                button.className = "thumbnail-btn aspect-square overflow-hidden " +
                    (index === 0 ? "border-2 border-black" : "border border-transparent hover:border-zinc-300");
                const img = document.createElement("img");
                img.src = imgSrc;
                img.alt = "View " + (index + 1);
                img.className = "w-full h-full object-cover";
                button.appendChild(img);
                button.onclick = () => changeImage(imgSrc, button);
                thumbnailRow.appendChild(button);
            });

            // Add to Cart
            document.getElementById("addToCart").addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingItem = cart.find(item => item._id === product._id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        ...product,
                        quantity: 1
                    });
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                showCartMessage(product.name + " added to cart!");
            });
        }
    })();
}

//UpdateCartCount()
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}