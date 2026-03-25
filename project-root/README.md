# EWYL Full-Stack Application

A complete production-ready full-stack application with React frontend, Node.js/Express backend, MongoDB database, and Docker containerization.

## 🚀 Features

### Frontend

- ✅ React 18 with Vite for fast development
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive Login/Register page
- ✅ Dashboard with user management
- ✅ Axios API integration with interceptors
- ✅ JWT token handling
- ✅ Loading states and error handling

### Backend

- ✅ Express.js REST API
- ✅ JWT authentication
- ✅ MongoDB integration
- ✅ Input validation with express-validator
- ✅ Password hashing with bcryptjs
- ✅ MVC architecture
- ✅ Error handling middleware
- ✅ CORS enabled

### Database

- ✅ MongoDB with Mongoose ODM
- ✅ User model with validation
- ✅ Password hashing
- ✅ Sample seed data

### DevOps

- ✅ Docker support for all services
- ✅ Docker Compose orchestration
- ✅ Multi-stage builds for optimization
- ✅ Health checks
- ✅ Environment variables

## 📁 Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── index.html
│   ├── .env
│   └── .gitignore
│
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js
│   ├── seeds/
│   │   └── seed.js
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── docker-compose.yml
└── README.md
```

## 🔧 Prerequisites

- Docker & Docker Compose (latest version)
- OR Node.js 20+ and MongoDB (for local development)
- npm or yarn

## 📦 Installation & Setup

### Option 1: Using Docker (Recommended)

1. **Clone/Navigate to project:**

```bash
cd project-root
```

2. **Build and start all services:**

```bash
docker-compose up --build
```

3. **Wait for all services to be ready** (you should see all containers running):

```bash
docker-compose ps
```

4. **Seed sample data (in a new terminal):**

```bash
docker-compose exec backend npm run seed
```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017

6. **Stop all services:**

```bash
docker-compose down
```

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create .env file** (or use existing):

```env
MONGO_URI=mongodb://localhost:27017/ewyl
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
PORT=5000
```

4. **Ensure MongoDB is running:**

```bash
# If you have MongoDB installed locally
mongod
```

5. **Seed sample data:**

```bash
npm run seed
```

6. **Start backend server:**

```bash
npm run dev
```

Backend will run at http://localhost:5000

#### Frontend Setup

1. **Navigate to frontend (in a new terminal):**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

Frontend will run at http://localhost:5173

## 🔐 Default Test Credentials

After seeding, use these credentials to login:

```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123

Email: bob@example.com
Password: password123

Email: alice@example.com
Password: password123
```

## 🔌 API Documentation

### Authentication Endpoints

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### User Endpoints (Protected - Requires JWT)

#### Get Profile

```http
GET /api/users/profile
Authorization: Bearer {token}

Response: 200 OK
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Update Profile

```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com"
}

Response: 200 OK
{
  "message": "Profile updated successfully",
  "user": {...}
}
```

#### Get All Users

```http
GET /api/users
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  ...
]
```

#### Get User by ID

```http
GET /api/users/{id}
Authorization: Bearer {token}

Response: 200 OK
{...}
```

#### Delete User

```http
DELETE /api/users/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "message": "User deleted successfully"
}
```

## 🐳 Docker Services

### Services Configuration

| Service  | Image     | Port  | Purpose               |
| -------- | --------- | ----- | --------------------- |
| frontend | custom    | 5173  | React Vite dev server |
| backend  | custom    | 5000  | Express API server    |
| database | mongo:7.0 | 27017 | MongoDB database      |

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Start with build
docker-compose up --build

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# Execute command in container
docker-compose exec backend npm run seed
docker-compose exec backend npm test

# Stop all services
docker-compose down

# Remove volumes (caution: deletes data)
docker-compose down -v

# Rebuild specific service
docker-compose up --build backend
```

## 🧪 Testing

### Test Login Flow

1. Navigate to http://localhost:5173
2. Click "Register"
3. Fill in credentials and register
4. You'll be redirected to dashboard
5. View all users and manage them

### Test API Directly

Using curl or Postman:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get profile (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

## ⚙️ Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

```env
MONGO_URI=mongodb://mongo:27017/ewyl
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=production
PORT=5000
```

⚠️ **Important:** Change `JWT_SECRET` in production!

## 🔍 Troubleshooting

### MongoDB connection error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Ensure MongoDB is running or use Docker Compose

### Port already in use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**

```bash
# Find process using port
lsof -i :5000

# Kill process (replace PID)
kill -9 PID
```

### Containers not communicating

```
Error: getaddrinfo ENOTFOUND mongo
```

**Solution:** Ensure services are on the same network (docker-compose handles this)

### Frontend can't reach backend

- Check backend is running
- Verify VITE_API_URL in frontend/.env
- Check firewall settings
- Use `docker-compose logs backend` to debug

### Frontend blank page

- Open browser console for errors
- Check if Vite dev server is running
- Try `npm run build` and `npm run preview`

## 📈 Performance & Best Practices

### Frontend

- ✅ Code splitting with React Router
- ✅ Lazy loading components
- ✅ Tailwind CSS for minimal CSS bundle
- ✅ API request caching via axios interceptors

### Backend

- ✅ JWT for stateless authentication
- ✅ Input validation
- ✅ Password hashing with bcryptjs
- ✅ Error handling middleware
- ✅ CORS configured properly

### DevOps

- ✅ Multi-stage Docker builds
- ✅ Health checks for services
- ✅ Proper dependency ordering
- ✅ Volume management for persistent data

## 🔒 Security Considerations

⚠️ **Before Production:**

1. Change `JWT_SECRET` to a strong random string
2. Enable HTTPS
3. Add rate limiting
4. Implement CSRF protection
5. Use environment-specific configurations
6. Add request logging
7. Implement API key management
8. Add database backups

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or questions, please check:

1. Docker logs: `docker-compose logs`
2. Browser console
3. Network tab in DevTools
4. Backend errors: `docker-compose logs backend`

---

**Version:** 1.0.0  
**Last Updated:** March 24, 2024
