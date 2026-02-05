#!/bin/bash

# Reset and Seed Script for Bait Al Shawarma Backend
# This script resets the database and seeds it with comprehensive data

echo "🔄 Bait Al Shawarma - Database Reset & Seed"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Ask for confirmation
echo -e "${YELLOW}⚠️  WARNING: This will DELETE ALL existing data!${NC}"
read -p "Are you sure you want to continue? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy]es$ ]]
then
    echo "❌ Operation cancelled."
    exit 1
fi

echo "📦 Step 1: Generating Prisma Client..."
npm run prisma:generate

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to generate Prisma Client${NC}"
    exit 1
fi

echo ""
echo "🔧 Step 2: Applying Database Migrations..."
npm run prisma:migrate:deploy

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to apply migrations${NC}"
    exit 1
fi

echo ""
echo "🌱 Step 3: Seeding Database with Comprehensive Data..."
node prisma/comprehensive-seed.js

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to seed database${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Database Reset & Seed Complete!${NC}"
echo ""
echo "🎉 Your database is now fully populated with:"
echo "   - Hero section with media & stats"
echo "   - 10 Product categories"
echo "   - 4 Solutions/Services"
echo "   - 3 Projects with galleries"
echo "   - 8 Brand logos"
echo "   - 5 Sample products"
echo "   - Blog posts, FAQ, Careers, About Us"
echo "   - All page settings"
echo "   - Navigation menus"
echo ""
echo "🔐 Admin Login:"
echo "   Email: admin@central.com"
echo "   Password: central@admin123"
echo ""
echo "🚀 Start the server with: npm run dev"
echo ""

