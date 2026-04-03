import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            // Need to refresh or logout
            await logout();
          } else {
            // Get user data from profile endpoint
            const response = await api.get('/auth/profile/');
            setUser(response.data);
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        await logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login/', {
        username,
        password,
      });

      const { access, refresh, user: userData } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || 'Invalid credentials',
      };
    }
  };

  const logout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    window.location.href = '/login';
  };

  const isAdmin = user?.role === 'administrador';
  const isCoach = user?.role === 'entrenador';
  const isStaff = user?.role === 'staff';

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isCoach,
    isStaff,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
