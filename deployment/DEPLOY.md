# Deployment Guide - cPanel/WHM AlmaLinux Server

## Server Info
- **Blueprint:** cPanel & WHM for AlmaLinux (Lightsail)
- **Docker:** 26.1.3 (installed)
- **Docker Compose:** v2.27.0 (installed)
- **Apache:** Running on ports 80/443 (managed by cPanel)

## Architecture
```
Apache (80/443) → proxy → Docker containers (localhost only)
    shweb.tptc.com.sa       → 127.0.0.1:3000 (Frontend SSR)
    api.shweb.tptc.com.sa   → 127.0.0.1:3001 (Backend API)
    admin.shweb.tptc.com.sa → 127.0.0.1:3002 (CMS Admin)
```

---

## Step 1: Clone Repos

SSH into the server and run:

```bash
sudo mkdir -p /var/www/shawarma-home
cd /var/www/shawarma-home

git clone https://github.com/Mujahedyousef/Shawerma_House_Backend.git
git clone https://github.com/Mujahedyousef/Shawerma_House_FrontEnd.git
git clone https://github.com/Mujahedyousef/Shawerma_House_cms.git
```

Switch Backend to deployment branch:
```bash
cd Shawerma_House_Backend
git checkout production-security
```

Verify structure:
```bash
ls /var/www/shawarma-home/
# Expected: Shawerma_House_Backend  Shawerma_House_FrontEnd  Shawerma_House_cms
```

---

## Step 2: Create .env

```bash
cd /var/www/shawarma-home/Shawerma_House_Backend/deployment

echo "DB_USER=postgres" > .env
echo "DB_PASSWORD=$(openssl rand -base64 32 | tr -d '=+/' | cut -c1-32)" >> .env
echo "DB_NAME=shawarma_db" >> .env
echo "JWT_SECRET=$(openssl rand -base64 48 | tr -d '=+/' | cut -c1-48)" >> .env
echo "CORS_ORIGIN=https://shweb.tptc.com.sa,https://admin.shweb.tptc.com.sa" >> .env
echo "PUBLIC_API_URL=https://api.shweb.tptc.com.sa/api" >> .env

chmod 600 .env
cat .env
```

Verify: DB_PASSWORD and JWT_SECRET should be long random strings.

---

## Step 3: Build and Start Containers

```bash
cd /var/www/shawarma-home/Shawerma_House_Backend/deployment
sudo docker compose up -d --build
```

This takes 10-15 minutes first time. Wait for it to finish.

Check status:
```bash
sudo docker compose ps
```

Expected:
```
shawarma-db        running (healthy)
shawarma-backend   running
shawarma-frontend  running
shawarma-cms       running
```

If something failed, check logs:
```bash
sudo docker compose logs backend
sudo docker compose logs frontend
sudo docker compose logs cms
```

---

## Step 4: Verify Services Locally

```bash
curl http://127.0.0.1:3001/health
# Expected: {"status":"ok"}

curl -s http://127.0.0.1:3000 | head -5
# Expected: <!DOCTYPE html>...

curl -s http://127.0.0.1:3002 | head -5
# Expected: <!DOCTYPE html>...
```

---

## Step 5: Seed Database

```bash
cd /var/www/shawarma-home/Shawerma_House_Backend/deployment
sudo docker compose exec backend npm run seed:full
```

---

## Step 6: Configure Subdomains in cPanel

### Option A: Via WHM (Recommended)

1. Login to WHM: `https://server.tptc-sa.com:2087`
2. Go to: **DNS Functions** → **Edit DNS Zone**
3. Select the domain `tptc.com.sa`
4. Add A records pointing to the server IP:
   ```
   shweb          → SERVER_IP
   api.shweb      → SERVER_IP
   admin.shweb    → SERVER_IP
   ```

### Option B: Via cPanel

1. Login to cPanel: `https://server.tptc-sa.com:2083`
2. Go to: **Domains** → **Subdomains** (or **Domains**)
3. Create three subdomains:
   - `shweb.tptc.com.sa`
   - `api.shweb.tptc.com.sa`
   - `admin.shweb.tptc.com.sa`

---

## Step 7: Configure Apache Reverse Proxy

Create Apache config to proxy subdomains to Docker:

```bash
sudo nano /etc/apache2/conf.d/shawarma-proxy.conf
```

If that path doesn't exist, try:
```bash
sudo nano /etc/httpd/conf.d/shawarma-proxy.conf
```

Paste this content:

