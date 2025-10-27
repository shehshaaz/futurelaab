# PowerShell script to start MongoDB for FutureLabs Healthcare Platform

Write-Host "=====================================" -ForegroundColor Green
Write-Host "FutureLabs Healthcare Platform" -ForegroundColor Green
Write-Host "MongoDB Starter Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

Write-Host ""

# Check if MongoDB is installed
Write-Host "Checking if MongoDB is installed..." -ForegroundColor Yellow
try {
    $mongoVersion = mongod --version
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB is installed" -ForegroundColor Green
        $mongoVersion | Select-String "db version"
    } else {
        Write-Host "❌ MongoDB is not installed or not in PATH" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please download and install MongoDB from:" -ForegroundColor Yellow
        Write-Host "https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "After installation, make sure to:" -ForegroundColor Yellow
        Write-Host "1. Add MongoDB to your system PATH" -ForegroundColor Yellow
        Write-Host "2. Run this script again" -ForegroundColor Yellow
        Write-Host ""
        pause
        exit
    }
} catch {
    Write-Host "❌ MongoDB is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download and install MongoDB from:" -ForegroundColor Yellow
    Write-Host "https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installation, make sure to:" -ForegroundColor Yellow
    Write-Host "1. Add MongoDB to your system PATH" -ForegroundColor Yellow
    Write-Host "2. Run this script again" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host ""
Write-Host "Starting MongoDB service..." -ForegroundColor Yellow

# Try to start MongoDB service
try {
    Start-Service MongoDB -ErrorAction Stop
    Write-Host "✅ MongoDB service started successfully" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now start the backend server with:" -ForegroundColor Yellow
    Write-Host "cd backend" -ForegroundColor Cyan
    Write-Host "npm run dev" -ForegroundColor Cyan
    Write-Host ""
    pause
    exit
} catch {
    Write-Host "⚠️ Could not start MongoDB service automatically" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please try one of the following options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Start MongoDB manually" -ForegroundColor Yellow
    Write-Host "1. Open PowerShell as Administrator" -ForegroundColor Cyan
    Write-Host "2. Run: Start-Service MongoDB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Option 2: Run MongoDB directly" -ForegroundColor Yellow
    Write-Host "1. Open a new PowerShell window" -ForegroundColor Cyan
    Write-Host "2. Run: mongod" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Option 3: Start MongoDB as a Windows service" -ForegroundColor Yellow
    Write-Host "1. Open PowerShell as Administrator" -ForegroundColor Cyan
    Write-Host "2. Navigate to MongoDB installation directory" -ForegroundColor Cyan
    Write-Host "3. Run: mongod --install --serviceName 'MongoDB'" -ForegroundColor Cyan
    Write-Host "4. Run: Start-Service MongoDB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After starting MongoDB, you can start the backend server with:" -ForegroundColor Yellow
    Write-Host "cd backend" -ForegroundColor Cyan
    Write-Host "npm run dev" -ForegroundColor Cyan
    Write-Host ""
    pause
    exit
}