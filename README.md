# MERN Stack Application - Deployment Guide for Microsoft Azure

## 📋 Project Overview

This is a full-stack **MERN** (MongoDB, Express, React, Node.js) application that is production-ready and configured for deployment on **Microsoft Azure**.

### Technology Stack

- **Frontend**: React 18.2.0
- **Backend**: Express.js 4.18.2
- **Database**: MongoDB (via MongoDB Atlas)
- **Runtime**: Node.js 18.x
- **Hosting**: Microsoft Azure Web App Service
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or later) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Microsoft Azure Account** - [Sign up](https://azure.microsoft.com/free/)

### Project Structure

```
mern-app/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── index.js           # Main server file
│   ├── .env.example       # Environment variables template
│   └── package.json
├── .gitignore
├── web.config             # Azure IIS configuration
├── package.json           # Root package.json
└── README.md
```

---

## 🔧 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-app.git
cd mern-app
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Configure Environment Variables

#### Server Configuration

Create a `.env` file in the `server/` directory:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-db?retryWrites=true&w=majority

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

**To get your MongoDB Atlas connection string:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string and replace `username` and `password`

### 4. Run Locally

```bash
# From root directory - runs both server and client concurrently
npm run dev

# Or run separately in different terminals:
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📦 Build for Production

```bash
# Build React frontend
npm run build

# This creates a `build` folder in the client directory with optimized production files
```

---

## ☁️ Deployment to Microsoft Azure

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Create a new project
3. Create a new cluster (Free tier available)
4. Create a database user with username and password
5. Whitelist your IP address in Network Access
6. Copy the connection string from "Connect" button

### Step 2: Create Azure Web App

1. **Log in to [Azure Portal](https://portal.azure.com)**

2. **Click "Create a resource"** → Search for **"Web App"**

3. **Fill in the required details:**
   - **Name**: Choose a unique name (e.g., `mern-app-yourname`)
   - **Publish**: Select "Code"
   - **Runtime stack**: Node 18 LTS
   - **Operating System**: Linux (recommended for cost efficiency)
   - **Region**: Choose closest to your users
   - **App Service Plan**: Create new or use existing

4. **Click "Review + Create"** → **Create**

### Step 3: Configure Deployment

#### Option A: Deploy Using Local Git

1. In Azure Portal, go to your Web App
2. Navigate to **"Deployment Center"**
3. Select **"Local Git"** as the source
4. Copy the **Git Clone URI**

```bash
# Clone Azure repository
git clone <your-azure-git-url>
cd <your-app-name>

# Copy your application files into this directory
# Commit and push
git add .
git commit -m "Initial commit"
git push
```

#### Option B: Deploy Using GitHub

1. In Azure Portal, go to **"Deployment Center"**
2. Select **"GitHub"** as the source
3. Authorize and select your repository
4. Select branch (main/master)
5. Azure automatically deploys on push

### Step 4: Configure Environment Variables

1. In your **Azure Web App** settings, go to **"Configuration"**
2. Click **"New application setting"** and add:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/mern-db?retryWrites=true&w=majority
NODE_ENV = production
PORT = 8080
```

3. Click **"Save"**

### Step 5: Enable Build Automation

1. Go to **"Build settings"** in Deployment Center
2. Select **"GitHub Actions"** or **"App Service build service"**
3. Configure build command:

```
npm install && npm run build
```

### Step 6: Test Your Deployment

1. Get your app URL from Azure Portal (e.g., `https://mern-app-yourname.azurewebsites.net`)
2. Visit the URL in your browser
3. Test the application functionality
4. Check backend API: `https://mern-app-yourname.azurewebsites.net/api/health`

---

## 🔍 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get item by ID |
| POST | `/api/items` | Create new item |
| PATCH | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

### Example API Usage

```bash
# Get all items
curl https://mern-app-yourname.azurewebsites.net/api/items

# Create new item
curl -X POST https://mern-app-yourname.azurewebsites.net/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"My Item","description":"Item description"}'

# Delete item
curl -X DELETE https://mern-app-yourname.azurewebsites.net/api/items/item_id
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify your connection string in `.env`
- Check that your IP address is whitelisted in MongoDB Atlas
- Ensure the database user has proper permissions

### Azure Deployment Issues

1. **Check deployment logs:**
   - Azure Portal → Web App → Deployment Center → Deployments

2. **View application logs:**
   - Azure Portal → Web App → App Service logs
   - Enable "Application logging" for diagnostics

3. **SSH into the app:**
   - Azure Portal → Web App → SSH
   - Run `npm logs` to see application errors

### Port Issues

- Azure uses port **8080** by default
- The application automatically uses `process.env.PORT` or defaults to 8080 in production

---

## 📝 Environment Variables Reference

### Server (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 5000 (dev), 8080 (prod) |

### Client (.env.local in client folder)

```
REACT_APP_API_URL=https://mern-app-yourname.azurewebsites.net/api
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` file** - Use `.env.example` as template
2. **Use strong MongoDB passwords** - At least 12 characters
3. **Enable CORS selectively** - Configure only trusted origins
4. **Use HTTPS only** - Azure provides free SSL certificates
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Use Azure Key Vault** - For sensitive configuration in production

---

## 📊 Performance Optimization

1. **Enable compression** - Express middleware included
2. **Use CDN** - Configure Azure CDN for static assets
3. **Database indexing** - Create indexes in MongoDB for frequently queried fields
4. **Caching** - Implement Redis or in-memory caching for frequently accessed data

---

## 🚀 Scaling on Azure

### Scale Vertically (Increase Server Size)

1. Azure Portal → Web App → Scale up (App Service plan)
2. Select higher tier with more CPU/memory

### Scale Horizontally (Multiple Instances)

1. Azure Portal → Web App → Scale out (App Service plan)
2. Increase instance count
3. Ensure your code is stateless

---

## 🔄 Continuous Integration/Deployment (CI/CD)

### GitHub Actions Workflow

Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Build and Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install && npm run build
      - name: Deploy to Azure
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'mern-app-yourname'
          publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
```

---

## 📚 Additional Resources

- [Azure Web Apps Documentation](https://learn.microsoft.com/en-us/azure/app-service/)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 👨‍💻 Author

Created for deploying MERN applications on Microsoft Azure Cloud Platform.

---

## 📞 Support

For issues and questions:

1. Check this README for solutions
2. Create an issue on GitHub
3. Check Azure and MongoDB documentation

---

**Last Updated:** December 2025  
**MERN Stack Version:** 1.0.0  
**Tested on:** Windows, macOS, Linux  
**Node.js Version:** 18.x LTS
