const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'lana.db');
const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

function initDatabase() {
    // 1. Users Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            phone TEXT,
            address TEXT,
            city TEXT,
            pincode TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // 2. Categories Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            image TEXT
        );
    `);

    // 3. Products Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            discount_price REAL,
            image TEXT NOT NULL,
            description TEXT,
            stock INTEGER DEFAULT 10,
            rating REAL DEFAULT 4.5,
            reviews_count INTEGER DEFAULT 0,
            sizes TEXT DEFAULT 'S,M,L,XL',
            colors TEXT DEFAULT 'Default',
            is_featured INTEGER DEFAULT 0,
            is_new INTEGER DEFAULT 0,
            is_sale INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // 4. Cart Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            session_id TEXT,
            product_id INTEGER NOT NULL,
            quantity INTEGER DEFAULT 1,
            selected_size TEXT,
            selected_color TEXT,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );
    `);

    // 5. Wishlist Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS wishlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            session_id TEXT,
            product_id INTEGER NOT NULL,
            UNIQUE(user_id, session_id, product_id),
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );
    `);

    // 6. Orders Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_number TEXT UNIQUE NOT NULL,
            user_id INTEGER,
            user_name TEXT NOT NULL,
            user_email TEXT NOT NULL,
            user_phone TEXT NOT NULL,
            shipping_address TEXT NOT NULL,
            city TEXT NOT NULL,
            pincode TEXT NOT NULL,
            payment_method TEXT DEFAULT 'Cash on Delivery',
            subtotal REAL NOT NULL,
            discount REAL DEFAULT 0,
            total REAL NOT NULL,
            status TEXT DEFAULT 'Order Placed',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // 7. Order Items Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            product_image TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            selected_size TEXT,
            selected_color TEXT,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        );
    `);

    // 8. Reviews Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            user_name TEXT NOT NULL,
            rating INTEGER NOT NULL,
            comment TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );
    `);

    // 9. Newsletter Table
    db.exec(`
        CREATE TABLE IF NOT EXISTS newsletters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    seedInitialData();
}

