# 📦 MongoDB Installation Guide for FutureLabs

This guide will help you install MongoDB on Windows to run the FutureLabs Healthcare Platform.

## 🖥️ Windows Installation

### Step 1: Download MongoDB

1. Visit the [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Select the following options:

   - **Version**: Latest stable release (5.0 or higher)
   - **Platform**: Windows x64
   - **Package**: MSI

3. Click "Download" to download the installer

### Step 2: Install MongoDB

1. Locate the downloaded `.msi` file and double-click to run it
2. In the MongoDB Setup Wizard:

   - Click "Next"
   - Accept the license agreement and click "Next"
   - Choose "Complete" setup type and click "Next"
   - Select "Run service as Network Service user" (default)
   - Choose the default data directory or specify your own
   - Click "Next"
   - Check "Install MongoDB Compass" (recommended for database management)
   - Click "Install"

3. Wait for the installation to complete
4. Click "Finish" to exit the installer

### Step 3: Verify Installation

Open a new Command Prompt or PowerShell window and run:

```bash
mongod --version
```

You should see output similar to:

```
db version v6.0.5
Build Info: ...
```

### Step 4: Start MongoDB Service

MongoDB should automatically start as a Windows service. You can verify this by:

1. Press `Win + R`, type `services.msc`, and press Enter
2. Look for "MongoDB Server" in the list
3. Ensure its status is "Running"

If it's not running:

1. Right-click on "MongoDB Server"
2. Select "Start"

### Step 5: Test MongoDB Connection

Open a new Command Prompt or PowerShell window and run:

```bash
mongosh
```

This should connect to your local MongoDB instance. You should see a prompt like:

```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
Using MongoDB: 6.0.5
Using Mongosh: 1.8.0

For mongosh info see: https://docs.mongodb.com/mongodb-shell/

------
   The server generated these startup warnings when booting
------
...

test>
```

Type `exit` to quit the MongoDB shell.

## 🚀 Running FutureLabs with MongoDB

Once MongoDB is installed and running:

1. **Seed the database** (from the backend directory):

   ```bash
   cd backend
   node seeder -i
   ```

2. **Start the application** (from the root directory):

   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/v1
   - Backend Health Check: http://localhost:5000/api/v1/health

## 🛠️ Troubleshooting

### Issue: "mongod" is not recognized

**Solution**: Add MongoDB to your system PATH:

1. Find your MongoDB installation directory (usually `C:\Program Files\MongoDB\Server\[version]\bin`)
2. Add this path to your system's PATH environment variable:
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System Variables", find and select "Path", then click "Edit"
   - Click "New" and add the MongoDB bin directory path
   - Click "OK" to save

### Issue: Port 27017 is already in use

**Solution**: MongoDB might already be running as a service. This is actually what we want!

### Issue: Connection refused when starting the backend

**Solution**: Make sure MongoDB service is running:

1. Open Services (services.msc)
2. Find "MongoDB Server"
3. If it's stopped, right-click and select "Start"

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI for MongoDB
- [MongoDB University](https://university.mongodb.com/) - Free online courses

---

<div align="center">

**⚡ Powered by MongoDB • 🛡️ Secured with Authentication • 📦 Easy to Setup**

_Made with ❤️ for better healthcare accessibility_

</div>
