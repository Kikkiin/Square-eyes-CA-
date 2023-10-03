const cart = JSON.parse(localStorage.getItem('cart')) || [];
if (cart.length > 0) {
    console.log('Items in localStorage:', cart);
} else {
    console.log('No items in localStorage.');
}

const addToCartButton = document.getElementById("addToCartButton");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log("ID from URL:", id);


addToCartButton.addEventListener("click", () => {
    window.location.href = `../html/success.html?id=${id}`;
}); 

