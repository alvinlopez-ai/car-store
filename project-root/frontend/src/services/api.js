const API_URL = "http://localhost:5000/api";

// LOGIN FUNCTION
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  // Store token
  localStorage.setItem('token', data.token);
  return data;
};

// LOGOUT FUNCTION
export const logout = () => {
  localStorage.removeItem('token');
};

// GET PROFILE
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

// GET ALL USERS
export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

// DELETE USER
export const deleteUser = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
};

// Service objects for compatibility
export const authService = {
  logout
};

export const userService = {
  getProfile,
  getAllUsers,
  deleteUser
};