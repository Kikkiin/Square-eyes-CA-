const addToCartButton = document.getElementById("addToCartButton");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

addToCartButton.addEventListener("click", () => {
    window.location.href = `../html/success.html?id=${id}`;
}); 