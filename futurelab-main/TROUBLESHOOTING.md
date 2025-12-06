# Troubleshooting Guide for FutureLabs Healthcare Platform

This guide will help you resolve common issues when running the FutureLabs application.

## Common Issues and Solutions

### 1. "Failed to load data" Error on Homepage

This error occurs when the frontend cannot fetch data from the backend API.

#### Symptoms:

- Homepage shows "Failed to load data. Please try again later."
- Console shows network errors or API call failures

#### Solutions:

1. **Check if backend server is running**:

   ```bash
   node test-connection.js
   ```

   If it shows "Server is not accessible", start the backend:

   ```bash
   cd backend
   npm run dev
   ```

2. **Verify MongoDB is running**:

   ```bash
   node check-mongodb.js
   ```

   If MongoDB is not accessible:

   - On Windows: `net start MongoDB`
   - On macOS/Linux: `sudo systemctl start mongod`

3. **Use mock data as temporary solution**:
   Edit `frontend/src/utils/config.js`:
   ```javascript
   export const USE_MOCK_DATA = true;
   ```

### 2. CORS Errors

#### Symptoms:

- Browser console shows CORS-related errors
- API calls fail with CORS policy violations

#### Solutions:

1. Ensure the backend server is running (it has CORS enabled by default)
2. Check that frontend and backend are on the expected ports (3000 and 5000)
3. Verify there are no firewall or network restrictions

### 3. MongoDB Connection Issues

#### Symptoms:

- Backend server crashes on startup
- Error messages about MongoDB connection failures
- "ECONNREFUSED" errors in logs

#### Solutions:

1. **Verify MongoDB is installed and running**:

   - On Windows: `net start MongoDB`
   - On macOS/Linux: `sudo systemctl start mongod`

2. **Check MongoDB URI in backend `.env` file**:

   ```env
   MONGODB_URI=mongodb://localhost:27017/futurelabs
   ```

3. **Test MongoDB connection**:
   ```bash
   node check-mongodb.js
   ```

### 4. Port Conflicts

#### Symptoms:

- Error messages about ports being in use
- Applications fail to start

#### Solutions:

1. **Change backend port**:
   Update `backend/.env`:

   ```env
   PORT=5001  # or another available port
   ```

2. **Change frontend port**:
   Set environment variable before starting:
   ```bash
   PORT=3001 npm start  # in frontend directory
   ```

### 5. Dependency Installation Issues

#### Symptoms:

- Errors during `npm install`
- Missing module errors when running applications

#### Solutions:

1. **Clear npm cache**:

   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall**:

   ```bash
   # In both frontend and backend directories
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Use specific Node.js version**:
   Ensure you're using Node.js v16 or higher:
   ```bash
   node --version
   ```

### 6. Windows-Specific Issues

#### PowerShell Script Execution Policy:

If you encounter issues running scripts:

1. Check execution policy:

   ```powershell
   Get-ExecutionPolicy
   ```

2. Set execution policy (as Administrator):
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

## Testing Individual Components

### Test Backend Server:

```bash
node test-connection.js
```

### Test MongoDB Connection:

```bash
node check-mongodb.js
```

### Test API Endpoints Manually:

```bash
# Test health endpoint
curl http://localhost:5000/api/v1/health

# Test categories endpoint
curl http://localhost:5000/api/v1/category/lessPrice/selected
```

## Development Workflow

### Recommended Development Setup:

1. Start MongoDB
2. Start backend server in one terminal:
   ```bash
   cd backend
   npm run dev
   ```
3. Start frontend in another terminal:
   ```bash
   cd frontend
   npm start
   ```

### Alternative: Use the Full Development Script:

```bash
npm run dev:full
```

This starts both backend and frontend simultaneously.

## Environment Variables

### Backend (.env file in backend directory):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/futurelabs
JWT_SECRET=your_jwt_secret_here
```

### Frontend Configuration:

The frontend configuration is in `frontend/src/utils/config.js`:

```javascript
export const USE_MOCK_DATA = false; // Set to true for mock data
export const baseUrl = "http://localhost:5000"; // Backend URL
```

## Useful Commands

### Check Running Processes:

```bash
# Windows
tasklist | findstr node

# macOS/Linux
ps aux | grep node
```

### Kill Processes on Specific Ports:

```bash
# Windows
taskkill /F /PID <port_number>

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

## Getting Further Help

If you're still experiencing issues:

1. Check the console logs in both frontend and backend
2. Verify all environment variables are correctly set
3. Ensure all dependencies are properly installed
4. Check that MongoDB is running and accessible
5. Review the README.md and RUNNING_INSTRUCTIONS.md files

For additional support, please provide:

- Error messages from console logs
- Output of `node test-connection.js`
- Output of `node check-mongodb.js`
- Your operating system and Node.js version
