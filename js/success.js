const posterContainer = document.getElementById('posterContainer');


const queryString = document.location.search;    
const params = new URLSearchParams(queryString);
const id = params.get('id');

const url = 'https://api.noroff.dev/api/v1/square-eyes/';

function showError(message) {
    const errorContainer = document.getElementById('posterContainer');
    errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;    
}

async function fetchMovies() {
    showLoadingIndicator();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response failed to load the movie');
        }
            const json = await response.json();

        posterContainer.innerHTML = `<div class="details">

                                    </div>`;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length > 0) {
            console.log('Items in localStorage:', cart);            
        } else {
            console.log('No items in localStorage.');
        }

            
        if (cart.length > 0) {
            
            cart.forEach((item) => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" class="posterContainer">
                        <p>${item.title}</p>
                        <p>${item.price}</p>
                    `;
                posterContainer.appendChild(cartItemElement);
            });

        } else {
                
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Your cart is empty.';
            posterContainer.appendChild(emptyCartMessage);
        }
        
    } catch (error) {
        showError(error.message);
        }
};

    function showLoadingIndicator() {
        posterContainer.innerHTML = '<p>Loading...</p>';
    };

fetchMovies();



