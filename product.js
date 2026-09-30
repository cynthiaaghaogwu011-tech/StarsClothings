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
            document.getElementById("productPrice").textContent = "#" + product.price.toLocaleString();
            document.getElementById("productDescription").textContent = product.description;
            loadRecommendedProducts(product._id);
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

async function loadRecommendedProducts(currentProductId) {
    try {
        const response = await fetch(`${API_BASE}/api/products`);
        const result = await response.json();
        const allProducts = result.data;
        const recommended = allProducts
            .filter(p => p._id !== currentProductId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
        const recommendedGrid = document.getElementById("recommendedGrid");
        if (!recommendedGrid) return;
        recommendedGrid.innerHTML = recommended.map(product => `
            <div>
                <a href="product.html?id=${product._id}">
                    <div class="aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">
                        <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover">
                    </div>
                </a>
                <div class="space-y-1">
                    <h3 class="text-[10px] tracking-widest text-[#111111] uppercase font-light">${product.name}</h3>
                    <p class="text-[10px] tracking-widest text-zinc-500 font-light">₦${product.price.toLocaleString()}</p>
                </div>
            </div>
        `).join("");
    } catch (error) {
        console.error("LOAD RECOMMENDED PRODUCTS ERROR:", error);
    }
}