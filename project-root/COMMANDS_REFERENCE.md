# 📋 Commands Reference Guide

All essential commands for the EWYL Full-Stack Application in one place.

## 🚀 Getting Started

### Initial Setup

```bash
# Navigate to project
cd project-root

# Build and start all services
docker-compose up --build

# Seed sample data (in new terminal)
docker-compose exec backend npm run seed

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000/api
```

### Stop Everything

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database)
docker-compose down -v
```

## 🐳 Docker Commands

### Start Services

```bash
# Start all services
docker-compose up

# Start in background/detached mode
docker-compose up -d

# Start with rebuilding images
docker-compose up --build

# Start specific service
docker-compose up backend
docker-compose up frontend
docker-compose up database
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop specific service
docker-compose stop backend

# Stop and remove everything
docker-compose down -v
```

### View Status & Logs

```bash
# Show running containers
docker-compose ps

# View all containers (including stopped)
docker-compose ps -a

# View logs (real-time)
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# View last N lines
docker-compose logs --tail=50 backend

# View logs without timestamps
docker-compose logs --no-timestamps backend
```

### Execute Commands

```bash
# Run command in container
docker-compose exec backend npm run seed

# Run shell in container
docker-compose exec backend sh

# Connect to MongoDB
docker-compose exec database mongosh

# View backend package versions
docker-compose exec backend npm list
```

### Build Commands

```bash
# Build all images
docker-compose build

# Rebuild specific image
docker-compose build backend
docker-compose build frontend

# Build without cache
docker-compose build --no-cache
```

### Clean Up

```bash
# Remove unused images
docker image prune

# Remove unused containers
docker container prune

# Remove everything (careful!)
docker system prune -a

# View disk usage
docker system df
```

## 📦 Frontend Commands (npm)

### Development

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Package Management

```bash
# List installed packages
npm list

# Check outdated packages
npm outdated

# Update packages
npm update

# Update specific package
npm install package-name@latest
```

## 🚀 Backend Commands (npm)

### Development

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start server
npm start

# Start with nodemon (auto-restart on changes)
npm run dev

# Seed sample data
npm run seed
```

### Package Management

```bash
# List installed packages
npm list

# Check outdated packages
npm outdated

# Update packages
npm update
```

## 🗄️ MongoDB Commands

### Access MongoDB

```bash
# Connect to MongoDB shell
docker-compose exec database mongosh

# Or specify connection string
docker-compose exec database mongosh mongodb://admin:password@localhost:27017
```

### MongoDB Shell Commands

```javascript
// Show databases
show dbs

// Use specific database
use ewyl

// Show collections
show collections

// View all users
db.users.find()

// View formatted users
db.users.find().pretty()

// Count users
db.users.countDocuments()

// Find specific user
db.users.findOne({ email: "john@example.com" })

// Search users by name
db.users.find({ name: /John/i })

// Delete user
db.users.deleteOne({ email: "test@example.com" })

// Delete all users
db.users.deleteMany({})

// Create index
db.users.createIndex({ email: 1 })

// View indexes
db.users.getIndexes()

// Get database stats
db.stats()

// Drop collection
db.users.drop()

// Drop database
db.dropDatabase()
```

## 🧪 API Testing Commands (curl)

### Health Check

```bash
curl http://localhost:5000/api/health
```

### Authentication

#### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Save token for next requests
TOKEN="<token_from_response>"
```

### User Endpoints (Protected)

#### Get Profile

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer $TOKEN"
```

#### Update Profile

```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Updated Name",
    "email": "newemail@example.com"
  }'
```

#### Get All Users

```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer $TOKEN"
```

#### Get User by ID

```bash
curl -X GET http://localhost:5000/api/users/USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

#### Delete User

```bash
curl -X DELETE http://localhost:5000/api/users/USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

#### Test Invalid Token

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer invalid_token"
```

## 📊 Monitoring & Debugging

### View System Resources

```bash
# Docker resource usage
docker stats

# Monitor specific container
docker stats backend

# Check container processes
docker top backend
```

### Inspect Services

```bash
# Get container details
docker inspect container_name

# View container IP address
docker inspect backend | grep IPAddress

# View environment variables
docker inspect backend | grep -A 20 "Env"
```

### Network Debugging

```bash
# Test connectivity between services
docker-compose exec backend ping database
docker-compose exec frontend ping backend

