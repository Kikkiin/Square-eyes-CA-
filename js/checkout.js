const posterContainer = document.querySelector(".posterContainer");
const moviePriceElement = document.getElementById('moviePriceElement');
const movieSalePriceElement = document.getElementById('movieSalePriceElement');
const cartCountElement = document.getElementById('cart-count');
const cartIcon = document.getElementById('cart-icon');
const cartPopup = document.getElementById('cart-popup');
const addToCartButton = document.getElementById("addToCartButton");
const goToCartButton = document.getElementById('go-to-cart-button');

let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cart = JSON.parse(localStorage.getItem('cart')) || []; 
cartCountElement.textContent = cartCount;


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;

async function fetchMovies() {
    showLoadingIndicator();

    try {
        const response = await fetch(url); 

        if(!response.ok){
            throw new Error(`Network response failed to load the movie`);
        }

        const json = await response.json();

        document.title = json.title;

        document.getElementById("movieTitleElement").textContent = json.title;

        posterContainer.innerHTML = `                                       
                                    <div><img src="${json.image}" class="posterContainer"></div>`;   
        moviePriceElement.textContent = `${json.price}`;
        movieSalePriceElement.textContent = `${json.discountedPrice}`;



        addToCartButton.addEventListener("click", () => {
            // Legg til elementet i handlekurven (med mindre det allerede er der)
            const existingItemIndex = cart.findIndex((item) => item.id == json.id);
            if (existingItemIndex === -1) {
                cart.push(json);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        
            // Oppdater handlekurv-ikonets antall basert på lengden av handlekurven
            cartCount = cart.length;
            cartCountElement.textContent = cartCount;
            localStorage.setItem('cartCount', cartCount.toString());
          

            // Vis handlekurv-popup
            showCartPopup();
        
            
            // Oppdater handlekurv- og popup-visningen
            updateCartView();
            updateCartpopupView();


            document.getElementById('cart-total').textContent = calculateTotalPrice();  
        

            // window.location.href = `../html/payment.html?id=${json.id}`;

            goToCartButton.addEventListener('click', () => {
                // Naviger til handlekurvsiden
                // window.location.href = '../html/shoppingbag.html';
            
                // Send med handlekurvdata som en query parameter
                const cartData = encodeURIComponent(JSON.stringify(cart));
                window.location.href = `../html/shoppingbag.html?cartData=${cartData}`;
            });

        });

        cartIcon.addEventListener("click", () => {
            if (cartPopup.style.display === "block") {
                hideCartPopup();
            } else {
                showCartPopup();
            }
        });

    } catch (error) {
        showError (error.message);
    }
}

function showError(message) {
    const errorContainer = document.getElementById("checkout-image");
    errorContainer.innerHTML = `<h2> Error: ${message}</h2>`;
}

function showLoadingIndicator() {
    posterContainer.innerHTML = "<p>Loading...</p>";
}

function showCartPopup() {
     cartPopup.style.display = "block";
     updateCartPopupView();
}

function updateCartPopupView() {
    cartPopup.innerHTML = ""; // Tøm innholdet i popup-vinduet

    if (cart.length === 0) {
        cartPopup.style.display = "none";
    } else {
        cartPopup.style.display = "block";

        // Opprett HTML for hver film i handlekurven
        cart.forEach((json, index) => {
            const movieItem = document.createElement("div");
            movieItem.classList.add("cart-movie");
            movieItem.innerHTML = `
                        <img src="${json.image}" alt="${json.title}" class="cart-movie-image">
                        <span>${json.title}</span>
                        <button class="remove-movie" data-index="${index}">Remove</button> 
                        `;

            cartPopup.appendChild(movieItem);

            // Legg til en event-lytter for fjern-knappen
            const removeButton = movieItem.querySelector(".remove-movie");
            removeButton.addEventListener("click", (event) => {
                const movieIndex = parseInt(event.target.getAttribute("data-index"));
                removeFromCart(movieIndex);
            });
        });

        const goToCartButton = document.createElement("button");
        goToCartButton.id = "go-to-cart-button";
        goToCartButton.textContent = "Go to cart";
        cartPopup.appendChild(goToCartButton);

        goToCartButton.addEventListener("click", () => {
            window.location.href = "../html/shoppingbag.html";
        })
    }
}

function addToCart(json) {
    cart.push(json);
    localStorage.setitem("cart", JSON.stringify(cart));
    updateCartView();
    updateCartpopupView();
}

function hideCartPopup() {
    cartPopup.style.display = "none";
}

// Definer funksjonen removeFromCart for å fjerne filmer fra handlekurven
function removeFromCart(index) {
    // Fjern elementet fra handlekurven basert på index
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartView();
        updateCartPopupView();
    }

    document.getElementById('cart-total').textContent = calculateTotalPrice(); 
}


fetchMovies();





