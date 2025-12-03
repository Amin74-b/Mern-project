# Setting Up GitHub Repository

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Fill in details:
   - **Repository name:** mern-app (or your preferred name)
   - **Description:** MERN stack application deployed on Azure
   - **Public/Private:** Public (for checkpoint submission)
   - **Add .gitignore:** Node
   - **Add license:** MIT

4. Click "Create repository"

## Step 2: Initialize Local Repository

```bash
cd c:\Users\SNOW\Desktop\webo\Mern project

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MERN app with Azure deployment configuration"

# Add remote
git remote add origin https://github.com/yourusername/mern-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Repository Structure on GitHub

Your repository should have:

```
mern-app/
├── .github/
│   └── workflows/
│       └── azure-deploy.yml
├── client/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── server/
│   ├── index.js
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── AZURE-DEPLOYMENT.md
│   └── GITHUB-SETUP.md
├── .gitignore
├── web.config
├── deploy.sh
├── deploy.bat
├── app.json
├── package.json
└── README.md
```

## Step 4: Add GitHub Secrets for CI/CD

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Create new repository secret:
   - **Name:** `AZURE_WEBAPP_NAME`
   - **Value:** Your Azure Web App name

4. Create another secret:
   - **Name:** `AZURE_PUBLISH_PROFILE`
   - **Value:** Your Azure publish profile

**To get the publish profile:**
- Azure Portal → Web App → Download publish profile (button at top)
- Copy entire content

## Step 5: Protect Main Branch (Optional)

1. Go to Settings → Branches
2. Add rule for "main"
3. Require pull request reviews
4. Require status checks to pass

## Step 6: Add README Badges (Optional)

Add to top of README.md:

```markdown
[![Build and Deploy to Azure Web App](https://github.com/yourusername/mern-app/actions/workflows/azure-deploy.yml/badge.svg)](https://github.com/yourusername/mern-app/actions/workflows/azure-deploy.yml)

[![GitHub license](https://img.shields.io/github/license/yourusername/mern-app)](https://github.com/yourusername/mern-app/blob/main/LICENSE)

[![GitHub stars](https://img.shields.io/github/stars/yourusername/mern-app)](https://github.com/yourusername/mern-app/stargazers)
```

## Step 7: Create LICENSE File

Create `LICENSE` file in root:

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Step 8: Commit and Push

```bash
git add .
git commit -m "Add GitHub Actions workflow and documentation"
git push
```

## Submitting Your Checkpoint

When ready to submit, include:

1. **GitHub Repository Link:** `https://github.com/yourusername/mern-app`
2. **Live Application URL:** `https://mern-app-yourname.azurewebsites.net`
3. **Key Features Deployed:**
   - ✅ React Frontend
   - ✅ Express Backend
   - ✅ MongoDB Database Connection
   - ✅ REST API Endpoints
   - ✅ Hosted on Microsoft Azure
4. **Documentation:** Complete README with setup and deployment instructions

## Verification Checklist

- [ ] Repository is public
- [ ] README.md is comprehensive
- [ ] All source code is committed
- [ ] .gitignore properly configured
- [ ] Environment variables documented
- [ ] Deployment instructions included
- [ ] Live URL is accessible
- [ ] API endpoints respond correctly
- [ ] GitHub Actions workflow is working
- [ ] License file included
