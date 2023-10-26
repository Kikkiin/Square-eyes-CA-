const apiUrl = 'https://flower-power.local/wp-json/wc/store/products/';

async function fetchProducts() {

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to load the product');
    }

    const products = await response.json();
    return products;

  } catch (error) {
    throw error;
  }
}

async function displayProductImages() {

  try {
    const products = await fetchProducts();
    const topRatedContainer = document.getElementById('movies-container-top-rated');
    const trendingContainer = document.getElementById('movies-container-trending');

    topRatedContainer.innerHTML = '';
    trendingContainer.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      
      const productImage = document.createElement('img');
      productImage.src = product.images[0].src; 

            const productLink = document.createElement('a');
            productLink.href = `details.html?id=${product.id}`;
            productLink.classList.add('product-link');
            productLink.appendChild(productImage);

      if (i < products.length / 2) {
        topRatedContainer.appendChild(productLink);
      } else {
        trendingContainer.appendChild(productLink);
      }
    }
  } catch (error) {
    console.error(error);
  }
}


displayProductImages();

