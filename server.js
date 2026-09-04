const express = require('express');
const cors = require('cors');
const path = require('path');
const { db, initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize SQLite database
initDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files and images
app.use(express.static(path.join(__dirname)));
app.use('/Img', express.static(path.join(__dirname, 'Img')));

// Helper for SQL execution
function queryAll(sql, params = []) {
    return db.prepare(sql).all(...params);
}

function queryOne(sql, params = []) {
    return db.prepare(sql).get(...params);
}

function execute(sql, params = []) {
    return db.prepare(sql).run(...params);
}

// -------------------------------------------------------------
// PRODUCTS API
// -------------------------------------------------------------
app.get('/api/products', (req, res) => {
    try {
        const { category, search, sort, featured, new_arrivals, sale } = req.query;
        let sql = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        if (category && category.toLowerCase() !== 'all') {
            sql += ' AND LOWER(category) = LOWER(?)';
            params.push(category);
        }

        if (search) {
            sql += ' AND (LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?) OR LOWER(category) LIKE LOWER(?))';
            const term = `%${search}%`;
            params.push(term, term, term);
        }

        if (featured === 'true' || featured === '1') {
            sql += ' AND is_featured = 1';
        }

        if (new_arrivals === 'true' || new_arrivals === '1') {
            sql += ' AND is_new = 1';
        }

        if (sale === 'true' || sale === '1') {
            sql += ' AND is_sale = 1';
        }

        if (sort === 'price_asc') {
            sql += ' ORDER BY price ASC';
        } else if (sort === 'price_desc') {
            sql += ' ORDER BY price DESC';
        } else if (sort === 'rating') {
            sql += ' ORDER BY rating DESC';
        } else if (sort === 'newest') {
            sql += ' ORDER BY id DESC';
        } else {
            sql += ' ORDER BY id ASC';
        }

        const products = queryAll(sql, params);
        res.json({ success: true, count: products.length, products });
    } catch (err) {
        console.error('Error getting products:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/products/:id', (req, res) => {
    try {
        const product = queryOne('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        const reviews = queryAll('SELECT * FROM reviews WHERE product_id = ? ORDER BY id DESC', [req.params.id]);
        res.json({ success: true, product, reviews });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/products', (req, res) => {
    try {
        const { name, category, price, discount_price, image, description, stock, sizes, colors, is_featured, is_new, is_sale } = req.body;
        if (!name || !category || !price || !image) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const result = execute(`
            INSERT INTO products (name, category, price, discount_price, image, description, stock, sizes, colors, is_featured, is_new, is_sale)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            name, category, parseFloat(price), discount_price ? parseFloat(discount_price) : null,
            image, description || '', stock ? parseInt(stock) : 10,
            sizes || 'S,M,L,XL', colors || 'Default',
            is_featured ? 1 : 0, is_new ? 1 : 0, is_sale ? 1 : 0
        ]);

        const newProduct = queryOne('SELECT * FROM products WHERE id = ?', [result.lastInsertRowid]);
        res.json({ success: true, product: newProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/api/products/:id', (req, res) => {
    try {
        const { name, category, price, discount_price, image, description, stock, sizes, colors, is_featured, is_new, is_sale } = req.body;
        const existing = queryOne('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!existing) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        execute(`
            UPDATE products SET
                name = ?, category = ?, price = ?, discount_price = ?, image = ?,
                description = ?, stock = ?, sizes = ?, colors = ?,
                is_featured = ?, is_new = ?, is_sale = ?
            WHERE id = ?
        `, [
            name || existing.name,
            category || existing.category,
            price !== undefined ? parseFloat(price) : existing.price,
            discount_price !== undefined ? (discount_price ? parseFloat(discount_price) : null) : existing.discount_price,
            image || existing.image,
            description !== undefined ? description : existing.description,
            stock !== undefined ? parseInt(stock) : existing.stock,
            sizes !== undefined ? sizes : existing.sizes,
            colors !== undefined ? colors : existing.colors,
            is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
            is_new !== undefined ? (is_new ? 1 : 0) : existing.is_new,
            is_sale !== undefined ? (is_sale ? 1 : 0) : existing.is_sale,
            req.params.id
        ]);

        const updated = queryOne('SELECT * FROM products WHERE id = ?', [req.params.id]);
        res.json({ success: true, product: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/products/:id', (req, res) => {
    try {
        execute('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// -------------------------------------------------------------
// CATEGORIES API
// -------------------------------------------------------------
app.get('/api/categories', (req, res) => {
    try {
        const categories = queryAll('SELECT * FROM categories');
        res.json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// -------------------------------------------------------------
// AUTH & USERS API
// -------------------------------------------------------------
app.post('/api/auth/register', (req, res) => {
    try {
        const { name, email, password, phone, address, city, pincode } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
        }

        const existing = queryOne('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email]);
        if (existing) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }

        const role = (email.toLowerCase().includes('admin')) ? 'admin' : 'user';
        const result = execute(`
            INSERT INTO users (name, email, password, role, phone, address, city, pincode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [name, email.toLowerCase(), password, role, phone || '', address || '', city || '', pincode || '']);

        const user = queryOne('SELECT id, name, email, role, phone, address, city, pincode FROM users WHERE id = ?', [result.lastInsertRowid]);
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Email and password are required' });
        }

        const user = queryOne('SELECT id, name, email, password, role, phone, address, city, pincode FROM users WHERE LOWER(email) = LOWER(?)', [email]);
        if (!user || user.password !== password) {
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.json({ success: true, user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// -------------------------------------------------------------
// CART API
// -------------------------------------------------------------
app.get('/api/cart', (req, res) => {
    try {
        const { user_id, session_id } = req.query;
        let sql = `
            SELECT c.id as cart_id, c.quantity, c.selected_size, c.selected_color, p.*
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE 1=1
        `;
        const params = [];

        if (user_id) {
            sql += ' AND c.user_id = ?';
            params.push(user_id);
        } else if (session_id) {
            sql += ' AND c.session_id = ?';
            params.push(session_id);
        } else {
            return res.json({ success: true, cart: [] });
        }

        const items = queryAll(sql, params);
        res.json({ success: true, cart: items });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/cart', (req, res) => {
    try {
        const { user_id, session_id, product_id, quantity, selected_size, selected_color } = req.body;
        if (!product_id) {
            return res.status(400).json({ success: false, error: 'Product ID required' });
        }

        let existing;
        if (user_id) {
            existing = queryOne('SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND selected_size = ?', [user_id, product_id, selected_size || '']);
        } else if (session_id) {
            existing = queryOne('SELECT * FROM cart WHERE session_id = ? AND product_id = ? AND selected_size = ?', [session_id, product_id, selected_size || '']);
        }

        const qtyAdd = quantity ? parseInt(quantity) : 1;

        if (existing) {
            execute('UPDATE cart SET quantity = quantity + ? WHERE id = ?', [qtyAdd, existing.id]);
        } else {
            execute(`
                INSERT INTO cart (user_id, session_id, product_id, quantity, selected_size, selected_color)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [user_id || null, session_id || null, product_id, qtyAdd, selected_size || 'Default', selected_color || 'Default']);
        }

        res.json({ success: true, message: 'Item added to cart' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/api/cart/:id', (req, res) => {
    try {
        const { quantity } = req.body;
        const newQty = parseInt(quantity);
        if (newQty <= 0) {
            execute('DELETE FROM cart WHERE id = ?', [req.params.id]);
        } else {
            execute('UPDATE cart SET quantity = ? WHERE id = ?', [newQty, req.params.id]);
        }
        res.json({ success: true, message: 'Cart updated' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/cart/:id', (req, res) => {
    try {
        execute('DELETE FROM cart WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/cart/clear', (req, res) => {
    try {
        const { user_id, session_id } = req.query;
        if (user_id) {
            execute('DELETE FROM cart WHERE user_id = ?', [user_id]);
        } else if (session_id) {
            execute('DELETE FROM cart WHERE session_id = ?', [session_id]);
        }
        res.json({ success: true, message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// -------------------------------------------------------------
// WISHLIST API
// -------------------------------------------------------------
app.get('/api/wishlist', (req, res) => {
    try {
        const { user_id, session_id } = req.query;
        let sql = `
            SELECT w.id as wishlist_id, p.*
            FROM wishlist w
            JOIN products p ON w.product_id = p.id
            WHERE 1=1
        `;
        const params = [];

        if (user_id) {
            sql += ' AND w.user_id = ?';
            params.push(user_id);
        } else if (session_id) {
            sql += ' AND w.session_id = ?';
            params.push(session_id);
        } else {
            return res.json({ success: true, wishlist: [] });
        }

        const wishlist = queryAll(sql, params);
        res.json({ success: true, wishlist });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/wishlist/toggle', (req, res) => {
    try {
        const { user_id, session_id, product_id } = req.body;
        if (!product_id) {
            return res.status(400).json({ success: false, error: 'Product ID required' });
        }

        let existing;
        if (user_id) {
            existing = queryOne('SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
        } else if (session_id) {
            existing = queryOne('SELECT * FROM wishlist WHERE session_id = ? AND product_id = ?', [session_id, product_id]);
        }

        if (existing) {
            execute('DELETE FROM wishlist WHERE id = ?', [existing.id]);
            return res.json({ success: true, added: false, message: 'Removed from wishlist' });
        } else {
            execute(`
                INSERT INTO wishlist (user_id, session_id, product_id)
                VALUES (?, ?, ?)
            `, [user_id || null, session_id || null, product_id]);
            return res.json({ success: true, added: true, message: 'Added to wishlist' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// -------------------------------------------------------------
// ORDERS API (Checkout & Tracking)
// -------------------------------------------------------------
app.post('/api/orders', (req, res) => {
    try {
        const { user_id, user_name, user_email, user_phone, shipping_address, city, pincode, payment_method, items, subtotal, discount, total } = req.body;

        if (!user_name || !user_email || !user_phone || !shipping_address || !items || items.length === 0) {
            return res.status(400).json({ success: false, error: 'Missing required order fields' });
        }

        const orderNumber = 'LANA-' + Math.floor(100000 + Math.random() * 900000);

        const orderResult = execute(`
            INSERT INTO orders (order_number, user_id, user_name, user_email, user_phone, shipping_address, city, pincode, payment_method, subtotal, discount, total, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Order Placed')
        `, [
            orderNumber, user_id || null, user_name, user_email, user_phone,
            shipping_address, city || '', pincode || '', payment_method || 'Cash on Delivery',
            subtotal, discount || 0, total
        ]);

        const orderId = orderResult.lastInsertRowid;

        // Insert order items & reduce stock
        for (const item of items) {
            execute(`
                INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity, selected_size, selected_color)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                orderId, item.id || item.product_id, item.name, item.image,
                item.price, item.quantity, item.selected_size || 'Default', item.selected_color || 'Default'
            ]);

            // Update product stock
            execute('UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?', [item.quantity, item.id || item.product_id]);
        }

        // Clear user/session cart
        if (user_id) {
            execute('DELETE FROM cart WHERE user_id = ?', [user_id]);
        }

        const createdOrder = queryOne('SELECT * FROM orders WHERE id = ?', [orderId]);
        const createdItems = queryAll('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

        res.json({
            success: true,
            order: {
                ...createdOrder,
                items: createdItems
            }
        });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/orders', (req, res) => {
    try {
        const { user_id, user_email, is_admin } = req.query;
        let sql = 'SELECT * FROM orders';
        const params = [];

        if (is_admin !== 'true' && is_admin !== '1') {
            if (user_id) {
                sql += ' WHERE user_id = ?';
                params.push(user_id);
            } else if (user_email) {
                sql += ' WHERE LOWER(user_email) = LOWER(?)';
                params.push(user_email);
            } else {
                return res.json({ success: true, orders: [] });
            }
        }

        sql += ' ORDER BY id DESC';
        const orders = queryAll(sql, params);

        // Attach items to each order
        const fullOrders = orders.map(order => {
            const items = queryAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
            return { ...order, items };
        });

        res.json({ success: true, orders: fullOrders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/api/orders/:id/status', (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ success: false, error: 'Status is required' });
        }

        execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        const updated = queryOne('SELECT * FROM orders WHERE id = ?', [req.params.id]);

        res.json({ success: true, order: updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// -------------------------------------------------------------
// REVIEWS API
// -------------------------------------------------------------
app.post('/api/reviews', (req, res) => {
    try {
        const { product_id, user_name, rating, comment } = req.body;
        if (!product_id || !user_name || !rating) {
            return res.status(400).json({ success: false, error: 'Missing required review fields' });
        }

        execute(`
            INSERT INTO reviews (product_id, user_name, rating, comment)
            VALUES (?, ?, ?, ?)
        `, [product_id, user_name, parseInt(rating), comment || '']);

        // Update product average rating & reviews count
        const avgData = queryOne('SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM reviews WHERE product_id = ?', [product_id]);
        execute('UPDATE products SET rating = ?, reviews_count = ? WHERE id = ?', [
            Math.round(avgData.avg_rating * 10) / 10,
            avgData.count,
            product_id
        ]);

        const reviews = queryAll('SELECT * FROM reviews WHERE product_id = ? ORDER BY id DESC', [product_id]);
        res.json({ success: true, reviews });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// -------------------------------------------------------------
// NEWSLETTER API
// -------------------------------------------------------------
app.post('/api/newsletter', (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(400).json({ success: false, error: 'Valid email address is required' });
        }

        const existing = queryOne('SELECT * FROM newsletters WHERE LOWER(email) = LOWER(?)', [email]);
        if (existing) {
            return res.json({ success: true, message: 'You are already subscribed to our newsletter!' });
        }

        execute('INSERT INTO newsletters (email) VALUES (?)', [email.toLowerCase()]);
        res.json({ success: true, message: 'Thank you for subscribing to Lana newsletter!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Fallback to index.html for single-page routing
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Lana Server running on http://localhost:${PORT}`);
});
