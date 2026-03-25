const apiBaseConfig = {
  development: {
    apiUrl: 'http://localhost:5000/api',
    timeout: 10000,
  },
  production: {
    apiUrl: 'https://api.yourdomain.com/api',
    timeout: 30000,
  }
};

export default apiBaseConfig;
