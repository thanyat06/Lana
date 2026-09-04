# 🛍️ Lana — Full-Stack E-Commerce Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57.svg)](https://www.sqlite.org/)
[![JavaScript](https://img.shields.io/badge/Frontend-Vanilla_JS_--_HTML5_--_CSS3-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-ISC-brightgreen.svg)](LICENSE)

**Lana** is a modern, responsive, and full-stack e-commerce web application designed to deliver an intuitive and seamless shopping experience. Powered by a lightweight **Node.js & Express** backend with an **SQLite** database, **Lana** handles dynamic product catalogs, user authentication, interactive cart & wishlist management, real-time order processing, product reviews, and a administrative dashboard.

---

## ✨ Features

### 🛒 Customer Experience
- **Dynamic Product Catalog**: Browse products filtered by categories (Clothing, Shoes, Accessories, Electronics, Home), with support for search, sorting (price, rating, newest), and collection highlights (Featured, New Arrivals, On Sale).
- **Interactive Product Details**: Modal view with high-res previews, quantity selectors, size/color variations, and real-time customer ratings & reviews.
- **Persistent Shopping Cart**: Real-time cart synchronization, quantity adjustments, item removals, and instant total calculation with coupon discount support.
- **Instant Wishlist**: Toggle favorites with visual feedback, stored seamlessly across user sessions.
- **Order Placement & Tracking**: Streamlined checkout process with shipping info collection, instant order creation (`LANA-XXXXXX`), auto stock reduction, and order status tracking.
- **User Authentication**: Built-in User Registration and Login system with role-based access control (User / Admin).
- **Toast Notification System**: Non-blocking toast feedback for all user interactions.

### 🛡️ Admin Dashboard
- **Product Management**: Full CRUD operations (Add, Edit, Delete products) with real-time catalog updates.
- **Order Management**: Monitor customer orders, view detailed line items, and update fulfillment statuses (*Order Placed*, *Processing*, *Shipped*, *Delivered*).
- **Store Analytics**: At-a-glance metrics for total sales, active products, and customer orders.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, Vanilla CSS3 (Custom Responsive Layouts, Glassmorphism, Micro-animations), JavaScript (ES6+ async/await & Fetch API) |
| **Backend** | Node.js, Express.js (RESTful API, Static Asset Serving, CORS) |
| **Database** | SQLite3 (`better-sqlite3` / `sqlite3` driver with auto-schema migration & seed data) |
| **Icons & Fonts** | FontAwesome 6, Google Fonts (Poppins / Outfit) |

---

## 📁 Repository Structure

```
Lana/
├── Img/                   # Product image assets & visual media
├── app.js                 # Frontend application logic, UI state & API integration
├── database.js            # SQLite database initialization, schema definition & seed data
├── index.html             # Single-page application entry point & UI templates
├── package.json           # Node.js project manifest & dependencies
├── server.js              # Express.js REST API server & database handlers
├── style.css              # Custom styling, responsive breakpoints & UI components
└── README.md              # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thanyat06/Lana.git
   cd Lana
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🔌 API Endpoints Reference

### 📦 Products & Categories
- `GET /api/products` — Retrieve all products (Supports `category`, `search`, `sort`, `featured`, `new_arrivals`, `sale`)
- `GET /api/products/:id` — Get single product details with reviews
- `POST /api/products` — Add a new product (Admin)
- `PUT /api/products/:id` — Update existing product (Admin)
- `DELETE /api/products/:id` — Remove a product (Admin)
- `GET /api/categories` — Get list of product categories

### 🔐 Authentication
- `POST /api/auth/register` — Create a new user account
- `POST /api/auth/login` — Authenticate existing user

### 🛒 Cart & Wishlist
- `GET /api/cart` — Fetch items in user/session cart
- `POST /api/cart` — Add item to cart
- `PUT /api/cart/:id` — Update item quantity
- `DELETE /api/cart/:id` — Remove item from cart
- `GET /api/wishlist` — Get user wishlist items
- `POST /api/wishlist/toggle` — Toggle item in wishlist

### 🧾 Orders & Reviews
- `POST /api/orders` — Place a new order
- `GET /api/orders` — Fetch customer or admin order history
- `PUT /api/orders/:id/status` — Update order status (Admin)
- `POST /api/reviews` — Submit product review and recalculate average rating

---

## 👤 Author

**Thanya**
- GitHub: [@thanyat06](https://github.com/thanyat06)
- Profile: [thanyat06 GitHub Profile](https://github.com/thanyat06)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
