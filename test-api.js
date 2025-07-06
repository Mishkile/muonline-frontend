// Quick test script to verify frontend can call backend API
import { api } from './src/services/api.js';

console.log('Testing API connection...');

// Test server status endpoint
api.get('/server')
  .then(response => {
    console.log('✅ Server status API works:', response.data);
  })
  .catch(error => {
    console.error('❌ Server status API failed:', error.message);
  });

// Test login endpoint  
api.post('/auth/login', { username: 'testuser', password: 'testpass123' })
  .then(response => {
    console.log('✅ Login API works:', response.data);
  })
  .catch(error => {
    console.error('❌ Login API failed:', error.message);
    console.error('Error details:', error.response?.data);
  });
