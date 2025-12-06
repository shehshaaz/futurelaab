# 🏥 FutureLabs Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Frontend for the FutureLabs Healthcare Platform**

_React-based modern healthcare application_

[🌐 Live Demo](https://ashiii2121.github.io/futurelab) • [🚀 Getting Started](#-quick-start) • [📁 Project Structure](#-project-structure)

</div>

---

## 🌟 Overview

The FutureLabs Frontend is a modern React application that provides a seamless user experience for booking lab tests and health checkups. It features responsive design, real-time search, OTP authentication, and a smart shopping cart.

<div align="center">
  <img src="images/banners/banner1.png" alt="FutureLabs Frontend" width="800"/>
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🧭 Routing](#-routing)
- [🔌 API Integration](#-api-integration)
- [🎨 Styling](#-styling)
- [📦 Build & Deployment](#-build--deployment)
- [📄 License](#-license)

---

## ✨ Features

- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🔍 **Real-time Search** - Instant search with suggestions
- 🔐 **OTP Authentication** - Secure phone-based login
- 🛒 **Smart Shopping Cart** - Persistent cart with localStorage
- 📍 **Location Services** - Pincode validation and geolocation
- 🎁 **Promotional Banners** - Dynamic offers and discounts
- 🏷️ **Category-based Navigation** - Organized healthcare services
- 💳 **Seamless Checkout** - Smooth order processing

---

## 🛠️ Technologies Used

| Technology       | Purpose                     | Version |
| ---------------- | --------------------------- | ------- |
| **React**        | UI Library                  | 18.2.0  |
| **React Router** | Client-side Routing         | 6.8.0   |
| **Bootstrap**    | UI Components               | 5.3.8   |
| **Tailwind CSS** | Utility-first CSS Framework | 4.1.12  |
| **Axios**        | HTTP Client                 | 1.3.0   |
| **Lucide React** | Icon Library                | 0.542.0 |

---

## 🚀 Quick Start

### 📚 Prerequisites

- **Node.js** (v16 or higher) 🟢
- **npm** or **yarn** package manager 📦

### 🔄 Installation

1. **💾 Clone the repository:**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **📦 Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **🚀 Start the development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

   🌍 Application will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
frontend/
├── 📁 public/              # Static assets
│   ├── index.html         # Main HTML file
│   └── 404.html           # 404 error page
├── 📁 src/                 # Source code
│   ├── 📁 components/     # Reusable components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── Footer.jsx     # Page footer
│   │   ├── SearchComponent.jsx  # Search functionality
│   │   └── ...            # Other components
│   ├── 📁 pages/          # Page components
│   │   ├── Home.jsx       # Homepage
│   │   ├── Cart.jsx       # Shopping cart
│   │   ├── Checkups.jsx   # Health checkups
│   │   └── ...            # Other pages
│   ├── 📁 hooks/          # Custom React hooks
│   │   └── useAuth.js     # Authentication hook
│   ├── 📁 utils/          # Utility functions
│   │   ├── api.js         # API service
│   │   ├── config.js      # Configuration
│   │   └── carousel.js    # Carousel utility
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

---

## 🧭 Routing

The application uses React Router v6 for navigation:

| Path                        | Component        | Description             |
| --------------------------- | ---------------- | ----------------------- |
| `/`                         | Home             | Homepage                |
| `/cart`                     | Cart             | Shopping cart           |
| `/checkups`                 | Checkups         | Health checkups         |
| `/package`                  | Package          | Exclusive packages      |
| `/product`                  | Product          | Product details         |
| `/single-test`              | SingleTest       | Individual tests        |
| `/woman-care`               | WomanCare        | Women's health packages |
| `/men-care`                 | MenCare          | Men's health packages   |
| `/special-care`             | SpecialCare      | Special care packages   |
| `/vital-organ`              | VitalOrgan       | Vital organ tests       |
| `/lifestyle-health-checkup` | LifestyleCheckup | Lifestyle checkups      |

---

## 🔌 API Integration

The frontend connects to the backend API at:

```
http://localhost:5000/api/v1
```

Configuration is handled in `src/utils/config.js` and API calls are made through `src/utils/api.js`.

---

## 🎨 Styling

The application uses a combination of:

- **Bootstrap 5** for responsive grid and components
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for specific styling needs
- **Owl Carousel** for image sliders

---

## 📦 Build & Deployment

### 🏗️ Production Build

```bash
npm run build
# or
yarn build
```

### 🐙 GitHub Pages Deployment

```bash
npm run deploy
# or
yarn deploy
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

**⚡ Built with React 18 • 🎨 Styled with Bootstrap 5 & Tailwind CSS • 🚀 Deployed on GitHub Pages**

_Made with ❤️ for better healthcare accessibility_

</div>
