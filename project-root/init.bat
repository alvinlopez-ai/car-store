@echo off
REM Project initialization script for Windows
REM Run this after cloning to set up the project

echo 🚀 EWYL Project Setup Script
echo ============================
echo.

REM Check Docker
echo ✓ Checking Docker...
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose not found. Please install Docker Desktop.
    exit /b 1
)
echo ✓ Docker Compose found
echo.

REM Create env files if they don't exist
echo ✓ Setting up environment files...
if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo   ✓ Created backend\.env
)

if not exist "frontend\.env" (
    copy frontend\.env.example frontend\.env
    echo   ✓ Created frontend\.env
)

REM Start Docker services
echo.
echo 🐳 Starting Docker services...
docker-compose up --build -d

echo.
echo ⏳ Waiting for services to be ready...
timeout /t 5

REM Check if services are running
docker-compose ps | findstr "backend" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Services are running
    
    REM Seed database
    echo.
    echo 🌱 Seeding database...
    docker-compose exec -T backend npm run seed
    
    echo.
    echo ✅ Setup Complete!
    echo.
    echo 🎯 Access your application:
    echo    Frontend: http://localhost:5173
    echo    Backend:  http://localhost:5000/api
    echo.
    echo 🔑 Login with:
    echo    Email: john@example.com
    echo    Password: password123
    echo.
    echo 📚 Read the documentation:
    echo    - QUICK_START.md ^(fast setup^)
    echo    - README.md ^(complete docs^)
    echo    - ARCHITECTURE.md ^(system design^)
    echo.
    echo 🛑 To stop everything:
    echo    docker-compose down
) else (
    echo ❌ Services failed to start. Check logs:
    echo    docker-compose logs
    exit /b 1
)
