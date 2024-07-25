document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    // Featured products slider
    const productSlider = document.querySelector('.product-slider');
    if (productSlider) {
        let productIndex = 0;
        const productSlides = productSlider.children;
        setInterval(() => {
            productSlides[productIndex].classList.remove('active');
            productIndex = (productIndex + 1) % productSlides.length;
            productSlides[productIndex].classList.add('active');
        }, 3000);
    }

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let testimonialIndex = 0;
        const testimonialSlides = testimonialSlider.children;
        setInterval(() => {
            testimonialSlides[testimonialIndex].classList.remove('active');
            testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
            testimonialSlides[testimonialIndex].classList.add('active');
        }, 5000);
    }

    // Event listeners for adding to cart
    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.product-card').dataset.productId);
            addToCart(productId);
        });
    });

    // If on cart page, update cart items
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        updateCart();
    }
});

let cart = [];

// Functionality for adding/removing items from the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    console.log('Added to cart:', cart);  // Debugging output
    updateCart();
    saveCart();
}

function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex > -1) {
        if (cart[cartItemIndex].quantity > 1) {
            cart[cartItemIndex].quantity -= 1;
        } else {
            cart.splice(cartItemIndex, 1);
        }
    }
    console.log('Removed from cart:', cart);  // Debugging output
    updateCart();
    saveCart();
}

function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        if (item && item.price) {
            total += parseFloat(item.price.substring(1)) * item.quantity;
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        }
    });
    if (cartTotalElement) {
        cartTotalElement.innerText = `$${total.toFixed(2)}`;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);  // Debugging output
}

function shopNow(productId) {
    // Redirect to the product details page or another action
    console.log('Shop Now clicked for product', productId);
}

// Example products data (usually fetched from a server)
const products = [
    { id: 0, name: 'Product 0', price: '$99.99', image: 'images/product0.jpg' },
    { id: 1, name: 'Product 1', price: '$29.99', image: 'images/product1.jpg' },
    { id: 2, name: 'Product 2', price: '$39.99', image: 'images/product2.jpg' },
    { id: 3, name: 'Product 3', price: '$49.99', image: 'images/product3.jpg' },
    { id: 4, name: 'Product 4', price: '$29.99', image: 'images/product4.jpg' },
    { id: 5, name: 'Product 5', price: '$29.99', image: 'images/product5.jpg' },
    { id: 6, name: 'Product 6', price: '$29.99', image: 'images/product6.jpg' },
    { id: 7, name: 'Product 7', price: '$29.99', image: 'images/product7.jpg' },
    { id: 8, name: 'Product 8', price: '$29.99', image: 'images/product8.jpg' },
    { id: 9, name: 'Product 9', price: '$29.99', image: 'images/product9.jpg' },
    { id: 10, name: 'Product 10', price: '$29.99', image: 'images/product10.jpg' },
    { id: 11, name: 'Product 11', price: '$59.99', image: 'images/product11.jpg' },
    { id: 12, name: 'Product 12', price: '$29.99', image: 'images/product12.jpg' },

];


