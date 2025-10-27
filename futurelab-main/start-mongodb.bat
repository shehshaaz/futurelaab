@echo off
title MongoDB Starter for FutureLabs

echo =====================================
echo FutureLabs Healthcare Platform
echo MongoDB Starter Script
echo =====================================

echo.
echo Checking if MongoDB is installed...

REM Check if mongod is available
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MongoDB is not installed or not in PATH
    echo.
    echo Please download and install MongoDB from:
    echo https://www.mongodb.com/try/download/community
    echo.
    echo After installation, make sure to:
    echo 1. Add MongoDB to your system PATH
    echo 2. Run this script again
    echo.
    pause
    exit /b
)

echo ✅ MongoDB is installed
mongod --version | findstr "db version"

echo.
echo Starting MongoDB service...

REM Try to start MongoDB service
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB service started successfully
    echo.
    echo You can now start the backend server with:
    echo cd backend
    echo npm run dev
    echo.
    pause
    exit /b
)

echo ⚠️  Could not start MongoDB service automatically
echo.
echo Please try one of the following options:
echo.
echo Option 1: Start MongoDB manually
echo 1. Open Command Prompt as Administrator
echo 2. Run: net start MongoDB
echo.
echo Option 2: Run MongoDB directly
echo 1. Open a new terminal/command prompt
echo 2. Run: mongod
echo.
echo Option 3: Start MongoDB as a Windows service
echo 1. Open Command Prompt as Administrator
echo 2. Navigate to MongoDB installation directory
echo 3. Run: mongod --install --serviceName "MongoDB"
echo 4. Run: net start MongoDB
echo.
echo After starting MongoDB, you can start the backend server with:
echo cd backend
echo npm run dev
echo.
pause