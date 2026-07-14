//Product array.
const products = [
    {
        id: 1,
        name: "IDARA DRESS",
        price: 240,
        image: "assets/images/IMG_3160.jpg",
        description: ""
    },
    {
        id: 2,
        name: "BEMISE DRESS",
        price: 185,
        image: "assets/images/IMG_3207.jpg",
        description: ""
    },
    {
        id: 3,
        name: "TIFE DRESS",
        price: 520,
        image: "assets/images/IMG_3146.jpg",
        description: ""
    },
    {
        id: 4,
        name: "MIRA TWEED DRESS",
        price: 210,
        image: "assets/images/IMG_2701.jpg",
        description: ""
    },
    {
        id: 5,
        name: "SOPHIA DRESS",
        price: 380,
        image: "assets/images/IMG_2696.jpg",
        description: ""
    },
    {
        id: 6,
        name: "ARIELLA DRESS",
        price: 310,
        image: "assets/images/esther.png",
        description: ""
    },
    {
        id: 7,
        name: "ACHALUGO AMI",
        price: 150,
        image: "assets/images/esther2.png",
        description: ""
    },
    {
        id: 8,
        name: "BELARA DRESS",
        price: 65,
        image: "assets/images/IMG_3156.jpg",
        description: ""
    },
    {
        id: 9,
        name: "YUVA DRESS",
        price: 240,
        image: "assets/images/IMG_3224.PNG",
        description: ""
    },
    {
        id: 10,
        name: "CARAMEL DRESS",
        price: 185,
        image: "assets/images/IMG_3195.jpg",
        description: ""
    },
    {
        id: 11,
        name: "BADUA DRESS",
        price: 520,
        image: "assets/images/IMG_3167.jpg",
        description: ""
    },
    {
        id: 12,
        name: "EVA DRESS",
        price: 210,
        image: "assets/images/60F332C1-8A61-4B81-AE60-2811E13D97AB.PNG",
        description: ""
    },
    {
        id: 13,
        name: "SHOLA DRESS",
        price: 380,
        image: "assets/images/IMG_3199.jpg",
        description: ""
    },
    {
        id: 14,
        name: "GENEVA DRESS",
        price: 310,
        image: "assets/images/IMG_3157.jpg",
        description: ""
    },
    {
        id: 15,
        name: "AMARA DRESS",
        price: 155,
        image: "assets/images/IMG_3187.jpg",
        description: ""
    },
    {
        id: 16,
        name: "IMA DRESS",
        price: 65,
        image: "assets/images/IMG_3192.jpg",
        description: ""
    }
];
//Read URL
if(document.getElementById("productName")) {
const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));
//find product
const product = products.find(item => item.id === productId);

//Stop if not found
if (!product) {
    alert("Product not found.");
} else {

//Display product
    document.getElementById("productName").textContent = product.name;

    document.getElementById("productPrice").textContent = "$" + product.price;

    document.getElementById("productDescription").textContent = product.description;

    document.getElementById("main-product-image").src = product.image;

// all your Add to Cart code goes here
    // Cart

    document.getElementById("addToCart").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        //save Cart
        localStorage.setItem("cart", JSON.stringify(cart));
        //Update Cart count
        updateCartCount();

        showCartMessage(product.name + " added to cart!");

    });
}
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