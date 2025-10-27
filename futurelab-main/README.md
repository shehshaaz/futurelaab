# 🏥 FutureLabs Healthcare Platform

<div align="center">

![FutureLabs Logo](https://img.shields.io/badge/FutureLabs-Healthcare%20Platform-blue?style=for-the-badge&logo=medical-cross)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)

**🚀 A Modern Healthcare Platform for Lab Tests & Medical Services**

[🌐 Live Demo](#-live-demo) • [📖 Documentation](#-documentation) • [🛠️ Installation](#️-installation) • [🤝 Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Installation](#️-installation)
- [🚀 Usage](#-usage)
- [📱 Screenshots](#-screenshots)
- [🔧 API Documentation](#-api-documentation)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<div align="center">

| 🔐 **Authentication** | 🧪 **Lab Tests** | 🛒 **E-Commerce** | 📊 **Analytics** |
|:---:|:---:|:---:|:---:|
| Secure login/signup | Browse test categories | Shopping cart | Order tracking |
| JWT authentication | Test details & pricing | Payment integration | User dashboard |
| User profiles | Search functionality | Order management | Reports |

</div>

### 🎯 Core Features

- 🏥 **Complete Health Checkups** - Full body, diabetes, thyroid, and executive packages
- 🔍 **Advanced Search** - Find tests by category, price, or name
- 🛒 **Shopping Cart** - Add multiple tests and manage orders
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📧 **Email Notifications** - Automated booking confirmations
- 📍 **Location Services** - Find nearby labs and centers
- 💳 **Payment Integration** - Secure payment processing
- 📊 **Order Management** - Track test results and history

---

## 🏗️ Architecture

<div align="center">

```mermaid
graph TB
    A[👤 User Interface] --> B[⚛️ React Frontend]
    B --> C[🌐 Express.js API]
    C --> D[🍃 MongoDB Database]
    C --> E[🔐 JWT Authentication]
    C --> F[📧 Email Service]
    C --> G[💳 Payment Gateway]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
```

</div>

### 🛠️ Tech Stack

#### Frontend
- ⚛️ **React 18.2.0** - Modern UI library
- 🎨 **Bootstrap 5.3.8** - Responsive CSS framework
- 🎯 **React Router** - Client-side routing
- 📡 **Axios** - HTTP client for API calls
- 🎨 **Lucide React** - Beautiful icons

#### Backend
- 🟢 **Node.js** - JavaScript runtime
- 🚀 **Express.js** - Web application framework
- 🍃 **MongoDB** - NoSQL database
- 🔐 **JWT** - Authentication tokens
- 🛡️ **Helmet** - Security middleware
- 📧 **Nodemailer** - Email service

---

## 🛠️ Installation

### 📋 Prerequisites

Make sure you have the following installed:

- 📦 **Node.js** (v14 or higher)
- 🍃 **MongoDB** (v4.4 or higher)
- 📝 **Git**

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashiii2121/futurelab.git
   cd futurelab
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/futurelabs
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   SMS_API_USER=your_sms_user
   SMS_API_PASS=your_sms_password
   SMS_SENDER_ID=FULABS
   ```

5. **Start MongoDB**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

6. **Run the Application**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - 🌐 Frontend: http://localhost:3000/futurelab
   - 🔧 Backend API: http://localhost:5000/api/v1/

---

## 🚀 Usage

### 👤 User Journey

1. **🏠 Homepage** - Browse featured tests and categories
2. **🔍 Search** - Find specific tests or browse by category
3. **🛒 Add to Cart** - Select tests and add to shopping cart
4. **🔐 Authentication** - Login or create account
5. **💳 Checkout** - Complete payment and booking
6. **📧 Confirmation** - Receive booking confirmation
7. **📊 Dashboard** - Track orders and view results

### 🎯 Key Pages

- **🏠 Home** - Landing page with featured content
- **🧪 Tests** - Browse all available lab tests
- **🏥 Checkups** - Complete health checkup packages
- **🛒 Cart** - Shopping cart and checkout
- **👤 Profile** - User dashboard and order history
- **📞 Contact** - Support and contact information

---

## 📱 Screenshots

<div align="center">

### 🏠 Homepage
![Homepage](https://via.placeholder.com/800x400/4CAF50/white?text=FutureLabs+Homepage)

### 🧪 Test Categories
![Test Categories](https://via.placeholder.com/800x400/2196F3/white?text=Test+Categories)

### 🛒 Shopping Cart
![Shopping Cart](https://via.placeholder.com/800x400/FF9800/white?text=Shopping+Cart)

### 📱 Mobile View
<img src="https://via.placeholder.com/300x600/9C27B0/white?text=Mobile+View" alt="Mobile View" width="300">

</div>

---

## 🔧 API Documentation

### 🌐 Base URL
```
http://localhost:5000/api/v1
```

### 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | 👤 User registration |
| `POST` | `/auth/login` | 🔐 User login |
| `GET` | `/auth/profile` | 👤 Get user profile |

### 🧪 Test Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tests` | 📋 Get all tests |
| `GET` | `/tests/:id` | 🔍 Get test by ID |
| `GET` | `/tests/category/:category` | 📂 Get tests by category |

### 🛒 Cart Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/cart/add` | ➕ Add item to cart |
| `GET` | `/cart/:userId` | 🛒 Get user cart |
| `DELETE` | `/cart/remove/:itemId` | ❌ Remove item from cart |

### 📦 Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/orders/create` | 📝 Create new order |
| `GET` | `/orders/:userId` | 📋 Get user orders |
| `GET` | `/orders/details/:orderId` | 🔍 Get order details |

---

## 🌐 Deployment

### 🚀 Production Deployment

#### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the build folder
```

#### Backend (Heroku/Railway)
```bash
cd backend
# Set environment variables
# Deploy to your preferred platform
```

#### Database (MongoDB Atlas)
```bash
# Update MONGODB_URI in .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futurelabs
```

### 🐳 Docker Deployment

```dockerfile
# Dockerfile example
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🛠️ Development Process

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💻 Commit** your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **📤 Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **🔄 Open** a Pull Request

### 📝 Contribution Guidelines

- 📋 Follow the existing code style
- ✅ Write tests for new features
- 📖 Update documentation
- 🔍 Ensure all tests pass

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/ashiii2121/futurelab?style=social)
![GitHub forks](https://img.shields.io/github/forks/ashiii2121/futurelab?style=social)
![GitHub issues](https://img.shields.io/github/issues/ashiii2121/futurelab)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ashiii2121/futurelab)

</div>

---

## 📞 Support

Need help? We're here for you!

- 📧 **Email**: support@futurelabs.com
- 💬 **Discord**: [Join our community](https://discord.gg/futurelabs)
- 📖 **Documentation**: [docs.futurelabs.com](https://docs.futurelabs.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/ashiii2121/futurelab/issues)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by the FutureLabs Team**

[![GitHub](https://img.shields.io/badge/GitHub-ashiii2121-181717?style=flat-square&logo=github)](https://github.com/ashiii2121)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/ashiii2121)

⭐ **Star this repo if you found it helpful!** ⭐

</div>