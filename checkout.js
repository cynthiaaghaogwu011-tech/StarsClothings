const placeOrderBtn = document.getElementById("placeOrderBtn");
if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();

        if (fullName === "" || email === "" || address === "") {
            showCartMessage("Please fill in all required fields.");
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showCartMessage("Please enter a valid email address.");
            return;
        }
        const items = cart.map(item => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            image: item.images[0],
            quantity: item.quantity
        }));
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const orderNumber = "#" + Date.now();
        try {
            placeOrderBtn.disabled = true;
            placeOrderBtn.textContent = "Placing order...";
            const response = await fetch(`${API_BASE}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, address, items, totalAmount, orderNumber })
            });
            if (!response.ok) {
                throw new Error("Order failed");
            }
            localStorage.setItem("orderNumber", orderNumber);
            localStorage.removeItem("cart");
            window.location.href = "success.html";
        } catch (error) {
            console.error("PLACE ORDER ERROR:", error);
            showCartMessage("Something went wrong placing your order. Please try again.");
            placeOrderBtn.disabled = false;
            placeOrderBtn.textContent = "Place Order";
        }
    });
}