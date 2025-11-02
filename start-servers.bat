@echo off
echo Starting Wellness Warriors Servers...
echo.

REM Kill any existing processes on ports 8000 and 3000
echo Cleaning up old processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000"') do taskkill /F /PID %%a >nul 2>&1

REM Remove Next.js lock file
if exist .next\dev\lock del .next\dev\lock >nul 2>&1

echo.
echo Starting Backend Server (Port 8000)...
start "Wellness Warriors - Backend" cmd /k "cd /d %~dp0backend && python main.py"

timeout /t 2 /nobreak >nul

echo Starting Frontend Server (Port 3000)...
start "Wellness Warriors - Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo Servers are starting in separate windows...
echo.
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit this window (servers will continue running)...
pause >nul

