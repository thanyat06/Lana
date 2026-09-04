 🛍️ Lana — Full-Stack E-Commerce Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57.svg)](https://www.sqlite.org/)
[![JavaScript](https://img.shields.io/badge/Frontend-Vanilla_JS_--_HTML5_--_CSS3-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-ISC-brightgreen.svg)](LICENSE)

**Lana** is a modern, responsive, and full-stack e-commerce web application designed to deliver an intuitive and seamless shopping experience. Powered by a lightweight **Node.js & Express** backend with an **SQLite** database, **Lana** handles dynamic product catalogs, user authentication, interactive cart & wishlist management, real-time order processing, product reviews, and a administrative dashboard.

---

### Features

### 🛒 Customer Experience
- **Dynamic Product Catalog**: Browse products filtered by categories (Clothing, Shoes, Accessories, Electronics, Home), with support for search, sorting (price, rating, newest), and collection highlights (Featured, New Arrivals, On Sale).
- **Interactive Product Details**: Modal view with high-res previews, quantity selectors, size/color variations, and real-time customer ratings & reviews.
- **Persistent Shopping Cart**: Real-time cart synchronization, quantity adjustments, item removals, and instant total calculation with coupon discount support.
- **Instant Wishlist**: Toggle favorites with visual feedback, stored seamlessly across user sessions.
- **Order Placement & Tracking**: Streamlined checkout process with shipping info collection, instant order creation (`LANA-XXXXXX`), auto stock reduction, and order status tracking.
- **User Authentication**: Built-in User Registration and Login system with role-based access control (User / Admin).
- **Toast Notification System**: Non-blocking toast feedback for all user interactions.

###  Admin Dashboard
- **Product Management**: Full CRUD operations (Add, Edit, Delete products) with real-time catalog updates.
- **Order Management**: Monitor customer orders, view detailed line items, and update fulfillment statuses (*Order Placed*, *Processing*, *Shipped*, *Delivered*).
- **Store Analytics**: At-a-glance metrics for total sales, active products, and customer orders.

---

##  Tech Stack & Architecture

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
