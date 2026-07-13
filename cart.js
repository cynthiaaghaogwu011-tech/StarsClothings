//Make add to cart work
/* const button = document.getElementById("addToCart");

button.addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart!");
}); */

/*const cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.forEach(item => {

    console.log(item.name);

    console.log(item.price);

    console.log(item.quantity);

}); //Display Every Item*/
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

                <img src="${item.image}"
                     class="w-24 h-24 object-cover rounded">

                <div class="flex-1">

                    <h2 class="text-xl font-bold">${item.name}</h2>

                    <p>$${item.price}</p>

                    <p>Quantity: ${item.quantity}</p>

                </div>

                <button
                    onclick="removeItem(${item.id})"
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
    cart = cart.filter(item => item.id !== id);

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the page
    displayCart();
    updateCartCount();
}

//run it when it loads
displayCart();

//Checkout
/*const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        showCartMessage("Your cart is empty.");
        return;
    }
    window.location.href = "checkout.html";

});
}*/
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
