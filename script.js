  // Function to fetch data from the API and update the card
async function fetchDataAndDisplay() {
    try {
        const response = await fetch('https://retoolapi.dev/m75uqb/data');
        const data = await response.json();
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            const title = document.createElement('div');
            title.classList.add('title');
            title.textContent = item.title;
            const image = document.createElement('img');
            image.classList.add('image');
            image.src = item.image_url; // Assuming your data contains the image URL
            const price = document.createElement('div');
            price.classList.add('price');
            price.textContent = `$${item.price}`;
            const viewButton = document.createElement('button');
            viewButton.classList.add('view-button');
            viewButton.textContent = 'View';
            viewButton.addEventListener('click', () => {
                displayProductDetails(item);
            });
            card.appendChild(title);
            card.appendChild(image);
            card.appendChild(price);
            card.appendChild(viewButton);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display product details in the detail-container
function displayProductDetails(product) {
    const detailContainer = document.querySelector('.detail-container');
    detailContainer.style.display = 'block'; // Show the detail-container

    // Display specific product details
    const productName = document.querySelector('.detail-container h1');
    const productImage = document.querySelector('.product-img');
    const productPrice = document.querySelector('.detail-price p');

    productName.textContent = product.Title;
    productImage.src = product.image_url; // Assuming your data contains the image URL
    productPrice.textContent = `$${product.price}`;

    // Add code to handle size and color options if needed
}

// ...

// Call the function to load data on page load
fetchDataAndDisplay();

        
        // Add an event listener to go back when the arrow button is clicked
const arrowButton = document.querySelector('.arrow-img');
arrowButton.addEventListener('click', () => {
    document.querySelector('.detail-container').style.display = 'none';
});

// Add an event listener to limit scroll within the detail-container
const detailContainer = document.querySelector('.detail-container');
detailContainer.addEventListener('scroll', () => {
    // Calculate the maximum scroll height (you can adjust this value)
    const maxScrollHeight = 200; // Adjust this value as needed
    if (detailContainer.scrollTop > maxScrollHeight) {
        detailContainer.scrollTop = maxScrollHeight;
    }
});


// Add event listeners for size options
const sizeOptions = document.querySelectorAll('.size-option');
sizeOptions.forEach((option) => {
    option.addEventListener('click', () => {
        sizeOptions.forEach((opt) => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Add event listeners for color options
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach((option) => {
    option.addEventListener('click', () => {
        colorOptions.forEach((opt) => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});


// shopping cart 

const cartIcon = document.getElementById('cart-icon');
const cartItems = document.getElementById('cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');

let isCartOpen = false;

cartIcon.addEventListener('click', () => {
    if (isCartOpen) {
        cartItems.style.right = '-300px';
    } else {
        cartItems.style.right = '0';
    }
    isCartOpen = !isCartOpen;
});

   // Function to update the total price of the shopping cart
        function updateCartTotal() {
            const cartItems = document.querySelectorAll('.cart-item');
            let totalAmount = 0;

            cartItems.forEach(cartItem => {
                const priceElement = cartItem.querySelector('.cart-item-price');
                if (priceElement) {
                    const price = parseFloat(priceElement.textContent.replace('$', ''));
                    totalAmount += price;
                }
            });

            const cartTotalAmount = document.getElementById('cart-total-amount');
            if (cartTotalAmount) {
                cartTotalAmount.textContent = `$${totalAmount.toFixed(2)}`;
            }
        }


// Function to create a cart item and add it to the shopping cart
function addItemToCart(product) {
    // Extract product details
    const productName = document.querySelector('.detail-container h1').textContent;
    const productImage = document.querySelector('.product-img').src;
    const selectedSize = document.querySelector('.select-size .size-option.selected').textContent;
    const selectedColor = document.querySelector('.select-Color .color-option.selected').classList[1];
    const productPrice = document.querySelector('.detail-price p').textContent;

    // Create a cart item element
      const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            // Create an element for the product price
            const cartItemPrice = document.createElement('p');
            cartItemPrice.classList.add('cart-item-price');
            cartItemPrice.textContent = productPrice;
            cartItem.appendChild(cartItemPrice);


// Create an image element for the product image
const cartItemImage = document.createElement('img');
cartItemImage.classList.add('cart-item-image'); // Add this line to assign a class
cartItemImage.src = productImage;
cartItemImage.alt = productName;

    // Create a div for the product details (title, size, color, and price)
    const cartItemDetails = document.createElement('div');
    cartItemDetails.classList.add('cart-item-details');
    cartItemDetails.innerHTML = `
        <h3 class="product-Name">${productName}</h3>
        <p class="size-item">Size: ${selectedSize}</p>
        <p class="selected-color-item ${selectedColor}"></p>
        <p class="price-item-price">${productPrice}</p>
        <button class="remove-item">Remove</button>

    `;

    // Append the image and details to the cart item
    cartItem.appendChild(cartItemImage);
    cartItem.appendChild(cartItemDetails);

// Append the cart item to the cart content
            const cartContent = document.querySelector('.cart-content');
            cartContent.appendChild(cartItem);

    // Update the cart total
    updateCartTotal();

    // Close the detail-container
    const detailContainer = document.querySelector('.detail-container');
    detailContainer.style.display = 'none';
}

// Add event listener for the "Add to Cart" button
const addToCartButton = document.querySelector('.detail-price a');
addToCartButton.addEventListener('click', () => {
    const selectedSize = document.querySelector('.select-size .size-option.selected');
    const selectedColor = document.querySelector('.select-Color .color-option.selected');

    if (selectedSize && selectedColor) {
        const item = {
            title: "H&M Dress", // Replace with the actual item data
            price: 19.00,       // Replace with the actual item data
        };

        // Add the item to the shopping cart
        addItemToCart(item);
    } else {
        alert('Please select size and color before adding to cart.');
    }
});
 // Function to remove an item from the shopping cart
        function removeItemFromCart(cartItem) {
            cartItem.remove(); // Remove the cart item from the DOM
            updateCartTotal(); // Update the cart total
        }

        // Add event listener for removing items from the shopping cart
        const cartContent = document.querySelector('.cart-content');
        cartContent.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                // Find the parent cart item div
                const cartItem = event.target.closest('.cart-item');
                if (cartItem) {
                    removeItemFromCart(cartItem);
                }
            }
        });


// Function to clear the contents of the cart-content
function clearCartItems() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.innerHTML = ''; // Remove all child elements
}


// send data to google app script 

function sendMessage() {
    const mobileNumber = document.getElementById('mobile-number').value;
    const cartItems = document.querySelectorAll('.cart-item');

    // Collect the cart items and any other data you want to send
    const messageData = {
        mobileNumber,
        cartItems: [...cartItems].map(item => {
            const productName = item.querySelector('h3').textContent;
            const selectedSize = item.querySelector('p:nth-child(2)').textContent;
            const selectedColor = item.querySelector('p.selected-color-item').classList[1]; //
            const productPrice = item.querySelector('p:nth-child(4)').textContent;
            return {
                productName,
                selectedSize,
                selectedColor,
                productPrice
            };
        })
    };
  const WEBSITE_URL = process.env.WEBSITE_URL; // Access the environment variable

  if (!apiUrl) {
    console.error('API_URL environment variable is not set.');
} else {
    // Send the data to your Google Apps Script using fetch
    fetch(WEBSITE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
    })
        .then(response => {
            if (response.ok) {
                // Show a success message using SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent',
                    text: 'Your message has been sent successfully.',
                });
                
                // Clear the cart items
                clearCartItems();

                // Close the cart-items after a delay (e.g., 3 seconds)
                setTimeout(() => {
                    closeCartItems();
                }, 3000);
            } else {
                // Handle errors, e.g., show an error message
                Swal.fire({
                    icon: 'error',
                    title: 'Message Not Sent',
                    text: 'Message could not be sent. Please try again later.',
                });
            }
        })
        .catch(error => {
            // Handle network or other errors
            console.error('Error:', error);
        });
}

// Function to close the cart-items
function closeCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.style.right = '-300px'; // Close the cart-items
}

}


