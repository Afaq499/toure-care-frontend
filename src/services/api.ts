import axios from 'axios';
import { toast } from 'react-hot-toast';

// Dev server calls the local API. Production builds call the production API.
const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : 'https://api.tour-care.com/api';

class ApiService {
  private api: ReturnType<typeof axios.create>;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        const status = error.response?.status;
        if (status === 401) {
          this.handleUnauthorized();
        }
        const message = error.response?.data?.message || 'An error occurred';
        toast.error(message);
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(username: string, password: string): Promise<any> {
    return this.api.post('/auth/member/login', { username, password });
  }

  async getUser(): Promise<any> {
    return this.api.get('/members/member-detail');
  }

  async register(data: {
    phoneNumber: string;
    username: string;
    withdrawPassword: string;
    loginPassword: string;
    referralCode?: string;
  }): Promise<any> {
    return this.api.post('/members/register', data);
  }

  // Travel History endpoints
  async getTravelHistory(userId: string): Promise<any> {
    return this.api.get(`/tasks/status/${userId}`);
  }

  async submitTask(taskId: string, data: { rating: number; review: string }): Promise<any> {
    return this.api.post(`/tasks/submit/${taskId}`, data);
  }

  // Account endpoints
  async createAccount(data: {
    fullName: string;
    cryptoAddress: string;
    network: 'TRC20' | 'ERC20' | 'BTC';
    phoneNumber: string;
  }): Promise<any> {
    return this.api.post('/accounts', data);
  }

  // Helper method to set token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Helper method to remove token
  removeToken() {
    localStorage.removeItem('token');
  }

  private handleUnauthorized() {
    this.removeToken();
    localStorage.removeItem('user');
    delete this.api.defaults.headers.common.Authorization;
    if (window.location.pathname !== '/login') {
      window.location.replace('/login');
    }
  }
}

export const apiService = new ApiService(); 