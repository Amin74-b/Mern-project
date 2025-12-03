#!/bin/bash

# MERN App Deployment Script for Azure
# This script automates the deployment process

set -e

echo "🚀 Starting MERN Application Build Process..."

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.x or later."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Build React app
echo "🔨 Building React application..."
cd client
npm run build
cd ..

echo "✅ Build completed successfully!"
echo "📁 React build files are ready in: client/build/"
echo ""
echo "🎯 Next steps for Azure deployment:"
echo "1. Create a resource group: az group create --name myResourceGroup --location eastus"
echo "2. Create a Web App: az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name myMernApp"
echo "3. Set environment variables in Azure Portal"
echo "4. Deploy using: git push azure main"
echo ""
echo "🌐 Access your app at: https://myMernApp.azurewebsites.net"
