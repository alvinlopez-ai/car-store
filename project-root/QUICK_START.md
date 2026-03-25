# Quick Start Guide

## 🚀 Start in 5 Steps

### Step 1: Navigate to Project

```bash
cd project-root
```

### Step 2: Start Docker Services

```bash
docker-compose up --build
```

### Step 3: Seed Sample Data (New Terminal)

```bash
docker-compose exec backend npm run seed
```

### Step 4: Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **MongoDB:** localhost:27017

### Step 5: Login with Test Credentials

```
Email: john@example.com
Password: password123
```

## 📚 Useful Commands

### View Status

```bash
docker-compose ps
```

### View Logs

```bash
docker-compose logs -f
```

### Stop Services

```bash
docker-compose down
```

### Clean Everything

```bash
docker-compose down -v
```

## ✅ Common Features

- ✅ User registration and login
- ✅ JWT authentication
- ✅ View all users
- ✅ Delete users
- ✅ User profile page
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

## 🔧 Customization

### Change JWT Secret

Edit `backend/.env`:

```env
JWT_SECRET=your_custom_secret_key
```

### Change Ports

Edit `docker-compose.yml`:

```yaml
ports:
  - "8000:5000" # Backend on port 8000
  - "3000:5173" # Frontend on port 3000
```

### Add More Users

Edit `backend/seeds/seed.js` and re-run:

```bash
docker-compose exec backend npm run seed
```

## 🆘 Troubleshooting

**Frontend won't load?**

```bash
docker-compose logs frontend
```

**Backend errors?**

```bash
docker-compose logs backend
```

**Database issues?**

```bash
docker-compose logs database
```

**Port conflicts?**

```bash
docker-compose down -v && docker-compose up --build
```

---

Ready to go! Access http://localhost:5173 now! 🎉
