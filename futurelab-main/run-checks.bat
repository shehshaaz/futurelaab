@echo off
echo FutureLabs Healthcare Platform - Diagnostic Checks
echo =================================================

echo.
echo 1. Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js is installed
    node --version
) else (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

echo.
echo 2. Checking if npm is installed...
npm --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ npm is installed
    npm --version
) else (
    echo ❌ npm is not installed
    pause
    exit /b
)

echo.
echo 3. Checking MongoDB connection...
node check-mongodb.js

echo.
echo 4. Testing backend server connection...
node test-connection.js

echo.
echo Diagnostic checks completed.
echo.
echo Next steps:
echo - If MongoDB check failed, start MongoDB service
echo - If backend connection failed, start backend server with: cd backend ^&^& npm run dev
echo - Then run this script again to verify
echo.
pause