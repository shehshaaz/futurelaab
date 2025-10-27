# Running the FutureLabs Healthcare Platform

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or cloud instance)

## Setup Instructions

### 1. Install Dependencies

First, install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/futurelabs
JWT_SECRET=your_jwt_secret_here
```

### 3. Start MongoDB

Make sure MongoDB is running on your system. If you have MongoDB installed locally:

```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

### 4. Seed the Database (Optional)

To populate the database with initial data:

```bash
cd backend
node seeder.js
```

### 5. Run the Application

You have several options to run the application:

#### Option A: Run Backend and Frontend Separately

```bash
# Terminal 1: Start the backend
cd backend
npm run dev

# Terminal 2: Start the frontend
cd frontend
npm start
```

#### Option B: Run Both with One Command

```bash
# From the root directory
npm run dev:full
```

This will start both the backend (on port 5000) and frontend (on port 3000) simultaneously.

### 6. Access the Application

Once both servers are running:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/v1

### Troubleshooting

#### If you get "Failed to load data" error:

1. Check if the backend server is running:

   ```bash
   curl http://localhost:5000/api/v1/health
   ```

2. Check if MongoDB is running and accessible

3. Verify the API endpoints are working:
   ```bash
   curl http://localhost:5000/api/v1/category/lessPrice/selected
   ```

#### If you see CORS errors:

The backend should already have CORS enabled, but if you still see issues, make sure both frontend and backend are running on the expected ports.

#### If you want to use mock data temporarily:

In `frontend/src/utils/config.js`, set:

```javascript
export const USE_MOCK_DATA = true;
```

This will bypass API calls and use local mock data instead.
