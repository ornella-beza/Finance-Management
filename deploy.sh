#!/bin/bash

# Finance Management App - Quick Deploy to Vercel
# This script helps you quickly push code and deploy to Vercel

echo "🚀 Finance Management - Quick Deploy Script"
echo "==========================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

# Check git status
echo ""
echo "📊 Checking for changes..."
git status --short

# Add all files
echo ""
echo "➕ Adding all files to Git..."
git add .

# Commit
echo ""
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo "💾 Committing changes..."
git commit -m "$commit_msg"

# Check if remote exists
if ! git remote | grep -q origin; then
    echo ""
    echo "⚠️  No remote repository found!"
    echo "Please create a GitHub repository first, then run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/Finance-Management.git"
    echo "git push -u origin main"
    exit 1
fi

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
git push

echo ""
echo "✅ Code pushed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Add environment variables from your .env file"
echo "4. Click Deploy!"
echo ""
echo "For detailed instructions, see: deployment_guide.md"