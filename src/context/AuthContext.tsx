import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface User {
  username: string;
  phoneNumber: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  phoneNumber: string;
  username: string;
  withdrawPassword: string;
  loginPassword: string;
  referralCode?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token with the backend here
      // For now, we'll just assume it's valid
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiService.login(username, password);
      const { token, user: userData } = response.data;
      apiService.setToken(token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      // Error is already handled by the API service
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await apiService.register(data);
      const { token, user: userData } = response.data;
      apiService.setToken(token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      // Error is already handled by the API service
      throw error;
    }
  };

  const logout = () => {
    apiService.removeToken();
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 