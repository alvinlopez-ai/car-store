# 🎯 Getting Started - Visual Guide

## ⚡ The Fastest Way to Start (30 seconds)

### Step 1️⃣: One Command to Start Everything

```bash
cd project-root && docker-compose up --build
```

**What's happening:**

- 🐳 Docker builds and starts 3 containers
- 🗄️ MongoDB database starts
- 🚀 Backend API server starts (port 5000)
- ⚛️ Frontend React app starts (port 5173)

**Wait for this message:**

```
backend_app    | Backend server running on port 5000
frontend_app   | VITE v5.0.8 ready in xxx ms
```

### Step 2️⃣: Open Your Browser

```
http://localhost:5173
```

### Step 3️⃣: Seed Sample Data (New Terminal)

```bash
docker-compose exec backend npm run seed
```

### Step 4️⃣: Login

Use these credentials:

```
Email: john@example.com
Password: password123
```

## 🎨 What You'll See

### Login Page

```
┌─────────────────────────────────┐
│   🎨 Modern Beautiful UI         │
│                                  │
│   Email:     [john@...]         │
│   Password:  [••••••••]         │
│                                  │
│   [Login Button]                │
│   [Register Tab]                │
└─────────────────────────────────┘
```

### Dashboard

```
┌──────────────────────────────────────┐
│   Dashboard      [Logout]            │
│   Welcome, John!                     │
│                                      │
│   ┌─ Your Profile ────────────────┐ │
│   │ Name:  John Doe               │ │
│   │ Email: john@example.com       │ │
│   └───────────────────────────────┘ │
│                                      │
│   ┌─ All Users    [Add User] ─────┐ │
│   │ Name    │ Email      │ Delete  │ │
│   │ ------- │ -----      │ ------  │ │
│   │ John    │ john@...   │ Delete  │ │
│   │ Jane    │ jane@...   │ Delete  │ │
│   │ Bob     │ bob@...    │ Delete  │ │
│   └───────────────────────────────┘ │
└──────────────────────────────────────┘
```

## 🔗 Access Points

| Service  | URL                              | Purpose        |
| -------- | -------------------------------- | -------------- |
| Frontend | http://localhost:5173            | User Interface |
| Backend  | http://localhost:5000/api        | REST API       |
| Health   | http://localhost:5000/api/health | API Status     |
| Database | localhost:27017                  | MongoDB        |

## 📊 What's Running

```
Your Local Machine
├── 🖥️  Frontend (React)
│   └── Port 5173
├── 🚀 Backend (Express)
│   └── Port 5000
└── 🗄️  Database (MongoDB)
    └── Port 27017
```

## 🧪 Try These Features

### 1. Register as New User

- Click "Register" tab
- Fill form with any name/email/password
- You'll be logged in automatically

### 2. View All Users

- See the "All Users" table on dashboard
- 4 sample users pre-loaded

### 3. Delete a User

- Click "Delete" button next to any user
- Confirm deletion
- User removed from database

### 4. View Your Profile

- See your name and email at top of dashboard

## 🔑 Sample Login Credentials

All have password: `password123`

| Email             | Name           |
| ----------------- | -------------- |
| john@example.com  | John Doe       |
| jane@example.com  | Jane Smith     |
| bob@example.com   | Bob Johnson    |
| alice@example.com | Alice Williams |

## ⚙️ Common Tasks

### I want to...

#### ...Stop Everything

```bash
docker-compose down
```

#### ...See the Logs

```bash
docker-compose logs -f
```

#### ...Access MongoDB Directly

```bash
docker-compose exec database mongosh
```

#### ...Restart a Service

```bash
docker-compose restart backend
```

#### ...Delete All Data and Start Fresh

```bash
docker-compose down -v
docker-compose up --build
docker-compose exec backend npm run seed
```

#### ...Stop Backend but Keep Frontend

```bash
docker-compose stop backend
```

#### ...Check What's Running

```bash
docker-compose ps
```

## 🐛 Troubleshooting

