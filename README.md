# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp example.env .env
   ```

2. Update the `.env` file with your configuration:
   - `VITE_API_URL`: API base URL (default: https://dummyjson.com/)

The `.env` file is ignored by git for security, while `example.env` is tracked to show the required environment variables.

# 🛍️ Product Management Dashboard

## 📌 Overview

This project is a frontend assessment application built with **React + TypeScript**, focusing on product management features using a public API.

The goal is not to complete every requirement, but to demonstrate:

* Strong project architecture
* Clean and maintainable code
* Proper TypeScript usage
* Efficient state management
* Robust error handling
* Good UI/UX practices

---

## 🚀 Tech Stack

* **Frontend Framework:** React (with TypeScript)

* **State Management:** Redux Toolkit / Zustand

* **Data Fetching:** RTK Query / TanStack Query

* **UI Library:** Ant Design

* **Styling:**

  * Tailwind CSS
  * SCSS / Styled Components (at least two used)

* **API Source:** DummyJSON
  [https://dummyjson.com/docs/](https://dummyjson.com/docs/)

---

## 📂 Features

### ✅ Task 1 — Product Management

* 📊 Product list displayed using **Ant Design Table**
* 🔄 Data fetched from `/products` API
* 📄 Pagination support
* 🔍 Product search using `/products/search?q=keyword`
* 🗂️ Category filtering via dropdown (`/products/categories`)
* 📌 Table columns:

  * Title
  * Price
  * Rating
  * Stock
  * Category
* 👁️ View button to navigate to product details page

---

### ✅ Task 2 — Product Details & Form

* 📍 Dynamic routing: `/products/:id`
* 🖼️ Display product details:

  * Images
  * Title
  * Description
  * Price
  * Rating
  * Stock
* ✏️ Edit button opens a **Drawer form**
* ✅ Form validation with custom rules
* ⚠️ Proper handling of:

  * Loading states
  * Error states
* ❌ No backend update required (frontend only)

---

## 🧠 Key Engineering Focus

This project emphasizes:

* 📦 Scalable folder structure
* 🔐 Type-safe API handling
* 🔄 Efficient state management
* ⚡ Optimized data fetching & caching
* 🧩 Reusable components
* 🛡️ Error handling & fallback UI
* 🎯 Clean and readable code

---

## 📁 Project Structure (Example)

```
src/
│── app/                # Store setup
│── features/           # Redux slices / Zustand stores
│── services/           # API services (RTK Query / React Query)
│── components/         # Reusable UI components
│── pages/              # Page-level components
│── routes/             # Routing configuration
│── styles/             # Global & modular styles
│── types/              # TypeScript types
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/product-dashboard.git
cd product-dashboard
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

### 4️⃣ Open in browser

```
http://localhost:5173
```

---

## 🌐 API Endpoints Used

* Get Products:
  `GET /products`

* Search Products:
  `GET /products/search?q=keyword`

* Product Details:
  `GET /products/{id}`

* Categories:
  `GET /products/categories`

---

## 🧪 Validation & Error Handling

* Custom form validation rules implemented
* API error handling with user-friendly messages
* Loading indicators for async operations
* Graceful UI fallback for failed requests

---

## 📌 Notes

* This is a **frontend-only implementation**
* No data persistence is required
* Focus is on **code quality over completeness**

---

## 🙌 Conclusion

This project demonstrates practical frontend engineering skills including:

* Component design
* API integration
* State management
* UI development with Ant Design
* Clean and scalable architecture
