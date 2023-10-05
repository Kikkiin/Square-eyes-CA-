const cartCountElement = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

// Initialiserer cart count ved lasting av siden
updateCartCount();






// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// document.getElementById('cart-count').textContent = cart.length;

// function updateCartCount() {
//     document.getElementById('cart-count').textContent = cart.length;
// }

// function addToCart(movie) {
//     cart.push(movie);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartCount();
// }

// function removeFromCart(movieId) {
//     const index = cart.findIndex(item => String(item.id) === String(movieId));
//     if (index !== -1) {
//         cart.splice(index, 1);
//         localStorage.setItem('cart', JSON.stringify(cart));
//         updateCartCount();
//     }
// }

// function clearCart() {
//     cart = [];
//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCount();
// }
