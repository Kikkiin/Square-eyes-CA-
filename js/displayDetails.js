const itemDetails = document.querySelector(".itemDetails");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;

function showError(message) {
    const errorContainer = document.getElementById("details");
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


         itemDetails.innerHTML = `<div class ="movie-intro">
                                    <div>
                                        <h1>${json.title}</h1>
                                        <h2>${json.genre}</h2>
                                        <p>${json.description}</p>
                                    </div>
                                    <div class="poster-container">
                                        <img src="${json.image}" class="image-container"></div>
                                    </div>
                                    <div class="movie-details">  
                                        <h2>Rating ${json.rating}</h2>
                                        <p>Released ${json.released}</p>
                                        <p>Favorite: ${json.favorite ? 'Yes' : 'No'}</p>
                                    </div> `;

         addToCartButton.addEventListener("click", () => {
            window.location.href = `../html/checkout.html?id=${json.id}`;
        });                           

    } catch (error) {
        showError (error.message);
    }
}

function showLoadingIndicator() {
    itemDetails.innerHTML = "<p>Loading...</p>";
}

fetchMovies();




