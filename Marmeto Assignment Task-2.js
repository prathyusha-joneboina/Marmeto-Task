document.addEventListener("DOMContentLoaded", function() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming your JSON structure has categories containing products
            const categories = data.categories;

            // Filtering products for each category
            const menProducts = categories.find(category => category.category_name === 'Men').category_products;
            const womenProducts = categories.find(category => category.category_name === 'Women').category_products;
            const childrenProducts = categories.find(category => category.category_name === 'Kids').category_products;

            // Displaying products when tabs are clicked
            const menTab = document.getElementById('men-tab');
            const womenTab = document.getElementById('women-tab');
            const childrenTab = document.getElementById('children-tab');

            const menProductsContainer = document.getElementById('men-products');
            const womenProductsContainer = document.getElementById('women-products');
            const childrenProductsContainer = document.getElementById('children-products');

            menTab.addEventListener('click', () => {
                displayProducts(menProducts, menProductsContainer);
                toggleTabActive(menTab);
            });

            womenTab.addEventListener('click', () => {
                displayProducts(womenProducts, womenProductsContainer);
                toggleTabActive(womenTab);
            });

            childrenTab.addEventListener('click', () => {
                displayProducts(childrenProducts, childrenProductsContainer);
                toggleTabActive(childrenTab);
            });

            // Default display when the page loads
            displayProducts(menProducts, menProductsContainer);
            toggleTabActive(menTab);
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });

    function displayProducts(products, container) {
        container.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('productContainer'); // Adding a class named 'product'

            // Calculate the percentage off
            const price = parseFloat(product.price);
            const comparePrice = parseFloat(product.compare_at_price);
            const percentageOff = ((comparePrice - price) / comparePrice) * 100;

            productDiv.innerHTML = `
      <!-- You can add a second image if present -->
      ${
        product.image !== 'empty'
          ? `<img src="${product.image}" alt="${product.title}" class="product-image" />`
          : ''
      }
      <h3><span class="product_title_name"> ${product.title} </span> <span class="dot">.</span> <span class="product_vender">${product.vendor}</span> </h3>
      <p class="badge_text">${product.badge_text}</p>
      <p class="product_price">Rs ${product.price}.00  <s class="compared_price">${product.compare_at_price}.00</s> <span class="discount_percentage">${percentageOff.toFixed(0)}% Off</span></p>
      
      <button class="add_to_card">Add to Cart</button>
      <!-- Add other relevant fields you have in your JSON -->
    `;
            container.appendChild(productDiv);
        });
    }



    function toggleTabActive(tab) {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const productContainers = document.querySelectorAll('.product-container');
        productContainers.forEach(pc => pc.classList.remove('active'));

        const correspondingContainerId = `${tab.id.split('-')[0]}-products`;
        const correspondingContainer = document.getElementById(correspondingContainerId);
        correspondingContainer.classList.add('active');
    }
});