# Azure Deployment Guide

## Step-by-Step Deployment Instructions

### Prerequisites

- Azure Account (free tier available)
- GitHub Account
- Node.js 18.x installed
- Git installed

### 1. Set Up MongoDB Atlas

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project and cluster
4. Create a database user (note the username and password)
5. Add your IP to network access
6. Copy the connection string

**Connection String Format:**
```
mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

### 2. Create Azure Web App

#### Using Azure Portal

1. **Login to [Azure Portal](https://portal.azure.com)**
2. **Create New Resource:**
   - Search for "Web App"
   - Click "Create"

3. **Configure Basics:**
   - **Resource Group:** Create new or select existing
   - **Name:** Unique name for your app (e.g., `mern-app-demo`)
   - **Publish:** Code
   - **Runtime Stack:** Node 18 LTS
   - **Operating System:** Linux (recommended)
   - **Region:** Closest to your users

4. **Configure App Service Plan:**
   - **Pricing tier:** Free F1 or B1 (depending on needs)

5. **Click Review + Create → Create**

#### Using Azure CLI

```bash
# Login to Azure
az login

# Create resource group
az group create --name myResourceGroup --location eastus

# Create App Service plan
az appservice plan create \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --sku FREE \
  --is-linux

# Create Web App
az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name mern-app-demo \
  --runtime "NODE|18-lts"
```

### 3. Configure Deployment

#### Option A: Local Git Deployment

```bash
# In Azure Portal, go to Deployment Center
# Select "Local Git" and copy the Git Clone URI

# Clone the repository
git clone <your-azure-git-url>
cd <app-name>

# Copy application files
cp -r <your-mern-app>/* .

# Commit and push
git add .
git commit -m "Deploy MERN app"
git push
```

#### Option B: GitHub Deployment with Actions

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mern-app.git
   git branch -M main
   git push -u origin main
   ```

2. **Get Azure Publish Profile:**
   - Azure Portal → Web App → Deployment Center
   - Select GitHub as source
   - Authorize GitHub
   - Select your repository and branch

3. **Add GitHub Secrets:**
   - Go to your repository on GitHub
   - Settings → Secrets and variables → Actions
   - Create new secret `AZURE_PUBLISH_PROFILE`
   - Paste the publish profile content

### 4. Set Environment Variables

1. **Azure Portal → Web App → Configuration**
2. **Add Application Settings:**

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `NODE_ENV` | production |
| `PORT` | 8080 |

3. **Click Save**

### 5. Configure Startup Command

1. **Azure Portal → Web App → Configuration → General Settings**
2. **Startup Command:**
   ```
   npm install && npm run build && npm start
   ```

### 6. Enable Logs (Optional)

For debugging:

1. **App Service logs → Filesystem**
2. **Set Application logging to Verbose**
3. **View logs in Azure CLI:**
   ```bash
   az webapp log tail --resource-group myResourceGroup --name mern-app-demo
   ```

### 7. Test Your Deployment

```bash
# Check application is running
curl https://mern-app-demo.azurewebsites.net/api/health

# View in browser
# https://mern-app-demo.azurewebsites.net
```

## Troubleshooting

### Build Failures

Check deployment logs:
```bash
az webapp deployment log show \
  --resource-group myResourceGroup \
  --name mern-app-demo
```

### MongoDB Connection Issues

1. Verify connection string in environment variables
2. Check IP whitelist in MongoDB Atlas
3. Test connection locally with same string

### Port Issues

- Azure uses port 8080 by default
- Application automatically uses PORT environment variable

### 502 Bad Gateway

Usually indicates:
- Application crash (check logs)
- MongoDB connection issue
- Missing environment variables

## Scaling Your Application

### Vertical Scaling (More Resources)

```bash
az appservice plan update \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --sku B1
```

### Horizontal Scaling (Multiple Instances)

```bash
az appservice plan update \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --number-of-workers 3
```

## Cost Optimization

- **Free Tier (F1):** Great for development
- **B1 Tier:** $54.75/month - Recommended for production
- **Premium Tiers:** For high-traffic applications
- **Reserved Instances:** 30% savings with 1-year commitment

## Performance Tips

1. **Enable Gzip Compression:** Included in Express
2. **Use CDN:** Azure CDN for static assets
3. **Database Indexing:** Create indexes in MongoDB
4. **Implement Caching:** Redis or in-memory
5. **Monitor Performance:** Use Azure Application Insights

## Security Considerations

1. **Use HTTPS:** Azure provides free SSL
2. **Firewall Rules:** Restrict IP access
3. **Environment Variables:** Never commit secrets
4. **Database User Permissions:** Minimal required access
5. **Dependency Updates:** Regularly run `npm audit fix`

## Next Steps

- Set up custom domain (add domain DNS records)
- Configure continuous deployment
- Set up monitoring and alerts
- Implement API rate limiting
- Add authentication/authorization

## Additional Resources

- [Azure Web App Documentation](https://learn.microsoft.com/en-us/azure/app-service/)
- [Azure CLI Reference](https://learn.microsoft.com/en-us/cli/azure/)
- [Node.js on Azure Best Practices](https://learn.microsoft.com/en-us/azure/developer/nodejs/)
