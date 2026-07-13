//Checkout

const placeOrderBtn = document.getElementById("placeOrderBtn");


if (placeOrderBtn) {

    placeOrderBtn.addEventListener("click", (e) => {

        e.preventDefault();


        const cart = JSON.parse(localStorage.getItem("cart")) || [];


        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        // Check required fields
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();

        if (fullName === "" || email === "" || address === "") {
            showCartMessage("Please fill in all required fields.");
            return;
        }
        // Basic email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showCartMessage("Please enter a valid email address.");
            return;
        }

        // Generate order number
        const orderNumber = "#" + Date.now();

        localStorage.setItem("orderNumber", orderNumber);


        // Clear cart after order
        localStorage.removeItem("cart");


        // Go to success page
        window.location.href = "success.html";

    });

}