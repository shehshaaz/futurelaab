# 🏥 FutureLabs Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.0-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Black-000000?style=for-the-badge&logo=JSON%20web%20tokens)

**Backend API for the FutureLabs Healthcare Platform**

_RESTful API built with Node.js, Express, and MongoDB_

[📚 API Documentation](#-api-endpoints) • [🚀 Getting Started](#-installation) • [🔐 Authentication](#authentication)

</div>

---

## 🌟 Overview

The FutureLabs Backend API provides a comprehensive RESTful interface for the healthcare platform, handling user authentication, test/package management, shopping cart functionality, order processing, and location services.

<div align="center">
  <img src="../frontend/images/banners/banner3.png" alt="FutureLabs Backend Architecture" width="800"/>
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Installation](#-installation)
- [⚙️ Environment Variables](#️-environment-variables)
- [📚 API Endpoints](#-api-endpoints)
- [📁 Project Structure](#-project-structure)
- [🔐 Authentication](#-authentication)
- [📦 Seeding Data](#-seeding-data)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [📄 License](#-license)

---

## ✨ Features

- 🔐 **JWT Authentication** - Secure user authentication with JSON Web Tokens
- 🛒 **Shopping Cart** - Persistent cart management for users
- 📦 **Test/Package Management** - CRUD operations for healthcare tests and packages
- 📍 **Location Services** - Pincode validation and location management
- 🎁 **Banner Management** - Dynamic promotional banners
- 📚 **Category System** - Organized healthcare service categories
- 📋 **Order Processing** - Complete order lifecycle management
- 🛡️ **Security** - Helmet, CORS, and rate limiting for protection
- 📊 **Data Validation** - Express-validator for request validation
- 📧 **Email Service** - Nodemailer integration for notifications

---

## 🛠️ Technologies Used

| Technology     | Purpose                       | Version |
| -------------- | ----------------------------- | ------- |
| **Node.js**    | Runtime Environment           | 18.x    |
| **Express**    | Web Framework                 | 4.18.2  |
| **MongoDB**    | Database                      | 4.4+    |
| **Mongoose**   | ODM                           | 7.5.0   |
| **JWT**        | Authentication                | 9.0.2   |
| **Bcrypt.js**  | Password Hashing              | 2.4.3   |
| **Nodemailer** | Email Service                 | 7.0.6   |
| **Cors**       | Cross-Origin Resource Sharing | 2.8.5   |
| **Helmet**     | Security Headers              | 7.0.0   |
| **Morgan**     | HTTP Request Logging          | 1.10.0  |

---

## 🚀 Installation

### 📚 Prerequisites

- **Node.js** (v14 or higher) 🟢
- **MongoDB** (v4.4 or higher) 🟢
- **npm** or **yarn** package manager 📦

### 🔄 Setup Process

1. **💾 Clone the repository:**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **📦 Install dependencies:**

   ```bash
   npm install
   ```

3. **⚙️ Create a `.env` file:**

   ```bash
   cp .env.example .env
   ```

4. **🔑 Update the `.env` file with your configuration:**

   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/futurelabs
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   ```

5. **🏃 Run the application:**

   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

---

## ⚙️ Environment Variables

| Variable      | Description               | Default Value                        |
| ------------- | ------------------------- | ------------------------------------ |
| `NODE_ENV`    | Environment               | development                          |
| `PORT`        | Server port               | 5000                                 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/futurelabs |
| `JWT_SECRET`  | Secret key for JWT        | futurelabs_jwt_secret_key_2023       |
| `JWT_EXPIRE`  | JWT expiration time       | 7d                                   |

---

## 📚 API Endpoints

### Authentication

🔐 **User Authentication System**

```
POST    /api/v1/auth/register           # Register a new user
POST    /api/v1/auth/login              # Login user
GET     /api/v1/auth/logout             # Logout user
POST    /api/v1/auth/otp/generate       # Generate OTP
POST    /api/v1/auth/otp/verify         # Verify OTP
GET     /api/v1/auth/me                 # Get current user
```

### Tests

🔬 **Health Tests and Packages**

```
GET     /api/v1/tests                   # Get all tests
GET     /api/v1/tests/:id               # Get single test
GET     /api/v1/tests/category/:category# Get tests by category
GET     /api/v1/tests/selected/:type    # Get selected tests by type
POST    /api/v1/tests                   # Create new test (Admin)
PUT     /api/v1/tests/:id               # Update test (Admin)
DELETE  /api/v1/tests/:id               # Delete test (Admin)
```

### Categories

🏷️ **Healthcare Categories**

```
GET     /api/v1/category                # Get all categories
GET     /api/v1/category/:id            # Get single category
GET     /api/v1/category/lessPrice/selected  # Get less price categories
GET     /api/v1/category/organ/selected      # Get vital organ categories
GET     /api/v1/category/womenage/selected   # Get women age categories
GET     /api/v1/category/women/selected      # Get women care categories
GET     /api/v1/category/menage/selected     # Get men age categories
GET     /api/v1/category/men/selected        # Get men care categories
GET     /api/v1/category/lifestyle/selected  # Get lifestyle categories
POST    /api/v1/category                # Create new category (Admin)
PUT     /api/v1/category/:id            # Update category (Admin)
DELETE  /api/v1/category/:id            # Delete category (Admin)
```

### Cart

🛒 **Shopping Cart Management**

```
GET     /api/v1/cart/:userId            # Get user cart
POST    /api/v1/cart/add                # Add item to cart
DELETE  /api/v1/cart/remove             # Remove item from cart
PUT     /api/v1/cart/update             # Update cart item
DELETE  /api/v1/cart/clear/:userId      # Clear user cart
```

### Banners

📢 **Promotional Banners**

```
GET     /api/v1/banners                 # Get all banners
GET     /api/v1/banners/main            # Get main banners
GET     /api/v1/banners/bottom          # Get bottom banners
GET     /api/v1/banners/bottom/random   # Get random bottom banner
POST    /api/v1/banners                 # Create new banner (Admin)
PUT     /api/v1/banners/:id             # Update banner (Admin)
DELETE  /api/v1/banners/:id             # Delete banner (Admin)
```

### Locations

📍 **Location and Pincode Services**

```
GET     /api/v1/locations/check/:pincode# Check service availability
GET     /api/v1/locations               # Get all locations
POST    /api/v1/locations               # Create new location (Admin)
PUT     /api/v1/locations/:id           # Update location (Admin)
DELETE  /api/v1/locations/:id           # Delete location (Admin)
```

### Orders

📋 **Order Processing**

```
GET     /api/v1/orders                  # Get all orders (Admin)
GET     /api/v1/orders/myorders         # Get current user orders
GET     /api/v1/orders/:id              # Get single order
POST    /api/v1/orders                  # Create new order
PUT     /api/v1/orders/:id/pay          # Update order to paid
PUT     /api/v1/orders/:id/deliver      # Update order to delivered
DELETE  /api/v1/orders/:id              # Delete order (Admin)
```

---

## 📁 Project Structure

```
backend/
├── 📁 controllers/     # Request handlers
│   ├── auth.js        # Authentication controllers
│   ├── banners.js     # Banner controllers
│   ├── cart.js        # Cart controllers
│   ├── categories.js  # Category controllers
│   ├── locations.js   # Location controllers
│   ├── orders.js      # Order controllers
│   └── tests.js       # Test controllers
├── 📁 middleware/     # Custom middleware
│   ├── advancedResults.js  # Advanced query middleware
│   ├── async.js       # Async error handling
│   └── auth.js        # Authentication middleware
├── 📁 models/         # Mongoose models
│   ├── Banner.js      # Banner model
│   ├── Cart.js        # Cart model
│   ├── Category.js    # Category model
│   ├── Location.js    # Location model
│   ├── Order.js       # Order model
│   ├── Test.js        # Test model
│   └── User.js        # User model
├── 📁 routes/         # API routes
│   ├── auth.js        # Authentication routes
│   ├── banners.js     # Banner routes
│   ├── cart.js        # Cart routes
│   ├── categories.js  # Category routes
│   ├── locations.js   # Location routes
│   ├── orders.js      # Order routes
│   └── tests.js       # Test routes
├── 📁 utils/          # Utility functions
│   └── sendEmail.js   # Email utility
├── 📁 _data/          # Seed data
│   ├── banners.json   # Banner seed data
│   ├── categories.json# Category seed data
│   ├── locations.json # Location seed data
│   ├── tests.json     # Test seed data
│   └── users.json     # User seed data
├── seeder.js          # Data seeder
├── server.js          # Entry point
└── .env               # Environment variables
```

---

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register** - Create a new user account
2. **Login** - Authenticate with email/password
3. **OTP Flow** - Generate and verify OTP for additional security
4. **Protected Routes** - Use JWT token in Authorization header

### 🔑 Token Usage

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 📦 Seeding Data

To populate the database with sample data:

```bash
# Import sample data
node seeder -i

# Delete all data
node seeder -d
```

---

## 🧪 Testing

Run tests with:

```bash
npm test
```

---

## 🚢 Deployment

### 🌐 Production Deployment

1. Set `NODE_ENV=production` in your environment variables
2. Update `MONGODB_URI` to your production database
3. Set a strong `JWT_SECRET` for production
4. Run the application:

   ```bash
   npm start
   ```

---

## 📄 License

MIT License

Copyright (c) 2025 FutureLabs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

<div align="center">

**⚡ Built with Node.js • 🛡️ Secured with JWT • 📦 Powered by MongoDB**

_Made with ❤️ for better healthcare accessibility_

</div>
