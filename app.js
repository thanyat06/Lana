// Lana E-Commerce Main Frontend Application Script

// Dynamically target Express backend (http://localhost:3000/api) if opened via VS Code Live Server (port 5500) or file protocol
let API_BASE = '/api';
if (window.location.port && window.location.port !== '3000') {
    API_BASE = 'http://localhost:3000/api';
} else if (window.location.protocol === 'file:') {
    API_BASE = 'http://localhost:3000/api';
}

// Fallback product dataset for offline / Live Server standalone usage
const FALLBACK_PRODUCTS = [
    { id: 1, name: 'Slim Fit Cotton Trousers', category: 'Men', price: 999, discount_price: 1499, image: 'Img/Trousers.jpeg', description: 'Premium tailored cotton trousers crafted for ultimate comfort and versatile everyday style.', stock: 25, rating: 4.5, reviews_count: 12, sizes: '30,32,34,36', colors: 'Black,Beige,Navy', is_featured: 1, is_new: 0, is_sale: 1 },
    { id: 2, name: 'Classic Leather Ankle Boots', category: 'Women', price: 899, discount_price: 1299, image: 'Img/Ankle boots.jpeg', description: 'Stylish genuine leather ankle boots with cushioned sole and sleek side zip detail.', stock: 18, rating: 4.6, reviews_count: 8, sizes: '36,37,38,39,40', colors: 'Black,Brown', is_featured: 1, is_new: 0, is_sale: 1 },
    { id: 3, name: 'Lightweight Sport Sneakers', category: 'Men', price: 1200, discount_price: 1600, image: 'Img/Shoe.jpeg', description: 'Breathable mesh running sneakers engineered for max responsiveness and cloud-like padding.', stock: 30, rating: 4.7, reviews_count: 24, sizes: '7,8,9,10,11', colors: 'White,Black,Grey', is_featured: 1, is_new: 0, is_sale: 0 },
    { id: 4, name: 'Bose Noise Cancelling Headphones', category: 'Electronics', price: 1299, discount_price: 1999, image: 'Img/bose_headphone_image.png', description: 'Immersive sound with active noise cancellation, deep bass, and 24-hour battery life.', stock: 15, rating: 4.8, reviews_count: 31, sizes: 'Standard', colors: 'Black,Silver', is_featured: 1, is_new: 1, is_sale: 1 },
    { id: 5, name: 'Casual Printed Cotton Shirt', category: 'Men', price: 1299, discount_price: 1599, image: 'Img/Casual shirt.jpeg', description: 'Soft 100% cotton casual shirt featuring crisp modern fit and breathable weave.', stock: 20, rating: 4.4, reviews_count: 15, sizes: 'S,M,L,XL', colors: 'White,Blue,Olive', is_featured: 1, is_new: 0, is_sale: 0 },
    { id: 6, name: 'True Wireless Stereo Airpods', category: 'Electronics', price: 1499, discount_price: 2199, image: 'Img/Airpods.jpeg', description: 'Crystal-clear wireless audio with touch controls, instant pairing and wireless charging case.', stock: 40, rating: 4.7, reviews_count: 42, sizes: 'Standard', colors: 'White', is_featured: 1, is_new: 1, is_sale: 1 },
    { id: 7, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 1299, discount_price: 1799, image: 'Img/speaker.jpg', description: 'Rugged waterproof speaker delivering 360-degree high fidelity audio and 12-hour continuous playback.', stock: 22, rating: 4.5, reviews_count: 19, sizes: 'Standard', colors: 'Black,Red,Blue', is_featured: 0, is_new: 1, is_sale: 1 },
    { id: 8, name: 'Tailored Men Blazer Jacket', category: 'Men', price: 1999, discount_price: 2699, image: 'Img/Blazer.jpg', description: 'Sharp unstructured blazer perfect for smart casual events or office meetings.', stock: 12, rating: 4.9, reviews_count: 11, sizes: '38,40,42,44', colors: 'Navy,Charcoal', is_featured: 0, is_new: 1, is_sale: 0 },
    { id: 9, name: 'Cozy Kids Cotton Nightwear Set', category: 'Kids', price: 899, discount_price: 1199, image: 'Img/kidswear.jpeg', description: 'Ultra-soft organic cotton pajamas set designed for cozy sleep and gentle touch.', stock: 35, rating: 4.8, reviews_count: 16, sizes: '2-3Y,4-5Y,6-7Y,8-9Y', colors: 'Pink,Blue,Yellow', is_featured: 0, is_new: 1, is_sale: 1 },
    { id: 10, name: 'Urban Street Style Sneakers', category: 'Men', price: 1199, discount_price: 1599, image: 'Img/Sneakers.jpg', description: 'Retro-inspired low-top sneakers with durable rubber grip outsole and padded collar.', stock: 28, rating: 4.6, reviews_count: 27, sizes: '7,8,9,10', colors: 'White/Black,White/Red', is_featured: 0, is_new: 1, is_sale: 0 },
    { id: 11, name: 'Glamour Evening Black Gown', category: 'Women', price: 1399, discount_price: 1899, image: 'Img/Blackdress.jpg', description: 'Stunning floor-length evening dress crafted with elegant silhouette and soft drape.', stock: 14, rating: 4.9, reviews_count: 38, sizes: 'XS,S,M,L', colors: 'Black', is_featured: 0, is_new: 1, is_sale: 1 },
    { id: 12, name: 'Clara Baggy Low-Rise Flared Jeans', category: 'Women', price: 1599, discount_price: 2199, image: 'Img/AGOLDE + NET SUSTAIN Clara Baggy low-rise flared organic jeans.jpeg', description: 'Sustainable organic denim jeans featuring retro flared leg design and vintage wash.', stock: 16, rating: 4.7, reviews_count: 14, sizes: '26,28,30,32', colors: 'Light Blue,Dark Wash', is_featured: 1, is_new: 1, is_sale: 1 },
    { id: 13, name: 'Casual Ribbed Top', category: 'Women', price: 699, discount_price: 999, image: 'Img/Top.jpeg', description: 'Versatile ribbed knit crop top with soft stretch for day-long ease.', stock: 40, rating: 4.3, reviews_count: 9, sizes: 'S,M,L', colors: 'White,Black,Beige', is_featured: 0, is_new: 0, is_sale: 1 },
    { id: 14, name: 'Off Shoulder Pleated Summer Dress', category: 'Women', price: 1499, discount_price: 1999, image: "Img/Women'S Off Shoulder Pleated Dress.jpeg", description: 'Romantic off-shoulder pleated midi dress ideal for brunches, vacations, and outdoor events.', stock: 15, rating: 4.8, reviews_count: 22, sizes: 'S,M,L', colors: 'Floral,White,Peach', is_featured: 1, is_new: 1, is_sale: 1 },
    { id: 15, name: 'Bohemia Blue Backless Bowknot Dress', category: 'Women', price: 1699, discount_price: 2299, image: "Img/Women's Blue Backless Bowknot Long Dress, Spring White Dress,Graduation Dress,Bohemia.jpeg", description: 'Charming backless long dress with bowknot detail. Perfect for graduation and spring celebrations.', stock: 12, rating: 4.9, reviews_count: 29, sizes: 'S,M,L', colors: 'Sky Blue,White', is_featured: 1, is_new: 1, is_sale: 1 },
    { id: 16, name: 'Smart Watch Pro Fitness Tracker', category: 'Electronics', price: 1899, discount_price: 2499, image: 'Img/WATCH.jpg', description: 'HD touchscreen smartwatch with heart rate monitoring, sleep tracker, and 100+ sport modes.', stock: 20, rating: 4.7, reviews_count: 18, sizes: 'Standard', colors: 'Black,Rose Gold', is_featured: 1, is_new: 0, is_sale: 1 },
    { id: 17, name: 'Shein Floral Printed Summer Top', category: 'Women', price: 799, discount_price: 1099, image: 'Img/SHEIN.jpeg', description: 'Chic short sleeve floral top with ruffle neckline and breathable fabric.', stock: 25, rating: 4.5, reviews_count: 17, sizes: 'S,M,L,XL', colors: 'Floral Print', is_featured: 0, is_new: 1, is_sale: 1 }
];