# DNS check
docker-compose exec backend nslookup backend
```

### Port Forwarding

```bash
# Check which ports are listening
docker-compose ps

# Check if port is in use
lsof -i :5173
lsof -i :5000
lsof -i :27017
```

## 🔄 Development Workflow

### Full Clean Restart

```bash
# Stop everything
docker-compose down -v

# Rebuild everything
docker-compose up --build

# Seed fresh data
docker-compose exec backend npm run seed
```

### Update and Restart Backend

```bash
# Stop backend
docker-compose stop backend

# Make code changes

# Rebuild backend image
docker-compose build backend

# Start backend
docker-compose up backend
```

### Frontend Hot Reload

```bash
# Frontend automatically reloads on file changes
# Just save your file and the browser refreshes
# No restart needed during development
```

### View Live Logs

```bash
# All services
docker-compose logs -f

# Follow backend logs
docker-compose logs -f backend

# Follow with timestamps
docker-compose logs -f --timestamps backend
```

## 📦 Backup & Restore

### Backup Database

```bash
# Backup MongoDB
docker-compose exec database mongodump --out /backup

# Or backup to file
docker-compose exec database mongodump --archive=backup.archive
```

### Restore Database

```bash
# Restore from backup
docker-compose exec database mongorestore /backup

# Or restore from archive
docker-compose exec database mongorestore --archive=backup.archive
```

## 🚢 Deployment Commands

### Build Production Images

```bash
# Build frontend image
docker build -t ewyl-frontend:1.0 ./frontend

# Build backend image
docker build -t ewyl-backend:1.0 ./backend

# Tag for repository
docker tag ewyl-frontend:1.0 yourusername/ewyl-frontend:1.0
docker tag ewyl-backend:1.0 yourusername/ewyl-backend:1.0

# Push to registry
docker push yourusername/ewyl-frontend:1.0
docker push yourusername/ewyl-backend:1.0
```

### Deploy with Production Compose

```bash
# Set environment variables
export JWT_SECRET="your_secret"
export MONGO_PASSWORD="your_password"

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 🆘 Troubleshooting Commands

### Check Service Health

```bash
# Ping services
docker-compose exec backend ping -c 3 database

# Check backend connectivity
curl -v http://localhost:5000/api/health

# Test database
docker-compose exec database mongosh --eval "db.adminCommand('ping')"
```

### Clear Docker Cache

```bash
# Remove all unused images
docker image prune -a

# Remove dangling volumes
docker volume prune

# Clean everything
docker system prune -a --volumes
```

### Restart Single Service

```bash
# Restart backend
docker-compose restart backend

# Restart frontend
docker-compose restart frontend

# Restart database
docker-compose restart database
```

### Debug Running Container

```bash
# Enter container shell
docker-compose exec backend /bin/sh

# Check running processes
docker-compose exec backend ps aux

# Check network info
docker-compose exec backend ifconfig

# Check environment
docker-compose exec backend env
```

## 📝 Useful Aliases

Add to your `.bashrc` or `.zshrc`:

```bash
# Docker Compose aliases
alias dc='docker-compose'
alias dcup='docker-compose up -d'
alias dcdown='docker-compose down'
alias dclogs='docker-compose logs -f'
alias dcps='docker-compose ps'

# Backend aliases
alias seed='docker-compose exec backend npm run seed'
alias backend_logs='docker-compose logs -f backend'
alias backend_shell='docker-compose exec backend /bin/sh'

# Frontend aliases
alias frontend_logs='docker-compose logs -f frontend'

# Database aliases
alias mongo_shell='docker-compose exec database mongosh'
alias db_logs='docker-compose logs -f database'

# Restart all
alias restart_all='docker-compose down && docker-compose up -d'
```

## 💡 Quick Reference Table

| Task               | Command                                               |
| ------------------ | ----------------------------------------------------- |
| Start everything   | `docker-compose up --build`                           |
| Seed data          | `docker-compose exec backend npm run seed`            |
| Stop all           | `docker-compose down`                                 |
| View logs          | `docker-compose logs -f`                              |
| Connect to MongoDB | `docker-compose exec database mongosh`                |
| Access shell       | `docker-compose exec backend sh`                      |
| Restart service    | `docker-compose restart backend`                      |
| Clean up           | `docker system prune -a`                              |
| Full restart       | `docker-compose down -v && docker-compose up --build` |

---

**Reference Version:** 1.0.0  
**Last Updated:** March 24, 2024
