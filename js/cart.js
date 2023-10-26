const cartCountElement = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

updateCartCount();







