// Product data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
    },
    {
        id: 2,
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
    },
    {
        id: 3,
        name: 'Laptop Pro',
        description: 'Powerful laptop with 16GB RAM, 512GB SSD, and stunning display',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop'
    },
    {
        id: 4,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop'
    },
    {
        id: 5,
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with customizable keys',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&h=500&fit=crop'
    },
    {
        id: 6,
        name: 'Tablet',
        description: '10-inch tablet with high-resolution display and stylus support',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop'
    },
    {
        id: 7,
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof speaker with 360-degree sound',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop'
    },
    {
        id: 8,
        name: 'Webcam HD',
        description: '4K webcam with auto-focus and built-in microphone',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&h=500&fit=crop'
    },
    {
        id: 9,
        name: 'Phone Stand',
        description: 'Adjustable phone stand for desk with wireless charging',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop'
    }
];

// Cart management functions
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartCount();
    showNotification('Product added to cart!');
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadges = document.querySelectorAll('#cart-count');
    cartBadges.forEach(badge => {
        badge.textContent = totalItems;
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
