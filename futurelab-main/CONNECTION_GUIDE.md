# 🔌 FutureLabs Backend-Frontend Connection Guide

This guide explains how the FutureLabs frontend and backend are connected and how to ensure they work together properly.

## 🔄 Connection Overview

The FutureLabs application uses a client-server architecture:

- **Frontend**: React application (port 3000)
- **Backend**: Node.js/Express API (port 5000)
- **Database**: MongoDB

The frontend makes HTTP requests to the backend API to fetch data, authenticate users, and manage the shopping cart.

## 📡 API Connection Details

### Frontend Configuration

The frontend connects to the backend through the API service in `frontend/src/utils/api.js`:

```javascript
// frontend/src/utils/config.js
export const baseUrl = "http://localhost:5000";
```

All API calls are made using this base URL with appropriate endpoints.

### Backend Configuration

The backend is configured in `backend/server.js` to:

1. Listen on port 5000
2. Allow CORS requests from the frontend
3. Serve static files from the frontend build directory
4. Handle API routes under `/api/v1`

```javascript
// backend/server.js
const PORT = process.env.PORT || 5000;

// CORS middleware
app.use(cors());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));
```

## 🚀 Running the Application

### Method 1: Separate Terminals (Recommended for Development)

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

### Method 2: Single Command (Using concurrently)

From the root directory:

```bash
npm run dev
```

This will start both servers simultaneously.

## 🧪 Testing the Connection

### 1. Check Backend Health

Visit http://localhost:5000/api/v1/health in your browser:

```json
{
  "status": "success",
  "message": "FutureLabs API is running",
  "timestamp": "2025-09-24T10:30:00.000Z"
}
```

### 2. Run Automated API Tests

From the root directory:

```bash
npm run test-api
```

### 3. Check Frontend Connection

The frontend homepage (http://localhost:3000) should load data from the backend:

- Health checkup packages
- Special offers
- Promotional banners
- Testimonials

## 📁 Data Flow

1. **Frontend Request**: User visits homepage
2. **API Call**: Frontend makes requests to `/api/v1/tests`, `/api/v1/category`, etc.
3. **Backend Processing**: Express routes handle requests
4. **Database Query**: Mongoose models fetch data from MongoDB
5. **Response**: Backend sends JSON data back to frontend
6. **UI Update**: React components render the data

## 🔧 Troubleshooting Connection Issues

### Issue: "Network Error" or "Failed to Load Data"

**Checklist:**

- [ ] Is the backend server running on port 5000?
- [ ] Is MongoDB running and accessible?
- [ ] Are the environment variables configured correctly?
- [ ] Is there a firewall blocking the connection?

### Issue: CORS Error

The backend already has CORS configured, but if you encounter issues:

```javascript
// backend/server.js
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);
```

### Issue: 404 Errors for API Endpoints

Verify the API endpoints exist:

```bash
# List all available routes
cd backend
node server.js
```

The server will log all registered routes on startup.

## 🔐 Authentication Flow

1. **Login Request**: Frontend sends credentials to `/api/v1/auth/login`
2. **Token Generation**: Backend validates credentials and generates JWT
3. **Token Storage**: Frontend stores JWT in localStorage
4. **Authenticated Requests**: Frontend includes JWT in Authorization header
5. **Token Verification**: Backend middleware verifies JWT for protected routes

## 🛒 Shopping Cart Integration

1. **Add to Cart**: Frontend sends POST request to `/api/v1/cart/add`
2. **Cart Retrieval**: Frontend fetches cart data from `/api/v1/cart/:userId`
3. **Cart Updates**: PUT/DELETE requests modify cart items
4. **Persistent Storage**: Cart data stored in MongoDB

## 📊 Real-time Data Updates

The application uses:

- **REST API** for initial data loading
- **Local State Management** for UI updates
- **LocalStorage** for persistent user preferences
- **Periodic Polling** for data refresh (where needed)

## 🚢 Production Deployment

In production, the connection setup changes:

1. **Backend**: Deployed to a server or cloud platform
2. **Frontend**: Built and served statically or deployed to CDN
3. **Environment Variables**: Updated for production URLs
4. **CORS**: Configured for production domain

Example production configuration:

```javascript
// frontend/src/utils/config.js
export const baseUrl = "https://api.futurelabs.health";
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/otp/generate` - Generate OTP
- `POST /api/v1/auth/otp/verify` - Verify OTP

### Data Endpoints

- `GET /api/v1/tests` - Get all tests
- `GET /api/v1/tests/:id` - Get single test
- `GET /api/v1/category` - Get all categories
- `GET /api/v1/banners` - Get all banners
- `GET /api/v1/locations/check/:pincode` - Check service availability

### Cart Endpoints

- `GET /api/v1/cart/:userId` - Get user cart
- `POST /api/v1/cart/add` - Add item to cart
- `DELETE /api/v1/cart/remove` - Remove item from cart

## 🆘 Getting Help

If you're experiencing connection issues:

1. **Check the setup**: Run `npm run check-setup`
2. **Verify MongoDB**: Ensure MongoDB is installed and running
3. **Check environment variables**: Verify `.env` files in backend
4. **Review logs**: Check terminal outputs for error messages
5. **Test endpoints**: Use browser or Postman to test API endpoints directly

---

<div align="center">

**⚡ Connected with REST API • 🛡️ Secured with JWT • 📦 Powered by MongoDB**

_Made with ❤️ for better healthcare accessibility_

</div>
