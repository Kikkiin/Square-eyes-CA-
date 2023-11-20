const featuredProductsContainer = document.getElementById("image-container");

const apiUrl = 'https://kikkin.no/wp-json/wc/store/products/';

function showError(message) {
    const errorContainer = document.getElementById("image-container");
    errorContainer.innerHTML = `<h3> Error: ${message}</h3>`;
}

async function fetchProducts() {
    showLoadingIndicator();

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        const featuredProducts = products.slice(0, 4);

        return featuredProducts;

    } catch (error) {
        throw error;
    }
}

async function displayFeaturedProducts() {
    try {
        const featuredProducts = await fetchProducts();

        featuredProductsContainer.innerHTML = "";

        featuredProducts.forEach((product) => {

            const productLink = document.createElement("a");
            productLink.href = `html/details.html?id=${product.id}`;

            const productElement = document.createElement("img");

            productElement.src = product.images[0].src; 
            productElement.alt = product.name;
            productElement.className = "cover-image";

            productLink.appendChild(productElement);
            featuredProductsContainer.appendChild(productLink);
        }); 

    } catch (error) {
        showError(error.message);
    }
}

function showLoadingIndicator() {
    featuredProductsContainer.innerHTML = "<p>Loading...</p>";
}

displayFeaturedProducts();