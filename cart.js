//read the cart 
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
//display the items
function displayCart() {
     if (!cartItems || !cartTotal) {
        return;
    }
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="flex items-center gap-6 bg-white p-4 rounded-lg shadow mb-4">
                <img src="${item.images[0]}" class="w-24 h-24 object-cover rounded">
                <div class="flex-1">
                    <h2 class="text-xl font-bold">${item.name}</h2>
                    <p>$${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button
                    onclick="removeItem('${item._id}')"
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Remove
                </button>

            </div>
        `;
    });
    cartTotal.textContent = "$" + total;
}

function removeItem(id) {
    // Remove the matching item
    cart = cart.filter(item => item._id !== id);
    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update the page
    displayCart();
    updateCartCount();
}
if (document.getElementById("cartItems")) {
    displayCart();
}
function showCartMessage(message) {
    const cartMessage = document.getElementById("cartMessage");
    cartMessage.textContent = message;
    // Show popup
    cartMessage.classList.remove("opacity-0", "translate-y-[-20px]");
    cartMessage.classList.add("opacity-100", "translate-y-0");
    // Hide after 2 seconds
    setTimeout(() => {
        cartMessage.classList.remove("opacity-100", "translate-y-0");
        cartMessage.classList.add("opacity-0", "translate-y-[-20px]");
    }, 2000);
}
//This code makes the button only work when input field is filled correctly (4 some reason it doesnt move from cart.)
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            showCartMessage("Your cart is empty.");
            return;
        }
        window.location.href = "checkout.html";
    });
}
