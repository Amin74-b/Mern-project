@echo off

REM MERN App Deployment Script for Azure (Windows)
REM This script automates the deployment process

setlocal enabledelayedexpansion

echo 🚀 Starting MERN Application Build Process...

REM Check if Node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18.x or later.
    exit /b 1
)

echo ✅ Node.js version:
node --version

echo ✅ npm version:
npm --version

echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    exit /b 1
)

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    cd ..
    exit /b 1
)
cd ..

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    cd ..
    exit /b 1
)

REM Build React app
echo 🔨 Building React application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build React app
    cd ..
    exit /b 1
)
cd ..

echo.
echo ✅ Build completed successfully!
echo 📁 React build files are ready in: client/build/
echo.
echo 🎯 Next steps for Azure deployment:
echo 1. Create a resource group: az group create --name myResourceGroup --location eastus
echo 2. Create a Web App: az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name myMernApp
echo 3. Set environment variables in Azure Portal
echo 4. Deploy using: git push azure main
echo.
echo 🌐 Access your app at: https://myMernApp.azurewebsites.net

pause
