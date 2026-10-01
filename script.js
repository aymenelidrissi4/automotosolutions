// ================= PRODUCTS =================

const products = [
    {
        id: 1,
        name: "LED Car Interior Lights",
        category: "car",
        price: 149,
        icon: "💡"
    },
    {
        id: 2,
        name: "Car Phone Holder",
        category: "car",
        price: 99,
        icon: "📱"
    },
    {
        id: 3,
        name: "Car Seat Organizer",
        category: "car",
        price: 129,
        icon: "👜"
    },
    {
        id: 4,
        name: "LED Headlight Kit",
        category: "car",
        price: 299,
        icon: "🔦"
    },
    {
        id: 5,
        name: "Motorcycle Phone Holder",
        category: "motorcycle",
        price: 179,
        icon: "📱"
    },
    {
        id: 6,
        name: "Motorcycle LED Lights",
        category: "motorcycle",
        price: 199,
        icon: "💡"
    },
    {
        id: 7,
        name: "Motorcycle Gloves",
        category: "motorcycle",
        price: 249,
        icon: "🧤"
    },
    {
        id: 8,
        name: "Motorcycle Rear Bag",
        category: "motorcycle",
        price: 299,
        icon: "🎒"
    }
];

let cart = [];

// ================= DISPLAY PRODUCTS =================

function displayProducts(category = "all") {

    const grid = document.getElementById("product-grid");

    const filteredProducts =
        category === "all"
            ? products
            : products.filter(product => product.category === category);

    grid.innerHTML = "";

    filteredProducts.forEach(product => {

        const card = document.createElement("div");

        card.className = "product";

        card.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-bottom">

                    <span class="price">
                        ${product.price} MAD
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        +
                    </button>

                </div>

            </div>
        `;

        grid.appendChild(card);
    });
}

// ================= FILTER =================

function filterProducts(category) {

    displayProducts(category);

    document.querySelectorAll(".filter").forEach(button => {
        button.classList.remove("active");
    });

    const buttons = document.querySelectorAll(".filter");

    buttons.forEach(button => {

        if (
            button.innerText.toLowerCase() === category ||
            category === "all" && button.innerText === "All"
        ) {
            button.classList.add("active");
        }

    });

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}

// ================= CART =================

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    cart.push(product);

    updateCart();

    openCart();
}

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");

    cartCount.innerText = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                color:#666;
                text-align:center;
                margin-top:50px;
            ">
                Your cart is empty.
            </p>
        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach((product, index) => {

            const item = document.createElement("div");

            item.className = "cart-item";

            item.innerHTML = `
                <div class="cart-item-info">
                    <h4>${product.name}</h4>
                    <p>${product.price} MAD</p>
                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                >
                    ✕
                </button>
            `;

            cartItems.appendChild(item);
        });
    }

    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );

    cartTotal.innerText = `${total} MAD`;
}

// ================= CART OPEN/CLOSE =================

function openCart() {

    document
        .getElementById("cart")
        .classList.add("show");

    document
        .getElementById("cart-overlay")
        .classList.add("show");
}

function toggleCart() {

    document
        .getElementById("cart")
        .classList.toggle("show");

    document
        .getElementById("cart-overlay")
        .classList.toggle("show");
}

// ================= WHATSAPP CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    const phoneNumber = "212600000000";

    let message =
        "Hello AutoMoto Solutions! 👋\n\n" +
        "I would like to order:\n\n";

    cart.forEach(product => {

        message +=
            `• ${product.name} - ${product.price} MAD\n`;

    });

    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );

    message +=
        `\nTotal: ${total} MAD\n\n` +
        "Please send me more information. 🇲🇦";

    const url =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// ================= INITIALIZE =================

displayProducts();

updateCart();
