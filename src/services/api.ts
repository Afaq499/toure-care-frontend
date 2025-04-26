import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
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

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const message = error.response?.data?.message || 'An error occurred';
        toast.error(message);
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(username: string, password: string): Promise<AxiosResponse> {
    return this.api.post('/auth/login', { username, password });
  }

  async register(data: {
    phoneNumber: string;
    username: string;
    withdrawPassword: string;
    loginPassword: string;
    referralCode?: string;
  }): Promise<AxiosResponse> {
    return this.api.post('/members/register', data);
  }

  // Travel History endpoints
  async getTravelHistory(userId: string): Promise<AxiosResponse> {
    return this.api.get(`/tasks/status/${userId}`);
  }

  async submitTask(taskId: string, data: { rating: number; review: string }): Promise<AxiosResponse> {
    return this.api.post(`/tasks/submit/${taskId}`, data);
  }

  // Helper method to set token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Helper method to remove token
  removeToken() {
    localStorage.removeItem('token');
  }
}

export const apiService = new ApiService(); 