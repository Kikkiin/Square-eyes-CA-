const itemDetails = document.querySelector(".itemDetails");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const apiUrl = `https://kikkin.no/wp-json/wc/store/products/${id}`;

function showError(message) {
    const errorContainer = document.getElementById("details");
    errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
}

async function fetchProduct() {
    showLoadingIndicator();

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Network response failed to load the product`);
        }

        const product = await response.json();

        document.title = product.name;

        itemDetails.innerHTML = `<div class ="movie-intro">
                                    <div class="movie-info">
                                        <h1>${product.name}</h1>
                                        <h2>${product.categories[0].name}</h2>
                                        <p>${product.description}</p>
                                    </div>
                                    <div class="poster-container">
                                        <img src="${product.images[0].src}" alt="${product.name}" class="image-container"></div>
                                    </div>
                                
                                    <div class="movie-details"> 
                                        <p>${product.short_description}</p>
                                        <p>Price: ${product.prices.regular_price} $</p>
                                        <p>Sale Price: ${product.prices.sale_price} $</p>
                                    </div>`;

        const addToCartButton = document.getElementById("addToCartButton");
        addToCartButton.addEventListener("click", () => {

        });
    } catch (error) {
        showError(error.message);
    }
}

function showLoadingIndicator() {
    itemDetails.innerHTML = "<p>Loading...</p>";
}

fetchProduct();



