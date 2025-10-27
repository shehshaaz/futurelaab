# MongoDB Connection Fix Guide

This guide will help you resolve the MongoDB connection issues in the FutureLabs Healthcare Platform.

## Problem Analysis

From the error logs, we can see:

1. `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017` - MongoDB is not running
2. `MongooseError: Operation buffering timed out after 10000ms` - Database operations are timing out

## Solutions

### Solution 1: Start MongoDB Service (Recommended)

#### For Windows:

1. **Check if MongoDB is installed**:

   ```cmd
   mongod --version
   ```

2. **If MongoDB is installed, start the service**:

   ```cmd
   net start MongoDB
   ```

3. **If the service doesn't exist, install it**:

   ```cmd
   mongod --install --serviceName "MongoDB"
   net start MongoDB
   ```

4. **Alternative: Run MongoDB directly**:
   ```cmd
   mongod
   ```

#### For macOS:

1. **Start MongoDB with Homebrew**:

   ```bash
   brew services start mongodb-community
   ```

2. **Or run MongoDB directly**:
   ```bash
   mongod --config /usr/local/etc/mongod.conf
   ```

#### For Linux:

1. **Start MongoDB service**:

   ```bash
   sudo systemctl start mongod
   ```

2. **Enable MongoDB to start on boot**:
   ```bash
   sudo systemctl enable mongod
   ```

### Solution 2: Install MongoDB

If MongoDB is not installed:

#### Windows:

1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Choose "Complete" installation
4. Select "Run service as Network Service user"
5. Complete the installation

#### macOS:

```bash
brew tap mongodb/brew
brew install mongodb-community
```

#### Linux (Ubuntu/Debian):

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Solution 3: Use the Provided Scripts

We've provided several helper scripts:

1. **start-mongodb.bat** - Windows script to start MongoDB
2. **run-checks.bat** - Run all diagnostic checks
3. **start-full-app.bat** - Start both frontend and backend

### Solution 4: Verify Connection

After starting MongoDB, verify the connection:

1. **Check if MongoDB is listening**:

   ```cmd
   netstat -an | findstr 27017
   ```

2. **Test connection with MongoDB shell**:

   ```cmd
   mongosh
   ```

3. **Check MongoDB logs**:
   - Windows: `C:\Program Files\MongoDB\Server\[version]\log\mongod.log`
   - macOS: `/usr/local/var/log/mongodb/mongo.log`
   - Linux: `/var/log/mongodb/mongod.log`

### Solution 5: Update Connection String (If needed)

If you're still having issues, check the connection string in `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/futurelabs
```

You can try alternative connection strings:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/futurelabs
```

## Fallback Solution: Use Mock Data

If you're unable to get MongoDB running, you can temporarily use mock data:

1. Edit `frontend/src/utils/config.js`:

   ```javascript
   export const USE_MOCK_DATA = true;
   ```

2. Restart the frontend server:
   ```bash
   cd frontend
   npm start
   ```

## Troubleshooting Tips

### Common Issues:

1. **Port 27017 already in use**:

   - Check for running MongoDB processes
   - Kill existing processes or change the port

2. **Permission issues**:

   - Run Command Prompt as Administrator on Windows
   - Use sudo on macOS/Linux

3. **Firewall blocking connections**:

   - Add MongoDB to firewall exceptions
   - Check antivirus software

4. **Path issues**:
   - Ensure MongoDB is in your system PATH
   - Use full paths if needed

### Diagnostic Commands:

1. **Check MongoDB processes**:

   ```cmd
   tasklist | findstr mongo
   ```

2. **Check listening ports**:

   ```cmd
   netstat -an | findstr LISTENING
   ```

3. **Test connection with telnet**:
   ```cmd
   telnet localhost 27017
   ```

## Next Steps

After fixing the MongoDB connection:

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm start
   ```

3. Or use the full development script:
   ```bash
   npm run dev:full
   ```

The application should now load properly without the "Failed to load data" error.
