# MERN Application - Quick Start Guide

## 🎯 Project Overview

This is a **production-ready MERN Stack Application** configured for deployment on **Microsoft Azure**. It includes:

- **Frontend:** React with modern UI
- **Backend:** Express.js REST API
- **Database:** MongoDB Atlas
- **Hosting:** Microsoft Azure Web App Service
- **CI/CD:** GitHub Actions
- **Documentation:** Complete deployment guides

## 📦 Quick Start

### Local Development (5 minutes)

```bash
# 1. Install all dependencies
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# 2. Create environment file
cd server
cp .env.example .env
# Edit .env with your MongoDB URI
cd ..

# 3. Run both server and client
npm run dev

# Application will run at:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5000
```

### Build for Production

```bash
npm run build
# Creates optimized production build in client/build
```

## ☁️ Deploy to Azure (10 minutes)

### Prerequisites
- Azure Account (free tier available)
- MongoDB Atlas Account
- GitHub Account

### Step-by-Step

1. **Set up MongoDB Atlas:**
   - Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get connection string

2. **Create Azure Web App:**
   - [Azure Portal](https://portal.azure.com) → Create Resource → Web App
   - Choose Node 18 LTS runtime
   - Free F1 or B1 tier

3. **Configure Environment:**
   - Azure Portal → Web App → Configuration
   - Add `MONGODB_URI` with your connection string
   - Add `NODE_ENV=production`

4. **Deploy:**
   - Option A: Push code to Azure Git
   - Option B: Connect GitHub for automatic deployment

5. **Access Your App:**
   - https://your-app-name.azurewebsites.net

**Detailed guide:** See [AZURE-DEPLOYMENT.md](docs/AZURE-DEPLOYMENT.md)

## 📚 Documentation

- **[README.md](README.md)** - Full project documentation
- **[docs/AZURE-DEPLOYMENT.md](docs/AZURE-DEPLOYMENT.md)** - Azure hosting guide
- **[docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md)** - GitHub repository setup
- **[server/.env.example](server/.env.example)** - Server configuration template

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get item by ID |
| POST | `/api/items` | Create item |
| PATCH | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, CSS3 |
| Backend | Express.js 4, Node.js 18 |
| Database | MongoDB Atlas |
| DevOps | Azure, GitHub Actions |
| Build | npm, Webpack |

## ✅ Features

✨ Full CRUD operations
✨ Responsive design
✨ Production-ready code
✨ Environment variables
✨ Error handling
✨ MongoDB integration
✨ Azure deployment ready
✨ CI/CD configured
✨ Comprehensive documentation
✨ MIT Licensed

## 📂 Project Structure

```
mern-app/
├── client/              # React frontend
│   ├── public/          # Static files
│   ├── src/             # React components
│   └── package.json
├── server/              # Express backend
│   ├── index.js         # Main server
│   ├── .env.example     # Config template
│   └── package.json
├── docs/                # Documentation
├── .github/workflows/   # CI/CD workflows
├── .gitignore
├── web.config           # IIS configuration
├── README.md            # Full documentation
└── package.json         # Root config
```

## 🚀 Deployment Options

### Azure Web App
- **Cost:** $0-$100/month
- **Scalability:** Auto-scale capable
- **Uptime:** 99.95% SLA

### GitHub Integration
- Automatic deployment on push
- CI/CD pipeline configured
- Status badges available

### Environment Variables
```env
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
PORT=8080
```

## 🔒 Security

✅ Environment variables for secrets
✅ MongoDB Atlas whitelist
✅ HTTPS/SSL included
✅ CORS configured
✅ Input validation
✅ Error handling

## 📊 Performance

✅ Gzip compression
✅ Minified production builds
✅ Database connection pooling
✅ Static file caching
✅ Optimized React bundle

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - See [LICENSE](LICENSE) file

## 🔗 Links

- **Repository:** [GitHub](https://github.com/yourusername/mern-app)
- **Live App:** https://your-app-name.azurewebsites.net
- **Issues:** [GitHub Issues](https://github.com/yourusername/mern-app/issues)

## 💡 Tips

**Local Development:**
```bash
npm run dev  # Runs both frontend and backend
```

**Server Only:**
```bash
cd server && npm run dev
```

**Client Only:**
```bash
cd client && npm start
```

**View Logs:**
```bash
az webapp log tail --resource-group myResourceGroup --name myApp
```

## 🆘 Troubleshooting

### MongoDB Connection Error
- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure database user has permissions

### Port Already in Use
- Backend: `PORT=5001 npm run dev`
- Frontend: `PORT=3001 npm start`

### Build Fails
- Clear node_modules: `rm -r node_modules`
- Reinstall: `npm install`
- Clear cache: `npm cache clean --force`

### Azure 502 Error
- Check application logs
- Verify MongoDB connection
- Check environment variables
- Restart application

## 📞 Support

- Check [README.md](README.md) for detailed info
- Review [documentation](docs/)
- Check GitHub [Issues](https://github.com/yourusername/mern-app/issues)

---

**Ready to deploy?** Start with [AZURE-DEPLOYMENT.md](docs/AZURE-DEPLOYMENT.md)

**Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md) (if available)

**Last Updated:** December 2025
