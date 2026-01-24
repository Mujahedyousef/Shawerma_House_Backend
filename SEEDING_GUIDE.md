# Comprehensive Seed Guide for Bait Al Shawarma

This guide explains how to use the comprehensive seed script to populate your database with realistic data for all sections of the application.

## What Gets Seeded

The comprehensive seed script (`comprehensive-seed.js`) creates realistic data for:

### 🎬 Landing Page Sections
- **Hero Section**: Background media (video + images), stats cards with links
- **Categories Section**: 10 product categories with images and product counts
- **Solutions Section**: 4 solution cards with tags and CTAs
- **Brands Section**: 8 premium brand logos
- **Projects Section**: 3 complete projects with galleries and specifications
- **Testimonials Section**: Customer testimonials with profile images
- **Articles Section**: Latest news articles
- **CTA Section**: Start Project call-to-action

### 🛒 Products
- **5 Sample Products**: Complete with images, specs, colors, pricing
- **Product Filters**: Colors, Countries, Years, Product Types
- **Product Images**: Multiple images per product
- **Technical Specifications**: Detailed specs for each product

### 📄 Pages
- **Contact Page**: Complete with contact info and map coordinates
- **Products Page**: Hero section
- **Projects Page**: Hero section with description
- **Services Page**: Hero section with ticker text
- **Terms & Conditions**: Complete page with content
- **Blog Page**: Settings and sample blog posts
- **FAQ Page**: 4 common questions with answers
- **Careers Page**: Job listings and benefits
- **About Us Page**: Complete with vision, mission, story, team, awards

### 🔧 Services
- **3 Service Cards**: Design, Installation, Maintenance

### 📝 Blog
- **Blog Categories**: Restaurant tips category
- **2 Blog Posts**: Complete articles with content

### 🧭 Navigation
- **Navbar**: Logo and 6 navigation links
- **Footer**: 4 columns of links, social media, newsletter
- **Social Media**: Facebook, Instagram, LinkedIn links

### ⚙️ Settings
- **Theme Settings**: Colors and branding
- **General Settings**: Currency settings (AED)
- **Section Order**: Display order for landing page sections
- **Request Types**: Contact form request types

### 👤 Admin User
- **Email**: `admin@central.com`
- **Password**: `central@admin123`

## How to Run the Seed Script

### Prerequisites
1. Make sure your database is set up and accessible
2. Ensure all images are in the `public/uploads/` folder
3. Run migrations if you haven't already

### Running the Seed

```bash
# Navigate to the backend directory
cd Shawerma_House_Backend

# Run the comprehensive seed script
node prisma/comprehensive-seed.js
```

### What Happens During Seeding

1. **🗑️ Clears existing data** - Removes all existing records (except system tables)
2. **👤 Creates admin user** - Sets up the default admin account
3. **📊 Seeds all sections** - Populates all database tables with realistic data
4. **✅ Confirmation** - Shows a summary of what was seeded

### Expected Output

```
🗑️  Clearing existing data...
✅ Database cleared
👤 Seeding admin user...
✅ Admin user created
🎬 Seeding Hero Section...
✅ Hero Section seeded
📦 Seeding Categories...
✅ Categories seeded
💡 Seeding Solutions...
✅ Solutions seeded
🏗️  Seeding Projects...
✅ Projects seeded
🏷️  Seeding Brands...
✅ Brands seeded
💬 Seeding Testimonials...
✅ Testimonials seeded
🚀 Seeding Start Project Section...
✅ Start Project Section seeded
⚙️  Seeding Settings...
✅ Settings seeded
📄 Seeding Pages...
✅ Pages seeded
🧭 Seeding Navbar & Footer...
✅ Navbar & Footer seeded
🛒 Seeding Products...
✅ Products seeded
📝 Seeding Blogs...
✅ Blogs seeded
🔧 Seeding Services...
✅ Services seeded
❓ Seeding FAQ...
✅ FAQ seeded
💼 Seeding Careers...
✅ Careers seeded
👥 Seeding About Us...
✅ About Us seeded
📰 Seeding Articles...
✅ Articles seeded
📋 Seeding Request Types...
✅ Request Types seeded

🎉 ALL DATA SEEDED SUCCESSFULLY! 🎉

📧 Admin Login:
   Email: admin@central.com
   Password: central@admin123

📊 Seeded Data Summary:
   ✅ Hero Section with media & stats
   ✅ 10 Product Categories
   ✅ 4 Solutions/Services
   ✅ 3 Projects with galleries
   ✅ 8 Brand Logos
   ✅ Testimonials with profiles
   ✅ 5 Products with specs & images
   ✅ 2 Blog posts
   ✅ 3 Services
   ✅ 4 FAQ items
   ✅ Careers page with jobs
   ✅ About Us page complete
   ✅ Navbar & Footer
   ✅ All page settings
```

## Image Usage

The script intelligently uses all images from the `public/uploads/` folder:

- **14 Images** and **1 Video** are used throughout the application
- Images are rotated and reused across different sections
- The same image may appear in multiple places (this is intentional for testing)
- Video is used in the Hero Section

## Customization

### To Add More Data

Edit the `comprehensive-seed.js` file and:

1. **Add more items to arrays**: Add more products, categories, projects, etc.
2. **Modify content**: Change the English and Arabic text to match your needs
3. **Adjust images**: Change which images are used where

### To Use Your Own Images

1. Add your images to `public/uploads/`
2. Update the `images` array at the top of the seed script
3. Run the seed script again

### To Skip Certain Sections

Comment out the function calls in the `main()` function:

```javascript
async function main() {
  try {
    await clearDatabase();
    await seedAdmin();
    await seedHeroSection();
    // await seedCategories();  // Skip this
    await seedSolutions();
    // ... rest of the seeds
  }
}
```

## Troubleshooting

### Error: "Foreign key constraint failed"
- Make sure you run the seed script after migrations
- The script clears data in the correct order to avoid FK issues

### Error: "File not found"
- Check that all images exist in `public/uploads/`
- Verify image filenames match those in the `images` array

### Error: "Unique constraint violation"
- Run the seed script with a fresh database
- The script clears all data before seeding, but if interrupted, you may need to clear manually

## Production Use

⚠️ **WARNING**: This seed script **DELETES ALL EXISTING DATA** before seeding.

**DO NOT RUN THIS IN PRODUCTION** unless you want to reset everything!

For production:
1. Comment out the `clearDatabase()` call
2. Add conditional checks to avoid duplicates
3. Or create a separate seed script for production data

## Next Steps

After seeding:

1. **Login to CMS** at `http://localhost:5000` (or your backend URL)
   - Email: `admin@baitalshawarma.com`
   - Password: `shawarma@admin123`

2. **Check the Frontend** - All sections should display the seeded data

3. **Customize the Data** - Update content through the CMS

4. **Add Real Content** - Replace sample text and images with real content

## Files

- **Main Seed Script**: `prisma/comprehensive-seed.js`
- **Original Seed**: `prisma/seed.js` (only seeds admin user)
- **Images**: `public/uploads/` (14 images + 1 video)

## Support

If you encounter any issues:
1. Check the console output for specific error messages
2. Verify your database connection
3. Ensure Prisma migrations are up to date
4. Check that all required images exist in the uploads folder

---

**Happy Seeding! 🌱**

