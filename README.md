# 📦 Full-Stack Inventory Management System

A robust, modern, and fully-featured Inventory Management System built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). It allows administrators to effortlessly manage product inventory, track stock levels, organize categories, and view dashboard analytics.

---

## ✨ Key Features
- **Dashboard Analytics:** High-level metrics for total products, active categories, and total stock quantity.
- **Product Management (CRUD):** Seamlessly add, edit, view, and delete products.
- **Advanced Filtering & Search:** Real-time search and multi-select category filtering.
- **Pagination:** Efficiently load and browse through large inventories.
- **Global Error Handling:** Standardized API responses and error capturing.
- **Data Seeding:** Built-in seeder script to populate sample data for quick onboarding.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 + TypeScript (via Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS + SASS
- **Routing:** React Router v7
- **Icons & UI:** Lucide React, React Hot Toast

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ORM)
- **Utilities:** dotenv, cors, nodemon

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB Atlas](https://cloud.mongodb.com/) account (or local MongoDB server)

### 2. Backend Setup
Navigate to the `Backend` directory:
```bash
cd Backend
```

Install dependencies:
```bash
npm install
```

Set up Environment Variables:
1. Rename `.env.example` to `.env`.
2. Update your `MONGO_URI` with your actual MongoDB connection string:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/inventory_db?retryWrites=true&w=majority
NODE_ENV=development
```

Seed the Database (Optional):
Populate your database with sample categories and products:
```bash
npm run seed
```
*(To wipe the database, you can run `npm run seed:destroy`)*

Start the Backend Server:
```bash
npm run dev
```
*The server will run at `http://localhost:5000`.*

---

### 3. Frontend Setup
Open a new terminal and navigate to the `Frontend` directory:
```bash
cd Frontend
```

Install dependencies:
```bash
npm install
```

Start the Frontend Server:
```bash
npm run dev
```
*The application will open in your browser at `http://localhost:5173`.*

---

## 📖 API Reference

All endpoints respond with a standardized structure: `{ status, message, data }`.

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products/stats` | Retrieve dashboard totals (products, categories, stock) |
| `GET` | `/api/products` | Retrieve all products (Supports `?page`, `?limit`, `?search`, `?categories`) |
| `GET` | `/api/products/:id` | Get details for a specific product |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update an existing product |
| `DELETE` | `/api/products/:id` | Delete a product |

---