```apache
# Frontend - shweb.tptc.com.sa
<VirtualHost *:80>
    ServerName shweb.tptc.com.sa

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    ErrorLog /var/log/httpd/shweb-error.log
    CustomLog /var/log/httpd/shweb-access.log combined
</VirtualHost>

# Backend API - api.shweb.tptc.com.sa
<VirtualHost *:80>
    ServerName api.shweb.tptc.com.sa

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3001/
    ProxyPassReverse / http://127.0.0.1:3001/

    ErrorLog /var/log/httpd/api-shweb-error.log
    CustomLog /var/log/httpd/api-shweb-access.log combined
</VirtualHost>

# CMS Admin - admin.shweb.tptc.com.sa
<VirtualHost *:80>
    ServerName admin.shweb.tptc.com.sa

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3002/
    ProxyPassReverse / http://127.0.0.1:3002/

    ErrorLog /var/log/httpd/admin-shweb-error.log
    CustomLog /var/log/httpd/admin-shweb-access.log combined
</VirtualHost>
```

Enable proxy modules and restart Apache:
```bash
sudo apachectl -M | grep proxy
# If proxy modules not listed:
sudo yum install mod_proxy mod_proxy_http -y

sudo apachectl configtest
# Expected: Syntax OK

sudo systemctl restart httpd
```

---

## Step 8: Setup SSL (HTTPS)

### Option A: Via cPanel AutoSSL (Easiest)
1. Login to WHM: `https://server.tptc-sa.com:2087`
2. Go to: **SSL/TLS** → **Manage AutoSSL**
3. Run AutoSSL for the domain
4. Certificates auto-generated for all subdomains

### Option B: Via Certbot
```bash
sudo yum install certbot python3-certbot-apache -y

sudo certbot --apache \
  -d shweb.tptc.com.sa \
  -d api.shweb.tptc.com.sa \
  -d admin.shweb.tptc.com.sa \
  --email your@email.com \
  --agree-tos
```

---

## Step 9: Test Live

```
https://shweb.tptc.com.sa              → Frontend loads
https://api.shweb.tptc.com.sa/health   → {"status":"ok"}
https://admin.shweb.tptc.com.sa        → CMS login page
```

---

## Env Variables Reference

### Backend (set via docker-compose environment)
| Variable | Value | Required |
|----------|-------|----------|
| DATABASE_URL | postgresql://user:pass@database:5432/db | Yes |
| PORT | 3001 | Yes |
| NODE_ENV | production | Yes |
| JWT_SECRET | random 48 chars | Yes |
| JWT_EXPIRES_IN | 7d | No |
| CORS_ORIGIN | comma-separated origins | Yes |

### Frontend (set via docker-compose environment)
| Variable | Value | Required |
|----------|-------|----------|
| PORT | 3000 | Yes |
| NODE_ENV | production | Yes |
| API_URL | http://backend:3001/api (internal) | Yes |
| NEXT_PUBLIC_API_URL | https://api.shweb.tptc.com.sa/api | Yes |

### CMS (set at build time via docker-compose args)
| Variable | Value | Required |
|----------|-------|----------|
| VITE_API_URL | https://api.shweb.tptc.com.sa/api | Yes |

All env variables are managed in `deployment/.env`. Docker Compose passes them to each container automatically.

---

## Common Commands

```bash
cd /var/www/shawarma-home/Shawerma_House_Backend/deployment

# Check status
sudo docker compose ps

# View logs
sudo docker compose logs -f
sudo docker compose logs -f backend

# Restart a service
sudo docker compose restart backend

# Rebuild after code update
cd /var/www/shawarma-home/Shawerma_House_Backend && git pull
cd /var/www/shawarma-home/Shawerma_House_FrontEnd && git pull
cd /var/www/shawarma-home/Shawerma_House_cms && git pull
cd /var/www/shawarma-home/Shawerma_House_Backend/deployment
sudo docker compose up -d --build

# Stop everything
sudo docker compose down

# Seed database (manual, one-time)
sudo docker compose exec backend npm run seed:full

# Reset database (destroys all data!)
sudo docker compose down
sudo docker volume rm deployment_postgres_data
sudo docker compose up -d --build
sudo docker compose exec backend npm run seed:full

# Backup database
sudo docker compose exec database pg_dump -U postgres shawarma_db > backup_$(date +%Y%m%d).sql
```

---

## Troubleshooting

**Container won't start:**
```bash
sudo docker compose logs [service-name]
```

**Database connection error:**
```bash
sudo docker compose exec backend npx prisma db push
```

**Frontend shows blank page:**
```bash
sudo docker compose logs frontend
sudo docker compose build --no-cache frontend
sudo docker compose up -d frontend
```

**Apache proxy not working:**
```bash
sudo apachectl configtest
sudo systemctl status httpd
sudo tail -20 /var/log/httpd/shweb-error.log
```

**Port already in use:**
```bash
sudo ss -tlnp | grep -E ':3000|:3001|:3002'
```
