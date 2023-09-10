const posterContainer = document.querySelector(".posterContainer");
const moviePriceElement = document.getElementById('moviePriceElement');
const movieSalePriceElement = document.getElementById('movieSalePriceElement');

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;

function showError(message) {
    const errorContainer = document.getElementById("checkout-image");
    errorContainer.innerHTML = `<h2> Error: ${message}</h2>`;
}

async function fetchMovies() {
    showLoadingIndicator();

    try {
        const response = await fetch(url); 

        if(!response.ok){
            throw new Error(`Network response failed to load the movie`);
        }

        const json = await response.json();

        document.title = json.title;


        posterContainer.innerHTML = `<div><h1>${json.title}</h1></div>                                         
                                    <div><img src="${json.image}" class="posterContainer"></div>`;   
        
                                    moviePriceElement.textContent = `${json.price}`;
                                    movieSalePriceElement.textContent = `${json.discountedPrice}`;

        addToCartButton.addEventListener("click", () => {
            window.location.href = `../html/payment.html?id=${json.id}`;
        });                           


    } catch (error) {
        showError (error.message);
    }
}

function showLoadingIndicator() {
    posterContainer.innerHTML = "<p>Loading...</p>";
}

fetchMovies();



