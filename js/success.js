const posterContainer = document.querySelector(".posterContainer");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;

function showError(message) {
    const errorContainer = document.getElementById("success-image");
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

        posterContainer.innerHTML = `<div class="details">
                                        <img src="${json.image}" class="posterContainer">
                                        <h3>${json.title}</h3>
                                        <h3>Total price ${json.discountedPrice}</h3>
                                    </div>` ;            
                                
    } catch (error) {
        showError (error.message);
    }
}

function showLoadingIndicator() {
    posterContainer.innerHTML = "<p>Loading...</p>";
}

fetchMovies(); 
