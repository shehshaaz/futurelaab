# How to Fix MongoDB Connection Issues

Based on the error logs you provided, the main issue is that MongoDB is not running on your system. Here's how to fix it:

## Step 1: Start MongoDB

### For Windows:

1. Open Command Prompt as Administrator
2. Run: `net start MongoDB`

If that doesn't work:

1. Run: `mongod`

### For macOS:

1. Open Terminal
2. Run: `brew services start mongodb-community`

### For Linux:

1. Open Terminal
2. Run: `sudo systemctl start mongod`

## Step 2: Verify MongoDB is Running

1. Open a new terminal/command prompt
2. Run: `mongo` or `mongosh`
3. If you see a MongoDB shell prompt, MongoDB is running

## Step 3: Restart the Backend Server

1. In your backend terminal, stop the server (Ctrl+C)
2. Run: `npm run dev`

## Alternative Solution: Use Mock Data

If you're still having issues with MongoDB, you can temporarily use mock data:

1. Edit `frontend/src/utils/config.js`
2. Change `export const USE_MOCK_DATA = false;` to `export const USE_MOCK_DATA = true;`
3. Save the file
4. Restart the frontend server

## Helper Scripts

We've provided several helper scripts to make this easier:

1. `start-mongodb.bat` - Starts MongoDB on Windows
2. `run-checks.bat` - Runs diagnostic checks
3. `start-full-app.bat` - Starts both frontend and backend

## If MongoDB is Not Installed

1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install it following the instructions for your operating system
3. Start the MongoDB service

After completing these steps, your application should work properly without the database connection errors.