// Application State
let state = {
    products: [],
    categories: [],
    cart: [],
    wishlist: [],
    user: JSON.parse(localStorage.getItem('lana_user')) || null,
    sessionId: getOrCreateSessionId(),
    currentCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    selectedProduct: null,
    orders: []
};

// Initialize App on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    updateAuthUI();
    setupEventListeners();
    await loadCategories();
    await loadProducts();
    await syncCart();
    await syncWishlist();
}

function getOrCreateSessionId() {
    let sid = localStorage.getItem('lana_session_id');
    if (!sid) {
        sid = 'sess_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('lana_session_id', sid);
    }
    return sid;
}

// -------------------------------------------------------------
// API CALLS & DATA FETCHING
// -------------------------------------------------------------
async function loadProducts() {
    try {
        let url = `${API_BASE}/products?sort=${state.sortBy}`;
        if (state.currentCategory && state.currentCategory !== 'all') {
            url += `&category=${encodeURIComponent(state.currentCategory)}`;
        }
        if (state.searchQuery) {
            url += `&search=${encodeURIComponent(state.searchQuery)}`;
        }

        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.products)) {
                state.products = data.products;
                renderProductsGrid();
                renderNewArrivalsGrid();
                return;
            }
        }
    } catch (err) {
        console.warn('Backend API request failed, switching to client-side fallback products:', err);
    }

    // Client-side fallback filtering when server is not reachable
    let prods = [...FALLBACK_PRODUCTS];
    if (state.currentCategory && state.currentCategory.toLowerCase() !== 'all') {
        prods = prods.filter(p => p.category.toLowerCase() === state.currentCategory.toLowerCase());
    }
    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        prods = prods.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) || 
            (p.description && p.description.toLowerCase().includes(query))
        );
    }

    if (state.sortBy === 'price_asc') {
        prods.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price_desc') {
        prods.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
        prods.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === 'newest') {
        prods.sort((a, b) => b.id - a.id);
    }

    state.products = prods;
    renderProductsGrid();
    renderNewArrivalsGrid();
}

async function loadCategories() {
    try {
        const res = await fetch(`${API_BASE}/categories`);
        if (res.ok) {
            const data = await res.json();
            if (data.success) {
                state.categories = data.categories;
                return;
            }
        }
    } catch (err) {
        console.warn('Failed to load categories from API:', err);
    }
}

async function syncCart() {
    try {
        const query = state.user ? `user_id=${state.user.id}` : `session_id=${state.sessionId}`;
        const res = await fetch(`${API_BASE}/cart?${query}`);
        if (res.ok) {
            const data = await res.json();
            if (data.success) {
                state.cart = data.cart;
                updateCartBadge();
                return;
            }
        }
    } catch (err) {
        console.warn('Failed to sync cart from API:', err);
    }
    updateCartBadge();
}

async function syncWishlist() {
    try {
        const query = state.user ? `user_id=${state.user.id}` : `session_id=${state.sessionId}`;
        const res = await fetch(`${API_BASE}/wishlist?${query}`);
        if (res.ok) {
            const data = await res.json();
            if (data.success) {
                state.wishlist = data.wishlist;
                updateWishlistBadge();
                return;
            }
        }
    } catch (err) {
        console.warn('Failed to sync wishlist from API:', err);
    }
    updateWishlistBadge();
}

