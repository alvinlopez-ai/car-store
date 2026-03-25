import express from 'express';

const router = express.Router();

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // simple demo check
  if (email === 'john@example.com' && password === 'password123') {
    return res.json({
      message: 'Login successful',
      token: 'dummy-token'
    });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// REGISTER
router.post('/register', (req, res) => {
  res.json({ message: 'User registered' });
});

export default router;