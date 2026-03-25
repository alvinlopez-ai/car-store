# EWYL Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### Security

- [ ] Update `JWT_SECRET` to a strong random string
- [ ] Update MongoDB username and password
- [ ] Enable HTTPS with valid SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Set up authentication for MongoDB
- [ ] Review and update CORS settings

### Environment

- [ ] Set `NODE_ENV=production`
- [ ] Update API URLs for production
- [ ] Configure database backups
- [ ] Setup monitoring and logging
- [ ] Configure rate limiting

### Testing

- [ ] Test all authentication flows
- [ ] Test all API endpoints
- [ ] Test user signup/login with new credentials
- [ ] Test error handling
- [ ] Perform load testing

## 🏭 Production Environment Variables

### Backend (.env)

```env
# NEVER commit this file!
MONGO_URI=mongodb://admin:password@mongo:27017/ewyl?authSource=admin
JWT_SECRET=change_this_to_a_very_long_random_string_at_least_32_characters
NODE_ENV=production
PORT=5000
LOG_LEVEL=warn
```

Generate strong JWT_SECRET:

```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) | Cut -c1-32
```

## 🐳 Docker Production Deployment

### 1. Build Production Images

```bash
# Build optimized images
docker build -t ewyl-frontend:1.0 ./frontend
docker build -t ewyl-backend:1.0 ./backend

# Tag for registry (e.g., Docker Hub)
docker tag ewyl-frontend:1.0 yourusername/ewyl-frontend:1.0
docker tag ewyl-backend:1.0 yourusername/ewyl-backend:1.0

# Push to registry
docker push yourusername/ewyl-frontend:1.0
docker push yourusername/ewyl-backend:1.0
```

### 2. Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: "3.9"

services:
  database:
    image: mongo:7.0
    container_name: ewyl_mongo_prod
    ports:
      - "127.0.0.1:27017:27017" # Only localhost
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    volumes:
      - mongo_prod_data:/data/db
      - ./mongo-backup:/backup
    networks:
      - app_network
    restart: always
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 30s
      timeout: 10s
      retries: 5

  backend:
    image: yourusername/ewyl-backend:1.0
    container_name: ewyl_backend_prod
    ports:
      - "127.0.0.1:5000:5000"
    environment:
      MONGO_URI: mongodb://admin:${MONGO_PASSWORD}@database:27017/ewyl?authSource=admin
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
      PORT: 5000
    depends_on:
      database:
        condition: service_healthy
    networks:
      - app_network
    restart: always
    healthcheck:
      test:
        [
          "CMD",
          "wget",
          "--quiet",
          "--tries=1",
          "--spider",
          "http://localhost:5000/api/health",
        ]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: yourusername/ewyl-frontend:1.0
    container_name: ewyl_frontend_prod
    ports:
      - "127.0.0.1:5173:5173"
    environment:
      VITE_API_URL: https://api.yourdomain.com/api
    depends_on:
      - backend
    networks:
      - app_network
    restart: always

volumes:
  mongo_prod_data:

networks:
  app_network:
    driver: bridge
```

### 3. Deploy with Docker Compose

```bash
# Set environment variables
export JWT_SECRET="your_generated_secret_key"
export MONGO_PASSWORD="your_mongo_password"

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## ☁️ Cloud Deployment Options

### AWS ECS (Recommended)

1. **Create ECR Repositories**

```bash
aws ecr create-repository --repository-name ewyl-frontend
aws ecr create-repository --repository-name ewyl-backend
```

