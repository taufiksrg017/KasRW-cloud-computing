import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('kasrw_admin');
    const token = localStorage.getItem('kasrw_token');
    if (storedAdmin && token) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await authAPI.login({ username, password });
    const { token, admin } = res.data.data;
    localStorage.setItem('kasrw_token', token);
    localStorage.setItem('kasrw_admin', JSON.stringify(admin));
    setAdmin(admin);
    return admin;
  };

  const logout = () => {
    localStorage.removeItem('kasrw_token');
    localStorage.removeItem('kasrw_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};