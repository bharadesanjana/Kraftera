# Kraftera E-Commerce Platform

Kraftera is a premium, handcrafted jewelry e-commerce platform designed to provide a seamless shopping experience for jewelry enthusiasts. The platform features an elegant frontend built with **Vite & React** and a robust **Node.js/Express** backend with **MongoDB** storage.

## 🚀 Features

- **Storefront**: A beautiful, minimalist catalog of handcrafted jewelry with categories for Bangles, Necklaces, and more.
- **Persistent Accounts**: Real customer registration and login with secure MongoDB storage. 
- **Cart & Checkout**: Advanced shopping cart with a secure UPI QR Code payment integration.
- **Direct Ordering**: Seamlessly sends order details directly to the merchant via WhatsApp.
- **Admin Panel**: A restricted management dashboard to add, edit, or delete products and categories.
- **Responsive Design**: Fully optimized for mobile and desktop viewing.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Lucide icons.
- **Backend**: Node.js, Express, Mongoose (MongoDB).
- **Authentication**: Custom state-based auth with bcrypt encryption.
- **Payments**: Integrated UPI-intent QR code generation.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) account and connection string.

### Local Setup

1. **Clone the project**
2. **Setup Backend**:
   - Navigate to `backend/`
   - Create a `.env` file with `MONGODB_URI` and `ADMIN_PASSWORD`.
   - Run `node server.js`
3. **Setup Frontend**:
   - In the root folder, run `npm install`
   - Run `npm run dev`

---

© 2026 Kraftera · Handcrafted with care.