2. **Push Images**

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker tag ewyl-frontend:1.0 <account-id>.dkr.ecr.us-east-1.amazonaws.com/ewyl-frontend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/ewyl-frontend:latest
```

3. **Create ECS Cluster and Services**

- Use AWS Console or CloudFormation
- Configure load balancer
- Setup auto-scaling policies

### Heroku Deployment

1. **Install Heroku CLI**

```bash
curl https://cli.heroku.com/install.sh | sh
```

2. **Create Apps**

```bash
heroku create ewyl-backend
heroku create ewyl-frontend
```

3. **Set Environment Variables**

```bash
heroku config:set JWT_SECRET=<your_secret> -a ewyl-backend
heroku config:set MONGO_URI=<your_mongo_uri> -a ewyl-backend
```

4. **Deploy**

```bash
git push heroku main
```

### DigitalOcean App Platform

1. **Connect Repository** - Link your GitHub repo
2. **Configure Services**
   - Set environment variables
   - Configure build commands
   - Set entrypoints

3. **Deploy** - Click deploy button

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Build Docker Images
        run: |
          docker build -t ewyl-frontend:latest ./frontend
          docker build -t ewyl-backend:latest ./backend

      - name: Push to Registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push yourusername/ewyl-frontend:latest
          docker push yourusername/ewyl-backend:latest

      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /app/ewyl
            docker-compose -f docker-compose.prod.yml pull
            docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoring & Logging

### Docker Stats

```bash
docker stats ewyl_backend_prod
docker stats ewyl_frontend_prod
```

### Logs

```bash
# Real-time logs
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend

# Save logs
docker-compose logs backend > logs.txt
```

### Monitoring Tools

- **Prometheus** - Metrics collection
- **Grafana** - Visualization
- **ELK Stack** - Logging
- **Sentry** - Error tracking

## 🔐 SSL/TLS Setup

### Using Let's Encrypt with Nginx

1. **Install Certbot**

```bash
sudo apt-get install certbot python3-certbot-nginx
```

2. **Get Certificate**

```bash
sudo certbot certonly --nginx -d api.yourdomain.com -d yourdomain.com
```

3. **Nginx Configuration**

```nginx
server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
    }
}
```

## 💾 Backup Strategy

### MongoDB Backup

```bash
# Backup
docker-compose exec database mongodump --out /backup

# Restore
docker-compose exec database mongorestore /backup
```

### Automated Backups

```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backups/mongo_$(date +%Y%m%d_%H%M%S)"
docker-compose exec database mongodump --out $BACKUP_DIR
tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"
rm -rf "$BACKUP_DIR"
```

## 🚨 Troubleshooting Production Issues

### Memory Issues

```bash
# Check memory usage
docker stats

# Increase memory limit
docker update --memory 2g container_name
```

### Disk Space

```bash
# Check disk space
df -h

# Cleanup
docker system prune -a
```

### Database Connection Issues

```bash
# Check database logs
docker-compose logs database

# Test connection
docker-compose exec backend mongosh mongodb://admin:password@database:27017/ewyl
```

### SSL Certificate Renewal

```bash
sudo certbot renew --dry-run
sudo certbot renew
```

## 📈 Performance Optimization

### Frontend

```bash
# Analyze bundle
npm run build
npm run preview

# Enable gzip compression
# In Nginx config:
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### Backend

```javascript
// Add caching headers
app.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=300");
  next();
});

// Add request logging
import morgan from "morgan";
app.use(morgan("combined"));
```

### Database

```bash
# Create indexes
# In MongoDB shell:
db.users.createIndex({ email: 1 })
db.users.createIndex({ createdAt: -1 })
```

## 📋 Deployment Runbook

### Initial Deployment

1. Build Docker images
2. Tag images
3. Push to registry
4. Configure server
5. Set environment variables
6. Run docker-compose
7. Verify all services
8. Test all endpoints
9. Setup monitoring
10. Configure backups

### Update Deployment

1. Build new images
2. Push to registry
3. Pull latest images: `docker-compose pull`
4. Redeploy: `docker-compose up -d`
5. Verify services
6. Monitor logs for errors

### Rollback Procedure

```bash
# Stop current deployment
docker-compose down

# Switch to previous tag
sed -i 's/:latest/:previous/' docker-compose.prod.yml

# Restart
docker-compose up -d
```

---

**Version:** 1.0.0  
**Last Updated:** March 24, 2024
