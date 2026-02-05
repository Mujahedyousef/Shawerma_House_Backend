# Shawarma House Backend

## Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Create database
createdb shawarma_house

# 3. Setup database
npm run prisma:generate
npm run prisma:migrate

# 4. Seed database
# Option A: Full seed with ALL sections (Recommended!)
npm run seed:full

# Option B: Admin user only
npm run prisma:seed

# 5. Run server
npm run dev
```

## Seeding Options

### Full Seed (Recommended) 🌟
Populates your entire database with realistic Bait Al Shawarma data:
```bash
npm run seed:full
```
**What you get:**
- ✅ Hero section with media & stats
- ✅ 10 Product categories
- ✅ 4 Solutions/Services
- ✅ 3 Projects with galleries
- ✅ 8 Brand logos
- ✅ Testimonials
- ✅ 5 Sample products with specs
- ✅ Blog posts, FAQ, Careers, About Us
- ✅ All page settings
- ✅ Navbar & Footer

**Login:** `admin@central.com` / `central@admin123`

See `QUICK_SEED_GUIDE.md` for details!

### Admin Only
```bash
npm run prisma:seed
```
**Login:** `admin@central.com` / `central@admin123`

## API Endpoint
Server runs on: `http://localhost:5001`

**Note:** Port 5000 is often used by macOS system services. If you need to use port 5000, either:
- Update your frontend to use `http://localhost:5001`
- Or change `PORT=5001` to `PORT=5000` in `.env` (may conflict with system services)

## Environment Variables
Edit `.env` file if you need to change:
- Database connection
- Port number
- JWT secret

# Kill the port:
`lsof -ti:5001 | xargs kill -9`