// -------------------------------------------------------------
// DYNAMIC UI RENDERING
// -------------------------------------------------------------
function renderProductsGrid() {
    const grid = document.getElementById('featured-product-grid');
    if (!grid) return;

    if (state.products.length === 0) {
        grid.innerHTML = `<div class="no-products"><p>No products found matching your filter.</p></div>`;
        return;
    }

    grid.innerHTML = state.products.map(p => createProductCardHTML(p)).join('');
}

function renderNewArrivalsGrid() {
    const grid = document.getElementById('new-arrival-grid');
    if (!grid) return;

    const newArrivals = state.products.filter(p => p.is_new || p.is_sale).slice(0, 6);
    if (newArrivals.length === 0) {
        grid.innerHTML = state.products.slice(0, 6).map(p => createProductCardHTML(p, 'arrival-card')).join('');
        return;
    }

    grid.innerHTML = newArrivals.map(p => createProductCardHTML(p, 'arrival-card')).join('');
}

function createProductCardHTML(p, cardClass = 'product-card') {
    const isWishlisted = state.wishlist.some(w => (w.product_id ? w.product_id === p.id : w.id === p.id));
    const discountBadge = p.discount_price && p.discount_price > p.price 
        ? `<span class="discount-badge">Save ₹${Math.round(p.discount_price - p.price)}</span>` 
        : '';

    const originalPrice = p.discount_price && p.discount_price > p.price 
        ? `<span class="old-price">₹${p.discount_price}</span>` 
        : '';

    return `
        <div class="${cardClass}" data-id="${p.id}">
            <div class="product-image-container" onclick="openProductDetail(${p.id})">
                ${discountBadge}
                <button type="button" class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart" style="${isWishlisted ? 'color: #e74c3c;' : ''}"></i>
                </button>
                <img src="${p.image}" alt="${p.name}" onerror="this.src='Img/1.jpg'">
            </div>
            <div class="product-info" onclick="openProductDetail(${p.id})">
                <span class="product-category">${p.category}</span>
                <h4>${p.name}</h4>
                <p class="price">₹${p.price} ${originalPrice}</p>
                <div class="stars">
                    ${renderStarRatingHTML(p.rating)}
                </div>
            </div>
            <button type="button" onclick="event.stopPropagation(); addToCart(${p.id})"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
        </div>
    `;
}

function renderStarRatingHTML(rating = 4.5) {
    let stars = '';
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < full) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === full && half) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// -------------------------------------------------------------
// EVENT LISTENERS & USER INTERACTIONS
// -------------------------------------------------------------
function setupEventListeners() {
    // Category Filter Links & Cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const catName = card.querySelector('h3').innerText.trim();
            setCategoryFilter(catName);
        });
    });

    // Category Filter Pills
    document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setCategoryFilter(btn.dataset.category);
        });
    });

    // Search Input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                state.searchQuery = e.target.value.trim();
                loadProducts();
            }, 300);
        });
    }

    // Sort Selector
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            loadProducts();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const email = input.value.trim();
            if (!email) return;

            try {
                const res = await fetch(`${API_BASE}/newsletter`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const data = await res.json();
                if (data.success) {
                    showToast(data.message, 'success');
                    input.value = '';
                } else {
                    showToast(data.error || 'Failed to subscribe', 'error');
                }
            } catch (err) {
                showToast('Error subscribing to newsletter', 'error');
            }
        });
    }
}

function setCategoryFilter(category) {
    state.currentCategory = category.toLowerCase();
    
    // Update active pill UI if present
    document.querySelectorAll('.cat-pill').forEach(b => {
        if (b.dataset.category.toLowerCase() === state.currentCategory) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    loadProducts();

    // Scroll smoothly to shop section
    const shopSection = document.getElementById('categories') || document.querySelector('.featured-products');
    if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// -------------------------------------------------------------
// CART ACTIONS
// -------------------------------------------------------------
async function addToCart(productId, size = null, color = null, quantity = 1) {
    const prod = state.products.find(p => p.id === productId) || FALLBACK_PRODUCTS.find(p => p.id === productId);
    if (prod) {
        const existingIndex = state.cart.findIndex(c => (c.product_id ? c.product_id === productId : c.id === productId));
        if (existingIndex > -1) {
            state.cart[existingIndex].quantity += quantity;
        } else {
            state.cart.push({
                cart_id: Date.now(),
                id: prod.id,
                product_id: prod.id,
                name: prod.name,
                image: prod.image,
                price: prod.price,
                discount_price: prod.discount_price,
                quantity: quantity,
                selected_size: size || 'M',
                selected_color: color || 'Default'
            });
        }
        updateCartBadge();
    }

    showToast('Item added to cart!', 'success');

    try {
        const payload = {
            product_id: productId,
            quantity: quantity,
            selected_size: size || 'M',
            selected_color: color || 'Default'
        };

        if (state.user) {
            payload.user_id = state.user.id;
        } else {
            payload.session_id = state.sessionId;
        }

        const res = await fetch(`${API_BASE}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.success) {
                await syncCart();
            }
        }
    } catch (err) {
        console.warn('Cart backend sync skipped (offline/standalone mode)');
    }
}

async function updateCartQty(cartId, newQty) {
    try {
        const res = await fetch(`${API_BASE}/cart/${cartId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: newQty })
        });
        const data = await res.json();
        if (data.success) {
            await syncCart();
            renderCartModalContent();
            return;
        }
    } catch (err) {
        console.warn('Updating cart fallback locally');
    }

    const item = state.cart.find(c => c.cart_id === cartId || c.id === cartId);
    if (item) {
        if (newQty <= 0) {
            state.cart = state.cart.filter(c => c.cart_id !== cartId && c.id !== cartId);
        } else {
            item.quantity = newQty;
        }
        updateCartBadge();
        renderCartModalContent();
    }
}

async function removeCartItem(cartId) {
    try {
        const res = await fetch(`${API_BASE}/cart/${cartId}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
            await syncCart();
            renderCartModalContent();
            showToast('Item removed from cart', 'info');
            return;
        }
    } catch (err) {
        console.warn('Removing cart fallback locally');
    }

    state.cart = state.cart.filter(c => c.cart_id !== cartId && c.id !== cartId);
    updateCartBadge();
    renderCartModalContent();
    showToast('Item removed from cart', 'info');
}

function updateCartBadge() {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
        b.innerText = count;
        b.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

// -------------------------------------------------------------
// WISHLIST ACTIONS
// -------------------------------------------------------------
async function toggleWishlist(productId) {
    const existingIndex = state.wishlist.findIndex(w => (w.product_id ? w.product_id === productId : w.id === productId));
    let added = false;

    if (existingIndex > -1) {
        state.wishlist.splice(existingIndex, 1);
        added = false;
    } else {
        const prod = state.products.find(p => p.id === productId) || FALLBACK_PRODUCTS.find(p => p.id === productId);
        if (prod) {
            state.wishlist.push(prod);
            added = true;
        }
    }

    updateWishlistBadge();

    // Toggle icon DOM elements directly to avoid full page refresh / flashing
    document.querySelectorAll(`button.wishlist-btn[data-id="${productId}"]`).forEach(btn => {
        const icon = btn.querySelector('i');
        if (added) {
            btn.classList.add('active');
            if (icon) {
                icon.className = 'fas fa-heart';
                icon.style.color = '#e74c3c';
            }
        } else {
            btn.classList.remove('active');
            if (icon) {
                icon.className = 'far fa-heart';
                icon.style.color = '';
            }
        }
    });

    try {
        const payload = { product_id: productId };
        if (state.user) payload.user_id = state.user.id;
        else payload.session_id = state.sessionId;

        const res = await fetch(`${API_BASE}/wishlist/toggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.wishlist)) {
                state.wishlist = data.wishlist;
                updateWishlistBadge();
            }
        }
    } catch (err) {
        console.warn('Backend wishlist toggle sync skipped (standalone mode)');
    }

    showToast(added ? 'Added to wishlist!' : 'Removed from wishlist!', added ? 'success' : 'info');
}

