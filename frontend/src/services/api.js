import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Auto-inject JWT token ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kasrw_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-handle 401 (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
      localStorage.removeItem('kasrw_token');
      localStorage.removeItem('kasrw_admin');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// === AUTH ===
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// === TRANSAKSI ===
export const transaksiAPI = {
  getAll: (params) => api.get('/transaksi', { params }),
  getById: (id) => api.get(`/transaksi/${id}`),
  create: (data) => api.post('/transaksi', data),
  update: (id, data) => api.put(`/transaksi/${id}`, data),
  delete: (id) => api.delete(`/transaksi/${id}`),
};

// === SALDO ===
export const saldoAPI = {
  get: () => api.get('/saldo'),
};

export default api;