# EWYL Full-Stack Application Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           React Frontend (Port 5173)                  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Login Page  │  Dashboard  │  User Management    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │    Axios API Client with JWT Interceptors       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                             │
                 ┌───────────┴───────────┐
                 │   HTTP/REST API      │
                 │  JWT Authorization   │
                 │                       │
┌─────────────────────────────────────────────────────────────┐
│                    Backend Server                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │       Express API (Port 5000)                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Routes:                                         │  │  │
│  │  │  • /api/auth/register                          │  │  │
│  │  │  • /api/auth/login                             │  │  │
│  │  │  • /api/users/* (Protected)                    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Controllers:                                    │  │  │
│  │  │  • Auth: register, login                       │  │  │
│  │  │  • Users: CRUD operations                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Middleware:                                     │  │  │
│  │  │  • JWT Authentication                          │  │  │
│  │  │  • Error Handling                              │  │  │
│  │  │  • CORS                                        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                             │
                 ┌───────────┴───────────┐
                 │   MongoDB Protocol    │
                 │                       │
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Collections:                                        │  │
│  │  • users (with validation & hashed passwords)       │  │
│  │  • sessions (optional)                              │  │
│  └───────────────────────────────────────────────────────┘  │
│  Port: 27017                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### Authentication Flow

```
1. User enters credentials on Login page
   ↓
2. Frontend submits POST /auth/login
   ↓
3. Backend validates input & connects to MongoDB
   ↓
4. Backend queries user by email
   ↓
5. Backend compares hashed password with bcryptjs
   ↓
6. Password match → Generate JWT token
   ↓
7. Return token to frontend
   ↓
8. Frontend stores token in localStorage
   ↓
9. Frontend redirects to dashboard
```

### API Request Flow

```
1. Frontend component makes API call
   ↓
2. Axios interceptor adds JWT token to headers
   ↓
3. Request sent to backend
   ↓
4. Backend auth middleware validates token
   ↓
5. If valid → Execute controller logic
   ↓
6. Controller queries/updates MongoDB
   ↓
7. Return response to frontend
   ↓
8. Frontend updates UI
```

## 🔌 API Endpoints

### Public Routes

```
POST   /api/auth/register    - User registration
POST   /api/auth/login       - User login
GET    /api/health           - Health check
```

### Protected Routes (Require JWT)

```
GET    /api/users/profile      - Get current user profile
PUT    /api/users/profile      - Update user profile
GET    /api/users              - Get all users
GET    /api/users/:id          - Get user by ID
DELETE /api/users/:id          - Delete user
```

## 🗄️ Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  createdAt: Date (default: now)
}
```

## 🔐 Security Architecture

### Frontend Security

- JWT tokens stored in localStorage
- Axios interceptors for automatic token injection
- 401 error handling redirects to login
- Password fields non-visible in HTML

### Backend Security

- JWT signature verification
- Password hashing with bcryptjs (salt rounds: 10)
- Input validation with express-validator
- CORS configured for specific origins
- Error middleware prevents stack trace leaks

### Database Security

- MongoDB authentication (can be enabled)
- Password hashing before storage
- Email uniqueness constraint
- Mongoose schema validation

## 🐳 Docker Architecture

### Layer Structure

```
Docker Network: app_network
├── frontend (node:20-alpine)
│   ├── Multi-stage build
│   ├── Production: serve + dist
│   └── Port: 5173
│
├── backend (node:20-alpine)
│   ├── Single stage
│   ├── Runs npm start
│   └── Port: 5000
│
└── database (mongo:7.0)
    ├── Volume: mongo_data
    └── Port: 27017
```

### Volume Management

- `mongo_data`: Persistent MongoDB data

## 📈 Performance Considerations

### Frontend

- Code splitting with React Router
- Lazy loading via dynamic imports
- Tailwind CSS purging unused styles
- API caching through axios

### Backend

- Stateless JWT authentication
- Database indexing on email
- Connection pooling via Mongoose
- Response compression (optional)

### Database

- Indexes on email field
- Proper schema validation
- Connection pooling

## 🚀 Deployment Checklist

- [ ] Update JWT_SECRET in production
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for specific domains
- [ ] Add request rate limiting
- [ ] Enable database authentication
- [ ] Setup monitoring & logging
- [ ] Configure backups
- [ ] Add API documentation
- [ ] Setup CI/CD pipeline
- [ ] Configure health checks
- [ ] Add request logging

## 📚 Technology Stack

| Layer      | Technology        | Version |
| ---------- | ----------------- | ------- |
| Frontend   | React             | 18.2.0  |
| Frontend   | Vite              | 5.0.8   |
| Frontend   | Tailwind CSS      | 3.3.6   |
| Backend    | Express           | 4.18.2  |
| Backend    | Node.js           | 20      |
| Database   | MongoDB           | 7.0     |
| Auth       | JWT               | 9.1.2   |
| Hashing    | bcryptjs          | 2.4.3   |
| Validation | express-validator | 7.0.0   |

---

Last Updated: March 24, 2024
