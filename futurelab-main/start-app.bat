@echo off
echo Starting FutureLabs Healthcare Platform...

echo.
echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend Server...
cd ../frontend
start "Frontend Server" cmd /k "npm start"

echo.
echo Application startup initiated!
echo Frontend will be available at http://localhost:3000
echo Backend API will be available at http://localhost:5000/api/v1
echo.
echo Press any key to close this window...
pause >nul