### Backend won't start?

```bash
# Check logs
docker-compose logs backend

# Try rebuilding
docker-compose build backend

# Restart it
docker-compose restart backend
```

### Frontend blank page?

```bash
# Check browser console (F12)
# Should see no errors

# Check logs
docker-compose logs frontend

# Try clearing cache
# Ctrl+Shift+Delete in browser
```

### Database error?

```bash
# Check database logs
docker-compose logs database

# Try volume reset
docker-compose down -v
docker-compose up
```

### Port already in use?

```bash
# Find what's using port 5000
lsof -i :5000

# Stop Docker and clean
docker system prune -a
docker-compose up --build
```

## 📚 Learn More

For deeper understanding, read these files in order:

1. **QUICK_START.md** (2 min) - Essential steps
2. **README.md** (10 min) - Complete documentation
3. **API Documentation** (in README) - Endpoints reference
4. **ARCHITECTURE.md** (15 min) - How it works
5. **DEPLOYMENT.md** (20 min) - Production setup

## 🎓 Project Structure

```
project-root/
├── 📁 frontend/        → React app
├── 📁 backend/         → Express API
├── 📄 docker-compose.yml → Start everything
├── 📄 README.md        → Full docs
├── 📄 QUICK_START.md   → Fast setup
└── 📄 ARCHITECTURE.md  → How it works
```

## ✨ Key Technologies

```
🎨 Frontend      🚀 Backend         🗄️  Database
├─ React 18      ├─ Express.js      └─ MongoDB 7
├─ Vite          ├─ Node 20
├─ Tailwind CSS  └─ JWT Auth
└─ Axios
```

## 🚀 Next Steps

### Immediate (Now)

- ✅ Start the app
- ✅ Login with test credentials
- ✅ Explore the UI

### Short Term (Next 30 min)

- 📖 Read README.md
- 🔌 Test API endpoints with curl
- 🧪 Try all dashboard features

### Development (Next hour)

- 💻 Modify React components
- 🛣️ Add new API endpoints
- 🎨 Customize styling

### Production (Later)

- 🚢 Read DEPLOYMENT.md
- 🔐 Change JWT secret
- ☁️ Deploy to cloud

## 💡 Pro Tips

### Tip 1: Hot Reload

Frontend code changes auto-reload - just save!

### Tip 2: Real-Time Logs

Keep `docker-compose logs -f` running in a terminal

### Tip 3: Database Exploration

```bash
docker-compose exec database mongosh
# Then explore with MongoDB commands
```

### Tip 4: API Testing

Use curl or Postman to test endpoints directly

### Tip 5: Development

Work in one terminal with `docker-compose logs -f`

## 🎯 Success Checklist

- ✅ Docker Compose running
- ✅ Frontend loads at http://localhost:5173
- ✅ Can login with john@example.com
- ✅ Dashboard shows users
- ✅ Can enable DevTools (F12)
- ✅ Database populated with 4 users

If all ✅, you're ready to go! 🎉

## 🆘 Quick Help

| Problem          | Solution                                                 |
| ---------------- | -------------------------------------------------------- |
| Port 5173 in use | Change port in vite.config.js                            |
| Port 5000 in use | Change port in backend/.env                              |
| Can't login      | Check backend is running: `docker-compose logs backend`  |
| Data disappeared | Database volume was deleted: re-seed with `npm run seed` |
| Blank page       | Check frontend logs: `docker-compose logs frontend`      |
| Slow startup     | First run builds images, subsequent runs are faster      |

## 📞 Getting Help

1. **Check Logs**: `docker-compose logs -f`
2. **Read Docs**: Start with README.md
3. **Search Errors**: Copy exact error message to browser
4. **Check Network**: Open DevTools (F12) → Network tab

---

## 🎉 You're Ready!

Everything is set up and ready to use. Start with:

```bash
docker-compose up --build
```

Then visit: **http://localhost:5173**

**Enjoy building!** 🚀

---

Version 1.0 | Last Updated: March 24, 2024
