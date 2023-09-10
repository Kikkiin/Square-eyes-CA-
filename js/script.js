const topRatedContainer = document.querySelector("#movies-container-top-rated");
const trendingContainer = document.querySelector("#movies-container-trending");

const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes/";

function showError(message) {
    const errorContainer = document.getElementById("movies-container-top-rated");
    errorContainer.innerHTML = `<h2> Error: ${message}</h2>`;
}

async function fetchMovies() {
    showLoadingIndicator();

    try {
        const response = await fetch(squareEyesAPI);

        if(!response.ok){
            throw new Error("Failed to fetch movies");
        }

        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}

async function displayMovies() {
    try {
        const movies = await fetchMovies();
    
        topRatedContainer.innerHTML = ""; 
        trendingContainer.innerHTML = "";

    for(let i = 0; i < movies.length; i++){
        const movie = movies[i];
        const imgElement = document.createElement("img");

        imgElement.src = movie.image;
        imgElement.alt = movie.title;

       topRatedContainer.innerHTML += `
                                    <a href="details.html?id=${movie.id}" class="movies-top-rated">
                                        <img src="${movies[i].image}" alt="${movies[i].title}">
                                    </a>`; 
    
        trendingContainer.innerHTML += `
                                    <a href="details.html?id=${movie.id}" class="movies-trending">
                                        <img src="${movies[i].image}" alt="${movies[i].title}">
                                    </a>`;    
    }

    } catch (error) {
        showError(error.message);
    }
}

function showLoadingIndicator() {

    topRatedContainer.innerHTML = "<p>Loading...</p>";
    trendingContainer.innerHTML = "<p>Loading...</p>";
}

displayMovies();