function seedInitialData() {
    // Seed Default Categories
    const categoriesCount = db.prepare('SELECT COUNT(*) as count FROM categories').get().count;
    if (categoriesCount === 0) {
        const insertCategory = db.prepare('INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)');
        insertCategory.run('Men', 'men', 'Img/MEN.jpeg');
        insertCategory.run('Women', 'women', 'Img/WOMEN.jpeg');
        insertCategory.run('Kids', 'kids', 'Img/KIDS.jpeg');
        insertCategory.run('Electronics', 'electronics', 'Img/ELECTRONICS.jpeg');
    }

    // Seed Default Users (Admin and Demo User)
    const usersCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    if (usersCount === 0) {
        const insertUser = db.prepare('INSERT INTO users (name, email, password, role, phone, address, city, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        insertUser.run('Lana Admin', 'admin@lana.com', 'admin123', 'admin', '9876543210', '123 Admin Lane', 'Chennai', '600001');
        insertUser.run('John Doe', 'user@lana.com', 'user123', 'user', '9876543211', '45 Park Street', 'Chennai', '600002');
    }

    // Seed Initial Products
    const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    if (productsCount === 0) {
        const insertProduct = db.prepare(`
            INSERT INTO products (name, category, price, discount_price, image, description, stock, rating, reviews_count, sizes, colors, is_featured, is_new, is_sale)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const initialProducts = [
            {
                name: 'Slim Fit Cotton Trousers',
                category: 'Men',
                price: 999,
                discount_price: 1499,
                image: 'Img/Trousers.jpeg',
                description: 'Premium tailored cotton trousers crafted for ultimate comfort and versatile everyday style.',
                stock: 25,
                rating: 4.5,
                reviews_count: 12,
                sizes: '30,32,34,36',
                colors: 'Black,Beige,Navy',
                is_featured: 1,
                is_new: 0,
                is_sale: 1
            },
            {
                name: 'Classic Leather Ankle Boots',
                category: 'Women',
                price: 899,
                discount_price: 1299,
                image: 'Img/Ankle boots.jpeg',
                description: 'Stylish genuine leather ankle boots with cushioned sole and sleek side zip detail.',
                stock: 18,
                rating: 4.6,
                reviews_count: 8,
                sizes: '36,37,38,39,40',
                colors: 'Black,Brown',
                is_featured: 1,
                is_new: 0,
                is_sale: 1
            },
            {
                name: 'Lightweight Sport Sneakers',
                category: 'Men',
                price: 1200,
                discount_price: 1600,
                image: 'Img/Shoe.jpeg',
                description: 'Breathable mesh running sneakers engineered for max responsiveness and cloud-like padding.',
                stock: 30,
                rating: 4.7,
                reviews_count: 24,
                sizes: '7,8,9,10,11',
                colors: 'White,Black,Grey',
                is_featured: 1,
                is_new: 0,
                is_sale: 0
            },
            {
                name: 'Bose Noise Cancelling Headphones',
                category: 'Electronics',
                price: 1299,
                discount_price: 1999,
                image: 'Img/bose_headphone_image.png',
                description: 'Immersive sound with active noise cancellation, deep bass, and 24-hour battery life.',
                stock: 15,
                rating: 4.8,
                reviews_count: 31,
                sizes: 'Standard',
                colors: 'Black,Silver',
                is_featured: 1,
                is_new: 1,
                is_sale: 1
            },
            {
                name: 'Casual Printed Cotton Shirt',
                category: 'Men',
                price: 1299,
                discount_price: 1599,
                image: 'Img/Casual shirt.jpeg',
                description: 'Soft 100% cotton casual shirt featuring crisp modern fit and breathable weave.',
                stock: 20,
                rating: 4.4,
                reviews_count: 15,
                sizes: 'S,M,L,XL',
                colors: 'White,Blue,Olive',
                is_featured: 1,
                is_new: 0,
                is_sale: 0
            },
            {
                name: 'True Wireless Stereo Airpods',
                category: 'Electronics',
                price: 1499,
                discount_price: 2199,
                image: 'Img/Airpods.jpeg',
                description: 'Crystal-clear wireless audio with touch controls, instant pairing and wireless charging case.',
                stock: 40,
                rating: 4.7,
                reviews_count: 42,
                sizes: 'Standard',
                colors: 'White',
                is_featured: 1,
                is_new: 1,
                is_sale: 1
            },
            {
                name: 'Portable Bluetooth Speaker',
                category: 'Electronics',
                price: 1299,
                discount_price: 1799,
                image: 'Img/speaker.jpg',
                description: 'Rugged waterproof speaker delivering 360-degree high fidelity audio and 12-hour continuous playback.',
                stock: 22,
                rating: 4.5,
                reviews_count: 19,
                sizes: 'Standard',
                colors: 'Black,Red,Blue',
                is_featured: 0,
                is_new: 1,
                is_sale: 1
            },
            {
                name: 'Tailored Men Blazer Jacket',
                category: 'Men',
                price: 1999,
                discount_price: 2699,
                image: 'Img/Blazer.jpg',
                description: 'Sharp unstructured blazer perfect for smart casual events or office meetings.',
                stock: 12,
                rating: 4.9,
                reviews_count: 11,
                sizes: '38,40,42,44',
                colors: 'Navy,Charcoal',
                is_featured: 0,
                is_new: 1,
                is_sale: 0
            },
            {
                name: 'Cozy Kids Cotton Nightwear Set',
                category: 'Kids',
                price: 899,
                discount_price: 1199,
                image: 'Img/kidswear.jpeg',
                description: 'Ultra-soft organic cotton pajamas set designed for cozy sleep and gentle touch.',
                stock: 35,
                rating: 4.8,
                reviews_count: 16,
                sizes: '2-3Y,4-5Y,6-7Y,8-9Y',
                colors: 'Pink,Blue,Yellow',
                is_featured: 0,
                is_new: 1,
                is_sale: 1
            },
            {
                name: 'Urban Street Style Sneakers',
                category: 'Men',
                price: 1199,
                discount_price: 1599,
                image: 'Img/Sneakers.jpg',
                description: 'Retro-inspired low-top sneakers with durable rubber grip outsole and padded collar.',
                stock: 28,
                rating: 4.6,
                reviews_count: 27,
                sizes: '7,8,9,10',
                colors: 'White/Black,White/Red',
                is_featured: 0,
                is_new: 1,
                is_sale: 0
            },
            {
                name: 'Glamour Evening Black Gown',
                category: 'Women',
                price: 1399,
                discount_price: 1899,
                image: 'Img/Blackdress.jpg',
                description: 'Stunning floor-length evening dress crafted with elegant silhouette and soft drape.',
                stock: 14,
                rating: 4.9,
                reviews_count: 38,
                sizes: 'XS,S,M,L',
                colors: 'Black',
                is_featured: 0,
                is_new: 1,
                is_sale: 1
            },
            {
                name: 'Clara Baggy Low-Rise Flared Jeans',
                category: 'Women',
                price: 1599,
                discount_price: 2199,
                image: 'Img/AGOLDE + NET SUSTAIN Clara Baggy low-rise flared organic jeans.jpeg',
                description: 'Sustainable organic denim jeans featuring retro flared leg design and vintage wash.',
                stock: 16,
                rating: 4.7,
                reviews_count: 14,
                sizes: '26,28,30,32',
                colors: 'Light Blue,Dark Wash',
                is_featured: 1,
                is_new: 1,
                is_sale: 1
            },
            {
                name: 'Casual Ribbed Top',
                category: 'Women',
                price: 699,
                discount_price: 999,
                image: 'Img/Top.jpeg',
                description: 'Versatile ribbed knit crop top with soft stretch for day-long ease.',
                stock: 40,
                rating: 4.3,
                reviews_count: 9,
                sizes: 'S,M,L',
                colors: 'White,Black,Beige',
                is_featured: 0,
                is_new: 0,
                is_sale: 1
            },
            {
                name: 'Off Shoulder Pleated Summer Dress',
                category: 'Women',
                price: 1499,
                discount_price: 1999,
                image: "Img/Women'S Off Shoulder Pleated Dress.jpeg",
                description: 'Romantic off-shoulder pleated midi dress ideal for brunches, vacations, and outdoor events.',
                stock: 15,
                rating: 4.8,
                reviews_count: 22,
                sizes: 'S,M,L',
                colors: 'Floral,White,Peach',
                is_featured: 1,
                is_new: 1,
                is_sale: 1
            },
            {
                name: 'Bohemia Blue Backless Bowknot Dress',
                category: 'Women',
                price: 1699,
                discount_price: 2299,
                image: "Img/Women's Blue Backless Bowknot Long Dress, Spring White Dress,Graduation Dress,Bohemia.jpeg",
                description: 'Charming backless long dress with bowknot detail. Perfect for graduation and spring celebrations.',
                stock: 12,
                rating: 4.9,
                reviews_count: 29,
                sizes: 'S,M,L',
                colors: 'Sky Blue,White',
                is_featured: 1,
                is_new: 1,
                is_sale: 1
            },
            {
                name: 'Smart Watch Pro Fitness Tracker',
                category: 'Electronics',
                price: 1899,
                discount_price: 2499,
                image: 'Img/WATCH.jpg',
                description: 'HD touchscreen smartwatch with heart rate monitoring, sleep tracker, and 100+ sport modes.',
                stock: 20,
                rating: 4.7,
                reviews_count: 18,
                sizes: 'Standard',
                colors: 'Black,Rose Gold',
                is_featured: 1,
                is_new: 0,
                is_sale: 1
            },
            {
                name: 'Shein Floral Printed Summer Top',
                category: 'Women',
                price: 799,
                discount_price: 1099,
                image: 'Img/SHEIN.jpeg',
                description: 'Chic short sleeve floral top with ruffle neckline and breathable fabric.',
                stock: 25,
                rating: 4.5,
                reviews_count: 17,
                sizes: 'S,M,L,XL',
                colors: 'Floral Print',
                is_featured: 0,
                is_new: 1,
                is_sale: 1
            }
        ];

        for (const p of initialProducts) {
            insertProduct.run(
                p.name, p.category, p.price, p.discount_price, p.image,
                p.description, p.stock, p.rating, p.reviews_count,
                p.sizes, p.colors, p.is_featured, p.is_new, p.is_sale
            );
        }
    }
}

module.exports = {
    db,
    initDatabase
};
