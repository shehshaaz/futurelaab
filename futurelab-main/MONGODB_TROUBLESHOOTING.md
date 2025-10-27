# MongoDB Connection Troubleshooting Guide

This guide will help you resolve the MongoDB connection issues in the FutureLabs Healthcare Platform.

## Problem Analysis

The error messages indicate:

1. `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017` - MongoDB is not running
2. `MongooseError: Operation buffering timed out after 10000ms` - Database operations are timing out

## Solutions

### Solution 1: Start MongoDB Service (Recommended)

#### For Windows:

1. **Check if MongoDB is installed**:

   ```cmd
   mongod --version
   ```

2. **Start MongoDB service**:

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

### Solution 2: Use Helper Scripts

We've provided several helper scripts to make this easier:

1. **PowerShell Script (Windows)**:

   ```cmd
   .\start-mongodb.ps1
   ```

2. **Batch Script (Windows)**:

   ```cmd
   start-mongodb-and-app.bat
   ```

3. **Node.js Script**:
   ```cmd
   npm run start:mongodb
   ```

### Solution 3: Test MongoDB Connection

To verify if MongoDB is accessible:

```cmd
npm run test:mongodb
```

### Solution 4: Use Mock Data (Temporary Solution)

If you're unable to get MongoDB running, you can temporarily use mock data:

1. Edit `frontend/src/utils/config.js`
2. Change `export const USE_MOCK_DATA = false;` to `export const USE_MOCK_DATA = true;`
3. Save the file
4. Restart the frontend server

## Fallback Solutions

### Update Connection String

If you're still having issues, try updating the connection string in `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/futurelabs
```

### Check MongoDB Logs

Look for MongoDB logs to identify issues:

- Windows: `C:\Program Files\MongoDB\Server\[version]\log\mongod.log`
- macOS: `/usr/local/var/log/mongodb/mongo.log`
- Linux: `/var/log/mongodb/mongod.log`

## Diagnostic Commands

### Check if MongoDB is Running

```cmd
# Windows
tasklist | findstr mongo

# macOS/Linux
ps aux | grep mongo
```

### Check Listening Ports

```cmd
# Windows
netstat -an | findstr 27017

# macOS/Linux
netstat -an | grep 27017
```

### Test Connection

```cmd
telnet 127.0.0.1 27017
```

## Next Steps After Fixing MongoDB

1. **Restart the backend server**:

   ```cmd
   cd backend
   npm run dev
   ```

2. **Verify the connection**:
   Visit `http://localhost:5000/api/v1/health` in your browser

3. **Start the frontend server**:

   ```cmd
   cd frontend
   npm start
   ```

4. **Or use the full development script**:
   ```cmd
   npm run dev:full
   ```

## Common Issues and Solutions

### Port Already in Use

If you get an error about port 27017 being in use:

1. Check for running MongoDB processes
2. Kill existing processes or change the port in `.env`

### Permission Issues

On Windows:

- Run Command Prompt as Administrator

On macOS/Linux:

- Use sudo for system commands

### Firewall Issues

- Add MongoDB to firewall exceptions
- Check antivirus software

## Additional Resources

- MongoDB Installation Guide: https://docs.mongodb.com/manual/installation/
- MongoDB Community Download: https://www.mongodb.com/try/download/community
- MongoDB Documentation: https://docs.mongodb.com/

If you continue to experience issues, please share the output of `npm run test:mongodb` for further assistance.