function updateWishlistBadge() {
    const count = state.wishlist.length;
    const badges = document.querySelectorAll('.wishlist-badge');
    badges.forEach(b => {
        b.innerText = count;
        b.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

// -------------------------------------------------------------
// PRODUCT DETAIL MODAL
// -------------------------------------------------------------
async function openProductDetail(productId) {
    try {
        const res = await fetch(`${API_BASE}/products/${productId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.success) {
                state.selectedProduct = data.product;
                renderProductDetailModal(data.product, data.reviews || []);
                openModal('product-detail-modal');
                return;
            }
        }
    } catch (err) {
        console.warn('Failed to fetch product details from API, using client product data');
    }

    const localProduct = state.products.find(p => p.id === productId) || FALLBACK_PRODUCTS.find(p => p.id === productId);
    if (localProduct) {
        state.selectedProduct = localProduct;
        renderProductDetailModal(localProduct, []);
        openModal('product-detail-modal');
    } else {
        showToast('Failed to load product details', 'error');
    }
}

function renderProductDetailModal(product, reviews = []) {
    const container = document.getElementById('product-detail-content');
    if (!container) return;

    const sizes = (product.sizes || 'S,M,L,XL').split(',');
    const colors = (product.colors || 'Default').split(',');
    const isWishlisted = state.wishlist.some(w => w.id === product.id);

    const oldPriceHTML = product.discount_price && product.discount_price > product.price 
        ? `<span class="detail-old-price">₹${product.discount_price}</span>` 
        : '';

    const reviewsHTML = reviews.map(r => `
        <div class="review-item">
            <div class="review-header">
                <strong>${r.user_name}</strong>
                <div class="stars">${renderStarRatingHTML(r.rating)}</div>
            </div>
            <p class="review-text">${r.comment || ''}</p>
            <span class="review-date">${new Date(r.created_at).toLocaleDateString()}</span>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="detail-image-container">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='Img/1.jpg'">
            </div>
            <div class="detail-info">
                <span class="detail-category">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="detail-rating">
                    <div class="stars">${renderStarRatingHTML(product.rating)}</div>
                    <span>(${product.reviews_count || reviews.length} customer reviews)</span>
                </div>
                <div class="detail-price">
                    <span class="current-price">₹${product.price}</span>
                    ${oldPriceHTML}
                </div>
                <p class="detail-description">${product.description || 'No detailed description available.'}</p>
                <div class="stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    <i class="fas ${product.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    ${product.stock > 0 ? `In Stock (${product.stock} items available)` : 'Out of Stock'}
                </div>

                ${sizes.length > 0 && sizes[0] !== 'Standard' ? `
                    <div class="option-group">
                        <label>Select Size:</label>
                        <div class="size-options">
                            ${sizes.map((s, idx) => `
                                <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selectSize(this, '${s}')">${s}</button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="detail-actions">
                    <div class="quantity-selector">
                        <button onclick="adjustDetailQty(-1)">-</button>
                        <input type="number" id="detail-qty" value="1" min="1" max="${product.stock}">
                        <button onclick="adjustDetailQty(1)">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="submitAddToCartDetail(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id}); this.classList.toggle('active')">
                        <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="product-reviews-section">
            <h3>Customer Reviews</h3>
            <div class="reviews-list">
                ${reviews.length > 0 ? reviewsHTML : '<p class="no-reviews">No reviews yet. Be the first to review this product!</p>'}
            </div>

            <div class="add-review-box">
                <h4>Write a Review</h4>
                <form id="add-review-form" onsubmit="submitReview(event, ${product.id})">
                    <div class="form-group">
                        <label>Your Name:</label>
                        <input type="text" id="review-user-name" value="${state.user ? state.user.name : ''}" required placeholder="Enter your name">
                    </div>
                    <div class="form-group">
                        <label>Rating:</label>
                        <select id="review-rating" required>
                            <option value="5">5 Stars - Excellent</option>
                            <option value="4">4 Stars - Very Good</option>
                            <option value="3">3 Stars - Average</option>
                            <option value="2">2 Stars - Poor</option>
                            <option value="1">1 Star - Very Bad</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Review Comment:</label>
                        <textarea id="review-comment" rows="3" placeholder="Write your feedback..."></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit Review</button>
                </form>
            </div>
        </div>
    `;
}

function selectSize(btn, size) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function adjustDetailQty(delta) {
    const input = document.getElementById('detail-qty');
    if (!input) return;
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

async function submitAddToCartDetail(productId) {
    const activeSizeBtn = document.querySelector('.size-btn.active');
    const size = activeSizeBtn ? activeSizeBtn.innerText : 'M';
    const qtyInput = document.getElementById('detail-qty');
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;

    await addToCart(productId, size, 'Default', qty);
    closeModal('product-detail-modal');
}

async function submitReview(e, productId) {
    e.preventDefault();
    const name = document.getElementById('review-user-name').value.trim();
    const rating = document.getElementById('review-rating').value;
    const comment = document.getElementById('review-comment').value.trim();

    try {
        const res = await fetch(`${API_BASE}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId, user_name: name, rating, comment })
        });
        const data = await res.json();
        if (data.success) {
            showToast('Thank you for your review!', 'success');
            openProductDetail(productId);
        }
    } catch (err) {
        showToast('Error submitting review', 'error');
    }
}

// -------------------------------------------------------------
// CART MODAL & CHECKOUT
// -------------------------------------------------------------
function openCartModal() {
    renderCartModalContent();
    openModal('cart-modal');
}

function renderCartModalContent() {
    const container = document.getElementById('cart-modal-content');
    if (!container) return;

    if (state.cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket fa-3x"></i>
                <p>Your shopping cart is empty.</p>
                <button onclick="closeModal('cart-modal')" class="btn-shop">Explore Products</button>
            </div>
        `;
        return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = state.cart.reduce((sum, item) => {
        if (item.discount_price && item.discount_price > item.price) {
            return sum + ((item.discount_price - item.price) * item.quantity);
        }
        return sum;
    }, 0);
    const total = subtotal;

    container.innerHTML = `
        <div class="cart-items-list">
            ${state.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='Img/1.jpg'">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <span class="cart-item-meta">Size: ${item.selected_size || 'M'}</span>
                        <p class="cart-item-price">₹${item.price}</p>
                    </div>
                    <div class="cart-item-qty">
                        <button onclick="updateCartQty(${item.cart_id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQty(${item.cart_id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-cart-btn" onclick="removeCartItem(${item.cart_id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>

        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${subtotal.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
                <div class="summary-row discount">
                    <span>Discount Saved:</span>
                    <span>-₹${discount.toFixed(2)}</span>
                </div>
            ` : ''}
            <div class="summary-row total">
                <span>Total Amount:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="openCheckoutModal()">Proceed to Checkout</button>
        </div>
    `;
}

// -------------------------------------------------------------
// CHECKOUT & ORDER PLACEMENT
// -------------------------------------------------------------
function openCheckoutModal() {
    if (state.cart.length === 0) {
        showToast('Cart is empty', 'warning');
        return;
    }

    closeModal('cart-modal');
    renderCheckoutModal();
    openModal('checkout-modal');
}

function renderCheckoutModal() {
    const container = document.getElementById('checkout-modal-content');
    if (!container) return;

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const user = state.user || {};

    container.innerHTML = `
        <div class="checkout-grid">
            <div class="checkout-form">
                <h3>Delivery Details</h3>
                <form id="order-checkout-form" onsubmit="submitPlaceOrder(event)">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" id="chk-name" value="${user.name || ''}" required placeholder="Enter full name">
                    </div>
                    <div class="form-group">
                        <label>Email Address *</label>
                        <input type="email" id="chk-email" value="${user.email || ''}" required placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" id="chk-phone" value="${user.phone || ''}" required placeholder="Enter phone number">
                    </div>
                    <div class="form-group">
                        <label>Delivery Address *</label>
                        <textarea id="chk-address" rows="3" required placeholder="Street address, apartment, house no.">${user.address || ''}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>City *</label>
                            <input type="text" id="chk-city" value="${user.city || 'Chennai'}" required>
                        </div>
                        <div class="form-group">
                            <label>Pincode *</label>
                            <input type="text" id="chk-pincode" value="${user.pincode || '600001'}" required>
                        </div>
                    </div>

                    <h3>Payment Method</h3>
                    <div class="payment-options">
                        <label class="payment-option active">
                            <input type="radio" name="payment" value="Cash on Delivery" checked>
                            <span><i class="fas fa-money-bill-wave"></i> Cash on Delivery (COD)</span>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="payment" value="UPI / Online Demo">
                            <span><i class="fas fa-mobile-alt"></i> UPI / Online Payment (Demo)</span>
                        </label>
                    </div>

                    <button type="submit" class="place-order-btn">Place Order (₹${subtotal.toFixed(2)})</button>
                </form>
            </div>

            <div class="checkout-summary">
                <h3>Order Summary</h3>
                <div class="summary-items-list">
                    ${state.cart.map(item => `
                        <div class="chk-item">
                            <span>${item.name} (${item.quantity}x)</span>
                            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="chk-total-row">
                    <strong>Total Amount to Pay:</strong>
                    <strong>₹${subtotal.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    `;
}

async function submitPlaceOrder(e) {
    e.preventDefault();
    const name = document.getElementById('chk-name').value.trim();
    const email = document.getElementById('chk-email').value.trim();
    const phone = document.getElementById('chk-phone').value.trim();
    const address = document.getElementById('chk-address').value.trim();
    const city = document.getElementById('chk-city').value.trim();
    const pincode = document.getElementById('chk-pincode').value.trim();
    const payment = document.querySelector('input[name="payment"]:checked').value;

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const payload = {
        user_id: state.user ? state.user.id : null,
        user_name: name,
        user_email: email,
        user_phone: phone,
        shipping_address: address,
        city: city,
        pincode: pincode,
        payment_method: payment,
        subtotal: subtotal,
        total: subtotal,
        items: state.cart
    };

    try {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) {
            state.cart = [];
            updateCartBadge();
            closeModal('checkout-modal');
            renderOrderConfirmationModal(data.order);
            openModal('order-confirm-modal');
            showToast('Order placed successfully!', 'success');
        } else {
            showToast(data.error || 'Failed to place order', 'error');
        }
    } catch (err) {
        showToast('Error connecting to server', 'error');
    }
}

function renderOrderConfirmationModal(order) {
    const container = document.getElementById('order-confirm-content');
    if (!container) return;

    container.innerHTML = `
        <div class="order-confirm-box">
            <div class="confirm-icon"><i class="fas fa-check-circle"></i></div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for shopping at <strong>Lana</strong>. Your order has been placed.</p>
            
            <div class="order-id-badge">
                <span>Order Number:</span> <strong>${order.order_number}</strong>
            </div>

            <div class="order-details-card">
                <h4>Order Details</h4>
                <p><strong>Customer:</strong> ${order.user_name} (${order.user_email})</p>
                <p><strong>Delivery Address:</strong> ${order.shipping_address}, ${order.city} - ${order.pincode}</p>
                <p><strong>Payment Method:</strong> ${order.payment_method}</p>
                <p><strong>Status:</strong> <span class="status-pill status-placed">${order.status}</span></p>

                <div class="confirm-items-list">
                    ${order.items.map(item => `
                        <div class="confirm-item">
                            <span>${item.product_name} x ${item.quantity}</span>
                            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="confirm-total">
                    <span>Total Amount Paid:</span>
                    <span>₹${order.total.toFixed(2)}</span>
                </div>
            </div>

            <button onclick="closeModal('order-confirm-modal')" class="btn-shop">Continue Shopping</button>
        </div>
    `;
}

// -------------------------------------------------------------
// USER AUTH & PROFILE & ORDERS HISTORY
// -------------------------------------------------------------
function updateAuthUI() {
    const authBtn = document.getElementById('auth-nav-btn');
    if (!authBtn) return;

    if (state.user) {
        authBtn.innerHTML = `
            <div class="user-dropdown">
                <button class="user-menu-trigger"><i class="fas fa-user-circle"></i> ${state.user.name.split(' ')[0]}</button>
                <div class="dropdown-content">
                    <a href="#" onclick="openOrdersModal()"><i class="fas fa-box"></i> My Orders</a>
                    ${state.user.role === 'admin' ? '<a href="#" onclick="openAdminModal()"><i class="fas fa-user-shield"></i> Admin Panel</a>' : ''}
                    <a href="#" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;
    } else {
        authBtn.innerHTML = `<button class="nav-login-btn" onclick="openAuthModal()"><i class="fas fa-user"></i> Login</button>`;
    }
}

function openAuthModal() {
    openModal('auth-modal');
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    if (tab === 'login') {
        document.getElementById('tab-login-btn').classList.add('active');
        document.getElementById('login-form-box').style.display = 'block';
        document.getElementById('register-form-box').style.display = 'none';
    } else {
        document.getElementById('tab-register-btn').classList.add('active');
        document.getElementById('login-form-box').style.display = 'none';
        document.getElementById('register-form-box').style.display = 'block';
    }
}

async function handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success) {
            state.user = data.user;
            localStorage.setItem('lana_user', JSON.stringify(data.user));
            updateAuthUI();
            await syncCart();
            await syncWishlist();
            closeModal('auth-modal');
            showToast(`Welcome back, ${data.user.name}!`, 'success');
        } else {
            showToast(data.error || 'Login failed', 'error');
        }
    } catch (err) {
        showToast('Login connection error', 'error');
    }
}

async function handleUserRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const phone = document.getElementById('reg-phone').value.trim();

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, phone })
        });
        const data = await res.json();
        if (data.success) {
            state.user = data.user;
            localStorage.setItem('lana_user', JSON.stringify(data.user));
            updateAuthUI();
            closeModal('auth-modal');
            showToast('Account created successfully!', 'success');
        } else {
            showToast(data.error || 'Registration failed', 'error');
        }
    } catch (err) {
        showToast('Registration error', 'error');
    }
}

function quickDemoLogin(type) {
    if (type === 'admin') {
        document.getElementById('login-email').value = 'admin@lana.com';
        document.getElementById('login-password').value = 'admin123';
    } else {
        document.getElementById('login-email').value = 'user@lana.com';
        document.getElementById('login-password').value = 'user123';
    }
    handleUserLogin({ preventDefault: () => {} });
}

function logoutUser() {
    state.user = null;
    localStorage.removeItem('lana_user');
    updateAuthUI();
    syncCart();
    syncWishlist();
    showToast('Logged out successfully', 'info');
}

// -------------------------------------------------------------
// USER ORDERS HISTORY & TRACKING
// -------------------------------------------------------------
async function openOrdersModal() {
    if (!state.user) {
        openAuthModal();
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/orders?user_id=${state.user.id}&user_email=${encodeURIComponent(state.user.email)}`);
        const data = await res.json();
        if (data.success) {
            state.orders = data.orders;
            renderOrdersModalContent();
            openModal('orders-modal');
        }
    } catch (err) {
        showToast('Failed to load orders', 'error');
    }
}

function renderOrdersModalContent() {
    const container = document.getElementById('orders-modal-content');
    if (!container) return;

    if (state.orders.length === 0) {
        container.innerHTML = `<div class="no-orders"><p>You have not placed any orders yet.</p></div>`;
        return;
    }

    container.innerHTML = state.orders.map(order => `
        <div class="order-history-card">
            <div class="order-header">
                <div>
                    <strong>Order #${order.order_number}</strong>
                    <span class="order-date">${new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <span class="status-pill status-${order.status.toLowerCase().replace(/\s+/g, '-')}">${order.status}</span>
            </div>

            <div class="order-tracker">
                ${renderStatusTrackerHTML(order.status)}
            </div>

            <div class="order-items-mini">
                ${order.items.map(item => `
                    <div class="order-item-row">
                        <img src="${item.product_image}" alt="${item.product_name}" onerror="this.src='Img/1.jpg'">
                        <div>
                            <p>${item.product_name}</p>
                            <small>Qty: ${item.quantity} | ₹${item.price}</small>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="order-footer">
                <span>Total: <strong>₹${order.total.toFixed(2)}</strong></span>
            </div>
        </div>
    `).join('');
}

function renderStatusTrackerHTML(currentStatus) {
    const statuses = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
    const currentIndex = statuses.indexOf(currentStatus);

    return `
        <div class="tracker-steps">
            ${statuses.map((st, idx) => `
                <div class="tracker-step ${idx <= currentIndex ? 'completed' : ''}">
                    <div class="step-icon">${idx <= currentIndex ? '✓' : idx + 1}</div>
                    <span>${st}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// -------------------------------------------------------------
// WISHLIST MODAL
// -------------------------------------------------------------
function openWishlistModal() {
    renderWishlistModalContent();
    openModal('wishlist-modal');
}

function renderWishlistModalContent() {
    const container = document.getElementById('wishlist-modal-content');
    if (!container) return;

    if (state.wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-wishlist" style="text-align: center; padding: 30px 10px;">
                <i class="far fa-heart fa-3x" style="color: #ccc; margin-bottom: 15px;"></i>
                <p style="color: #666; font-size: 15px;">Your wishlist is empty.</p>
                <button type="button" onclick="closeModal('wishlist-modal')" class="btn-shop" style="margin-top: 15px; padding: 10px 20px; background: #1d1d1d; color: #fff; border-radius: 6px; border: none; cursor: pointer;">Explore Shop</button>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="wishlist-items-list">
            ${state.wishlist.map(p => {
                const prodId = p.product_id || p.id;
                return `
                    <div class="wishlist-item">
                        <img src="${p.image || 'Img/1.jpg'}" alt="${p.name}" onerror="this.src='Img/1.jpg'">
                        <div class="wishlist-item-details">
                            <h4>${p.name}</h4>
                            <span class="wishlist-item-category">${p.category || 'Product'}</span>
                            <p class="wishlist-item-price">₹${p.price}</p>
                        </div>
                        <div class="wishlist-item-actions">
                            <button type="button" onclick="moveWishlistToCart(${prodId})" class="move-cart-btn" title="Add to Cart">
                                <i class="fas fa-shopping-cart"></i> Move to Cart
                            </button>
                            <button type="button" onclick="removeWishlistItem(${prodId})" class="remove-w-btn" title="Remove Item">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

async function moveWishlistToCart(productId) {
    await addToCart(productId);
    await toggleWishlist(productId);
    renderWishlistModalContent();
}

async function removeWishlistItem(productId) {
    await toggleWishlist(productId);
    renderWishlistModalContent();
}

// -------------------------------------------------------------
// ADMIN DASHBOARD & MANAGEMENT
// -------------------------------------------------------------
async function openAdminModal() {
    if (!state.user || state.user.role !== 'admin') {
        showToast('Admin access required', 'error');
        return;
    }

    renderAdminModalContent();
    openModal('admin-modal');
}

async function renderAdminModalContent(tab = 'products') {
    const container = document.getElementById('admin-modal-content');
    if (!container) return;

    if (tab === 'products') {
        container.innerHTML = `
            <div class="admin-header">
                <h3>Admin Dashboard - Products Management</h3>
                <div class="admin-actions">
                    <button onclick="renderAdminModalContent('products')" class="admin-tab-btn active">Products</button>
                    <button onclick="renderAdminModalContent('orders')" class="admin-tab-btn">Orders</button>
                    <button onclick="openAddProductModal()" class="add-prod-btn">+ Add New Product</button>
                </div>
            </div>

            <div class="admin-table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.products.map(p => `
                            <tr>
                                <td><img src="${p.image}" class="table-thumb" onerror="this.src='Img/1.jpg'"></td>
                                <td><strong>${p.name}</strong></td>
                                <td>${p.category}</td>
                                <td>₹${p.price}</td>
                                <td>${p.stock}</td>
                                <td>
                                    <button class="edit-btn" onclick="openEditProductModal(${p.id})"><i class="fas fa-edit"></i> Edit</button>
                                    <button class="delete-btn" onclick="adminDeleteProduct(${p.id})"><i class="fas fa-trash"></i> Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else if (tab === 'orders') {
        try {
            const res = await fetch(`${API_BASE}/orders?is_admin=1`);
            const data = await res.json();
            const allOrders = data.success ? data.orders : [];

            container.innerHTML = `
                <div class="admin-header">
                    <h3>Admin Dashboard - Orders Management</h3>
                    <div class="admin-actions">
                        <button onclick="renderAdminModalContent('products')" class="admin-tab-btn">Products</button>
                        <button onclick="renderAdminModalContent('orders')" class="admin-tab-btn active">Orders</button>
                    </div>
                </div>

                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${allOrders.map(o => `
                                <tr>
                                    <td><strong>${o.order_number}</strong></td>
                                    <td>${o.user_name}<br><small>${o.user_email}</small></td>
                                    <td>${o.items.length} items</td>
                                    <td>₹${o.total.toFixed(2)}</td>
                                    <td>${new Date(o.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <select onchange="updateOrderStatus(${o.id}, this.value)" class="admin-status-select">
                                            <option value="Order Placed" ${o.status === 'Order Placed' ? 'selected' : ''}>Order Placed</option>
                                            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                                            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } catch (err) {
            showToast('Failed to load orders for admin', 'error');
        }
    }
}

function openAddProductModal() {
    const container = document.getElementById('admin-form-modal-content');
    container.innerHTML = `
        <h3>Add New Product</h3>
        <form id="admin-product-form" onsubmit="submitAdminAddProduct(event)">
            <div class="form-group">
                <label>Product Name *</label>
                <input type="text" id="adm-pname" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Category *</label>
                    <select id="adm-pcat" required>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                        <option value="Electronics">Electronics</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Price (₹) *</label>
                    <input type="number" id="adm-pprice" step="0.01" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Discount Price (₹)</label>
                    <input type="number" id="adm-pdisc" step="0.01">
                </div>
                <div class="form-group">
                    <label>Stock *</label>
                    <input type="number" id="adm-pstock" value="10" required>
                </div>
            </div>
            <div class="form-group">
                <label>Image URL / Relative Path *</label>
                <input type="text" id="adm-pimg" placeholder="Img/Trousers.jpeg" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="adm-pdesc" rows="3"></textarea>
            </div>
            <button type="submit" class="submit-btn">Save Product</button>
        </form>
    `;
    openModal('admin-form-modal');
}

function openEditProductModal(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const container = document.getElementById('admin-form-modal-content');
    container.innerHTML = `
        <h3>Edit Product #${product.id}</h3>
        <form id="admin-product-form" onsubmit="submitAdminEditProduct(event, ${product.id})">
            <div class="form-group">
                <label>Product Name *</label>
                <input type="text" id="adm-pname" value="${product.name}" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Category *</label>
                    <select id="adm-pcat" required>
                        <option value="Men" ${product.category === 'Men' ? 'selected' : ''}>Men</option>
                        <option value="Women" ${product.category === 'Women' ? 'selected' : ''}>Women</option>
                        <option value="Kids" ${product.category === 'Kids' ? 'selected' : ''}>Kids</option>
                        <option value="Electronics" ${product.category === 'Electronics' ? 'selected' : ''}>Electronics</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Price (₹) *</label>
                    <input type="number" id="adm-pprice" value="${product.price}" step="0.01" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Discount Price (₹)</label>
                    <input type="number" id="adm-pdisc" value="${product.discount_price || ''}" step="0.01">
                </div>
                <div class="form-group">
                    <label>Stock *</label>
                    <input type="number" id="adm-pstock" value="${product.stock}" required>
                </div>
            </div>
            <div class="form-group">
                <label>Image URL / Relative Path *</label>
                <input type="text" id="adm-pimg" value="${product.image}" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="adm-pdesc" rows="3">${product.description || ''}</textarea>
            </div>
            <button type="submit" class="submit-btn">Update Product</button>
        </form>
    `;
    openModal('admin-form-modal');
}

async function submitAdminAddProduct(e) {
    e.preventDefault();
    const payload = {
        name: document.getElementById('adm-pname').value.trim(),
        category: document.getElementById('adm-pcat').value,
        price: document.getElementById('adm-pprice').value,
        discount_price: document.getElementById('adm-pdisc').value,
        stock: document.getElementById('adm-pstock').value,
        image: document.getElementById('adm-pimg').value.trim(),
        description: document.getElementById('adm-pdesc').value.trim()
    };

    try {
        const res = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            showToast('Product added!', 'success');
            closeModal('admin-form-modal');
            await loadProducts();
            renderAdminModalContent('products');
        }
    } catch (err) {
        showToast('Error adding product', 'error');
    }
}

async function submitAdminEditProduct(e, productId) {
    e.preventDefault();
    const payload = {
        name: document.getElementById('adm-pname').value.trim(),
        category: document.getElementById('adm-pcat').value,
        price: document.getElementById('adm-pprice').value,
        discount_price: document.getElementById('adm-pdisc').value,
        stock: document.getElementById('adm-pstock').value,
        image: document.getElementById('adm-pimg').value.trim(),
        description: document.getElementById('adm-pdesc').value.trim()
    };

    try {
        const res = await fetch(`${API_BASE}/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            showToast('Product updated!', 'success');
            closeModal('admin-form-modal');
            await loadProducts();
            renderAdminModalContent('products');
        }
    } catch (err) {
        showToast('Error updating product', 'error');
    }
}

async function adminDeleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        const res = await fetch(`${API_BASE}/products/${productId}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            showToast('Product deleted', 'info');
            await loadProducts();
            renderAdminModalContent('products');
        }
    } catch (err) {
        showToast('Error deleting product', 'error');
    }
}

async function updateOrderStatus(orderId, newStatus) {
    try {
        const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
            showToast(`Order #${data.order.order_number} status updated to ${newStatus}`, 'success');
        }
    } catch (err) {
        showToast('Error updating order status', 'error');
    }
}

// -------------------------------------------------------------
// GENERAL MODAL HELPERS & TOAST NOTIFICATIONS
// -------------------------------------------------------------
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
