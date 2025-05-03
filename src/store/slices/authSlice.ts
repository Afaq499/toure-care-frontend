import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';
import { toast } from 'react-hot-toast';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isFetchUser: boolean;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  phoneNumber: string;
  username: string;
  withdrawPassword: string;
  loginPassword: string;
  referralCode?: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isFetchUser: false
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await apiService.login(credentials.username, credentials.password);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getUser();
      // Map the API response to match our User type
      const userData = {
        _id: response.data.data._id,
        username: response.data.data.name,
        phoneNumber: response.data.data.mobileNumber,
        balance: response.data.data.balance,
        todaysRewards: response.data.data.todaysCommission,
        dailyTravel: response.data.data.dailyAvailableOrders,
        completedTravel: response.data.data.todaysOrders,
        referralCode: response.data.data.invitationCode,
        taskStats: response.data.data.taskStats,
        totalEarnings: response.data.data.totalEarnings,
        todaysEarnings: response.data.data.todaysEarnings,
        account: response.data.data.account
      };
      return { user: userData };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await apiService.register(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      apiService.removeToken();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      apiService.setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    rehydrate: (state) => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          apiService.setToken(token);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          apiService.removeToken();
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    },
    setFetchUser: (state, action) => {
      state.isFetchUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        apiService.setToken(action.payload.token);
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        toast.success('Login successful!');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });

    //gte user
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log("action.payload => ", action.payload)
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success('Registration successful! Please login to continue.');
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { logout, setCredentials, rehydrate, setFetchUser } = authSlice.actions;

export default authSlice.reducer; 