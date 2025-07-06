import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error information for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verify: () => api.get('/auth/verify'),
};

export const rankingsAPI = {
  getPlayers: (params = {}) => api.get('/rankings/players', { params }),
  getGuilds: (params = {}) => api.get('/rankings/guilds', { params }),
};

export const serverAPI = {
  getStatus: () => api.get('/server'),
  getOnlinePlayers: (params = {}) => api.get('/server/online', { params }),
};

export const playersAPI = {
  getProfile: (playerName) => api.get(`/players/profile/${playerName}`),
  getCharacters: () => api.get('/players/characters'),
  getGuild: (guildName) => api.get(`/players/guild/${guildName}`),
};

export const guildsAPI = {
  getProfile: (guildName) => api.get(`/guilds/${guildName}`),
  getMembers: (guildName) => api.get(`/guilds/${guildName}/members`),
  getRankings: (params = {}) => api.get('/guilds/rankings', { params }),
};

export const newsAPI = {
  getNews: (params = {}) => api.get('/news', { params }),
  getEvents: (params = {}) => api.get('/news/events', { params }),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getCharacters: () => api.get('/user/characters'),
  clearPK: (characterName) => api.post(`/user/characters/${characterName}/clear-pk`),
};

export const downloadsAPI = {
  getDownloads: () => api.get('/downloads'),
  getFile: (fileId) => api.get(`/downloads/${fileId}`),
};

// Default export for convenience
export default api;
