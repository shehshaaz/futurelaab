@echo off
title FutureLabs Healthcare Platform - Startup Script

echo ==========================================
echo FutureLabs Healthcare Platform
echo Starting Full Application Stack
echo ==========================================

echo.
echo Checking prerequisites...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b
)

echo ✅ Node.js is installed
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    echo.
    pause
    exit /b
)

echo ✅ npm is installed

echo.
echo Checking if MongoDB is running...
node check-mongodb.js | findstr "✅" >nul
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB might not be running
    echo Please ensure MongoDB is running before proceeding
    echo On Windows: net start MongoDB
    echo On macOS/Linux: sudo systemctl start mongod
    echo.
)

echo.
echo Starting Backend Server...
cd backend
start "Backend Server - FutureLabs" cmd /k "npm run dev"

echo.
echo Waiting for backend to initialize...
timeout /t 10 /nobreak >nul

echo.
echo Testing backend connection...
cd ..
node test-connection.js | findstr "✅" >nul
if %errorlevel% neq 0 (
    echo ⚠️  Backend server may still be starting up
    echo Please wait a moment and check http://localhost:5000/api/v1/health in your browser
)

echo.
echo Starting Frontend Server...
cd frontend
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
echo For troubleshooting, run 'run-checks.bat'
echo.
echo Press any key to close this window...
pause >nul