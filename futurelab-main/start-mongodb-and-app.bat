@echo off
title FutureLabs + MongoDB Starter

echo =====================================
echo FutureLabs Healthcare Platform
echo MongoDB and Application Starter
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
    echo After installation:
    echo 1. Make sure MongoDB is in your system PATH
    echo 2. Run this script again
    echo.
    pause
    exit /b
)

echo ✅ MongoDB is installed
mongod --version | findstr "db version"

echo.
echo Attempting to start MongoDB service...

REM Try to start MongoDB service
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB service started successfully
) else (
    echo ⚠️  Could not start MongoDB service automatically
    echo.
    echo Please start MongoDB manually:
    echo 1. Open Command Prompt as Administrator
    echo 2. Run: net start MongoDB
    echo.
    echo Or run MongoDB directly:
    echo 1. Open a new Command Prompt
    echo 2. Run: mongod
    echo.
    echo Press any key to continue anyway...
    pause >nul
)

echo.
echo Starting FutureLabs Backend Server...
cd backend
start "Backend Server - FutureLabs" cmd /k "npm run dev"

echo.
echo Waiting for backend to initialize...
timeout /t 10 /nobreak >nul

echo.
echo Starting FutureLabs Frontend Server...
cd ../frontend
start "Frontend Server - FutureLabs" cmd /k "npm start"

echo.
echo ==========================================
echo Startup Process Completed
echo ==========================================
echo.
echo Access your application at:
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000/api/v1
echo.
echo Backend API Health Check: http://localhost:5000/api/v1/health
echo.
echo To stop the servers, close the terminal windows
echo.
echo Press any key to close this window...
pause >nul