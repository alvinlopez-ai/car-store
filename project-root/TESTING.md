# Testing Guide

## 🧪 Manual Testing Workflows

### 1. User Registration

**Steps:**

1. Open http://localhost:5173
2. Click "Register" tab
3. Fill in form:
   - Name: Test User
   - Email: testuser@example.com
   - Password: password123
4. Click "Register"

**Expected Result:**

- ✅ Redirected to dashboard
- ✅ Shown as logged in user
- ✅ See your profile and all users list

### 2. User Login

**Steps:**

1. Open http://localhost:5173
2. Ensure on "Login" tab
3. Enter credentials:
   - Email: john@example.com
   - Password: password123
4. Click "Login"

**Expected Result:**

- ✅ Redirected to dashboard
- ✅ Profile shows "John Doe"
- ✅ User list displays

### 3. View Profile

**Steps:**

1. Login successfully
2. Navigate to dashboard
3. View "Your Profile" section

**Expected Result:**

- ✅ Name displayed
- ✅ Email displayed
- ✅ Creation date visible

### 4. View All Users

**Steps:**

1. Login successfully
2. Scroll to "All Users" section
3. View users table

**Expected Result:**

- ✅ Table populated with users
- ✅ Shows name, email, delete button
- ✅ Can scroll if many users

### 5. Delete User

**Steps:**

1. Login successfully
2. Find user in table
3. Click "Delete" button
4. Confirm deletion

**Expected Result:**

- ✅ Confirmation dialog appears
- ✅ User removed from table
- ✅ Backend database updated

### 6. Logout

**Steps:**

1. Click "Logout" button in header
2. Should redirect to login page

**Expected Result:**

- ✅ Redirected to login page
- ✅ Token cleared from localStorage
- ✅ Cannot access dashboard without login

### 7. Error Handling - Wrong Password

**Steps:**

1. Enter correct email, wrong password
2. Click "Login"

**Expected Result:**

- ✅ Error message displays: "Invalid credentials"
- ✅ Not redirected to dashboard
- ✅ Can retry login

### 8. Error Handling - Invalid Email

**Steps:**

1. Enter invalid email format
2. Click "Login" or "Register"

**Expected Result:**

- ✅ Form validation error shows
- ✅ Cannot submit form
- ✅ Error message about email format

### 9. Protected Routes

**Steps:**

1. Clear localStorage in DevTools
2. Try accessing http://localhost:5173/dashboard directly
3. Try accessing http://localhost:5173/profile

**Expected Result:**

- ✅ Redirected to login page
- ✅ Cannot bypass authentication
- ✅ Token verification works

### 10. Verification - Loading State

**Steps:**

1. Login normally
2. Watch for loading spinner during:
   - Page load
   - Fetching users
   - Deleting user

**Expected Result:**

- ✅ Loading spinner appears briefly
- ✅ Elements disabled during load
- ✅ Smooth transitions

## 🔌 API Testing with Curl

### Test Backend Availability

```bash
curl http://localhost:5000/api/health
# Response: {"status":"OK","timestamp":"2024-03-24T..."}
```

### Register New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "email": "apitest@example.com",
    "password": "password123"
  }'

# Response:
# {
#   "message": "User registered successfully",
#   "token": "eyJhbGciOiJIUzI1NiIs...",
#   "user": {
#     "id": "...",
#     "name": "API Test User",
#     "email": "apitest@example.com"
#   }
# }
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "password123"
  }'

# Save the token from response
TOKEN="eyJhbGciOiJIUzI1NiIs..."
```

### Get User Profile (Protected)

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer $TOKEN"

# Response: {...user data}
```

### Get All Users (Protected)

```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer $TOKEN"

# Response: [{...user1}, {...user2}, ...]
```

### Update Profile (Protected)

```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Updated Name",
    "email": "newemail@example.com"
  }'
```

### Delete User (Protected)

```bash
curl -X DELETE http://localhost:5000/api/users/{userId} \
  -H "Authorization: Bearer $TOKEN"

# Response: {"message":"User deleted successfully"}
```

### Test Invalid Token

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer invalid_token"

# Response: {"message":"Token is not valid"}
```

## 🔍 Browser DevTools Testing

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Login or perform action
4. Check requests:
   - Status codes (200, 401, 404, etc.)
   - Request/Response headers
   - JWT token in Authorization header

### Check Storage

1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Click localStorage
4. Verify token stored after login
5. Verify token removed after logout

### Check Console

1. Open DevTools (F12)
2. Go to Console tab
3. Perform actions
4. Check for:
   - No JavaScript errors
   - No CORS errors
   - No network errors
   - Proper logs (if any)

## 📊 Performance Testing

### Frontend Load Time

```bash
# Measure build time
npm run build

# Expected: < 10 seconds
```

### Backend Response Time

```bash
# Login request duration
time curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Expected: < 300ms
```

### Database Query Performance

```bash
# During heavy load, check:
# - Response times
# - CPU usage
# - Memory usage
docker stats
```

## 🐛 Debugging Techniques

### Frontend Debugging

```javascript
// Add to any React component for debugging
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);

// Check API responses
const handleLogin = async () => {
  try {
    console.time('login-request');
    const response = await api.post('/auth/login', {...});
    console.timeEnd('login-request');
    console.log('Login response:', response.data);
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### Backend Debugging

```bash
# Start with detailed logging
NODE_DEBUG=* npm start

# Check active connections
netstat -tuln | grep 5000

# Monitor process
top -p $(lsof -t -i:5000)

# Check logs
docker logs -f backend
```

### Database Debugging

```bash
# Connect to MongoDB
docker-compose exec database mongosh

# List databases
show dbs

# Use ewyl database
use ewyl

# View collections
show collections

# Query users
db.users.find()

# Count users
db.users.count()

# Search by email
db.users.findOne({ email: "john@example.com" })
```

## ✅ Pre-Production Checklist

- [ ] All manual tests passed
- [ ] All API endpoints tested
- [ ] Error messages user-friendly
- [ ] Loading states smooth
- [ ] No console errors
- [ ] No CORS issues
- [ ] Token expiration handled
- [ ] 401 redirects to login
- [ ] Password hashing works
- [ ] User data properly validated
- [ ] Database backups work
- [ ] Docker containers stable
- [ ] Health checks working
- [ ] No data leaks in errors
- [ ] Rate limiting configured

---

**Version:** 1.0.0  
**Last Updated:** March 24, 2024
