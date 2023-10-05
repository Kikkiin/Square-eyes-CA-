    // Hent handlekurvdata fra Local Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const addToCartButton = document.getElementById("addToCartButton");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;

addToCartButton.addEventListener("click", () => {
    window.location.href = `../html/payment.html?id=${id}`;
}); 

function calculateTotalPrice() {
    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price); 
    });
    return total;
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');
    const clearCartButton = document.getElementById('clear-cart');

    // Legg til hendelseslytter for "Clear cart" -knappen
    clearCartButton.addEventListener('click', () => {
        clearCart();
        document.getElementById('cart-total').textContent = '0';
    });

    // Loop gjennom handlekurven og legg til hvert element på shoppingbag.html
    cart.forEach((item) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');

        cartItemElement.innerHTML = `<div><p>${item.title}</p></div> 
                                    <a href="../html/details.html?id=${item.id}" class="movie-link">
                                        <img src="${item.image}" alt="${item.title} "class="posterContainer">
                                    </a>
                                    <div><p>${item.price}<p></div>
                                    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                                    `;        
        
        cartItemsElement.appendChild(cartItemElement);

            // Legg til en hendelseslytter for "Remove" -knappen
        const removeButton = cartItemElement.querySelector(".remove-from-cart");

        removeButton.addEventListener("click", (event) => {
            const movieId = event.target.getAttribute("data-id");
            removeFromCart(movieId);
            document.getElementById('cart-total').textContent = calculateTotalPrice(); 
        });
    });

    document.getElementById('cart-total').textContent = calculateTotalPrice(); 

    // Legg til en hendelseslytter for "Proceed to Checkout" -knappen
    checkoutButton.addEventListener('click', () => {
    });
});

function removeFromCart(movieId) {
    // Fjern elementet fra handlekurven basert på ID
    const index = cart.findIndex(item => String(item.id) === String(movieId));
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartView();
        updateCartPopupView();

        const cartItemElementToRemove = document.querySelector(`.cart-item [data-id="${movieId}"]`).closest('.cart-item');
        if (cartItemElementToRemove) {
            cartItemElementToRemove.remove();
        }
    }
}


function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    cartCount = 0;
    localStorage.setItem('cartCount', '0');

    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = ''; 

    updateCartView();
    updateCartPopupView();
}




