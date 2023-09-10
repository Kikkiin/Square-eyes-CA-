const featuredMoviesContainer = document.getElementById("image-container");

const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes/";

function showError(message) {
    const errorContainer = document.getElementById("image-container");
    errorContainer.innerHTML = `<h3> Error: ${message}</h3>`;
}

async function fetchMovies() {
    showLoadingIndicator();

    try {
        const response = await fetch(squareEyesAPI);

        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }

        const movies = await response.json();

        const featuredMovies = movies.filter((movie, index) => index < 4);

        return featuredMovies;

    } catch (error) {
        throw error;
    }
}

async function displayFeaturedMovies() {
    try {
        const featuredMovies = await fetchMovies();

        featuredMoviesContainer.innerHTML = "";

        featuredMovies.forEach((movie) => {

            const movieLink = document.createElement("a");
            movieLink.href = `html/details.html?id=${movie.id}`;

            const movieElement = document.createElement("img");

            movieElement.src = movie.image; `<img src="${movie.image}">`
            movieElement.alt = movie.title; `<alt="${movie.title}">`
            movieElement.className = "cover-image";

            movieLink.appendChild(movieElement);
            featuredMoviesContainer.appendChild(movieLink);
        }); 

    } catch (error) {
        showError(error.message);
    }
}

function showLoadingIndicator() {
    featuredMoviesContainer.innerHTML = "<p>Loading...</p>";
}

displayFeaturedMovies();